import Button from "@/components/ui/Button";

type CallToActionProps = {
  titulo: string;
  texto?: string;
  label: string;
  href: string;
};

export default function CallToAction({
  titulo,
  texto,
  label,
  href,
}: CallToActionProps) {
  return (
    <section className="bg-[var(--color-bosque)] px-6 py-16 text-center text-[var(--color-niebla)] md:py-24">
      <div className="mx-auto flex max-w-2xl flex-col items-center gap-6">
        <h2 className="font-display text-4xl md:text-5xl">{titulo}</h2>
        {texto && <p className="font-sans text-lg">{texto}</p>}
        <Button href={href} variant="primary">
          {label}
        </Button>
      </div>
    </section>
  );
}
