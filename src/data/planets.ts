import type { CelestialFact } from "../types";

export interface PlanetData {
  id: string;
  name: string;
  /** Visual radius in scene units (not to real scale, tuned for readability). */
  radius: number;
  /** Orbit semi-major axis in scene units. */
  distance: number;
  /** Base color. */
  color: number;
  /** Relative orbital speed (Earth = 1, larger = faster angular motion). */
  orbitalSpeed: number;
  /** Axial spin speed (visual). */
  spinSpeed: number;
  /** Orbital inclination in degrees. */
  inclination: number;
  /** Whether to draw Saturn-like rings. */
  rings?: { inner: number; outer: number; color: number };
  /** Emissive glow factor (the Sun glows; planets do not). */
  emissive?: boolean;
  subtitle: string;
  description: string;
  facts: CelestialFact[];
}

export const SUN: PlanetData = {
  id: "sun",
  name: "Sun",
  radius: 12,
  distance: 0,
  color: 0xffcc33,
  orbitalSpeed: 0,
  spinSpeed: 0.04,
  inclination: 0,
  emissive: true,
  subtitle: "G-type main-sequence star · The heart of our Solar System",
  description:
    "The Sun is the star at the center of the Solar System. It is a nearly perfect ball of hot plasma, heated to incandescence by nuclear fusion reactions in its core, radiating the energy that makes life on Earth possible.",
  facts: [
    { label: "Type", value: "G2V Yellow Dwarf" },
    { label: "Diameter", value: "1,391,000 km" },
    { label: "Surface temp", value: "5,505 °C" },
    { label: "Core temp", value: "~15 million °C" },
    { label: "Age", value: "~4.6 billion years" },
    { label: "Mass", value: "99.86% of Solar System" },
  ],
};

