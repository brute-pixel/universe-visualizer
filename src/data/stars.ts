import type { CelestialFact } from "../types";

export interface StarData {
  id: string;
  name: string;
  /** Position in scene units. */
  position: [number, number, number];
  /** Visual radius of the star marker. */
  size: number;
  color: number;
  subtitle: string;
  description: string;
  facts: CelestialFact[];
}

/**
 * A curated set of famous bright/nearby stars. Positions are arranged for a
 * pleasing layout rather than precise astrometry, but distances and facts are
 * real.
 */
export const STARS: StarData[] = [
  {
    id: "sirius",
    name: "Sirius",
    position: [340, 120, -260],
    size: 4.2,
    color: 0xcfe6ff,
    subtitle: "The brightest star in the night sky",
    description:
      "Sirius, the 'Dog Star', is the brightest star in Earth's night sky. It is actually a binary system: a brilliant main-sequence star and a faint white dwarf companion called Sirius B.",
    facts: [
      { label: "Constellation", value: "Canis Major" },
      { label: "Distance", value: "8.6 light-years" },
      { label: "Type", value: "A1V + white dwarf" },
      { label: "Luminosity", value: "25× the Sun" },
    ],
  },
  {
    id: "betelgeuse",
    name: "Betelgeuse",
    position: [-380, 200, -180],
    size: 6.5,
    color: 0xff6a3c,
    subtitle: "A red supergiant nearing the end of its life",
    description:
      "Betelgeuse is a red supergiant in the constellation Orion, one of the largest and most luminous stars visible to the naked eye. It is expected to explode as a supernova within the next 100,000 years.",
    facts: [
      { label: "Constellation", value: "Orion" },
      { label: "Distance", value: "~640 light-years" },
      { label: "Type", value: "Red supergiant (M1-2)" },
      { label: "Radius", value: "~764× the Sun" },
    ],
  },
  {
    id: "rigel",
    name: "Rigel",
    position: [-300, -160, 320],
    size: 5.2,
    color: 0xaecbff,
    subtitle: "A blue supergiant beacon in Orion",
    description:
      "Rigel is a blue supergiant, the brightest star in the constellation Orion. It is intrinsically one of the most luminous stars known, shining with the power of tens of thousands of Suns.",
    facts: [
      { label: "Constellation", value: "Orion" },
      { label: "Distance", value: "~860 light-years" },
      { label: "Type", value: "Blue supergiant (B8)" },
      { label: "Luminosity", value: "~120,000× the Sun" },
    ],
  },
  {
    id: "vega",
    name: "Vega",
    position: [260, 300, 240],
    size: 4.6,
    color: 0xdbe7ff,
    subtitle: "The former and future North Star",
    description:
      "Vega is the brightest star in the constellation Lyra and was the northern pole star around 12,000 BCE. It is one of the most studied stars and was the first (other than the Sun) to be photographed.",
    facts: [
      { label: "Constellation", value: "Lyra" },
      { label: "Distance", value: "25 light-years" },
      { label: "Type", value: "A0V (white)" },
      { label: "Luminosity", value: "40× the Sun" },
    ],
  },
  {
    id: "antares",
    name: "Antares",
    position: [420, -240, 120],
    size: 6.2,
    color: 0xff7546,
    subtitle: "The 'heart of the scorpion'",
    description:
      "Antares is a red supergiant and the brightest star in the constellation Scorpius. Its name means 'rival of Mars' because of its similar reddish hue. It is so large it would engulf the orbit of Mars.",
    facts: [
      { label: "Constellation", value: "Scorpius" },
      { label: "Distance", value: "~550 light-years" },
      { label: "Type", value: "Red supergiant (M1.5)" },
      { label: "Radius", value: "~680× the Sun" },
    ],
  },
  {
    id: "proxima",
    name: "Proxima Centauri",
    position: [150, -90, 190],
    size: 2.6,
    color: 0xff9a5c,
    subtitle: "The closest star to the Sun",
    description:
      "Proxima Centauri is a small, faint red dwarf and the closest known star to the Sun. It hosts Proxima b, an Earth-sized exoplanet orbiting within its habitable zone.",
    facts: [
      { label: "Constellation", value: "Centaurus" },
      { label: "Distance", value: "4.24 light-years" },
      { label: "Type", value: "Red dwarf (M5.5)" },
      { label: "Planets", value: "At least 2 (Proxima b, d)" },
    ],
  },
  {
    id: "polaris",
    name: "Polaris",
    position: [-120, 360, -120],
    size: 4.8,
    color: 0xfff0d6,
    subtitle: "The North Star",
    description:
      "Polaris is the current northern pole star, sitting almost directly above Earth's north pole. Because it barely moves in the sky, it has guided navigators for centuries. It is a yellow supergiant.",
    facts: [
      { label: "Constellation", value: "Ursa Minor" },
      { label: "Distance", value: "~433 light-years" },
      { label: "Type", value: "Yellow supergiant (F7)" },
      { label: "Luminosity", value: "~1,260× the Sun" },
    ],
  },
  {
    id: "aldebaran",
    name: "Aldebaran",
    position: [-420, -60, -300],
    size: 5,
    color: 0xffac5e,
    subtitle: "The fiery eye of Taurus the Bull",
    description:
      "Aldebaran is an orange giant star, the brightest in the constellation Taurus. It appears to lie among the Hyades cluster but is actually much closer to us, marking the eye of the celestial bull.",
    facts: [
      { label: "Constellation", value: "Taurus" },
      { label: "Distance", value: "65 light-years" },
      { label: "Type", value: "Orange giant (K5)" },
      { label: "Radius", value: "~44× the Sun" },
    ],
  },
];
