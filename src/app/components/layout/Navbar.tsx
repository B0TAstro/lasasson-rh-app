// app/components/layout/Navbar.tsx

export default function Navbar() {

  return (
    <header className="fixed top-0 left-0 z-10 w-full flex-shrink-0 bg-white/10 backdrop-blur-[17.5px]">
      <img
        src="/image/logo-sasson.png"
        alt="Logo La Sasson"
        className="h-8 w-auto"
      />
      <nav className="flex items-center justify-between px-4 py-2">
        <div className="text-center mb-1">
          <h1 className="text-2xl font-bold">
            Informations RH
          </h1>
        </div>
        <span>Nav</span>
      </nav>
    </header>
  );
}