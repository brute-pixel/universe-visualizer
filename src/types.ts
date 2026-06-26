import type { Object3D } from "three";

export type CelestialCategory =
  | "star"
  | "planet"
  | "moon"
  | "dwarf"
  | "galaxy"
  | "nebula"
  | "cluster";

export interface CelestialFact {
  label: string;
  value: string;
}

export interface CelestialObject {
  id: string;
  name: string;
  category: CelestialCategory;
  /** Short tagline shown under the name. */
  subtitle: string;
  /** Longer descriptive paragraph. */
  description: string;
  /** Key/value facts shown in the info panel. */
  facts: CelestialFact[];
  /** Accent color used for UI + glow, as a CSS/hex string. */
  color: string;
  /** Populated at runtime: the 3D object used for focusing the camera. */
  anchor?: Object3D;
  /** Approximate world-space radius used when framing the camera. */
  focusRadius?: number;
}
