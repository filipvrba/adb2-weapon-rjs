import * as Three from "three";

export class Renderer extends Three.WebGLRenderer {
  constructor(canvas) {
    let settings = {
      canvas,
      antialias: true,
      physicallyCorrectLights: true,
      outputEncoding: Three.sRGBEncoding,
      toneMappingExposure: 4.867,
      toneMapping: Three.ACESFilmicToneMapping
    };

    super(settings);
    this.physicallyCorrectLights = settings.physicallyCorrectLights;
    this.outputEncoding = settings.outputEncoding;
    this.toneMappingExposure = settings.toneMappingExposure;
    this.toneMapping = settings.toneMapping
  };

  update_resize(sizes) {
    this.setSize(sizes.width, sizes.height);
    this.setPixelRatio(Math.min(window.devicePixelRatio, 2))
  }
}