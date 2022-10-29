import * as Three from "three";

export class Scene extends Three.Scene {
  #bg;

  constructor() {
    super();
    this.#bg = this.get_background;
    this.background = this.#bg;
    this.environment = this.#bg
  };

  get get_background() {
    let bgs = [
      "/textures/environmentMaps/0/px.jpg",
      "/textures/environmentMaps/0/nx.jpg",
      "/textures/environmentMaps/0/py.jpg",
      "/textures/environmentMaps/0/ny.jpg",
      "/textures/environmentMaps/0/pz.jpg",
      "/textures/environmentMaps/0/nz.jpg"
    ];

    let cubeTextureLoader = new Three.CubeTextureLoader;
    let background = cubeTextureLoader.load(bgs);
    background.encoding = Three.sRGBEncoding;
    return background
  };

  get add_light() {
    let dirLight = new Three.DirectionalLight("#ffffff", 1.149);
    dirLight.position.set(-5, 5, 2.664);
    return this.add(dirLight)
  };

  get updateAllMaterials() {
    return this.traverse((child) => {
      if ((child instanceof Three.Mesh) && (child.material instanceof Three.MeshStandardMaterial)) {
        child.material.envMap = this.#bg;
        child.material.envMapIntensity = 5.943;
        child.material.roughness = 1;
        return child.material.metalness = 1
      }
    })
  }
}