import {
  AdditiveBlending,
  BackSide,
  BufferGeometry,
  DoubleSide,
  Float32BufferAttribute,
  Group,
  LineBasicMaterial,
  LineLoop,
  Mesh,
  MeshBasicMaterial,
  MeshStandardMaterial,
  PointLight,
  RingGeometry,
  SphereGeometry,
  Sprite,
  SpriteMaterial,
  Color,
} from "three";
import { PLANETS, SUN, type PlanetData } from "../data/planets";
import type { CelestialObject } from "../types";
import { glowTexture } from "./textures";

interface OrbitingBody {
  pivot: Group;
  mesh: Mesh;
  data: PlanetData;
  angle: number;
}

export class SolarSystem {
  readonly group = new Group();
  private bodies: OrbitingBody[] = [];
  private sunMesh!: Mesh;
  readonly selectables: CelestialObject[] = [];

  constructor() {
    this.group.name = "solar-system";
    this.buildSun();
    for (const p of PLANETS) this.buildPlanet(p);
  }

  private buildSun(): void {
    const geo = new SphereGeometry(SUN.radius, 64, 64);
    const mat = new MeshBasicMaterial({ color: SUN.color });
    this.sunMesh = new Mesh(geo, mat);
    this.sunMesh.name = SUN.name;

    // Outer glow halo.
    const halo = new Sprite(
      new SpriteMaterial({
        map: glowTexture(),
        color: 0xffd27a,
        transparent: true,
        blending: AdditiveBlending,
        depthWrite: false,
      }),
    );
    halo.scale.setScalar(SUN.radius * 7);
    this.sunMesh.add(halo);

    const light = new PointLight(0xfff2d6, 4, 0, 0.6);
    this.sunMesh.add(light);

    const obj = this.toCelestial(SUN, this.sunMesh);
    this.sunMesh.userData.celestial = obj;
    this.selectables.push(obj);
    this.group.add(this.sunMesh);
  }

  private buildPlanet(p: PlanetData): void {
    const pivot = new Group();
    pivot.rotation.x = (p.inclination * Math.PI) / 180;

    const geo = new SphereGeometry(p.radius, 48, 48);
    const mat = new MeshStandardMaterial({
      color: p.color,
      roughness: 0.85,
      metalness: 0.1,
      emissive: new Color(p.color).multiplyScalar(0.06),
    });
    const mesh = new Mesh(geo, mat);
    mesh.name = p.name;
    mesh.position.x = p.distance;

    if (p.rings) {
      const ring = new Mesh(
        new RingGeometry(p.rings.inner, p.rings.outer, 96),
        new MeshBasicMaterial({
          color: p.rings.color,
          side: DoubleSide,
          transparent: true,
          opacity: 0.7,
        }),
      );
      ring.rotation.x = Math.PI / 2.2;
      mesh.add(ring);
    }

    // Subtle atmosphere shell for a richer look.
    const atmo = new Mesh(
      new SphereGeometry(p.radius * 1.12, 32, 32),
      new MeshBasicMaterial({
        color: p.color,
        transparent: true,
        opacity: 0.12,
        side: BackSide,
        blending: AdditiveBlending,
        depthWrite: false,
      }),
    );
    mesh.add(atmo);

    pivot.add(mesh);
    this.group.add(pivot);
    this.group.add(this.makeOrbitLine(p.distance, p.inclination));

    const obj = this.toCelestial(p, mesh);
    obj.focusRadius = p.radius;
    mesh.userData.celestial = obj;
    this.selectables.push(obj);

    this.bodies.push({ pivot, mesh, data: p, angle: Math.random() * Math.PI * 2 });
  }

  private makeOrbitLine(distance: number, inclination: number): LineLoop {
    const segments = 160;
    const pts: number[] = [];
    for (let i = 0; i <= segments; i++) {
      const a = (i / segments) * Math.PI * 2;
      pts.push(Math.cos(a) * distance, 0, Math.sin(a) * distance);
    }
    const geo = new BufferGeometry();
    geo.setAttribute("position", new Float32BufferAttribute(pts, 3));
    const line = new LineLoop(
      geo,
      new LineBasicMaterial({ color: 0x4a5a86, transparent: true, opacity: 0.35 }),
    );
    line.rotation.x = (inclination * Math.PI) / 180;
    return line;
  }

  private toCelestial(p: PlanetData, mesh: Mesh): CelestialObject {
    return {
      id: p.id,
      name: p.name,
      category: p.id === "sun" ? "star" : "planet",
      subtitle: p.subtitle,
      description: p.description,
      facts: p.facts,
      color: `#${new Color(p.color).getHexString()}`,
      anchor: mesh,
      focusRadius: p.radius,
    };
  }

  update(delta: number, elapsed: number): void {
    this.sunMesh.rotation.y += SUN.spinSpeed * delta;
    for (const b of this.bodies) {
      b.angle += b.data.orbitalSpeed * delta * 0.18;
      b.mesh.position.set(
        Math.cos(b.angle) * b.data.distance,
        0,
        Math.sin(b.angle) * b.data.distance,
      );
      b.mesh.rotation.y += b.data.spinSpeed * delta * 4;
    }
    void elapsed;
  }
}
