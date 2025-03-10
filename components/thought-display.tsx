"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { RefreshCw, Share2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { 
  getStoredThought, 
  isThoughtFromToday, 
  saveThought, 
  canRegenerateThought,
  getTimeUntilNextRegeneration
} from "@/lib/storage";
import { 
  generatePhilosophicalThought, 
  getFallbackThought,
  generateArabicPhilosophicalThought,
  getArabicFallbackThought
} from "@/lib/gemini";

export default function ThoughtDisplay() {
  const [thought, setThought] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isRegenerating, setIsRegenerating] = useState<boolean>(false);
  const [canRegenerate, setCanRegenerate] = useState<boolean>(true);
  const [timeRemaining, setTimeRemaining] = useState<number>(0);
  const [apiError, setApiError] = useState<boolean>(false);
  const [isArabic, setIsArabic] = useState<boolean>(false);
  const { toast } = useToast();

  // Format the remaining time as seconds
  const formatTimeRemaining = (ms: number): string => {
    const seconds = Math.ceil(ms / 1000);
    return `${seconds}s`;
  };

  // Load or generate thought on component mount
  useEffect(() => {
    async function loadThought() {
      setIsLoading(true);
      
      const storedThought = getStoredThought();
      const isFromToday = isThoughtFromToday(storedThought);
      
      if (isFromToday && storedThought?.thought) {
        setThought(storedThought.thought);
        setIsArabic(storedThought.isArabic || false);
      } else {
        try {
          // Generate both English and Arabic thoughts
          const englishThought = await generatePhilosophicalThought();
          const arabicThought = await generateArabicPhilosophicalThought();
          
          if (englishThought && arabicThought) {
            // Save both thoughts
            const combinedThought = `${englishThought}\n\n${arabicThought}`;
            setThought(combinedThought);
            saveThought(combinedThought, false);
          } else {
            throw new Error("Empty response from API");
          }
        } catch (error) {
          console.error("Error loading thought:", error);
          const englishFallback = getFallbackThought();
          const arabicFallback = getArabicFallbackThought();
          const combinedFallback = `${englishFallback}\n\n${arabicFallback}`;
          
          setThought(combinedFallback);
          saveThought(combinedFallback, false);
          setApiError(true);
          
          toast({
            title: "API Error",
            description: "Using a fallback thought instead. Please check your API key.",
            variant: "destructive",
          });
        }
      }
      
      // Check if regeneration is allowed
      const canRegen = canRegenerateThought(storedThought);
      setCanRegenerate(canRegen);
      
      if (!canRegen) {
        const remainingTime = getTimeUntilNextRegeneration(storedThought);
        setTimeRemaining(remainingTime);
      }
      
      setIsLoading(false);
    }
    
    loadThought();
  }, []);

  // Check for language changes in localStorage
  useEffect(() => {
    const handleStorageChange = () => {
      const storedThought = getStoredThought();
      if (storedThought) {
        setIsArabic(storedThought.isArabic || false);
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  // Update the countdown timer
  useEffect(() => {
    if (timeRemaining <= 0 || canRegenerate) return;
    
    const interval = setInterval(() => {
      setTimeRemaining(prev => {
        const newTime = prev - 1000;
        if (newTime <= 0) {
          clearInterval(interval);
          setCanRegenerate(true);
          return 0;
        }
        return newTime;
      });
    }, 1000);
    
    return () => clearInterval(interval);
  }, [timeRemaining, canRegenerate]);

  // Handle regeneration of thought
  const handleRegenerate = async () => {
    if (!canRegenerate) {
      toast({
        title: "Regeneration limit reached",
        description: `Please wait ${formatTimeRemaining(timeRemaining)} before generating a new thought.`,
        variant: "destructive",
      });
      return;
    }
    
    setIsRegenerating(true);
    
    try {
      let englishThought, arabicThought;
      
      if (apiError) {
        // If we had an API error before, use fallback thoughts
        englishThought = getFallbackThought();
        arabicThought = getArabicFallbackThought();
      } else {
        try {
          // Generate both English and Arabic thoughts
          englishThought = await generatePhilosophicalThought();
          arabicThought = await generateArabicPhilosophicalThought();
          
          if (!englishThought || !arabicThought) {
            throw new Error("Empty response from API");
          }
        } catch (error) {
          console.error("Error regenerating thought:", error);
          englishThought = getFallbackThought();
          arabicThought = getArabicFallbackThought();
          setApiError(true);
          
          toast({
            title: "API Error",
            description: "Using fallback thoughts. Please check your API key.",
            variant: "destructive",
          });
        }
      }
      
      // Animate out the old thought
      setThought("");
      
      // Short delay for animation
      setTimeout(() => {
        const combinedThought = `${englishThought}\n\n${arabicThought}`;
        setThought(combinedThought);
        saveThought(combinedThought, false);
        setCanRegenerate(false);
        setTimeRemaining(10 * 1000); // 10 seconds in milliseconds
      }, 500);
      
    } catch (error) {
      console.error("Error in regeneration process:", error);
      toast({
        title: "Error",
        description: "Failed to generate a new thought. Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsRegenerating(false);
    }
  };

  // Handle sharing the thought
  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "Daily Philosophical Thought",
          text: thought,
          url: window.location.href,
        });
      } catch (error) {
        console.error("Error sharing:", error);
      }
    } else {
      // Fallback for browsers that don't support the Web Share API
      navigator.clipboard.writeText(thought);
      toast({
        title: "Copied to clipboard",
        description: "The thought has been copied to your clipboard.",
      });
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-4">
      <div className="w-full max-w-2xl">
        <AnimatePresence mode="wait">
          {isLoading ? (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex justify-center py-12"
            >
              <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
            </motion.div>
          ) : (
            <motion.div
              key="thought"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="mb-8 text-center"
            >
              <blockquote className="relative text-2xl md:text-3xl font-light italic text-primary p-8 bg-card rounded-lg shadow-sm font-cairo">
                {thought.split('\n\n').map((part, index) => (
                  <p key={index} className={`relative z-10 mb-6 ${index === 1 ? 'rtl' : 'ltr'}`}>
                    {part}
                  </p>
                ))}
              </blockquote>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="flex justify-center space-x-4 mt-6">
          <Button
            variant="outline"
            size="lg"
            onClick={handleRegenerate}
            disabled={isLoading || isRegenerating || !canRegenerate}
            className="flex items-center gap-2 font-cairo"
          >
            <RefreshCw className={`h-4 w-4 ${isRegenerating ? 'animate-spin' : ''}`} />
            {!canRegenerate 
              ? `Wait ${formatTimeRemaining(timeRemaining)}`
              : isRegenerating 
                ? "Generating..." 
                : "New Thought"
            }
          </Button>
          
          <Button
            variant="outline"
            size="lg"
            onClick={handleShare}
            disabled={isLoading || !thought}
            className="flex items-center gap-2 font-cairo"
          >
            <Share2 className="h-4 w-4" />
            Share
          </Button>
        </div>
      </div>
    </div>
  );
}