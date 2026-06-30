export const SearchIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
    <circle cx="11" cy="11" r="7" />
    <path d="M21 21l-4.3-4.3" strokeLinecap="round" />
  </svg>
);

export const MenuIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
    <path d="M3 6h18M3 12h18M3 18h18" strokeLinecap="round" />
  </svg>
);

export const Chevron = () => (
  <svg
    className="chev"
    width="12"
    height="12"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path d="M6 9l6 6 6-6" />
  </svg>
);

export function FilterIcon({ name }: { name: string }) {
  switch (name) {
    case "region":
      return (
        <svg className="fi" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
          <circle cx="12" cy="12" r="9" />
          <path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18" />
        </svg>
      );
    case "period":
      return (
        <svg className="fi" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
          <rect x="3" y="5" width="18" height="16" rx="1.5" />
          <path d="M3 9h18M8 3v4M16 3v4" />
        </svg>
      );
    case "technique":
      return (
        <svg className="fi" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
          <path d="M16 3l5 5L8 21H3v-5L16 3z" />
        </svg>
      );
    case "category":
      return (
        <svg className="fi" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
          <path d="M3 3h8l10 10-8 8L3 11V3z" />
          <circle cx="7.5" cy="7.5" r="1.3" fill="currentColor" stroke="none" />
        </svg>
      );
    case "sort":
      return (
        <svg className="fi" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
          <path d="M4 7h16M6 12h12M9 17h6" />
        </svg>
      );
    case "material":
    default:
      return (
        <svg className="fi" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
          <circle cx="12" cy="12" r="3" />
          <path d="M12 4a8 8 0 0 1 7 4M5 8a8 8 0 0 1 7-4M20 16a8 8 0 0 1-7 4M5 16a8 8 0 0 0 7 4" />
        </svg>
      );
  }
}
