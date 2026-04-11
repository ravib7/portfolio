import { useTheme } from 'next-themes'
import { Button } from '../ui/button'
import { Moon, Sun } from 'lucide-react'

const ThemeToggle = () => {

    const { theme, setTheme } = useTheme()

    return <>
        <Button
            variant="outline"
            size="icon"
            className='cursor-pointer'
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        >
            {
                theme === "dark"
                    ? <Sun />
                    : <Moon />
            }
        </Button>
    </>
}

export default ThemeToggle