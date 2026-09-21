import Link from "next/link";

type ButtonVariant = "primary" | "outline";
type ButtonType = "button" | "submit" | "reset";

type ButtonProps = {
  variant?: ButtonVariant;
  href?: string;
  onClick?: () => void;
  type?: ButtonType;
  children: React.ReactNode;
  className?: string;
};

const baseStyles =
  "inline-flex items-center justify-center rounded-full px-7 py-3.5 font-medium transition-colors";

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    "bg-[var(--color-tierra-accion)] text-white hover:bg-[var(--color-tierra-accion-hover)]",
  outline:
    "bg-transparent border-2 border-[var(--color-tierra)] text-[var(--color-tierra)] hover:bg-[rgba(200,103,42,0.08)]",
};

export default function Button({
  variant = "primary",
  href,
  onClick,
  type = "button",
  children,
  className = "",
}: ButtonProps) {
  const styles = `${baseStyles} ${variantStyles[variant]} ${className}`;

  if (href) {
    return (
      <Link href={href} className={styles}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} onClick={onClick} className={styles}>
      {children}
    </button>
  );
}
