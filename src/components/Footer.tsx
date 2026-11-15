export default function Footer() {
  return (
    <footer className="border-t border-ink/10 py-10">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-4 px-5 text-center md:flex-row md:justify-between md:text-left">
        <p className="text-lg font-black tracking-tight">
          HUSTLE<span className="text-accent">.</span>CO
        </p>
        <p className="text-sm text-ink/50">
          © {new Date().getFullYear()} Hustle Co. Built different. No rules, just style.
        </p>
        <div className="flex gap-5 text-sm font-semibold uppercase tracking-wide text-ink/60">
          <span className="transition-colors hover:text-accent">Instagram</span>
          <span className="transition-colors hover:text-accent">TikTok</span>
          <span className="transition-colors hover:text-accent">Support</span>
        </div>
      </div>
    </footer>
  );
}
