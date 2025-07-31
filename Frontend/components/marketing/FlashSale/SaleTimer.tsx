"use client"

import { useState, useEffect } from "react"

interface TimeLeft {
  hours: number
  minutes: number
  seconds: number
}

interface SaleTimerProps {
  className?: string
}

export default function SaleTimer({ className = "" }: SaleTimerProps) {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    hours: 23,
    minutes: 59,
    seconds: 45,
  })

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 }
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 }
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 }
        }
        return prev
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  return (
    <div className={`flex items-center space-x-4 ${className}`}>
      <span className="text-sm font-medium text-gray-600">Ends in:</span>
      <div className="flex space-x-2">
        <div className="bg-red-500 text-white px-3 py-2 rounded-lg text-center min-w-[50px]">
          <div className="text-lg font-bold">{timeLeft.hours.toString().padStart(2, "0")}</div>
          <div className="text-xs">Hours</div>
        </div>
        <div className="bg-red-500 text-white px-3 py-2 rounded-lg text-center min-w-[50px]">
          <div className="text-lg font-bold">{timeLeft.minutes.toString().padStart(2, "0")}</div>
          <div className="text-xs">Min</div>
        </div>
        <div className="bg-red-500 text-white px-3 py-2 rounded-lg text-center min-w-[50px]">
          <div className="text-lg font-bold">{timeLeft.seconds.toString().padStart(2, "0")}</div>
          <div className="text-xs">Sec</div>
        </div>
      </div>
    </div>
  )
} 