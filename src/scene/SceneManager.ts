import {
  Color,
  PerspectiveCamera,
  Scene,
  Vector2,
  WebGLRenderer,
} from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { EffectComposer } from "three/addons/postprocessing/EffectComposer.js";
import { RenderPass } from "three/addons/postprocessing/RenderPass.js";
import { UnrealBloomPass } from "three/addons/postprocessing/UnrealBloomPass.js";
import { OutputPass } from "three/addons/postprocessing/OutputPass.js";

export class SceneManager {
  readonly scene: Scene;
  readonly camera: PerspectiveCamera;
  readonly renderer: WebGLRenderer;
  readonly controls: OrbitControls;
  readonly composer: EffectComposer;

  private readonly maxPixelRatio: number;
  private renderScale = 1;

  constructor(canvas: HTMLCanvasElement) {
    this.scene = new Scene();
    this.scene.background = new Color(0x02030a);

    this.camera = new PerspectiveCamera(
      55,
      window.innerWidth / window.innerHeight,
      0.1,
      60000,
    );
    this.camera.position.set(0, 90, 230);

    this.renderer = new WebGLRenderer({
      canvas,
      antialias: true,
      powerPreference: "high-performance",
    });
    this.maxPixelRatio = Math.min(window.devicePixelRatio, 1.5);
    this.renderer.setPixelRatio(this.maxPixelRatio);
    this.renderer.setSize(window.innerWidth, window.innerHeight);

    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.enableDamping = true;
    this.controls.dampingFactor = 0.06;
    this.controls.rotateSpeed = 0.55;
    this.controls.zoomSpeed = 0.9;
    this.controls.panSpeed = 0.6;
    this.controls.minDistance = 18;
    this.controls.maxDistance = 18000;

    this.composer = new EffectComposer(this.renderer);
    this.composer.addPass(new RenderPass(this.scene, this.camera));
    const bloom = new UnrealBloomPass(
      new Vector2(window.innerWidth, window.innerHeight),
      0.9, // strength
      0.6, // radius
      0.05, // threshold
    );
    this.composer.addPass(bloom);
    this.composer.addPass(new OutputPass());
    this.composer.setPixelRatio(this.maxPixelRatio);

    window.addEventListener("resize", this.onResize);
  }

  /**
   * Lower the effective resolution on slow devices. `scale` in (0, 1].
   * Applied on top of the capped device pixel ratio so the expensive bloom
   * pass renders fewer pixels when the frame rate drops.
   */
  setRenderScale(scale: number): void {
    const clamped = Math.max(0.5, Math.min(1, scale));
    if (Math.abs(clamped - this.renderScale) < 0.01) return;
    this.renderScale = clamped;
    const ratio = this.maxPixelRatio * clamped;
    this.renderer.setPixelRatio(ratio);
    this.composer.setPixelRatio(ratio);
  }

  private onResize = (): void => {
    const w = window.innerWidth;
    const h = window.innerHeight;
    this.camera.aspect = w / h;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(w, h);
    this.composer.setSize(w, h);
  };

  render(): void {
    this.controls.update();
    this.composer.render();
  }

  dispose(): void {
    window.removeEventListener("resize", this.onResize);
    this.controls.dispose();
    this.renderer.dispose();
  }
}
