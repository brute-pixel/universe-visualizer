import type { CelestialCategory, CelestialFact } from "../types";

export interface DeepSkyData {
  id: string;
  name: string;
  category: Extract<CelestialCategory, "galaxy" | "nebula" | "cluster">;
  /** Position in scene units (far from the solar system). */
  position: [number, number, number];
  /** Visual scale of the sprite/particle system. */
  scale: number;
  color: number;
  /** Secondary color for gradient nebulae / galaxy arms. */
  color2?: number;
  subtitle: string;
  description: string;
  facts: CelestialFact[];
}

export const DEEP_SKY: DeepSkyData[] = [
  {
    id: "andromeda",
    name: "Andromeda Galaxy",
    category: "galaxy",
    position: [-1400, 420, -1100],
    scale: 320,
    color: 0xbfd4ff,
    color2: 0xffd9b3,
    subtitle: "M31 · Nearest major galaxy to the Milky Way",
    description:
      "The Andromeda Galaxy is a barred spiral galaxy and the nearest major galaxy to the Milky Way. It is on a collision course with our galaxy and will merge with it in about 4.5 billion years.",
    facts: [
      { label: "Type", value: "Barred spiral (SA)" },
      { label: "Distance", value: "2.5 million light-years" },
      { label: "Diameter", value: "~152,000 light-years" },
      { label: "Stars", value: "~1 trillion" },
      { label: "Constellation", value: "Andromeda" },
    ],
  },
  {
    id: "whirlpool",
    name: "Whirlpool Galaxy",
    category: "galaxy",
    position: [1600, -300, -900],
    scale: 240,
    color: 0xcfe0ff,
    color2: 0xffc9a0,
    subtitle: "M51 · A classic grand-design spiral",
    description:
      "The Whirlpool Galaxy is a grand-design spiral galaxy interacting with a smaller companion galaxy. Its clearly defined spiral arms make it a favorite target for astronomers and astrophotographers.",
    facts: [
      { label: "Type", value: "Grand-design spiral" },
      { label: "Distance", value: "31 million light-years" },
      { label: "Diameter", value: "~76,000 light-years" },
      { label: "Constellation", value: "Canes Venatici" },
    ],
  },
  {
    id: "sombrero",
    name: "Sombrero Galaxy",
    category: "galaxy",
    position: [-1100, -650, 1500],
    scale: 200,
    color: 0xf0e6d2,
    color2: 0x8a7a5c,
    subtitle: "M104 · A galaxy with a brilliant bulge",
    description:
      "The Sombrero Galaxy is an unbarred spiral galaxy seen nearly edge-on, with a bright central bulge and a prominent dust lane that give it the appearance of a wide-brimmed hat.",
    facts: [
      { label: "Type", value: "Spiral (edge-on)" },
      { label: "Distance", value: "29 million light-years" },
      { label: "Diameter", value: "~49,000 light-years" },
      { label: "Constellation", value: "Virgo" },
    ],
  },
  {
    id: "orion-nebula",
    name: "Orion Nebula",
    category: "nebula",
    position: [900, 520, 1200],
    scale: 170,
    color: 0xff6f9c,
    color2: 0x6f9cff,
    subtitle: "M42 · A stellar nursery in Orion's sword",
    description:
      "The Orion Nebula is a diffuse nebula and one of the brightest, visible to the naked eye. It is a vast stellar nursery where new stars are actively being born from collapsing clouds of gas and dust.",
    facts: [
      { label: "Type", value: "Emission / reflection nebula" },
      { label: "Distance", value: "1,344 light-years" },
      { label: "Diameter", value: "~24 light-years" },
      { label: "Constellation", value: "Orion" },
    ],
  },
  {
    id: "eagle-nebula",
    name: "Eagle Nebula",
    category: "nebula",
    position: [-900, 300, 1300],
    scale: 150,
    color: 0x8fe39a,
    color2: 0xffb36b,
    subtitle: "M16 · Home of the Pillars of Creation",
    description:
      "The Eagle Nebula is a young open cluster of stars surrounded by a star-forming region. It contains the iconic 'Pillars of Creation' — towering columns of gas and dust photographed by the Hubble Space Telescope.",
    facts: [
      { label: "Type", value: "Emission nebula + cluster" },
      { label: "Distance", value: "5,700 light-years" },
      { label: "Diameter", value: "~70 light-years" },
      { label: "Constellation", value: "Serpens" },
    ],
  },
  {
    id: "helix-nebula",
    name: "Helix Nebula",
    category: "nebula",
    position: [1300, 700, 600],
    scale: 130,
    color: 0x5fd0ff,
    color2: 0xff7e6b,
    subtitle: "NGC 7293 · The 'Eye of God'",
    description:
      "The Helix Nebula is a planetary nebula — the glowing remains of a dying Sun-like star that has shed its outer layers. Its striking ring shape has earned it the nickname the 'Eye of God'.",
    facts: [
      { label: "Type", value: "Planetary nebula" },
      { label: "Distance", value: "655 light-years" },
      { label: "Diameter", value: "~2.5 light-years" },
      { label: "Constellation", value: "Aquarius" },
    ],
  },
  {
    id: "pleiades",
    name: "Pleiades",
    category: "cluster",
    position: [600, -500, -1400],
    scale: 120,
    color: 0xbcd4ff,
    color2: 0x9fb8ff,
    subtitle: "M45 · The Seven Sisters",
    description:
      "The Pleiades is an open star cluster of hot, young blue stars, among the nearest star clusters to Earth and one of the most obvious to the naked eye. It is wrapped in a faint blue reflection nebula.",
    facts: [
      { label: "Type", value: "Open star cluster" },
      { label: "Distance", value: "444 light-years" },
      { label: "Known stars", value: "~1,000" },
      { label: "Age", value: "~100 million years" },
      { label: "Constellation", value: "Taurus" },
    ],
  },
];
