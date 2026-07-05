/**
 * CoachUp Kids brand mark: an abstract child mid star-jump, leaping
 * above a soft bounce arc, with a spark of light at their fingertips.
 * Reads as movement, growth, confidence and joy, and stays ownable:
 * no mascots, animals, balls-with-swooshes, trophies or whistles.
 * Geometric and warm so it works for parents while staying friendly
 * to children. (Remi and the other guides remain in-app characters
 * for the child's journey; they are never the brand logo.)
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
        <linearGradient id="cuk-body" x1="10" y1="8" x2="38" y2="44" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FF9351" />
          <stop offset="1" stopColor="#FF6B6B" />
        </linearGradient>
      </defs>
      {/* bounce arc: the ground springing the jump */}
      <path
        d="M7 44 Q 24 35 41 44"
        stroke="#2EC4B6"
        strokeWidth="4.2"
        strokeLinecap="round"
      />
      {/* legs, mid star-jump */}
      <path d="M24 27.5 L15.5 39" stroke="url(#cuk-body)" strokeWidth="6.4" strokeLinecap="round" />
      <path d="M24 27.5 L32.5 39" stroke="url(#cuk-body)" strokeWidth="6.4" strokeLinecap="round" />
      {/* torso */}
      <path d="M24 17.5 L24 28" stroke="url(#cuk-body)" strokeWidth="6.8" strokeLinecap="round" />
      {/* arms thrown up in celebration */}
      <path d="M24 20 L12.5 13" stroke="url(#cuk-body)" strokeWidth="5.6" strokeLinecap="round" />
      <path d="M24 20 L35.5 13" stroke="url(#cuk-body)" strokeWidth="5.6" strokeLinecap="round" />
      {/* head as a point of light */}
      <circle cx="24" cy="9.2" r="5" fill="#FFC94D" />
      {/* spark at the fingertips: sportiness coming to light */}
      <path
        d="M41.5 5.5l1.4 3.1 3.1 1.4-3.1 1.4-1.4 3.1-1.4-3.1-3.1-1.4 3.1-1.4 1.4-3.1z"
        fill="#4CC9F0"
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
