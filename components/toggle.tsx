"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";

export function ModeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const toggleTheme = () => {
    // optional: if theme is undefined, default to "light"
    const next = theme === "light" ? "dark" : "light";
    setTheme(next);
  };

  // During SSR + first client render: render a stable, neutral UI
  if (!mounted) {
    return (
      <Button
        variant="outline"
        size="icon"
        className="bg-transparent z-50"
        aria-label="Toggle theme"
      >
        {/* neutral icon that won't change */}
        <Sun className="h-[1.2rem] w-[1.2rem]" />
        <span className="sr-only">Toggle theme</span>
      </Button>
    );
  }

  // After mount: safe to branch on `theme`
  return (
    <Button
      variant="outline"
      size="icon"
      onClick={toggleTheme}
      className="bg-transparent z-50"
      aria-label="Toggle theme"
    >
      {theme === "light" ? (
        <Sun className="h-[1.2rem] w-[1.2rem]" />
      ) : (
        <Moon className="h-[1.2rem] w-[1.2rem]" />
      )}
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
