import React, { useState, useCallback } from 'react'

/**
 * Cell data structure for the spreadsheet grid
 */
export interface CellData {
  /** The value to display in the cell */
  value: string | number
  /** Whether the cell is editable */
  editable?: boolean
}

/**
 * Column definition for the spreadsheet grid
 */
export interface ColumnDef {
  /** Column header label */
  header: string
  /** Unique key for the column */
  key: string
  /** Column width (optional) */
  width?: string
  /** Whether this column is sortable (default: true) */
  sortable?: boolean
}

/**
 * Sort configuration
 */
export interface SortConfig {
  /** Column key to sort by */
  columnKey: string
  /** Sort direction */
  direction: 'asc' | 'desc'
}

/**
 * Props for the SpreadsheetGrid component
 */
interface SpreadsheetGridProps {
  /** Column definitions */
  columns: ColumnDef[]
  /** Grid data as array of row objects */
  data: Record<string, CellData>[]
  /** Visual variant of the grid */
  variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'danger'
  /** Size of the grid cells */
  size?: 'sm' | 'md' | 'lg'
  /** Whether the grid is disabled */
  disabled?: boolean
  /** Callback when cell value changes */
  onCellChange?: (rowIndex: number, columnKey: string, value: string) => void
  /** Additional CSS classes */
  className?: string
  /** Whether to show row numbers */
  showRowNumbers?: boolean
  /** Whether to enable cell editing */
  editable?: boolean
  /** Current sort configuration */
  sortConfig?: SortConfig | null
  /** Callback when sort changes */
  onSortChange?: (sortConfig: SortConfig | null) => void
}

/**
 * SpreadsheetGrid Component
 *
 * A spreadsheet-like grid component for displaying and editing tabular data
 * with keyboard navigation and cell editing capabilities.
 *
 * @example
 * ```tsx
 * const columns = [
 *   { header: 'Name', key: 'name' },
 *   { header: 'Email', key: 'email' }
 * ]
 * const data = [
 *   { name: { value: 'John Doe' }, email: { value: 'john@example.com' } }
 * ]
 * <SpreadsheetGrid columns={columns} data={data} variant="primary" />
 * ```
 */
