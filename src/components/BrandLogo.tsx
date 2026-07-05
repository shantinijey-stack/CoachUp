/**
 * CoachUp Kids brand mark — a soft ball rising along a growth arc into a
 * spark: "bringing your child's sportiness to light." Deliberately not a
 * cartoon-animal mark; warm, sporty, trustworthy, parent-facing.
 * (Remi and friends remain the in-app guides for children — the brand
 * mark is the face of the product for grown-ups.)
 */
export function BrandMark({ size = 40 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      role="img"
      aria-label="CoachUp Kids logo"
    >
      <defs>
        <linearGradient id="cuk-ball" x1="8" y1="14" x2="36" y2="44" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FF9351" />
          <stop offset="1" stopColor="#FF6B6B" />
        </linearGradient>
      </defs>
      {/* the ball */}
      <circle cx="21" cy="28" r="15" fill="url(#cuk-ball)" />
      {/* seam hinting "ball" without naming a sport */}
      <path
        d="M9.5 21.5c7.5 4 15.5 4 23 0"
        stroke="#FFF9F0"
        strokeWidth="2.4"
        strokeLinecap="round"
        opacity="0.85"
      />
      {/* the growth arc — a pathway rising out of the ball */}
      <path
        d="M7 38c10.5 1.5 22-4.5 30-24"
        stroke="#2EC4B6"
        strokeWidth="4.6"
        strokeLinecap="round"
      />
      {/* the spark at the top of the arc */}
      <path
        d="M40 3.5l1.9 4.4 4.4 1.9-4.4 1.9L40 16.1l-1.9-4.4-4.4-1.9 4.4-1.9L40 3.5z"
        fill="#FFC94D"
      />
    </svg>
  );
}

export default function BrandLogo({
  markSize = 34,
  className = "",
}: {
  markSize?: number;
  className?: string;
}) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <BrandMark size={markSize} />
      <span className="font-display font-extrabold text-xl text-deepsea leading-none">
        CoachUp <span className="text-tangerine">Kids</span>
      </span>
    </span>
  );
}
