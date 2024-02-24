'use client'
import { useTheme } from "next-themes";
import { Button } from "./ui/button";
import { Moon, SunMedium } from "lucide-react";

const ThemeSwitch = () => {
    const { resolvedTheme, setTheme } = useTheme();

    const handleThemeChange = () => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark');

    return (
        <Button onClick={handleThemeChange} variant="ghost" size="sm">
            {resolvedTheme === 'dark' ? <SunMedium className="fill-orange-400 w-5 h-5" /> : <Moon className="fill-slate-200 w-5 h-5" />}
        </Button>
    );
}

export default ThemeSwitch;
