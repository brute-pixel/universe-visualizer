import "./style.css";
import { Universe } from "./Universe";

const canvas = document.getElementById("scene");
if (!(canvas instanceof HTMLCanvasElement)) {
  throw new Error("Canvas #scene not found");
}

new Universe(canvas);
