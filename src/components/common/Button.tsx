
export type ButtonVariant = 'primary' | 'secondary' | 'danger' | 'icon';

const variantStyles: Record<ButtonVariant, string> = {
  primary: 'bg-accent-600 text-accent-foreground',
  secondary: 'bg-muted-400 text-foreground',
  danger: 'bg-red-600 text-white',
  icon: "bg-primary text-primary-foreground",
};

export interface ButtonProps {
  children: React.ReactNode;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  variant?: ButtonVariant;
}

const Button = ({
  children,
  onClick,
  className = '',
  type = 'button',
  disabled,
  variant = 'primary',
}: ButtonProps) => {
  const variantClassName = variantStyles[variant];

  return (
    <button
      type={type}
      onClick={onClick}
      className={`px-4 py-2 text-sm font-medium rounded-md ${variantClassName} ${className}`}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;

