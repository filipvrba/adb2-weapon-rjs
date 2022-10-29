import "../css/style.css";
import * as Three from "three";
import { Scene } from "./scene";
import { Renderer } from "./renderer";
import { sizes, resize, update } from "./window";
import { Camera } from "./camera";
import { Weapon } from "./weapon";
import { UPDATE } from "./constants";
import { GUI } from "lil-gui";
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

resize(() => {
  camera.update_resize(sizes);
  renderer.update_resize(sizes)
});

update((dt) => {
  renderer.render(scene, camera);
  weapon.dispatchEvent({type: UPDATE, dt})
});

let weapon_action = {
  draw() {
    return weapon.play_anim("draw", Three.LoopOnce)
  },

  idle() {
    return weapon.play_anim("idle")
  },

  reload() {
    return weapon.play_anim("reload", Three.LoopOnce)
  },

  shoot() {
    return weapon.play_anim("shoot")
  }
};

let gui = new GUI;
gui.add(weapon_action, "draw");
gui.add(weapon_action, "idle");
gui.add(weapon_action, "reload");
gui.add(weapon_action, "shoot")