import {
  AdditiveBlending,
  Color,
  Group,
  Mesh,
  MeshBasicMaterial,
  SphereGeometry,
  Sprite,
  SpriteMaterial,
} from "three";
import { STARS, type StarData } from "../data/stars";
import type { CelestialObject } from "../types";
import { glowTexture } from "./textures";

export class BrightStars {
  readonly group = new Group();
  readonly selectables: CelestialObject[] = [];
  private twinklers: { sprite: Sprite; base: number; phase: number }[] = [];

  constructor() {
    this.group.name = "bright-stars";
    for (const s of STARS) this.build(s);
  }

  private build(s: StarData): void {
    const container = new Group();
    container.position.set(...s.position);

    const core = new Mesh(
      new SphereGeometry(s.size, 24, 24),
      new MeshBasicMaterial({ color: s.color }),
    );
    core.name = s.name;
    container.add(core);

    const baseScale = s.size * 9;
    const glow = new Sprite(
      new SpriteMaterial({
        map: glowTexture(),
        color: s.color,
        transparent: true,
        opacity: 0.9,
        blending: AdditiveBlending,
        depthWrite: false,
      }),
    );
    glow.scale.setScalar(baseScale);
    container.add(glow);
    this.twinklers.push({ sprite: glow, base: baseScale, phase: Math.random() * 10 });

    const obj: CelestialObject = {
      id: s.id,
      name: s.name,
      category: "star",
      subtitle: s.subtitle,
      description: s.description,
      facts: s.facts,
      color: `#${new Color(s.color).getHexString()}`,
      anchor: container,
      focusRadius: s.size,
    };
    core.userData.celestial = obj;
    this.selectables.push(obj);
    this.group.add(container);
  }

  update(elapsed: number): void {
    for (const t of this.twinklers) {
      const f = 0.85 + Math.sin(elapsed * 2 + t.phase) * 0.15;
      t.sprite.scale.setScalar(t.base * f);
    }
  }
}
