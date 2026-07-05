/**
 * The adventure guides children can choose from. Remi the Otter is the
 * default and the brand mascot; the others give kids ownership of the
 * journey. Story copy is written with "Remi" and personalized at render
 * time by swapping in the chosen guide's first name.
 */
export interface GuideInfo {
  id: string;
  name: string;
  firstName: string;
  emoji: string;
  vibe: string;
}

export const GUIDES: GuideInfo[] = [
  { id: "remi", name: "Remi the Otter", firstName: "Remi", emoji: "🦦", vibe: "playful river explorer" },
  { id: "luna", name: "Luna the Owl", firstName: "Luna", emoji: "🦉", vibe: "wise and twinkly" },
  { id: "dash", name: "Dash the Dolphin", firstName: "Dash", emoji: "🐬", vibe: "splashy and speedy" },
  { id: "koko", name: "Koko the Koala", firstName: "Koko", emoji: "🐨", vibe: "cozy and calm" },
];

export function getGuide(id: string | undefined): GuideInfo {
  return GUIDES.find((g) => g.id === id) ?? GUIDES[0];
}
