
import { Moon, Sun } from "lucide-react";
import { useTheme } from "./ThemeProvider";
import Button from "./Button";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      aria-label="Toggle theme"
      className="rounded-full w-9 h-9 p-0 relative"
    >
      <Sun
        size={18}
        className="absolute rotate-0 scale-100 transition-all dark:rotate-90 dark:scale-0"
      />
      <Moon
        size={18}
        className="absolute rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100"
      />
    </Button>
  );
}
