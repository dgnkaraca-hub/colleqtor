export default function LogoLockup({ className = "" }: { className?: string }) {
  return (
    <img
      src="/logo/colleqtor-lockup.svg"
      alt="colleqtor — Yaşayan Koleksiyon & Dijital Arşiv"
      className={("lockup-img " + className).trim()}
    />
  );
}
