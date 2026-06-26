import {
  AdditiveBlending,
  BufferGeometry,
  Color,
  Float32BufferAttribute,
  Points,
  PointsMaterial,
} from "three";
import { starPointTexture } from "./textures";

/**
 * A deep background field of stars filling a large spherical shell so the user
 * is always surrounded by stars regardless of zoom level.
 */
export function createStarfield(count = 9000): Points {
  const positions: number[] = [];
  const colors: number[] = [];
  const palette = [
    new Color(0xffffff),
    new Color(0xbcd2ff),
    new Color(0xfff4d6),
    new Color(0xffd6a8),
    new Color(0xd8e6ff),
  ];

  for (let i = 0; i < count; i++) {
    // Distribute uniformly on a thick spherical shell.
    const r = 6000 + Math.random() * 14000;
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(2 * Math.random() - 1);
    positions.push(
      r * Math.sin(phi) * Math.cos(theta),
      r * Math.sin(phi) * Math.sin(theta),
      r * Math.cos(phi),
    );
    const c = palette[Math.floor(Math.random() * palette.length)];
    const tw = 0.5 + Math.random() * 0.5;
    colors.push(c.r * tw, c.g * tw, c.b * tw);
  }

  const geometry = new BufferGeometry();
  geometry.setAttribute("position", new Float32BufferAttribute(positions, 3));
  geometry.setAttribute("color", new Float32BufferAttribute(colors, 3));

  const material = new PointsMaterial({
    size: 60,
    map: starPointTexture(),
    vertexColors: true,
    transparent: true,
    depthWrite: false,
    blending: AdditiveBlending,
    sizeAttenuation: true,
  });

  const points = new Points(geometry, material);
  points.name = "starfield";
  points.renderOrder = -1;
  return points;
}
