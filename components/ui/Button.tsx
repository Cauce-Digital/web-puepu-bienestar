import Link from "next/link";

type ButtonVariant = "primary" | "outline";

type ButtonProps = {
  variant?: ButtonVariant;
  href?: string;
  onClick?: () => void;
  children: React.ReactNode;
  className?: string;
};

const baseStyles =
  "inline-flex items-center justify-center rounded-full px-7 py-3.5 font-medium transition-colors focus-visible:outline focus-visible:outline-3 focus-visible:outline-[var(--color-tierra)] focus-visible:outline-offset-2";

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    "bg-[var(--color-tierra)] text-white hover:bg-[#B25A24]",
  outline:
    "bg-transparent border-2 border-[var(--color-tierra)] text-[var(--color-tierra)] hover:bg-[rgba(200,103,42,0.08)]",
};

export default function Button({
  variant = "primary",
  href,
  onClick,
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
    <button type="button" onClick={onClick} className={styles}>
      {children}
    </button>
  );
}
