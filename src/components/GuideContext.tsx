import { createContext, useContext } from "react";
import { GUIDES, type GuideInfo } from "../data/guides";

/** Provides the child's chosen guide to every screen without prop plumbing. */
export const GuideContext = createContext<GuideInfo>(GUIDES[0]);

export const useGuide = () => useContext(GuideContext);

/** Swap the default guide's name in story copy for the chosen guide's. */
export function personalizeText(text: string, guide: GuideInfo): string {
  return text.split("Remi").join(guide.firstName);
}
