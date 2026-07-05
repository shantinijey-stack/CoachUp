import { motion, useReducedMotion } from "framer-motion";

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

/**
 * Animated hero variant for the landing page only: the star kid skips
 * rope. The rope swings from overhead to under the feet on a loop, and
 * the figure hops in time with it. Falls back to the static mark when
 * the visitor prefers reduced motion. Inner pages use the static
 * BrandMark so the brand stays calm at small sizes.
 */
export function AnimatedBrandMark({ size = 96 }: { size?: number }) {
  const reduced = useReducedMotion();
  if (reduced) return <BrandMark size={size} />;

  // Rope endpoints sit at the figure's hands; the arc swings between
  // just over the head and just under the feet, staying inside the
  // frame so it reads clearly as skipping at any size.
  const ROPE_TOP = "M12.5 13 Q 24 1 35.5 13";
  const ROPE_BOTTOM = "M12.5 13 Q 24 46 35.5 13";
  const DUR = 0.9;

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      role="img"
      aria-label="CoachUp Kids logo: a star kid skipping rope"
      style={{ overflow: "visible" }}
    >
      <defs>
        <linearGradient id="cuk-body-anim" x1="10" y1="8" x2="38" y2="44" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FF9351" />
          <stop offset="1" stopColor="#FF6B6B" />
        </linearGradient>
      </defs>
      {/* bounce arc: the ground springing the jump */}
      <path d="M7 44 Q 24 35 41 44" stroke="#2EC4B6" strokeWidth="4.2" strokeLinecap="round" />
      {/* the skipping rope, in motion */}
      <motion.path
        d={ROPE_TOP}
        stroke="#1B4965"
        strokeWidth="2.6"
        strokeLinecap="round"
        fill="none"
        opacity="0.9"
        initial={{ d: ROPE_TOP }}
        animate={{ d: [ROPE_TOP, ROPE_BOTTOM, ROPE_TOP] }}
        transition={{ repeat: Infinity, duration: DUR, ease: "easeInOut", times: [0, 0.5, 1] }}
      />
      {/* the star kid, hopping in time with the rope */}
      <motion.g
        animate={{ y: [0, 0, -4.5, 0] }}
        transition={{ repeat: Infinity, duration: DUR, ease: "easeInOut", times: [0, 0.32, 0.55, 0.82] }}
      >
        <path d="M24 27.5 L15.5 39" stroke="url(#cuk-body-anim)" strokeWidth="6.4" strokeLinecap="round" />
        <path d="M24 27.5 L32.5 39" stroke="url(#cuk-body-anim)" strokeWidth="6.4" strokeLinecap="round" />
        <path d="M24 17.5 L24 28" stroke="url(#cuk-body-anim)" strokeWidth="6.8" strokeLinecap="round" />
        <path d="M24 20 L12.5 13" stroke="url(#cuk-body-anim)" strokeWidth="5.6" strokeLinecap="round" />
        <path d="M24 20 L35.5 13" stroke="url(#cuk-body-anim)" strokeWidth="5.6" strokeLinecap="round" />
        <circle cx="24" cy="9.2" r="5" fill="#FFC94D" />
      </motion.g>
      {/* spark at the fingertips */}
      <motion.path
        d="M41.5 5.5l1.4 3.1 3.1 1.4-3.1 1.4-1.4 3.1-1.4-3.1-3.1-1.4 3.1-1.4 1.4-3.1z"
        fill="#4CC9F0"
        animate={{ scale: [1, 1.25, 1], rotate: [0, 12, 0] }}
        transition={{ repeat: Infinity, duration: DUR * 2, ease: "easeInOut" }}
        style={{ transformOrigin: "41.5px 10.5px" }}
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
