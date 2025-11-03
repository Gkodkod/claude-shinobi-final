interface ButtonProps {
  children: React.ReactNode
  variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'black' | 'white'
  onClick?: () => void
  disabled?: boolean
  type?: 'button' | 'submit' | 'reset'
  className?: string
}

function Button({
  children,
  variant = 'primary',
  onClick,
  disabled = false,
  type = 'button',
  className = ''
}: ButtonProps) {
  const baseClasses = 'px-12 py-5 rounded-full font-black text-xl uppercase tracking-wide cursor-pointer transition-all duration-150 outline-none focus:ring-4 disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_8px_0_0_rgba(0,0,0,0.2),0_13px_20px_0_rgba(0,0,0,0.15)] hover:shadow-[0_6px_0_0_rgba(0,0,0,0.2),0_10px_15px_0_rgba(0,0,0,0.15)] active:shadow-[0_2px_0_0_rgba(0,0,0,0.2),0_3px_8px_0_rgba(0,0,0,0.15)] hover:translate-y-[2px] active:translate-y-[6px] relative border-2'

  const variantClasses = {
    primary: 'bg-gradient-to-b from-primary via-primary to-primary/90 text-white hover:from-primary/95 hover:to-primary/85 focus:ring-primary/40 border-primary/40',
    secondary: 'bg-gradient-to-b from-secondary via-secondary to-secondary/90 text-white dark:text-black hover:from-secondary/95 hover:to-secondary/85 focus:ring-secondary/40 border-secondary/40',
    success: 'bg-gradient-to-b from-success via-success to-success/90 text-white hover:from-success/95 hover:to-success/85 focus:ring-success/40 border-success/40',
    warning: 'bg-gradient-to-b from-warning via-warning to-warning/90 text-white hover:from-warning/95 hover:to-warning/85 focus:ring-warning/40 border-warning/40',
    danger: 'bg-gradient-to-b from-danger via-danger to-danger/90 text-white hover:from-danger/95 hover:to-danger/85 focus:ring-danger/40 border-danger/40',
    black: 'bg-gradient-to-b from-gray-700 via-gray-800 to-gray-900 text-white hover:from-gray-600 hover:to-gray-800 focus:ring-gray-500/40 border-gray-900/40',
    white: 'bg-gradient-to-b from-gray-50 via-white to-gray-100 text-gray-800 hover:from-white hover:to-gray-50 focus:ring-gray-300/40 border-gray-200'
  }

  const buttonClass = [
    baseClasses,
    variantClasses[variant],
    className
  ].filter(Boolean).join(' ')

  return (
    <button
      className={buttonClass}
      onClick={onClick}
      disabled={disabled}
      type={type}
    >
      {children}
    </button>
  )
}

export default Button