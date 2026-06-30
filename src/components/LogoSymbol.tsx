export default function LogoSymbol({ className = "" }: { className?: string }) {
  return (
    <img
      src="/logo/colleqtor-symbol.svg"
      alt="colleqtor sembolü"
      className={("logo-symbol " + className).trim()}
    />
  );
}
