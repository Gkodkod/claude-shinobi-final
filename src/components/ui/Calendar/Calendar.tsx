'use client'

import { useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

interface DateRange {
  start: Date
  end: Date
}

interface CalendarProps {
  variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'danger'
  size?: 'sm' | 'md' | 'lg'
  className?: string
  selectedDate?: Date
  onDateSelect?: (date: Date) => void
  selectedRange?: DateRange
  onRangeSelect?: (range: DateRange) => void
  allowRangeSelection?: boolean
  highlightedDates?: Date[]
  minDate?: Date
  maxDate?: Date
  showWeekNumbers?: boolean
  firstDayOfWeek?: 0 | 1
}

function Calendar({
  variant = 'primary',
  size = 'md',
  className = '',
  selectedDate,
  onDateSelect,
  selectedRange,
  onRangeSelect,
  allowRangeSelection = false,
  highlightedDates = [],
  minDate,
  maxDate,
  showWeekNumbers = false,
  firstDayOfWeek = 0
}: CalendarProps) {
  const [currentMonth, setCurrentMonth] = useState(selectedDate || new Date())
  const [rangeStart, setRangeStart] = useState<Date | null>(null)
  const [hoverDate, setHoverDate] = useState<Date | null>(null)

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ]

  const dayNames = firstDayOfWeek === 0
    ? ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
    : ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']

  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate()
  }

  const getFirstDayOfMonth = (date: Date) => {
    const day = new Date(date.getFullYear(), date.getMonth(), 1).getDay()
    return firstDayOfWeek === 0 ? day : (day === 0 ? 6 : day - 1)
  }

  const isSameDay = (date1: Date, date2: Date) => {
    return date1.getDate() === date2.getDate() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getFullYear() === date2.getFullYear()
  }

  const isHighlighted = (date: Date) => {
    return highlightedDates.some(d => isSameDay(d, date))
  }

  const isDisabled = (date: Date) => {
    if (minDate && date < minDate) return true
    if (maxDate && date > maxDate) return true
    return false
  }

  const isInRange = (date: Date) => {
    if (!allowRangeSelection) return false

    // Check if date is in selected range
    if (selectedRange) {
      return date >= selectedRange.start && date <= selectedRange.end
    }

    // Check if date is in hover preview range
    if (rangeStart && hoverDate) {
      const start = rangeStart < hoverDate ? rangeStart : hoverDate
      const end = rangeStart < hoverDate ? hoverDate : rangeStart
      return date >= start && date <= end
    }

    return false
  }

  const isRangeStart = (date: Date) => {
    if (!allowRangeSelection) return false
    if (selectedRange) return isSameDay(date, selectedRange.start)
    if (rangeStart) return isSameDay(date, rangeStart)
    return false
  }

  const isRangeEnd = (date: Date) => {
    if (!allowRangeSelection) return false
    if (selectedRange) return isSameDay(date, selectedRange.end)
    if (rangeStart && hoverDate) {
      const end = rangeStart < hoverDate ? hoverDate : rangeStart
      return isSameDay(date, end)
    }
    return false
  }

  const handlePrevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1))
  }

  const handleNextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1))
  }

  const handleDateClick = (day: number) => {
    const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day)
    if (isDisabled(date)) return

    if (allowRangeSelection && onRangeSelect) {
      if (!rangeStart) {
        // First click - set range start
        setRangeStart(date)
        setHoverDate(null)
      } else {
        // Second click - complete range
        const start = rangeStart < date ? rangeStart : date
        const end = rangeStart < date ? date : rangeStart
        onRangeSelect({ start, end })
        setRangeStart(null)
        setHoverDate(null)
      }
    } else if (onDateSelect) {
      // Single date selection
      onDateSelect(date)
    }
  }

  const handleDateHover = (day: number) => {
    if (allowRangeSelection && rangeStart) {
      const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day)
      if (!isDisabled(date)) {
        setHoverDate(date)
      }
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent, day: number) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      handleDateClick(day)
    }
  }

  const daysInMonth = getDaysInMonth(currentMonth)
  const firstDay = getFirstDayOfMonth(currentMonth)
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1)
  const blanks = Array.from({ length: firstDay }, (_, i) => i)

  const baseClasses = 'rounded-xl border-2 bg-surface shadow-md transition-all duration-200'

  const variantClasses = {
    primary: 'border-primary/20',
    secondary: 'border-secondary/20',
    success: 'border-success/20',
    warning: 'border-warning/20',
    danger: 'border-danger/20'
  }

  const sizeClasses = {
    sm: 'p-3 text-xs',
    md: 'p-6 text-sm',
    lg: 'p-8 text-base'
  }

  const dayButtonSizes = {
    sm: 'w-7 h-7 text-xs',
    md: 'w-10 h-10 text-sm',
    lg: 'w-12 h-12 text-base'
  }

  const headerSizes = {
    sm: 'text-sm',
    md: 'text-lg',
    lg: 'text-xl'
  }

  const calendarClass = [
    baseClasses,
    variantClasses[variant],
    sizeClasses[size],
    className
  ].filter(Boolean).join(' ')

  const getDayButtonClass = (day: number) => {
    const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day)
    const isSelected = selectedDate && isSameDay(date, selectedDate)
    const isHighlightedDay = isHighlighted(date)
    const isDisabledDay = isDisabled(date)
    const inRange = isInRange(date)
    const isStart = isRangeStart(date)
    const isEnd = isRangeEnd(date)

    const baseClass = `${dayButtonSizes[size]} rounded-lg font-medium transition-all duration-200 focus:outline-none focus:ring-2`

    if (isDisabledDay) {
      return `${baseClass} text-muted/40 cursor-not-allowed`
    }

    // Range selection styling
    if (allowRangeSelection && (isStart || isEnd)) {
      const selectedVariant = {
        primary: 'bg-primary text-white focus:ring-primary/40',
        secondary: 'bg-secondary text-white dark:text-black focus:ring-secondary/40',
        success: 'bg-success text-white focus:ring-success/40',
        warning: 'bg-warning text-white focus:ring-warning/40',
        danger: 'bg-danger text-white focus:ring-danger/40'
      }
      return `${baseClass} ${selectedVariant[variant]} shadow-md z-10`
    }

    if (allowRangeSelection && inRange && !isStart && !isEnd) {
      const rangeVariant = {
        primary: 'bg-primary/20 text-primary hover:bg-primary/30 focus:ring-primary/40',
        secondary: 'bg-secondary/20 text-secondary hover:bg-secondary/30 focus:ring-secondary/40',
        success: 'bg-success/20 text-success hover:bg-success/30 focus:ring-success/40',
        warning: 'bg-warning/20 text-warning hover:bg-warning/30 focus:ring-warning/40',
        danger: 'bg-danger/20 text-danger hover:bg-danger/30 focus:ring-danger/40'
      }
      return `${baseClass} ${rangeVariant[variant]} rounded-none`
    }

    // Single date selection styling
    if (isSelected && !allowRangeSelection) {
      const selectedVariant = {
        primary: 'bg-primary text-white focus:ring-primary/40',
        secondary: 'bg-secondary text-white dark:text-black focus:ring-secondary/40',
        success: 'bg-success text-white focus:ring-success/40',
        warning: 'bg-warning text-white focus:ring-warning/40',
        danger: 'bg-danger text-white focus:ring-danger/40'
      }
      return `${baseClass} ${selectedVariant[variant]} shadow-md`
    }

    if (isHighlightedDay) {
      const highlightVariant = {
        primary: 'bg-primary/10 text-primary hover:bg-primary/20 focus:ring-primary/40',
        secondary: 'bg-secondary/10 text-secondary hover:bg-secondary/20 focus:ring-secondary/40',
        success: 'bg-success/10 text-success hover:bg-success/20 focus:ring-success/40',
        warning: 'bg-warning/10 text-warning hover:bg-warning/20 focus:ring-warning/40',
        danger: 'bg-danger/10 text-danger hover:bg-danger/20 focus:ring-danger/40'
      }
      return `${baseClass} ${highlightVariant[variant]} font-semibold`
    }

    return `${baseClass} text-foreground hover:bg-${variant}/5 hover:text-${variant} focus:ring-${variant}/40 cursor-pointer`
  }

  return (
    <div className={calendarClass} role="application" aria-label="Calendar">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={handlePrevMonth}
          className={`p-2 rounded-lg hover:bg-${variant}/10 transition-colors focus:outline-none focus:ring-2 focus:ring-${variant}/40`}
          aria-label="Previous month"
        >
          <ChevronLeft className={size === 'sm' ? 'w-4 h-4' : size === 'md' ? 'w-5 h-5' : 'w-6 h-6'} />
        </button>

        <h2 className={`${headerSizes[size]} font-bold text-foreground font-heading`}>
          {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
        </h2>

        <button
          onClick={handleNextMonth}
          className={`p-2 rounded-lg hover:bg-${variant}/10 transition-colors focus:outline-none focus:ring-2 focus:ring-${variant}/40`}
          aria-label="Next month"
        >
          <ChevronRight className={size === 'sm' ? 'w-4 h-4' : size === 'md' ? 'w-5 h-5' : 'w-6 h-6'} />
        </button>
      </div>

      {/* Day headers */}
      <div className={`grid grid-cols-7 gap-1 mb-2`}>
        {dayNames.map(day => (
          <div
            key={day}
            className={`${dayButtonSizes[size]} flex items-center justify-center font-semibold text-muted`}
          >
            {day}
          </div>
        ))}
      </div>

      {/* Calendar grid */}
      <div className="grid grid-cols-7 gap-1" role="grid">
        {blanks.map(blank => (
          <div key={`blank-${blank}`} className={dayButtonSizes[size]} />
        ))}
        {days.map(day => {
          const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day)
          const isDisabledDay = isDisabled(date)

          return (
            <button
              key={day}
              onClick={() => handleDateClick(day)}
              onMouseEnter={() => handleDateHover(day)}
              onKeyDown={(e) => handleKeyDown(e, day)}
              disabled={isDisabledDay}
              className={getDayButtonClass(day)}
              aria-label={`${monthNames[currentMonth.getMonth()]} ${day}, ${currentMonth.getFullYear()}`}
              aria-selected={selectedDate && isSameDay(date, selectedDate)}
              role="gridcell"
              tabIndex={isDisabledDay ? -1 : 0}
            >
              {day}
            </button>
          )
        })}
      </div>
    </div>
  )
}

export default Calendar
