import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import { describe, it, expect, vi, afterEach } from 'vitest';
import Input from './Input';

describe('Input', () => {
  afterEach(() => {
    cleanup();
  });

  it('renders with default props', () => {
    render(<Input placeholder="Enter text" />);
    const input = screen.getByPlaceholderText(/enter text/i);
    expect(input).toBeInTheDocument();
  });

  it('renders with label', () => {
    render(<Input label="Username" placeholder="Enter username" />);
    const label = screen.getByText(/username/i);
    const input = screen.getByPlaceholderText(/enter username/i);

    expect(label).toBeInTheDocument();
    expect(input).toBeInTheDocument();
  });

  it('renders required indicator when required prop is true', () => {
    render(<Input label="Email" required />);
    const asterisk = screen.getByText('*');
    expect(asterisk).toBeInTheDocument();
  });

  it('renders with different variants', () => {
    const { rerender } = render(<Input variant="primary" placeholder="Primary" />);
    let input = screen.getByPlaceholderText(/primary/i);
    expect(input).toHaveClass('bg-primary/10');

    rerender(<Input variant="danger" placeholder="Danger" />);
    input = screen.getByPlaceholderText(/danger/i);
    expect(input).toHaveClass('bg-danger/10');

    rerender(<Input variant="success" placeholder="Success" />);
    input = screen.getByPlaceholderText(/success/i);
    expect(input).toHaveClass('bg-success/10');
  });

  it('renders with different sizes', () => {
    const { rerender } = render(<Input size="sm" placeholder="Small" />);
    let input = screen.getByPlaceholderText(/small/i);
    expect(input).toHaveClass('px-3 py-2 text-sm');

    rerender(<Input size="md" placeholder="Medium" />);
    input = screen.getByPlaceholderText(/medium/i);
    expect(input).toHaveClass('px-4 py-3 text-base');

    rerender(<Input size="lg" placeholder="Large" />);
    input = screen.getByPlaceholderText(/large/i);
    expect(input).toHaveClass('px-5 py-4 text-lg');
  });

  it('displays error message when error prop is true', () => {
    render(<Input error errorMessage="This field is required" placeholder="Input" />);
    const errorMsg = screen.getByText(/this field is required/i);
    const input = screen.getByPlaceholderText(/input/i);

    expect(errorMsg).toBeInTheDocument();
    expect(input).toHaveAttribute('aria-invalid', 'true');
  });

  it('displays helper text when provided', () => {
    render(<Input helperText="Enter at least 8 characters" placeholder="Input" />);
    const helperText = screen.getByText(/enter at least 8 characters/i);
    expect(helperText).toBeInTheDocument();
  });

  it('handles onChange event', () => {
    const handleChange = vi.fn();
    render(<Input onChange={handleChange} placeholder="Input" />);

    const input = screen.getByPlaceholderText(/input/i);
    fireEvent.change(input, { target: { value: 'test value' } });

    expect(handleChange).toHaveBeenCalledTimes(1);
  });

  it('handles onFocus and onBlur events', () => {
    const handleFocus = vi.fn();
    const handleBlur = vi.fn();
    render(<Input onFocus={handleFocus} onBlur={handleBlur} placeholder="Input" />);

    const input = screen.getByPlaceholderText(/input/i);

    fireEvent.focus(input);
    expect(handleFocus).toHaveBeenCalledTimes(1);

    fireEvent.blur(input);
    expect(handleBlur).toHaveBeenCalledTimes(1);
  });

  it('disables input when disabled prop is true', () => {
    render(<Input disabled placeholder="Disabled input" />);
    const input = screen.getByPlaceholderText(/disabled input/i);

    expect(input).toBeDisabled();
    expect(input).toHaveClass('opacity-50');
  });

  it('disables input when loading prop is true', () => {
    render(<Input loading placeholder="Loading input" />);
    const input = screen.getByPlaceholderText(/loading input/i);

    expect(input).toBeDisabled();
  });

  it('displays loading spinner when loading', () => {
    render(<Input loading placeholder="Input" />);
    const spinner = screen.getByLabelText(/loading/i);
    expect(spinner).toBeInTheDocument();
  });

  it('renders with left icon', () => {
    const icon = <span data-testid="left-icon">👤</span>;
    render(<Input leftIcon={icon} placeholder="Input" />);

    const leftIcon = screen.getByTestId('left-icon');
    expect(leftIcon).toBeInTheDocument();
  });

  it('renders with right icon', () => {
    const icon = <span data-testid="right-icon">🔍</span>;
    render(<Input rightIcon={icon} placeholder="Input" />);

    const rightIcon = screen.getByTestId('right-icon');
    expect(rightIcon).toBeInTheDocument();
  });

  it('applies custom className', () => {
    render(<Input className="custom-class" placeholder="Input" />);
    const input = screen.getByPlaceholderText(/input/i);
    expect(input).toHaveClass('custom-class');
  });

  it('applies custom container className', () => {
    render(
      <Input containerClassName="custom-container" label="Test" placeholder="Input" />
    );
    const container = screen.getByPlaceholderText(/input/i).closest('div')?.parentElement;
    expect(container).toHaveClass('custom-container');
  });

  it('forwards ref correctly', () => {
    const ref = vi.fn();
    render(<Input ref={ref} placeholder="Input" />);
    expect(ref).toHaveBeenCalled();
  });

  it('sets aria-describedby for error message', () => {
    render(<Input error errorMessage="Error text" placeholder="Input" id="test-input" />);
    const input = screen.getByPlaceholderText(/input/i);
    expect(input).toHaveAttribute('aria-describedby', 'test-input-error');
  });

  it('sets aria-describedby for helper text', () => {
    render(<Input helperText="Helper text" placeholder="Input" id="test-input" />);
    const input = screen.getByPlaceholderText(/input/i);
    expect(input).toHaveAttribute('aria-describedby', 'test-input-helper');
  });

  it('prioritizes error message over helper text', () => {
    render(
      <Input
        error
        errorMessage="Error"
        helperText="Helper"
        placeholder="Input"
      />
    );

    expect(screen.getByText(/error/i)).toBeInTheDocument();
    expect(screen.queryByText(/^helper$/i)).not.toBeInTheDocument();
  });

  it('accepts all standard input attributes', () => {
    render(
      <Input
        type="email"
        placeholder="email@example.com"
        maxLength={100}
        pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
      />
    );

    const input = screen.getByPlaceholderText(/email@example.com/i);
    expect(input).toHaveAttribute('type', 'email');
    expect(input).toHaveAttribute('maxLength', '100');
    expect(input).toHaveAttribute('pattern', '[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,}$');
  });
});
