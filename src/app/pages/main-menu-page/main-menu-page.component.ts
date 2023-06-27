import { Component, OnInit, ViewChild, effect, signal } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { EngineComponent, EngineConfig } from '@daxur-studios/engine';
import { SmartForm } from '@standalone-components/smart-form/smart-form';
import { SmartFormComponent } from '@standalone-components/smart-form/smart-form.component';
import { BehaviorSubject } from 'rxjs';
import {
  PerspectiveCamera,
  GridHelper,
  Vector3,
  Camera,
  WebGLRendererParameters,
} from 'three';

@Component({
  selector: 'app-main-menu-page',
  templateUrl: './main-menu-page.component.html',
  styleUrls: ['./main-menu-page.component.scss'],
  standalone: true,
  host: {
    class: 'flex-page',
  },
  imports: [EngineComponent, SmartFormComponent],
})
export class MainMenuPageComponent implements OnInit {
  @ViewChild(EngineComponent, { static: true })
  engineComponent!: EngineComponent;

  config: EngineConfig = new EngineConfig({
    camera: new PerspectiveCamera(75, undefined, 0.1, 1000),
    webGLRendererParameters: {
      antialias: false,
      alpha: true,
    },
  });

  readonly formGroup: UserFormGroup = this.builder.group({
    name: [''],
    email: [''],
    password: [''],

    tags: this.builder.array(['x']),

    address: this.builder.group({
      street: [''],
      city: [''],
      state: [''],
      zip: [''],
    }),
  });

  readonly smartForm = new SmartForm<UserFormGroup>({
    formGroup: this.formGroup,
    inputConfig: {
      name: {
        label: 'Name',
        type: 'text',
      },
      email: {
        type: 'email',
        label: 'Email',
      },
      password: {
        type: 'password',
        label: 'Password',
      },
      tags: {
        type: 'text',
      },
      address: {
        street: {
          type: 'text',
          label: 'Street',
        },
      },
    },
  });

  constructor(private builder: FormBuilder) {
    //#region SmartForm
    this.smartForm.formGroup.controls.tags.push(this.builder.control('a'));
    this.smartForm.formGroup.controls.tags.push(this.builder.control('b'));

    this.smartForm.formGroup.valueChanges.subscribe((value) => {
      console.log(value);
    });
    //#endregion

    const count = signal(0);
    count.update((value) => value + 1);
    count.update((value) => value + 1);
    effect(() => {
      console.log(`The current count is: ${count()}`);
    });

    count.update((value) => value + 1);
    count.update((value) => value + 1);
  }

  ngOnInit() {
    this.engineComponent.scene.add(new GridHelper(20, 20, 0x0000ff, 0x808080));
    const b = new GridHelper(20, 20, 0x00ff00, 0x808080);

    this.engineComponent.scene.add(b);

    b.rotateOnAxis(new Vector3(1, 0, 0), Math.PI / 2);

    this.engineComponent.renderer?.render(
      this.engineComponent.scene,
      this.engineComponent.config.camera$.value
    );
  }
}
export type UserFormGroup = FormGroup<{
  name: FormControl<string | null>;
  email: FormControl<string | null>;
  password: FormControl<string | null>;
  tags: FormArray<FormControl<string | null>>;
  address: AddressFormGroup;
}>;

type AddressFormGroup = FormGroup<{
  street: FormControl<string | null>;
  city: FormControl<string | null>;
  state: FormControl<string | null>;
  zip: FormControl<string | null>;
}>;
