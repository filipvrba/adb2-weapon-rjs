import * as Three from "three";
import { GUI } from "lil-gui";
import { READY } from "./constants";

export class UI extends Three.Object3D {
  #addedListener;
  #gui;

  constructor() {
    super();
    this.#addedListener = () => this.ready;
    this.addEventListener(READY, this.#addedListener);
    this.#gui = new GUI
  };

  get ready() {
    let weapon = this.parent.getObjectByName("weapon");

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

    this.#gui.add(weapon_action, "draw");
    this.#gui.add(weapon_action, "idle");
    this.#gui.add(weapon_action, "reload");
    return this.#gui.add(weapon_action, "shoot")
  }
}