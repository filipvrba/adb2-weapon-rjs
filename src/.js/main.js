import "../css/style.css";
import * as Three from "three";
import { Scene } from "./scene";
import { Renderer } from "./renderer";
import { sizes, resize, update } from "./window";
import { Camera } from "./camera";
import { Weapon } from "./weapon";
import { UPDATE } from "./constants";
import { UI } from "./ui";
document.querySelector("#app").innerHTML = "<canvas class='webgl'></canvas>";
let canvas = document.querySelector("canvas.webgl");
let scene = new Scene;
scene.add_light;
let renderer = new Renderer(canvas);
renderer.update_resize(sizes);
let camera = new Camera(sizes);
scene.add(camera);
let weapon = new Weapon;
scene.add(weapon);
let ui = new UI;
scene.add(ui);

resize(() => {
  camera.update_resize(sizes);
  renderer.update_resize(sizes)
});

update((dt) => {
  renderer.render(scene, camera);
  weapon.dispatchEvent({type: UPDATE, dt})
})