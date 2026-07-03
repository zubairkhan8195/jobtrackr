"use client"

import * as React from "react"
import { ViewIcon, ViewOffIcon } from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"
import { Input as InputPrimitive } from "@base-ui/react/input"

import { cn } from "@/lib/utils"

type InputProps = React.ComponentProps<"input"> & {
  password?: boolean
}

function Input({ className, type, password = false, ...props }: InputProps) {
  const [visible, setVisible] = React.useState(false)
  const inputType = password ? (visible ? "text" : "password") : type

  const input = (
    <InputPrimitive
      type={inputType}
      data-slot="input"
      className={cn(
        "h-7 w-full min-w-0 rounded-md border border-input bg-input/20 px-2 py-0.5 text-sm transition-colors outline-none file:inline-flex file:h-6 file:border-0 file:bg-transparent file:text-xs/relaxed file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/30 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-2 aria-invalid:ring-destructive/20 md:text-xs/relaxed dark:bg-input/30 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40",
        password && "pr-10",
        className
      )}
      {...props}
    />
  )

  if (!password) {
    return input
  }

  return (
    <div className="relative">
      {input}
      <button
        type="button"
        onClick={() => setVisible((current) => !current)}
        className="absolute top-1/2 right-3 -translate-y-1/2 text-muted-foreground transition-colors hover:text-foreground"
        aria-label={visible ? "Hide password" : "Show password"}
      >
        <HugeiconsIcon
          icon={visible ? ViewOffIcon : ViewIcon}
          className="size-4"
          strokeWidth={1.75}
        />
      </button>
    </div>
  )
}

export { Input }
