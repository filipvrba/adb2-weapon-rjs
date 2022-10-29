import * as Three from "three";

export class Camera extends Three.PerspectiveCamera {
  constructor(sizes) {
    let settings = {
      fov: 45,
      aspect: sizes.width / sizes.height,
      near: 0.1,
      far: 100
    };

    super(settings.fov, settings.aspect, settings.near, settings.far)
  };

  update_resize(sizes) {
    this.aspect = sizes.width / sizes.height;
    this.updateProjectionMatrix()
  }
}