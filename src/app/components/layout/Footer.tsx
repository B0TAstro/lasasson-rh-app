// app/components/layout/Footer.tsx

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="text-black py-6 pt-25 pb-25 px-5 md:px-10 lg:px-16">
      <div className="container mx-auto px-4 text-center">
        <p className="text-sm">
          © {currentYear} La Sasson. Tous droits réservés.
        </p>
        <p className="text-xs text-gray-300 mt-3">
          Créé pour et par{" "}
          <a
            href="https://github.com/B0TAstro"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[var(--color-primary)] hover:underline transition-colors"
          >
            La Sasson
          </a>
        </p>
      </div>
    </footer>
  );
}