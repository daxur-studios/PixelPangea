import { Component, signal } from '@angular/core';
import {
  EngineConfig,
  EngineModule,
  LevelEditorComponent,
} from '@daxur-studios/engine';
import { PerspectiveCamera } from 'three';

@Component({
  selector: 'app-level-editor-page',
  templateUrl: './level-editor-page.component.html',
  styleUrls: ['./level-editor-page.component.scss'],
  standalone: true,
  imports: [LevelEditorComponent],
  host: {
    class: 'flex-page',
  },
})
export class LevelEditorPageComponent {
  config: EngineConfig = new EngineConfig({
    webGLRendererParameters: {
      antialias: true,
    },
    camera: new PerspectiveCamera(),
  });
}
