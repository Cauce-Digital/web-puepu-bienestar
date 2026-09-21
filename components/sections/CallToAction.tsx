import Button from "@/components/ui/Button";

type CallToActionProps = {
  titulo: string;
  texto?: string;
  label: string;
  href: string;
  segundoLabel?: string;
  segundoHref?: string;
};

export default function CallToAction({
  titulo,
  texto,
  label,
  href,
  segundoLabel,
  segundoHref,
}: CallToActionProps) {
  return (
    <section className="bg-[var(--color-bosque)] px-6 py-16 text-center text-[var(--color-niebla)] md:py-24">
      <div className="mx-auto flex max-w-2xl flex-col items-center gap-6">
        <h2 className="font-display text-4xl md:text-5xl">{titulo}</h2>
        {texto && <p className="font-sans text-lg">{texto}</p>}
        <div className="flex flex-col gap-4 sm:flex-row">
          <Button href={href} variant="primary">
            {label}
          </Button>
          {segundoLabel && segundoHref && (
            <Button
              href={segundoHref}
              variant="outline"
              className="border-white text-white hover:bg-white/10"
            >
              {segundoLabel}
            </Button>
          )}
        </div>
      </div>
    </section>
  );
}
