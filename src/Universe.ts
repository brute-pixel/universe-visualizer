import {
  AmbientLight,
  Clock,
  Object3D,
  Raycaster,
  Vector2,
  Vector3,
} from "three";
import { SceneManager } from "./scene/SceneManager";
import { createStarfield } from "./scene/Starfield";
import { SolarSystem } from "./scene/SolarSystem";
import { DeepSky } from "./scene/DeepSky";
import { BrightStars } from "./scene/BrightStars";
import { UI } from "./ui/UI";
import type { CelestialObject } from "./types";

interface CameraTween {
  fromPos: Vector3;
  toPos: Vector3;
  fromTarget: Vector3;
  toTarget: Vector3;
  start: number;
  duration: number;
}

export class Universe {
  private sm: SceneManager;
  private clock = new Clock();
  private solar: SolarSystem;
  private deep: DeepSky;
  private stars: BrightStars;
  private ui: UI;

  private raycaster = new Raycaster();
  private pointer = new Vector2();
  private hitMeshes: Object3D[] = [];
  private objects: CelestialObject[] = [];

  private tween: CameraTween | null = null;
  private motion = true;
  private lastPointer = { x: 0, y: 0 };

  private home = {
    pos: new Vector3(0, 90, 230),
    target: new Vector3(0, 0, 0),
  };

  private tour: CelestialObject[] = [];
  private tourIndex = 0;
  private tourTimer: number | null = null;

  constructor(canvas: HTMLCanvasElement) {
    this.sm = new SceneManager(canvas);
    this.sm.scene.add(new AmbientLight(0x556090, 0.25));
    this.sm.scene.add(createStarfield());

    this.solar = new SolarSystem();
    this.deep = new DeepSky();
    this.stars = new BrightStars();
    this.sm.scene.add(this.solar.group, this.deep.group, this.stars.group);

    this.objects = [
      ...this.solar.selectables,
      ...this.stars.selectables,
      ...this.deep.selectables,
    ];
    this.collectHitMeshes();

    this.ui = new UI({
      onSelect: (o) => this.select(o, true),
      onFocus: (o) => this.focus(o),
      onReset: () => this.resetView(),
      onTour: () => this.toggleTour(),
      onToggleMotion: (on) => (this.motion = on),
    });
    this.ui.init(this.objects);

    this.bindPointer(canvas);
    this.animate();
    this.hideLoader();
  }

  private collectHitMeshes(): void {
    this.sm.scene.traverse((o) => {
      if (o.userData && o.userData.celestial) this.hitMeshes.push(o);
    });
  }

  private bindPointer(canvas: HTMLCanvasElement): void {
    let downX = 0;
    let downY = 0;
    canvas.addEventListener("pointerdown", (e) => {
      downX = e.clientX;
      downY = e.clientY;
    });
    canvas.addEventListener("pointerup", (e) => {
      const moved = Math.hypot(e.clientX - downX, e.clientY - downY);
      if (moved < 6) this.handleClick(e);
    });
    canvas.addEventListener("pointermove", (e) => {
      this.lastPointer = { x: e.clientX, y: e.clientY };
    });
  }

  private updatePointer(x: number, y: number): void {
    this.pointer.x = (x / window.innerWidth) * 2 - 1;
    this.pointer.y = -(y / window.innerHeight) * 2 + 1;
  }

  private pick(): CelestialObject | null {
    this.raycaster.setFromCamera(this.pointer, this.sm.camera);
    const hits = this.raycaster.intersectObjects(this.hitMeshes, false);
    if (hits.length === 0) return null;
    return (hits[0].object.userData.celestial as CelestialObject) ?? null;
  }

  private handleClick(e: PointerEvent): void {
    this.updatePointer(e.clientX, e.clientY);
    const obj = this.pick();
    if (obj) this.select(obj, true);
  }

  private select(obj: CelestialObject, fly: boolean): void {
    this.ui.showPanel(obj);
    if (fly) this.focus(obj);
  }

