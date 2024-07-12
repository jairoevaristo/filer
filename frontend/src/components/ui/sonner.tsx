"use client"

import { CircleCheckBig, CircleX } from "lucide-react"
import { useTheme } from "next-themes"
import { Toaster as Sonner } from "sonner"

type ToasterProps = React.ComponentProps<typeof Sonner>

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme()

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      icons={{
        success: <CircleCheckBig className="text-green-600 h-4 w-4" />,
        error: <CircleX className="text-rose-600 h-4 w-4" />
      }}
      className="toaster group"
      toastOptions={{
        classNames: {
          title: "group-[.toast]:text-white text-[15px]",
          toast:
            "group toast group-[.toaster]:bg-zinc-800 group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",
          description: "group-[.toast]:text-gray-400 text-md",
          actionButton:
            "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
          cancelButton:
            "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground",
        },
      }}
      {...props}
    />
  )
}

export { Toaster }
