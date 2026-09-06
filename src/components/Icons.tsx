import type { Brew } from "../types";

interface IconProps {
  className?: string;
}

const S = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.7,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

export const IconBean = ({ className }: IconProps) => (
  <svg viewBox="0 0 24 24" className={className} {...S} aria-hidden="true">
    <ellipse cx="12" cy="12" rx="6" ry="8.4" transform="rotate(26 12 12)" />
    <path d="M9.4 5.6c2.4 1.9 1.6 4.3 2.3 6.4.7 2.1 2.9 3.3 3.4 6" transform="rotate(26 12 12)" />
  </svg>
);

export const IconBag = ({ className }: IconProps) => (
  <svg viewBox="0 0 24 24" className={className} {...S} aria-hidden="true">
    <path d="M4.5 8.2h15l-1.6 9.6a2.4 2.4 0 0 1-2.4 2H8.5a2.4 2.4 0 0 1-2.4-2L4.5 8.2Z" />
    <path d="M8.6 10.6V6.8a3.4 3.4 0 0 1 6.8 0v3.8" />
  </svg>
);

export const IconSearch = ({ className }: IconProps) => (
  <svg viewBox="0 0 24 24" className={className} {...S} aria-hidden="true">
    <circle cx="11" cy="11" r="6.5" />
    <path d="m20 20-3.8-3.8" />
  </svg>
);

export const IconPlus = ({ className }: IconProps) => (
  <svg viewBox="0 0 24 24" className={className} {...S} aria-hidden="true">
    <path d="M12 5.5v13M5.5 12h13" />
  </svg>
);

export const IconMinus = ({ className }: IconProps) => (
  <svg viewBox="0 0 24 24" className={className} {...S} aria-hidden="true">
    <path d="M5.5 12h13" />
  </svg>
);

export const IconClose = ({ className }: IconProps) => (
  <svg viewBox="0 0 24 24" className={className} {...S} aria-hidden="true">
    <path d="M6 6l12 12M18 6 6 18" />
  </svg>
);

export const IconArrow = ({ className }: IconProps) => (
  <svg viewBox="0 0 24 24" className={className} {...S} aria-hidden="true">
    <path d="M4 12h15.5M13.5 6l6 6-6 6" />
  </svg>
);

export const IconTrash = ({ className }: IconProps) => (
  <svg viewBox="0 0 24 24" className={className} {...S} aria-hidden="true">
    <path d="M4.5 6.5h15" />
    <path d="M9.5 6V4.8c0-.7.6-1.3 1.3-1.3h2.4c.7 0 1.3.6 1.3 1.3V6" />
    <path d="m6.5 6.5.8 11.2a2 2 0 0 0 2 1.8h5.4a2 2 0 0 0 2-1.8l.8-11.2" />
    <path d="M10 10.5v5M14 10.5v5" />
  </svg>
);

export const IconCheck = ({ className }: IconProps) => (
  <svg viewBox="0 0 24 24" className={className} {...S} aria-hidden="true">
    <path d="m5 12.5 4.5 4.5L19 7.5" />
  </svg>
);

export const IconFlame = ({ className }: IconProps) => (
  <svg viewBox="0 0 24 24" className={className} {...S} aria-hidden="true">
    <path d="M12 3.5c.6 3-1.2 4.4-2.4 5.8C8.3 10.8 7.5 12.3 7.5 14a4.5 4.5 0 0 0 9 0c0-1.2-.4-2.3-1-3.2-.5.8-1.1 1.2-1.8 1.4.4-2.8-.4-6.4-1.7-8.7Z" />
  </svg>
);

export const IconTruck = ({ className }: IconProps) => (
  <svg viewBox="0 0 24 24" className={className} {...S} aria-hidden="true">
    <path d="M2.5 6.5H14v9H2.5z" />
    <path d="M14 10h3.6l2.9 3v2.5H14" />
    <circle cx="6.8" cy="17.7" r="1.8" />
    <circle cx="16.6" cy="17.7" r="1.8" />
  </svg>
);

export const IconCash = ({ className }: IconProps) => (
  <svg viewBox="0 0 24 24" className={className} {...S} aria-hidden="true">
    <rect x="2.8" y="6.5" width="18.4" height="11" rx="1.6" />
    <circle cx="12" cy="12" r="2.6" />
    <path d="M6 9.5h.01M18 14.5h.01" />
  </svg>
);

export const IconCard = ({ className }: IconProps) => (
  <svg viewBox="0 0 24 24" className={className} {...S} aria-hidden="true">
    <rect x="2.8" y="5.5" width="18.4" height="13" rx="1.8" />
    <path d="M2.8 9.6h18.4M6 14.5h4" />
  </svg>
);