  private focus(obj: CelestialObject): void {
    if (!obj.anchor) return;
    const target = new Vector3();
    obj.anchor.getWorldPosition(target);
    const radius = obj.focusRadius ?? 10;
    const dist = Math.max(radius * 4.5, 26);

    // Approach from the current viewing direction for a natural move.
    const dir = new Vector3()
      .subVectors(this.sm.camera.position, this.sm.controls.target)
      .normalize();
    if (dir.lengthSq() < 1e-4) dir.set(0, 0.4, 1).normalize();
    const toPos = new Vector3().copy(target).add(dir.multiplyScalar(dist));
    toPos.y += radius * 1.2;

    this.startTween(toPos, target, 1.5);
  }

  private startTween(toPos: Vector3, toTarget: Vector3, duration: number): void {
    this.tween = {
      fromPos: this.sm.camera.position.clone(),
      toPos,
      fromTarget: this.sm.controls.target.clone(),
      toTarget,
      start: this.clock.getElapsedTime(),
      duration,
    };
  }

  private resetView(): void {
    this.stopTour();
    this.startTween(this.home.pos.clone(), this.home.target.clone(), 1.6);
  }

  private toggleTour(): void {
    if (this.tourTimer !== null) {
      this.stopTour();
      return;
    }
    this.tour = [
      this.byId("sun"),
      this.byId("earth"),
      this.byId("saturn"),
      this.byId("betelgeuse"),
      this.byId("orion-nebula"),
      this.byId("andromeda"),
      this.byId("pleiades"),
    ].filter((o): o is CelestialObject => Boolean(o));
    this.tourIndex = 0;
    this.runTourStep();
  }

  private runTourStep(): void {
    if (this.tourIndex >= this.tour.length) {
      this.stopTour();
      this.resetView();
      return;
    }
    const obj = this.tour[this.tourIndex++];
    this.select(obj, true);
    this.tourTimer = window.setTimeout(() => this.runTourStep(), 5200);
  }

  private stopTour(): void {
    if (this.tourTimer !== null) {
      clearTimeout(this.tourTimer);
      this.tourTimer = null;
    }
  }

  private byId(id: string): CelestialObject | undefined {
    return this.objects.find((o) => o.id === id);
  }

  private updateTween(now: number): void {
    if (!this.tween) return;
    const t = Math.min((now - this.tween.start) / this.tween.duration, 1);
    const e = t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2; // easeInOut
    this.sm.camera.position.lerpVectors(this.tween.fromPos, this.tween.toPos, e);
    this.sm.controls.target.lerpVectors(this.tween.fromTarget, this.tween.toTarget, e);
    if (t >= 1) this.tween = null;
  }

  private updateHover(): void {
    if (this.tween) {
      this.ui.hideTooltip();
      return;
    }
    this.updatePointer(this.lastPointer.x, this.lastPointer.y);
    const obj = this.pick();
    const canvas = this.sm.renderer.domElement;
    if (obj) {
      canvas.style.cursor = "pointer";
      this.ui.showTooltip(obj.name, this.lastPointer.x, this.lastPointer.y);
    } else {
      canvas.style.cursor = "grab";
      this.ui.hideTooltip();
    }
  }

  private animate = (): void => {
    requestAnimationFrame(this.animate);
    const delta = this.clock.getDelta();
    const elapsed = this.clock.getElapsedTime();

    if (this.motion) this.solar.update(delta, elapsed);
    this.deep.update(delta);
    this.stars.update(elapsed);

    this.updateTween(elapsed);
    this.updateHover();
    this.sm.render();
  };

  private hideLoader(): void {
    const loader = document.getElementById("loader");
    if (!loader) return;
    window.setTimeout(() => {
      loader.classList.add("fade");
      window.setTimeout(() => loader.classList.add("hidden"), 800);
    }, 600);
  }
}
