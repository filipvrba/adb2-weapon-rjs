import * as Three from "three";
import { READY, UPDATE } from "./constants";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

export class Weapon extends Three.Object3D {
  #addedListener;
  #animAction;
  #animAction_old;
  #animMixer;
  #animations;
  #gltfLoader;
  #updateListener;

  constructor() {
    super();
    this.#addedListener = () => this.ready;
    this.#updateListener = event => this.update(event.dt);
    this.addEventListener(READY, this.#addedListener);
    this.#gltfLoader = new GLTFLoader;
    this.#animations = null;
    this.#animMixer = null;
    this.#animAction = null;
    this.#animAction_old = null
  };

  get ready() {
    this.addEventListener(UPDATE, this.#updateListener);
    return this.load_model("/models/ak47/ak47.gltf")
  };

  update(dt) {
    if (this.#animMixer) this.#animMixer.update(dt)
  };

  load_model(path) {
    this.#gltfLoader.load(path, (gltf) => {
      gltf.scene.rotation.y = Math.PI * 0.5;
      this.parent.add(gltf.scene);
      this.parent.updateAllMaterials;
      this.load_done(gltf)
    })
  };

  load_done(gltf) {
    this.add_animations(gltf.animations);
    this.#animMixer = new Three.AnimationMixer(gltf.scene);

    this.#animMixer.addEventListener(
      "finished",
      () => this.play_anim("idle")
    );

    this.play_anim("idle")
  };

  add_animations(anims) {
    let anims_map = {
      draw: anims[0],
      idle: anims[1],
      reload: anims[2],
      shoot: anims[3]
    };

    this.#animations = anims_map
  };

  // @animAction.crossFadeFrom(@animAction_old, 1)
  play_anim(id, loop_event=Three.LoopRepeat) {
    if (this.#animAction) this.#animAction_old = this.#animAction;
    this.#animAction = this.#animMixer.clipAction(this.#animations[id]);
    this.#animAction.setLoop(loop_event);
    this.#animAction.reset();
    this.#animAction.play();

    // @animAction_old.stop() if @animAction_old
    if (this.#animAction_old) {
      this.#animAction.crossFadeFrom(this.#animAction_old, 0.15)
    }
  }
}