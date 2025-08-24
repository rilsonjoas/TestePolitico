import * as React from "react"
import { cn } from "@/lib/utils"

export interface ProgressProps extends React.HTMLAttributes<HTMLDivElement> {
  value: number
  max?: number
}

const Progress = React.forwardRef<HTMLDivElement, ProgressProps>(({ className, value, max = 100, ...props }, ref) => {
  const percent = Math.min(100, Math.max(0, (value / max) * 100))
  return (
    <div
      ref={ref}
      className={cn(
        "relative h-6 w-full overflow-hidden rounded-full bg-gray-200 dark:bg-gray-800",
        className
      )}
      {...props}
    >
      <div
        className="absolute left-0 top-0 h-full rounded-full bg-primary transition-all"
        style={{ width: `${percent}%` }}
      />
      <span
        className="absolute left-0 top-0 w-full h-full flex items-center justify-center font-bold text-gray-900 dark:text-gray-100 text-sm pointer-events-none"
        style={{ zIndex: 2 }}
      >
        {percent.toFixed(1)}%
      </span>
    </div>
  )
})
Progress.displayName = "Progress"

export { Progress }
