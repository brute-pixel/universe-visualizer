import {
  AdditiveBlending,
  BufferGeometry,
  Color,
  Float32BufferAttribute,
  Group,
  Mesh,
  MeshBasicMaterial,
  Points,
  PointsMaterial,
  SphereGeometry,
  Sprite,
  SpriteMaterial,
} from "three";
import { DEEP_SKY, type DeepSkyData } from "../data/deepSky";
import type { CelestialObject } from "../types";
import { glowTexture, nebulaTexture, starPointTexture } from "./textures";

export class DeepSky {
  readonly group = new Group();
  readonly selectables: CelestialObject[] = [];
  private spinners: { obj: Points; speed: number }[] = [];

  constructor() {
    this.group.name = "deep-sky";
    for (const d of DEEP_SKY) this.build(d);
  }

  private build(d: DeepSkyData): void {
    const container = new Group();
    container.position.set(...d.position);

    let visual: Points;
    if (d.category === "galaxy") {
      visual = this.makeGalaxy(d);
      this.spinners.push({ obj: visual, speed: 0.02 + Math.random() * 0.03 });
    } else if (d.category === "nebula") {
      visual = this.makeNebula(d);
    } else {
      visual = this.makeCluster(d);
    }
    container.add(visual);

    // Soft core glow.
    const glow = new Sprite(
      new SpriteMaterial({
        map: glowTexture(),
        color: d.color,
        transparent: true,
        opacity: 0.5,
        blending: AdditiveBlending,
        depthWrite: false,
      }),
    );
    glow.scale.setScalar(d.scale * 1.6);
    container.add(glow);

    // Invisible hit sphere makes the whole object easy to click.
    const hit = new Mesh(
      new SphereGeometry(d.scale * 0.9, 16, 16),
      new MeshBasicMaterial({ visible: false }),
    );
    hit.name = d.name;
    container.add(hit);

    const obj: CelestialObject = {
      id: d.id,
      name: d.name,
      category: d.category,
      subtitle: d.subtitle,
      description: d.description,
      facts: d.facts,
      color: `#${new Color(d.color).getHexString()}`,
      anchor: container,
      focusRadius: d.scale,
    };
    hit.userData.celestial = obj;
    this.selectables.push(obj);
    this.group.add(container);
  }

  private makeGalaxy(d: DeepSkyData): Points {
    const count = 6000;
    const arms = 4;
    const positions: number[] = [];
    const colors: number[] = [];
    const inner = new Color(d.color2 ?? 0xffe6c0);
    const outer = new Color(d.color);

    for (let i = 0; i < count; i++) {
      const t = Math.pow(Math.random(), 0.6);
      const radius = t * d.scale;
      const arm = Math.floor(Math.random() * arms);
      const armOffset = (arm / arms) * Math.PI * 2;
      const spin = t * 5;
      const spread = (1 - t) * 0.6 + 0.08;
      const angle = armOffset + spin + (Math.random() - 0.5) * spread;
      const x = Math.cos(angle) * radius + (Math.random() - 0.5) * radius * 0.08;
      const z = Math.sin(angle) * radius + (Math.random() - 0.5) * radius * 0.08;
      const y = (Math.random() - 0.5) * d.scale * 0.06 * (1 - t * 0.8);
      positions.push(x, y, z);
      const c = inner.clone().lerp(outer, t);
      colors.push(c.r, c.g, c.b);
    }

    return this.points(positions, colors, d.scale * 0.012, starPointTexture());
  }

  private makeNebula(d: DeepSkyData): Points {
    const count = 4000;
    const positions: number[] = [];
    const colors: number[] = [];
    const a = new Color(d.color);
    const b = new Color(d.color2 ?? d.color);
    for (let i = 0; i < count; i++) {
      // Cluster into a couple of lobes for an organic cloud shape.
      const lobe = Math.random() < 0.5 ? -1 : 1;
      const r = Math.pow(Math.random(), 0.5) * d.scale;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      positions.push(
        r * Math.sin(phi) * Math.cos(theta) + lobe * d.scale * 0.25,
        r * Math.sin(phi) * Math.sin(theta) * 0.7,
        r * Math.cos(phi),
      );
      const c = a.clone().lerp(b, Math.random());
      colors.push(c.r, c.g, c.b);
    }
    return this.points(positions, colors, d.scale * 0.05, nebulaTexture());
  }

  private makeCluster(d: DeepSkyData): Points {
    const count = 900;
    const positions: number[] = [];
    const colors: number[] = [];
    const base = new Color(d.color);
    for (let i = 0; i < count; i++) {
      const r = Math.pow(Math.random(), 0.4) * d.scale;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      positions.push(
        r * Math.sin(phi) * Math.cos(theta),
        r * Math.sin(phi) * Math.sin(theta),
        r * Math.cos(phi),
      );
      const c = base.clone().offsetHSL(0, 0, (Math.random() - 0.5) * 0.3);
      colors.push(c.r, c.g, c.b);
    }
    return this.points(positions, colors, d.scale * 0.03, starPointTexture());
  }

  private points(
    positions: number[],
    colors: number[],
    size: number,
    map: ReturnType<typeof glowTexture>,
  ): Points {
    const geo = new BufferGeometry();
    geo.setAttribute("position", new Float32BufferAttribute(positions, 3));
    geo.setAttribute("color", new Float32BufferAttribute(colors, 3));
    const mat = new PointsMaterial({
      size,
      map,
      vertexColors: true,
      transparent: true,
      depthWrite: false,
      blending: AdditiveBlending,
      sizeAttenuation: true,
    });
    return new Points(geo, mat);
  }

  update(delta: number): void {
    for (const s of this.spinners) s.obj.rotation.y += s.speed * delta;
  }
}
