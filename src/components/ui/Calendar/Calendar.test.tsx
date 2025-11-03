import { render, screen, fireEvent, cleanup } from '@testing-library/react'
import { describe, it, expect, vi, afterEach } from 'vitest'
import Calendar from './Calendar'

describe('Calendar', () => {
  afterEach(() => {
    cleanup()
  })

  it('renders with default props', () => {
    render(<Calendar />)
    const calendar = screen.getByRole('application', { name: /calendar/i })
    expect(calendar).toBeInTheDocument()
  })

  it('displays current month and year', () => {
    const testDate = new Date(2024, 0, 15) // January 15, 2024
    render(<Calendar selectedDate={testDate} />)
    expect(screen.getByText('January 2024')).toBeInTheDocument()
  })

  it('renders all day names', () => {
    render(<Calendar />)
    expect(screen.getByText('Sun')).toBeInTheDocument()
    expect(screen.getByText('Mon')).toBeInTheDocument()
    expect(screen.getByText('Tue')).toBeInTheDocument()
    expect(screen.getByText('Wed')).toBeInTheDocument()
    expect(screen.getByText('Thu')).toBeInTheDocument()
    expect(screen.getByText('Fri')).toBeInTheDocument()
    expect(screen.getByText('Sat')).toBeInTheDocument()
  })

  it('renders with different variants', () => {
    const { container } = render(<Calendar variant="success" />)
    expect(container.firstChild).toHaveClass('border-success/20')
  })

  it('renders with different sizes', () => {
    const { container } = render(<Calendar size="lg" />)
    expect(container.firstChild).toHaveClass('p-8')
  })

  it('calls onDateSelect when a date is clicked', () => {
    const handleDateSelect = vi.fn()
    const testDate = new Date(2024, 0, 15)
    render(<Calendar selectedDate={testDate} onDateSelect={handleDateSelect} />)

    const dayButton = screen.getByRole('gridcell', { name: /january 20, 2024/i })
    fireEvent.click(dayButton)

    expect(handleDateSelect).toHaveBeenCalledTimes(1)
    expect(handleDateSelect).toHaveBeenCalledWith(new Date(2024, 0, 20))
  })

  it('navigates to previous month', () => {
    const testDate = new Date(2024, 0, 15) // January 2024
    render(<Calendar selectedDate={testDate} />)

    expect(screen.getByText('January 2024')).toBeInTheDocument()

    const prevButton = screen.getByRole('button', { name: /previous month/i })
    fireEvent.click(prevButton)

    expect(screen.getByText('December 2023')).toBeInTheDocument()
  })

  it('navigates to next month', () => {
    const testDate = new Date(2024, 0, 15) // January 2024
    render(<Calendar selectedDate={testDate} />)

    expect(screen.getByText('January 2024')).toBeInTheDocument()

    const nextButton = screen.getByRole('button', { name: /next month/i })
    fireEvent.click(nextButton)

    expect(screen.getByText('February 2024')).toBeInTheDocument()
  })

  it('highlights selected date', () => {
    const testDate = new Date(2024, 0, 15)
    render(<Calendar selectedDate={testDate} />)

    const selectedDay = screen.getByRole('gridcell', { name: /january 15, 2024/i })
    expect(selectedDay).toHaveClass('bg-primary')
  })

  it('highlights provided dates', () => {
    const testDate = new Date(2024, 0, 15)
    const highlightedDates = [
      new Date(2024, 0, 10),
      new Date(2024, 0, 20)
    ]
    render(<Calendar selectedDate={testDate} highlightedDates={highlightedDates} />)

    const highlightedDay = screen.getByRole('gridcell', { name: /january 10, 2024/i })
    expect(highlightedDay).toHaveClass('bg-primary/10')
  })

  it('disables dates before minDate', () => {
    const testDate = new Date(2024, 0, 15)
    const minDate = new Date(2024, 0, 10)
    render(<Calendar selectedDate={testDate} minDate={minDate} />)

    const disabledDay = screen.getByRole('gridcell', { name: /january 5, 2024/i })
    expect(disabledDay).toBeDisabled()
  })

  it('disables dates after maxDate', () => {
    const testDate = new Date(2024, 0, 15)
    const maxDate = new Date(2024, 0, 20)
    render(<Calendar selectedDate={testDate} maxDate={maxDate} />)

    const disabledDay = screen.getByRole('gridcell', { name: /january 25, 2024/i })
    expect(disabledDay).toBeDisabled()
  })

  it('does not call onDateSelect for disabled dates', () => {
    const handleDateSelect = vi.fn()
    const testDate = new Date(2024, 0, 15)
    const minDate = new Date(2024, 0, 10)
    render(<Calendar selectedDate={testDate} minDate={minDate} onDateSelect={handleDateSelect} />)

    const disabledDay = screen.getByRole('gridcell', { name: /january 5, 2024/i })
    fireEvent.click(disabledDay)

    expect(handleDateSelect).not.toHaveBeenCalled()
  })

  it('applies custom className', () => {
    const { container } = render(<Calendar className="custom-calendar" />)
    expect(container.firstChild).toHaveClass('custom-calendar')
  })

  it('supports keyboard navigation with Enter key', () => {
    const handleDateSelect = vi.fn()
    const testDate = new Date(2024, 0, 15)
    render(<Calendar selectedDate={testDate} onDateSelect={handleDateSelect} />)

    const dayButton = screen.getByRole('gridcell', { name: /january 20, 2024/i })
    fireEvent.keyDown(dayButton, { key: 'Enter' })

    expect(handleDateSelect).toHaveBeenCalledWith(new Date(2024, 0, 20))
  })

  it('supports keyboard navigation with Space key', () => {
    const handleDateSelect = vi.fn()
    const testDate = new Date(2024, 0, 15)
    render(<Calendar selectedDate={testDate} onDateSelect={handleDateSelect} />)

    const dayButton = screen.getByRole('gridcell', { name: /january 20, 2024/i })
    fireEvent.keyDown(dayButton, { key: ' ' })

    expect(handleDateSelect).toHaveBeenCalledWith(new Date(2024, 0, 20))
  })

  it('starts week on Monday when firstDayOfWeek is 1', () => {
    render(<Calendar firstDayOfWeek={1} />)
    const dayHeaders = screen.getAllByText(/mon|tue|wed|thu|fri|sat|sun/i)
    expect(dayHeaders[0]).toHaveTextContent('Mon')
  })

  describe('Range Selection', () => {
    it('allows range selection when allowRangeSelection is true', () => {
      const handleRangeSelect = vi.fn()
      const testDate = new Date(2024, 0, 15)
      render(<Calendar selectedDate={testDate} allowRangeSelection={true} onRangeSelect={handleRangeSelect} />)

      const startDay = screen.getByRole('gridcell', { name: /january 10, 2024/i })
      const endDay = screen.getByRole('gridcell', { name: /january 20, 2024/i })

      fireEvent.click(startDay)
      fireEvent.click(endDay)

      expect(handleRangeSelect).toHaveBeenCalledTimes(1)
      expect(handleRangeSelect).toHaveBeenCalledWith({
        start: new Date(2024, 0, 10),
        end: new Date(2024, 0, 20)
      })
    })

    it('displays selected range with proper styling', () => {
      const selectedRange = {
        start: new Date(2024, 0, 10),
        end: new Date(2024, 0, 15)
      }
      render(<Calendar selectedDate={new Date(2024, 0, 15)} allowRangeSelection={true} selectedRange={selectedRange} />)

      const startDay = screen.getByRole('gridcell', { name: /january 10, 2024/i })
      const endDay = screen.getByRole('gridcell', { name: /january 15, 2024/i })

      expect(startDay).toHaveClass('bg-primary')
      expect(endDay).toHaveClass('bg-primary')
    })

    it('handles reverse range selection (end before start)', () => {
      const handleRangeSelect = vi.fn()
      const testDate = new Date(2024, 0, 15)
      render(<Calendar selectedDate={testDate} allowRangeSelection={true} onRangeSelect={handleRangeSelect} />)

      const startDay = screen.getByRole('gridcell', { name: /january 20, 2024/i })
      const endDay = screen.getByRole('gridcell', { name: /january 10, 2024/i })

      fireEvent.click(startDay)
      fireEvent.click(endDay)

      expect(handleRangeSelect).toHaveBeenCalledWith({
        start: new Date(2024, 0, 10),
        end: new Date(2024, 0, 20)
      })
    })

    it('does not trigger range selection when allowRangeSelection is false', () => {
      const handleRangeSelect = vi.fn()
      const handleDateSelect = vi.fn()
      const testDate = new Date(2024, 0, 15)
      render(<Calendar selectedDate={testDate} allowRangeSelection={false} onRangeSelect={handleRangeSelect} onDateSelect={handleDateSelect} />)

      const day = screen.getByRole('gridcell', { name: /january 20, 2024/i })
      fireEvent.click(day)

      expect(handleRangeSelect).not.toHaveBeenCalled()
      expect(handleDateSelect).toHaveBeenCalledTimes(1)
    })
  })
})