export const IconWave = ({ className }: IconProps) => (
  <svg viewBox="0 0 24 24" className={className} {...S} aria-hidden="true">
    <path d="M2.5 9.2c2.4 0 2.4 2 4.8 2s2.4-2 4.7-2 2.4 2 4.8 2 2.4-2 4.7-2" />
    <path d="M2.5 14.8c2.4 0 2.4 2 4.8 2s2.4-2 4.7-2 2.4 2 4.8 2 2.4-2 4.7-2" />
  </svg>
);

export const IconMountain = ({ className }: IconProps) => (
  <svg viewBox="0 0 24 24" className={className} {...S} aria-hidden="true">
    <path d="m2.5 18.5 6-10.5 3.4 5.6 2.8-4.6 6.8 9.5Z" />
  </svg>
);

export const IconCup = ({ className }: IconProps) => (
  <svg viewBox="0 0 24 24" className={className} {...S} aria-hidden="true">
    <path d="M5 10h11v4a5.5 5.5 0 0 1-11 0Z" />
    <path d="M16 11h1.6a2.3 2.3 0 0 1 0 4.6h-.4" />
    <path d="M8.2 7V5.2M11 7V4.4M13.8 7V5.2" />
  </svg>
);

export const IconDripper = ({ className }: IconProps) => (
  <svg viewBox="0 0 24 24" className={className} {...S} aria-hidden="true">
    <path d="M5 6h14l-4.3 7.5H9.3L5 6Z" />
    <path d="M12 13.5V17M8.5 17h7" />
  </svg>
);

export const IconPress = ({ className }: IconProps) => (
  <svg viewBox="0 0 24 24" className={className} {...S} aria-hidden="true">
    <rect x="6.5" y="8.5" width="11" height="11.5" rx="1.5" />
    <path d="M12 8.5V4.5M9 4.5h6M6.5 12.5h11" />
  </svg>
);

export const IconColdGlass = ({ className }: IconProps) => (
  <svg viewBox="0 0 24 24" className={className} {...S} aria-hidden="true">
    <path d="M7 4.5h10l-1.2 15H8.2L7 4.5Z" />
    <path d="M7.6 11h8.8M10.4 15l1.1-1.1L12.6 15" />
  </svg>
);

export const IconMoka = ({ className }: IconProps) => (
  <svg viewBox="0 0 24 24" className={className} {...S} aria-hidden="true">
    <path d="M8.5 3.5h7L14 8h-4l-1.5-4.5Z" />
    <path d="M9.5 8h5l1 3.5h-7l1-3.5Z" />
    <path d="M8.5 11.5h7l1 8.5h-9l1-8.5Z" />
  </svg>
);

export const IconPin = ({ className }: IconProps) => (
  <svg viewBox="0 0 24 24" className={className} {...S} aria-hidden="true">
    <path d="M12 21s-6.5-5.4-6.5-10a6.5 6.5 0 0 1 13 0c0 4.6-6.5 10-6.5 10Z" />
    <circle cx="12" cy="10.6" r="2.2" />
  </svg>
);

export const IconClock = ({ className }: IconProps) => (
  <svg viewBox="0 0 24 24" className={className} {...S} aria-hidden="true">
    <circle cx="12" cy="12" r="8.5" />
    <path d="M12 7v5l3.2 1.8" />
  </svg>
);

export const IconPhone = ({ className }: IconProps) => (
  <svg viewBox="0 0 24 24" className={className} {...S} aria-hidden="true">
    <path d="M5.5 4.5h3l1.5 3.8-2 1.5a12 12 0 0 0 6.2 6.2l1.5-2 3.8 1.5v3a1.8 1.8 0 0 1-2 1.8C10.6 19.6 4.4 13.4 3.7 6.5a1.8 1.8 0 0 1 1.8-2Z" />
  </svg>
);

export const IconMail = ({ className }: IconProps) => (
  <svg viewBox="0 0 24 24" className={className} {...S} aria-hidden="true">
    <rect x="3" y="5.5" width="18" height="13" rx="1.8" />
    <path d="m4 7 8 6 8-6" />
  </svg>
);

export const IconChevron = ({ className }: IconProps) => (
  <svg viewBox="0 0 24 24" className={className} {...S} aria-hidden="true">
    <path d="m6 9.5 6 6 6-6" />
  </svg>
);

export const BrewIcon = ({ brew, className }: { brew: Brew; className?: string }) => {
  switch (brew) {
    case "espresso":
      return <IconCup className={className} />;
    case "v60":
      return <IconDripper className={className} />;
    case "french":
      return <IconPress className={className} />;
    case "cold":
      return <IconColdGlass className={className} />;
    case "moka":
      return <IconMoka className={className} />;
  }
};

export const RoastDots = ({ level, className = "" }: { level: number; className?: string }) => (
  <span
    className={`flex items-center gap-[3px] ${className}`}
    title={`Stepen prženja: ${level}/5`}
    aria-label={`Stepen prženja ${level} od 5`}
  >
    {[1, 2, 3, 4, 5].map((i) => (
      <IconBean key={i} className={`h-3 w-3 ${i <= level ? "text-amber" : "text-espresso-600"}`} />
    ))}
  </span>
);
