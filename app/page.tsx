import ThoughtDisplay from "@/components/thought-display";
import { ModeToggle } from "@/components/mode-toggle";
import { Scroll, Moon, Sparkles } from "lucide-react";

export default function Home() {
  return (
    <main className="min-h-screen bg-background flex flex-col items-center justify-between p-4 md:p-8 font-cairo">
      <header className="w-full max-w-5xl flex justify-between items-center py-6">
        <div className="flex items-center gap-2">
          <Scroll className="h-8 w-8 text-primary" />
          <div className="flex flex-col">
            <h1 className="text-2xl font-semibold text-primary">Hikma</h1>
            <p className="text-lg text-primary font-cairo">حكمة</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <ModeToggle />
        </div>
      </header>
      
      <ThoughtDisplay />
      
      <footer className="w-full max-w-5xl py-6 text-center">
        <div className="flex flex-col items-center gap-4">
          <div className="flex items-center gap-2">
            <Moon className="h-4 w-4 text-muted-foreground" />
            <Sparkles className="h-4 w-4 text-muted-foreground" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">© {new Date().getFullYear()} Hikma - حكمة</p>
          </div>
        </div>
      </footer>
    </main>
  );
}