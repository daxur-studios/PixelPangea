import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  EngineComponent,
  EngineConfig,
  LevelEditorComponent,
} from '@daxur-studios/engine';

@Component({
  selector: 'app-level-page',
  standalone: true,
  templateUrl: './level-page.component.html',
  styleUrls: ['./level-page.component.scss'],
  host: {
    class: 'flex-page',
  },
  imports: [CommonModule, EngineComponent],
})
export class LevelPageComponent {
  public readonly config = new EngineConfig();
}
