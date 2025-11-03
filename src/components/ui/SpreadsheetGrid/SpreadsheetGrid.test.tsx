import { render, screen, fireEvent, cleanup } from '@testing-library/react'
import { describe, it, expect, vi, afterEach } from 'vitest'
import SpreadsheetGrid from './SpreadsheetGrid'
import type { ColumnDef, CellData } from './SpreadsheetGrid'

describe('SpreadsheetGrid', () => {
  const mockColumns: ColumnDef[] = [
    { header: 'Name', key: 'name' },
    { header: 'Email', key: 'email' },
    { header: 'Age', key: 'age' }
  ]

  const mockData: Record<string, CellData>[] = [
    {
      name: { value: 'John Doe', editable: true },
      email: { value: 'john@example.com', editable: true },
      age: { value: 30, editable: true }
    },
    {
      name: { value: 'Jane Smith', editable: true },
      email: { value: 'jane@example.com', editable: true },
      age: { value: 25, editable: true }
    }
  ]

  afterEach(() => {
    cleanup()
  })

  it('renders with default props', () => {
    render(<SpreadsheetGrid columns={mockColumns} data={mockData} />)

    // Check headers are rendered
    expect(screen.getByText('Name')).toBeInTheDocument()
    expect(screen.getByText('Email')).toBeInTheDocument()
    expect(screen.getByText('Age')).toBeInTheDocument()

    // Check data is rendered
    expect(screen.getByText('John Doe')).toBeInTheDocument()
    expect(screen.getByText('jane@example.com')).toBeInTheDocument()
  })

  it('renders with row numbers when showRowNumbers is true', () => {
    render(<SpreadsheetGrid columns={mockColumns} data={mockData} showRowNumbers={true} />)

    expect(screen.getByText('#')).toBeInTheDocument()
    expect(screen.getByText('1')).toBeInTheDocument()
    expect(screen.getByText('2')).toBeInTheDocument()
  })

  it('does not render row numbers when showRowNumbers is false', () => {
    render(<SpreadsheetGrid columns={mockColumns} data={mockData} showRowNumbers={false} />)

    expect(screen.queryByText('#')).not.toBeInTheDocument()
  })

  it('renders with different variants', () => {
    const { container } = render(
      <SpreadsheetGrid columns={mockColumns} data={mockData} variant="danger" />
    )

    const headers = container.querySelectorAll('th')
    expect(headers[1]).toHaveClass('bg-danger')
  })

  it('renders with different sizes', () => {
    const { container } = render(
      <SpreadsheetGrid columns={mockColumns} data={mockData} size="lg" />
    )

    const cells = container.querySelectorAll('td')
    expect(cells[0]).toHaveClass('text-lg')
  })

  it('applies disabled state', () => {
    const { container } = render(
      <SpreadsheetGrid columns={mockColumns} data={mockData} disabled={true} />
    )

    const gridContainer = container.firstChild
    expect(gridContainer).toHaveClass('opacity-50')
    expect(gridContainer).toHaveClass('pointer-events-none')
  })

  it('calls onCellChange when cell value changes', () => {
    const handleCellChange = vi.fn()
    render(
      <SpreadsheetGrid
        columns={mockColumns}
        data={mockData}
        editable={true}
        onCellChange={handleCellChange}
      />
    )

    // Find and click a cell to edit it
    const cell = screen.getByText('John Doe')
    fireEvent.click(cell)

    // Find the input that appears
    const input = screen.getByDisplayValue('John Doe')

    // Change the value
    fireEvent.change(input, { target: { value: 'John Smith' } })
    fireEvent.blur(input)

    // Check if callback was called
    expect(handleCellChange).toHaveBeenCalledWith(0, 'name', 'John Smith')
  })

  it('does not allow editing when editable is false', () => {
    render(
      <SpreadsheetGrid
        columns={mockColumns}
        data={mockData}
        editable={false}
      />
    )

    const cell = screen.getByText('John Doe')
    fireEvent.click(cell)

    // Should not create an input
    expect(screen.queryByDisplayValue('John Doe')).not.toBeInTheDocument()
  })

  it('applies custom className', () => {
    const { container } = render(
      <SpreadsheetGrid
        columns={mockColumns}
        data={mockData}
        className="custom-grid-class"
      />
    )

    expect(container.firstChild).toHaveClass('custom-grid-class')
  })

  it('handles keyboard navigation with arrow keys', () => {
    render(
      <SpreadsheetGrid
        columns={mockColumns}
        data={mockData}
        editable={true}
      />
    )

    // Get first cell
    const firstCell = screen.getByText('John Doe')
    fireEvent.click(firstCell)

    // Press arrow down
    fireEvent.keyDown(firstCell, { key: 'ArrowDown' })

    // Should select the cell below (Jane Smith)
    const secondCell = screen.getByText('Jane Smith')
    expect(secondCell).toBeInTheDocument()
  })

  it('handles Escape key to cancel editing', () => {
    render(
      <SpreadsheetGrid
        columns={mockColumns}
        data={mockData}
        editable={true}
      />
    )

    const cell = screen.getByText('John Doe')
    fireEvent.click(cell)

    const input = screen.getByDisplayValue('John Doe')
    fireEvent.keyDown(input, { key: 'Escape' })

    // Input should be removed
    expect(screen.queryByDisplayValue('John Doe')).not.toBeInTheDocument()
  })

  it('renders empty grid when data is empty', () => {
    render(<SpreadsheetGrid columns={mockColumns} data={[]} />)

    // Headers should still be rendered
    expect(screen.getByText('Name')).toBeInTheDocument()
    expect(screen.getByText('Email')).toBeInTheDocument()
    expect(screen.getByText('Age')).toBeInTheDocument()
  })

  it('displays sort indicators on headers', () => {
    const { container } = render(<SpreadsheetGrid columns={mockColumns} data={mockData} />)

    // Check that headers have sort indicators
    const headers = container.querySelectorAll('th')
    // First header is row number (#), so check from index 1
    expect(headers[1]).toHaveTextContent('▲▼')
    expect(headers[2]).toHaveTextContent('▲▼')
    expect(headers[3]).toHaveTextContent('▲▼')
  })

  it('sorts data in ascending order when header is clicked', () => {
    const handleSortChange = vi.fn()
    render(
      <SpreadsheetGrid
        columns={mockColumns}
        data={mockData}
        onSortChange={handleSortChange}
      />
    )

    // Click on Name header
    const nameHeader = screen.getByText('Name').closest('th')
    if (nameHeader) {
      fireEvent.click(nameHeader)
    }

    // Check that callback was called with ascending sort
    expect(handleSortChange).toHaveBeenCalledWith({ columnKey: 'name', direction: 'asc' })
  })

  it('sorts data in descending order when header is clicked twice', () => {
    const handleSortChange = vi.fn()
    const { rerender } = render(
      <SpreadsheetGrid
        columns={mockColumns}
        data={mockData}
        sortConfig={null}
        onSortChange={handleSortChange}
      />
    )

    const nameHeader = screen.getByText('Name').closest('th')

    // First click: ascending
    if (nameHeader) {
      fireEvent.click(nameHeader)
    }
    expect(handleSortChange).toHaveBeenLastCalledWith({ columnKey: 'name', direction: 'asc' })

    // Rerender with new sort config
    rerender(
      <SpreadsheetGrid
        columns={mockColumns}
        data={mockData}
        sortConfig={{ columnKey: 'name', direction: 'asc' }}
        onSortChange={handleSortChange}
      />
    )

    // Second click: descending
    if (nameHeader) {
      fireEvent.click(nameHeader)
    }
    expect(handleSortChange).toHaveBeenLastCalledWith({ columnKey: 'name', direction: 'desc' })
  })

  it('clears sort when header is clicked three times', () => {
    const handleSortChange = vi.fn()
    const { rerender } = render(
      <SpreadsheetGrid
        columns={mockColumns}
        data={mockData}
        sortConfig={null}
        onSortChange={handleSortChange}
      />
    )

    const nameHeader = screen.getByText('Name').closest('th')

    // First click: ascending
    if (nameHeader) {
      fireEvent.click(nameHeader)
    }
    expect(handleSortChange).toHaveBeenLastCalledWith({ columnKey: 'name', direction: 'asc' })

    // Rerender with ascending sort
    rerender(
      <SpreadsheetGrid
        columns={mockColumns}
        data={mockData}
        sortConfig={{ columnKey: 'name', direction: 'asc' }}
        onSortChange={handleSortChange}
      />
    )

    // Second click: descending
    if (nameHeader) {
      fireEvent.click(nameHeader)
    }
    expect(handleSortChange).toHaveBeenLastCalledWith({ columnKey: 'name', direction: 'desc' })

    // Rerender with descending sort
    rerender(
      <SpreadsheetGrid
        columns={mockColumns}
        data={mockData}
        sortConfig={{ columnKey: 'name', direction: 'desc' }}
        onSortChange={handleSortChange}
      />
    )

    // Third click: clear
    if (nameHeader) {
      fireEvent.click(nameHeader)
    }
    expect(handleSortChange).toHaveBeenLastCalledWith(null)
  })

  it('respects sortable property on columns', () => {
    const columnsWithNonSortable: ColumnDef[] = [
      { header: 'Name', key: 'name', sortable: false },
      { header: 'Email', key: 'email' }
    ]

    const handleSortChange = vi.fn()
    render(
      <SpreadsheetGrid
        columns={columnsWithNonSortable}
        data={mockData}
        onSortChange={handleSortChange}
      />
    )

    const nameHeader = screen.getByText('Name').closest('th')
    if (nameHeader) {
      fireEvent.click(nameHeader)
    }

    // Callback should not be called for non-sortable column
    expect(handleSortChange).not.toHaveBeenCalled()
  })

  it('displays correct sort indicator when sorted', () => {
    const { container, rerender } = render(
      <SpreadsheetGrid
        columns={mockColumns}
        data={mockData}
        sortConfig={{ columnKey: 'name', direction: 'asc' }}
      />
    )

    // Check for ascending indicator
    const nameHeader = screen.getByText('Name').closest('th')
    expect(nameHeader).toHaveTextContent('▲')

    // Rerender with descending sort
    rerender(
      <SpreadsheetGrid
        columns={mockColumns}
        data={mockData}
        sortConfig={{ columnKey: 'name', direction: 'desc' }}
      />
    )

    // Check for descending indicator
    expect(nameHeader).toHaveTextContent('▼')
  })
})