function SpreadsheetGrid({
  columns,
  data,
  variant = 'primary',
  size = 'md',
  disabled = false,
  onCellChange,
  className = '',
  showRowNumbers = true,
  editable = false,
  sortConfig = null,
  onSortChange
}: SpreadsheetGridProps) {
  const [editingCell, setEditingCell] = useState<{ row: number; col: string } | null>(null)
  const [selectedCell, setSelectedCell] = useState<{ row: number; col: string } | null>(null)
  const [internalSortConfig, setInternalSortConfig] = useState<SortConfig | null>(sortConfig)

  // Use controlled or uncontrolled sorting
  const currentSortConfig = sortConfig !== undefined ? sortConfig : internalSortConfig

  // Size configurations
  const sizeClasses = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg'
  }

  const cellPadding = {
    sm: 'px-2 py-1',
    md: 'px-4 py-2',
    lg: 'px-6 py-3'
  }

  // Variant color schemes
  const variantStyles = {
    primary: {
      header: 'bg-primary text-white border-primary/40',
      cell: 'border-primary/20',
      selected: 'ring-2 ring-primary',
      hover: 'hover:bg-primary/5'
    },
    secondary: {
      header: 'bg-secondary text-white dark:text-black border-secondary/40',
      cell: 'border-secondary/20',
      selected: 'ring-2 ring-secondary',
      hover: 'hover:bg-secondary/5'
    },
    success: {
      header: 'bg-success text-white border-success/40',
      cell: 'border-success/20',
      selected: 'ring-2 ring-success',
      hover: 'hover:bg-success/5'
    },
    warning: {
      header: 'bg-warning text-white border-warning/40',
      cell: 'border-warning/20',
      selected: 'ring-2 ring-warning',
      hover: 'hover:bg-warning/5'
    },
    danger: {
      header: 'bg-danger text-white border-danger/40',
      cell: 'border-danger/20',
      selected: 'ring-2 ring-danger',
      hover: 'hover:bg-danger/5'
    }
  }

  const styles = variantStyles[variant]

  /**
   * Sort data based on current sort configuration
   */
  const sortedData = React.useMemo(() => {
    if (!currentSortConfig) return data

    const sorted = [...data].sort((a, b) => {
      const aValue = a[currentSortConfig.columnKey]?.value
      const bValue = b[currentSortConfig.columnKey]?.value

      // Handle null/undefined values
      if (aValue == null && bValue == null) return 0
      if (aValue == null) return 1
      if (bValue == null) return -1

      // Compare values
      let comparison = 0
      if (typeof aValue === 'string' && typeof bValue === 'string') {
        comparison = aValue.localeCompare(bValue)
      } else if (typeof aValue === 'number' && typeof bValue === 'number') {
        comparison = aValue - bValue
      } else {
        // Convert to strings for comparison
        comparison = String(aValue).localeCompare(String(bValue))
      }

      return currentSortConfig.direction === 'asc' ? comparison : -comparison
    })

    return sorted
  }, [data, currentSortConfig])

  /**
   * Handle column header click for sorting
   */
  const handleHeaderClick = useCallback((columnKey: string, sortable: boolean = true) => {
    if (disabled || !sortable) return

    let newSortConfig: SortConfig | null = null

    if (!currentSortConfig || currentSortConfig.columnKey !== columnKey) {
      // Start sorting by this column in ascending order
      newSortConfig = { columnKey, direction: 'asc' }
    } else if (currentSortConfig.direction === 'asc') {
      // Switch to descending
      newSortConfig = { columnKey, direction: 'desc' }
    } else {
      // Clear sorting
      newSortConfig = null
    }

    // Update internal state if uncontrolled
    if (sortConfig === undefined) {
      setInternalSortConfig(newSortConfig)
    }

    // Call callback if provided
    if (onSortChange) {
      onSortChange(newSortConfig)
    }
  }, [disabled, currentSortConfig, sortConfig, onSortChange])

  /**
   * Render sort indicator
   */
  const renderSortIndicator = (columnKey: string) => {
    if (!currentSortConfig || currentSortConfig.columnKey !== columnKey) {
      return (
        <span style={{ opacity: 0.3, marginLeft: '0.5rem', fontSize: '0.8em' }}>
          ▲▼
        </span>
      )
    }

    return (
      <span style={{ marginLeft: '0.5rem', fontSize: '0.8em' }}>
        {currentSortConfig.direction === 'asc' ? '▲' : '▼'}
      </span>
    )
  }

  /**
   * Handle cell click for editing
   */
  const handleCellClick = useCallback((rowIndex: number, columnKey: string, cellData: CellData) => {
    if (disabled) return

    setSelectedCell({ row: rowIndex, col: columnKey })

    if (editable && cellData.editable !== false) {
      setEditingCell({ row: rowIndex, col: columnKey })
    }
  }, [disabled, editable])

  /**
   * Handle cell value change
   */
  const handleCellBlur = useCallback((rowIndex: number, columnKey: string, newValue: string) => {
    setEditingCell(null)
    if (onCellChange && newValue !== sortedData[rowIndex][columnKey].value.toString()) {
      onCellChange(rowIndex, columnKey, newValue)
    }
  }, [sortedData, onCellChange])

  /**
   * Handle keyboard navigation
   */
  const handleKeyDown = useCallback((e: React.KeyboardEvent, rowIndex: number, columnKey: string) => {
    if (disabled) return

    const currentColIndex = columns.findIndex(col => col.key === columnKey)

    switch (e.key) {
      case 'Enter':
        if (editingCell?.row === rowIndex && editingCell?.col === columnKey) {
          setEditingCell(null)
        } else if (editable && sortedData[rowIndex][columnKey].editable !== false) {
          setEditingCell({ row: rowIndex, col: columnKey })
        }
        break
      case 'Escape':
        setEditingCell(null)
        break
      case 'ArrowUp':
        if (rowIndex > 0) {
          setSelectedCell({ row: rowIndex - 1, col: columnKey })
          setEditingCell(null)
        }
        e.preventDefault()
        break
      case 'ArrowDown':
        if (rowIndex < sortedData.length - 1) {
          setSelectedCell({ row: rowIndex + 1, col: columnKey })
          setEditingCell(null)
        }
        e.preventDefault()
        break
      case 'ArrowLeft':
        if (currentColIndex > 0) {
          setSelectedCell({ row: rowIndex, col: columns[currentColIndex - 1].key })
          setEditingCell(null)
        }
        e.preventDefault()
        break
      case 'ArrowRight':
        if (currentColIndex < columns.length - 1) {
          setSelectedCell({ row: rowIndex, col: columns[currentColIndex + 1].key })
          setEditingCell(null)
        }
        e.preventDefault()
        break
    }
  }, [columns, sortedData, disabled, editable, editingCell])

  const baseClasses = 'overflow-auto rounded-lg border-2 shadow-lg'
  const tableClasses = 'w-full border-collapse'
  const disabledClasses = disabled ? 'opacity-50 pointer-events-none' : ''

  return (
    <div className={`${baseClasses} ${styles.cell} ${disabledClasses} ${className}`}>
      <table className={tableClasses}>
        <thead>
          <tr>
            {showRowNumbers && (
              <th className={`${styles.header} ${cellPadding[size]} ${sizeClasses[size]} font-bold text-center sticky left-0 z-10`}>
                #
              </th>
            )}
            {columns.map((column) => {
              const isSortable = column.sortable !== false
              return (
                <th
                  key={column.key}
                  style={{ width: column.width }}
                  className={`${styles.header} ${cellPadding[size]} ${sizeClasses[size]} font-bold text-left ${isSortable && !disabled ? 'cursor-pointer hover:opacity-80 select-none' : ''}`}
                  onClick={() => handleHeaderClick(column.key, isSortable)}
                >
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <span>{column.header}</span>
                    {isSortable && renderSortIndicator(column.key)}
                  </div>
                </th>
              )
            })}
          </tr>
        </thead>
        <tbody>
          {sortedData.map((row, rowIndex) => (
            <tr key={rowIndex} className="border-t">
              {showRowNumbers && (
                <td className={`${cellPadding[size]} ${sizeClasses[size]} bg-muted/10 text-muted font-semibold text-center sticky left-0`}>
                  {rowIndex + 1}
                </td>
              )}
              {columns.map((column) => {
                const cellData = row[column.key]
                const isEditing = editingCell?.row === rowIndex && editingCell?.col === column.key
                const isSelected = selectedCell?.row === rowIndex && selectedCell?.col === column.key

                return (
                  <td
                    key={column.key}
                    className={`
                      ${cellPadding[size]}
                      ${sizeClasses[size]}
                      border-t
                      ${styles.cell}
                      ${!disabled && styles.hover}
                      ${isSelected ? styles.selected : ''}
                      ${editable && cellData?.editable !== false ? 'cursor-text' : ''}
                      transition-all
                    `}
                    onClick={() => handleCellClick(rowIndex, column.key, cellData)}
                    onKeyDown={(e) => handleKeyDown(e, rowIndex, column.key)}
                    tabIndex={0}
                    role="gridcell"
                    aria-label={`${column.header} row ${rowIndex + 1}`}
                  >
                    {isEditing ? (
                      <input
                        type="text"
                        defaultValue={cellData?.value || ''}
                        autoFocus
                        className="w-full bg-transparent outline-none"
                        onBlur={(e) => handleCellBlur(rowIndex, column.key, e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            handleCellBlur(rowIndex, column.key, e.currentTarget.value)
                          } else if (e.key === 'Escape') {
                            setEditingCell(null)
                          }
                        }}
                      />
                    ) : (
                      cellData?.value || ''
                    )}
                  </td>
                )
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default SpreadsheetGrid
