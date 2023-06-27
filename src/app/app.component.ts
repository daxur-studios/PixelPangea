import { Component } from '@angular/core';
import { SmartForm } from './standalone-components/smart-form/smart-form';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { EngineService } from '@daxur-studios/engine';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  host: {
    class: 'flex-page',
  },
})
export class AppComponent {
  title = 'PixelPangea';

  constructor(private builder: FormBuilder, engineService: EngineService) {}
}
