"use client";

import * as React from "react";
import { Globe } from "lucide-react";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useToast } from "@/hooks/use-toast";

export function LanguageToggle() {
  const [isArabic, setIsArabic] = useState<boolean>(false);
  const { toast } = useToast();

  // Load language preference from localStorage on component mount
  useEffect(() => {
    const storedThought = localStorage.getItem('dailyThought');
    if (storedThought) {
      try {
        const thoughtData = JSON.parse(storedThought);
        setIsArabic(thoughtData.isArabic || false);
      } catch (error) {
        console.error('Error parsing stored thought:', error);
      }
    }
  }, []);

  const handleLanguageChange = (newIsArabic: boolean) => {
    // Update the language state
    setIsArabic(newIsArabic);
    
    // Update the language preference in localStorage
    const storedThought = localStorage.getItem('dailyThought');
    if (storedThought) {
      try {
        const thoughtData = JSON.parse(storedThought);
        thoughtData.isArabic = newIsArabic;
        localStorage.setItem('dailyThought', JSON.stringify(thoughtData));
        
        // Reload the page to apply the language change
        window.location.reload();
      } catch (error) {
        console.error('Error updating language preference:', error);
        toast({
          title: "Error",
          description: "Failed to update language preference. Please try again.",
          variant: "destructive",
        });
      }
    } else {
      toast({
        title: "No thought data",
        description: "Please generate a thought first before changing the language.",
        variant: "destructive",
      });
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          <Globe className="h-[1.2rem] w-[1.2rem]" />
          <span className="sr-only">Toggle language</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="font-cairo">
        <DropdownMenuItem onClick={() => handleLanguageChange(false)}>
          English
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleLanguageChange(true)}>
          العربية
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}