export const PLANETS: PlanetData[] = [
  {
    id: "mercury",
    name: "Mercury",
    radius: 1.6,
    distance: 26,
    color: 0x9c8a7a,
    orbitalSpeed: 1.6,
    spinSpeed: 0.01,
    inclination: 7,
    subtitle: "The smallest planet · Closest to the Sun",
    description:
      "Mercury is the smallest planet in the Solar System and the closest to the Sun. Its surface is heavily cratered, resembling the Moon, and it experiences the most extreme temperature swings of any planet.",
    facts: [
      { label: "Distance from Sun", value: "57.9 million km" },
      { label: "Diameter", value: "4,879 km" },
      { label: "Day length", value: "59 Earth days" },
      { label: "Year length", value: "88 Earth days" },
      { label: "Moons", value: "0" },
    ],
  },
  {
    id: "venus",
    name: "Venus",
    radius: 2.8,
    distance: 38,
    color: 0xe8b873,
    orbitalSpeed: 1.17,
    spinSpeed: -0.006,
    inclination: 3.4,
    subtitle: "The hottest planet · Earth's twin",
    description:
      "Venus is the second planet from the Sun and the hottest in the Solar System, with a thick toxic atmosphere of carbon dioxide that traps heat in a runaway greenhouse effect. It rotates backwards relative to most planets.",
    facts: [
      { label: "Distance from Sun", value: "108.2 million km" },
      { label: "Diameter", value: "12,104 km" },
      { label: "Surface temp", value: "465 °C" },
      { label: "Year length", value: "225 Earth days" },
      { label: "Moons", value: "0" },
    ],
  },
  {
    id: "earth",
    name: "Earth",
    radius: 3,
    distance: 52,
    color: 0x3b7bd4,
    orbitalSpeed: 1,
    spinSpeed: 0.05,
    inclination: 0,
    subtitle: "Our home world · The Blue Planet",
    description:
      "Earth is the third planet from the Sun and the only known world to harbor life. About 71% of its surface is covered by water, and its atmosphere protects living things and keeps the climate stable.",
    facts: [
      { label: "Distance from Sun", value: "149.6 million km" },
      { label: "Diameter", value: "12,742 km" },
      { label: "Day length", value: "24 hours" },
      { label: "Year length", value: "365.25 days" },
      { label: "Moons", value: "1 (the Moon)" },
    ],
  },
  {
    id: "mars",
    name: "Mars",
    radius: 2.2,
    distance: 68,
    color: 0xc1440e,
    orbitalSpeed: 0.8,
    spinSpeed: 0.048,
    inclination: 1.85,
    subtitle: "The Red Planet · Future of exploration",
    description:
      "Mars is the fourth planet from the Sun, known for its reddish appearance caused by iron oxide (rust) on its surface. It hosts the tallest volcano and the deepest canyon in the Solar System and is a prime target in the search for past life.",
    facts: [
      { label: "Distance from Sun", value: "227.9 million km" },
      { label: "Diameter", value: "6,779 km" },
      { label: "Day length", value: "24.6 hours" },
      { label: "Year length", value: "687 Earth days" },
      { label: "Moons", value: "2 (Phobos, Deimos)" },
    ],
  },
  {
    id: "jupiter",
    name: "Jupiter",
    radius: 7,
    distance: 95,
    color: 0xd8a86b,
    orbitalSpeed: 0.43,
    spinSpeed: 0.1,
    inclination: 1.3,
    subtitle: "The largest planet · Gas giant",
    description:
      "Jupiter is the largest planet in the Solar System, a gas giant more than twice as massive as all the other planets combined. Its Great Red Spot is a giant storm that has raged for centuries.",
    facts: [
      { label: "Distance from Sun", value: "778.5 million km" },
      { label: "Diameter", value: "139,820 km" },
      { label: "Day length", value: "9.9 hours" },
      { label: "Year length", value: "11.9 Earth years" },
      { label: "Moons", value: "95+ (Io, Europa, ...)" },
    ],
  },
  {
    id: "saturn",
    name: "Saturn",
    radius: 6,
    distance: 122,
    color: 0xe3c98f,
    orbitalSpeed: 0.32,
    spinSpeed: 0.09,
    inclination: 2.5,
    rings: { inner: 8, outer: 13, color: 0xcbb78f },
    subtitle: "The ringed jewel · Gas giant",
    description:
      "Saturn is the sixth planet from the Sun and is famous for its spectacular ring system, made of countless ice and rock particles. It is the least dense planet — it would float in water.",
    facts: [
      { label: "Distance from Sun", value: "1.43 billion km" },
      { label: "Diameter", value: "116,460 km" },
      { label: "Day length", value: "10.7 hours" },
      { label: "Year length", value: "29.5 Earth years" },
      { label: "Moons", value: "146+ (Titan, ...)" },
    ],
  },
  {
    id: "uranus",
    name: "Uranus",
    radius: 4.4,
    distance: 148,
    color: 0x9fe3e0,
    orbitalSpeed: 0.23,
    spinSpeed: 0.07,
    inclination: 0.77,
    rings: { inner: 6, outer: 8, color: 0x88c5c5 },
    subtitle: "The ice giant that rolls on its side",
    description:
      "Uranus is the seventh planet from the Sun, an ice giant tilted so far on its axis that it essentially orbits the Sun on its side. Its pale blue-green color comes from methane in its atmosphere.",
    facts: [
      { label: "Distance from Sun", value: "2.87 billion km" },
      { label: "Diameter", value: "50,724 km" },
      { label: "Axial tilt", value: "98° (sideways)" },
      { label: "Year length", value: "84 Earth years" },
      { label: "Moons", value: "27+" },
    ],
  },
  {
    id: "neptune",
    name: "Neptune",
    radius: 4.2,
    distance: 172,
    color: 0x3b5bdb,
    orbitalSpeed: 0.18,
    spinSpeed: 0.072,
    inclination: 1.77,
    subtitle: "The windiest world · Farthest planet",
    description:
      "Neptune is the eighth and farthest known planet from the Sun. This deep blue ice giant has the strongest winds in the Solar System, reaching speeds of over 2,000 km/h.",
    facts: [
      { label: "Distance from Sun", value: "4.50 billion km" },
      { label: "Diameter", value: "49,244 km" },
      { label: "Day length", value: "16 hours" },
      { label: "Year length", value: "165 Earth years" },
      { label: "Moons", value: "14+ (Triton, ...)" },
    ],
  },
];
