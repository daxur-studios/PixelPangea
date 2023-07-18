import { Injectable } from '@angular/core';
import { EngineComponent } from '@daxur-studios/engine';
import { Vector2 } from 'three';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass';
import { GlitchPass } from 'three/examples/jsm/postprocessing/GlitchPass';
import { FilmPass } from 'three/examples/jsm/postprocessing/FilmPass';

import RenderPixelatedPass from '@core/RenderPixelatedPass';
import PixelatePass from '@core/pixelate-pass';
import { takeUntil } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CoreService {
  pixelateResolution?: Vector2;
  pixelatePass?: PixelatePass;
  renderPixelatedPass?: RenderPixelatedPass;
  unrealBloomPass?: UnrealBloomPass;

  constructor() {}

  initPasses(engine: EngineComponent) {
    const scene = engine.scene;
    const camera = engine.camera;

    const renderResolution = (this.pixelateResolution = new Vector2(
      engine.width,
      engine.height
    ));

    const xRes = renderResolution.clone().divideScalar(6);

    console.debug('renderResolution', renderResolution);

    const pixelatePass = (this.pixelatePass = new PixelatePass(xRes));
    const renderPixelatedPass = (this.renderPixelatedPass =
      new RenderPixelatedPass(xRes, scene, camera));

    const bloomPass = (this.unrealBloomPass = new UnrealBloomPass(
      renderResolution,
      0.4,
      0.1,
      0.9
    ));

    const composer = engine.composer;

    composer.addPass(renderPixelatedPass);
    // composer.addPass(bloomPass);
    composer.addPass(pixelatePass);
    //composer.addPass(new GlitchPass());
    //composer.addPass( new FilmPass());

    engine.onCameraChange$
      .pipe(takeUntil(engine.onDestroy$))
      .subscribe((camera) => {
        renderPixelatedPass.camera = camera;
      });

    engine.resize.subscribe(({ height, width }) => {
      renderResolution.set(width, height);

      pixelatePass.resolution = renderResolution;
      pixelatePass.setSize(width, height);
      renderPixelatedPass.resolution = renderResolution;
      renderPixelatedPass.setSize(width, height);
      bloomPass.resolution = renderResolution;
      bloomPass.setSize(renderResolution.x, renderResolution.y);
    });
  }
}
