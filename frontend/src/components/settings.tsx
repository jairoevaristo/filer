import {
    LifeBuoy,
    LogOut,
    Moon,
    Palette,
    Sun,
    Laptop,
    Check,
    LucideSettings,
} from "lucide-react"
import { useState } from "react"
  
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useMenuSettings } from "@/hooks/use-menu-settings"
import { useTheme } from "@/hooks/use-theme"

import { AboutMe } from "./about-me"
  
  export function Settings() {
    const { logOut, handleTheme } = useMenuSettings()
    const { theme } = useTheme()

    const [showAboutMenu, setShowAboutMenu] = useState(false)

    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className="outline-none">
            <LucideSettings className="h-4 w-4 hover:rotate-45 transition duration-200 ease-in-out transform" />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-40 mr-10">
            <DropdownMenuSub>
            <DropdownMenuSubTrigger>
              <Palette className="mr-2 h-4 w-4" />
              <span>Tema</span>
            </DropdownMenuSubTrigger>
            <DropdownMenuPortal>
              <DropdownMenuSubContent>
                <DropdownMenuItem  onClick={() => handleTheme('system')}>
                    <Laptop className="mr-2 h-4 w-4" />
                    <span>Sistema</span>
                    {theme === 'system' && <Check className="h-4 w-4 flex-1" />}
                </DropdownMenuItem>
                <DropdownMenuItem  onClick={() => handleTheme('light')}>
                  <Sun className="mr-2 h-4 w-4" />
                  <span>Claro</span>
                  {theme === 'light' && <Check className="h-4 w-4 flex-1" />}
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleTheme('dark')}>
                  <Moon className="mr-2 h-4 w-4" />
                  <span>Escuro</span>
                  {theme === 'dark' && <Check className="h-4 w-4 flex-1" />}
                </DropdownMenuItem>
              </DropdownMenuSubContent>
              </DropdownMenuPortal>
          </DropdownMenuSub> 
            
          <DropdownMenuItem onClick={() => setShowAboutMenu(true)}>
            <LifeBuoy className="mr-2 h-4 w-4" />
            <span>Suporte</span>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={logOut}>
            <LogOut className="mr-2 h-4 w-4" />
            <span>Logout</span>
          </DropdownMenuItem>
        </DropdownMenuContent>

        <AboutMe handleClose={() => setShowAboutMenu(prev => !prev)} open={showAboutMenu} />
      </DropdownMenu>
    )
  }
  