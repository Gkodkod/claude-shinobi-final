import React, { forwardRef, InputHTMLAttributes, useId } from 'react';

/**
 * Input component variant types
 */
export type InputVariant = 'primary' | 'secondary' | 'success' | 'danger' | 'warning';

/**
 * Input component size types
 */
export type InputSize = 'sm' | 'md' | 'lg';

/**
 * Props for the Input component
 */
export interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  /**
   * The variant style of the input
   * @default 'primary'
   */
  variant?: InputVariant;

  /**
   * The size of the input
   * @default 'md'
   */
  size?: InputSize;

  /**
   * Whether the input has an error state
   * @default false
   */
  error?: boolean;

  /**
   * Error message to display below the input
   */
  errorMessage?: string;

  /**
   * Label text for the input
   */
  label?: string;

  /**
   * Helper text to display below the input
   */
  helperText?: string;

  /**
   * Icon to display on the left side of the input
   */
  leftIcon?: React.ReactNode;

  /**
   * Icon to display on the right side of the input
   */
  rightIcon?: React.ReactNode;

  /**
   * Whether the input is in a loading state
   * @default false
   */
  loading?: boolean;

  /**
   * Additional class names for the input container
   */
  containerClassName?: string;

  /**
   * Additional class names for the label
   */
  labelClassName?: string;
}

/**
 * A modern, accessible Input component with semi-transparent background
 *
 * @example
 * ```tsx
 * <Input
 *   label="Email"
 *   type="email"
 *   placeholder="Enter your email"
 *   variant="primary"
 * />
 * ```
 */
const Input = forwardRef<HTMLInputElement, InputProps>(({
  variant = 'primary',
  size = 'md',
  error = false,
  errorMessage,
  label,
  helperText,
  leftIcon,
  rightIcon,
  loading = false,
  disabled = false,
  containerClassName = '',
  labelClassName = '',
  className = '',
  id,
  required,
  ...props
}, ref) => {
  // Generate unique ID if not provided (using useId to avoid hydration errors)
  const reactId = useId();
  const inputId = id || reactId;

  // Base input classes with semi-transparent background
  const baseClasses = 'w-full rounded-lg font-normal transition-all duration-200 outline-none backdrop-blur-sm border-[2px]';

  // Size classes
  const sizeClasses = {
    sm: 'px-3 py-2 text-sm',
    md: 'px-4 py-3 text-base',
    lg: 'px-5 py-4 text-lg'
  };

  // Variant classes with semi-transparent backgrounds and hover states
  const variantClasses = {
    primary: 'bg-primary/15 border-primary/40 hover:border-primary/60 text-foreground placeholder:text-muted/90 focus:border-primary focus:ring-4 focus:ring-primary/20',
    secondary: 'bg-secondary/15 border-secondary/40 hover:border-secondary/60 text-foreground placeholder:text-muted/90 focus:border-secondary focus:ring-4 focus:ring-secondary/20',
    success: 'bg-success/15 border-success/40 hover:border-success/60 text-foreground placeholder:text-muted/90 focus:border-success focus:ring-4 focus:ring-success/20',
    danger: 'bg-danger/15 border-danger/40 hover:border-danger/60 text-foreground placeholder:text-muted/90 focus:border-danger focus:ring-4 focus:ring-danger/20',
    warning: 'bg-warning/15 border-warning/40 hover:border-warning/60 text-foreground placeholder:text-muted/90 focus:border-warning focus:ring-4 focus:ring-warning/20'
  };

  // Error state overrides variant
  const errorClasses = 'bg-danger/15 border-danger/50 hover:border-danger/70 text-foreground placeholder:text-muted/90 focus:border-danger focus:ring-4 focus:ring-danger/20';

  // Disabled state
  const disabledClasses = 'opacity-60 cursor-not-allowed bg-muted/20 border-muted/40 text-muted hover:border-muted/40';

  // Icon padding adjustments
  const leftIconPadding = leftIcon ? 'pl-11' : '';
  const rightIconPadding = rightIcon || loading ? 'pr-11' : '';

  // Combine classes
  const inputClasses = [
    baseClasses,
    sizeClasses[size],
    error ? errorClasses : variantClasses[variant],
    disabled && disabledClasses,
    leftIconPadding,
    rightIconPadding,
    className
  ].filter(Boolean).join(' ');

  // Label classes
  const labelClasses = [
    'block mb-2 font-semibold text-sm text-foreground',
    disabled && 'opacity-50',
    labelClassName
  ].filter(Boolean).join(' ');

  // Helper/Error text classes
  const helperClasses = 'mt-2 text-sm';
  const errorTextClasses = 'text-danger';
  const helperTextClasses = 'text-muted';

  return (
    <div className={containerClassName}>
      {label && (
        <label
          htmlFor={inputId}
          className={labelClasses}
        >
          {label}
          {required && <span className="text-danger ml-1">*</span>}
        </label>
      )}

      <div className="relative">
        {/* Left Icon */}
        {leftIcon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted pointer-events-none">
            {leftIcon}
          </div>
        )}

        {/* Input Field */}
        <input
          ref={ref}
          id={inputId}
          disabled={disabled || loading}
          required={required}
          aria-invalid={error}
          aria-label={!label ? props.placeholder : undefined}
          aria-describedby={
            error && errorMessage
              ? `${inputId}-error`
              : helperText
              ? `${inputId}-helper`
              : undefined
          }
          aria-required={required}
          className={inputClasses}
          {...props}
        />

        {/* Right Icon or Loading Spinner */}
        {(rightIcon || loading) && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2 text-muted pointer-events-none">
            {loading ? (
              <svg
                className="animate-spin h-5 w-5"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                aria-label="Loading"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
            ) : (
              rightIcon
            )}
          </div>
        )}
      </div>

      {/* Error Message */}
      {error && errorMessage && (
        <p
          id={`${inputId}-error`}
          className={`${helperClasses} ${errorTextClasses}`}
          role="alert"
        >
          {errorMessage}
        </p>
      )}

      {/* Helper Text */}
      {!error && helperText && (
        <p
          id={`${inputId}-helper`}
          className={`${helperClasses} ${helperTextClasses}`}
        >
          {helperText}
        </p>
      )}
    </div>
  );
});

Input.displayName = 'Input';

export default Input;
