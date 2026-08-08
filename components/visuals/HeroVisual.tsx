export function HeroVisual() {
  return (
    <svg
      viewBox="0 0 640 720"
      className="h-full w-full"
      role="img"
      aria-label="Abstract diagram representing a connected operational system"
    >
      <defs>
        <linearGradient id="hero-grad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#2b4239" />
          <stop offset="100%" stopColor="#151f1b" />
        </linearGradient>
      </defs>
      <rect x="0" y="0" width="640" height="720" rx="4" fill="url(#hero-grad)" />

      <g stroke="#EDE7D6" strokeOpacity="0.5" strokeWidth="1" fill="none">
        <line x1="120" y1="560" x2="120" y2="160" />
        <line x1="320" y1="620" x2="320" y2="100" />
        <line x1="520" y1="560" x2="520" y2="160" />

        <line x1="120" y1="360" x2="320" y2="260" />
        <line x1="320" y1="260" x2="520" y2="380" />
        <line x1="120" y1="200" x2="320" y2="140" />
        <line x1="320" y1="140" x2="520" y2="220" />
      </g>

      <g fill="#EDE7D6">
        <circle cx="120" cy="560" r="5" />
        <circle cx="120" cy="360" r="7" />
        <circle cx="120" cy="200" r="5" />
        <circle cx="320" cy="620" r="5" />
        <circle cx="320" cy="260" r="9" />
        <circle cx="320" cy="140" r="6" />
        <circle cx="520" cy="560" r="5" />
        <circle cx="520" cy="380" r="7" />
        <circle cx="520" cy="220" r="5" />
      </g>

      <g stroke="#EDE7D6" strokeOpacity="0.25" strokeWidth="1">
        <circle cx="320" cy="260" r="60" fill="none" />
        <circle cx="320" cy="260" r="110" fill="none" />
      </g>
    </svg>
  );
}
