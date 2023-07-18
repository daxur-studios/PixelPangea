import {
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
  effect,
  signal,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { EngineComponent, EngineConfig } from '@daxur-studios/engine';
import { SmartForm } from '@standalone-components/smart-form/smart-form';
import { SmartFormComponent } from '@standalone-components/smart-form/smart-form.component';
import { BehaviorSubject, Subject, takeUntil } from 'rxjs';

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
export class MainMenuPageComponent implements OnInit, OnDestroy {
  @ViewChild(EngineComponent, { static: true })
  engine?: EngineComponent;

  private onDestroy$ = new Subject<void>();

  config: EngineConfig = new EngineConfig({
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
    this.engine = this.engine!;

    this.engine.switchCamera(new PerspectiveCamera(75, undefined, 0.1, 1000));

    this.engine.scene.add(new GridHelper(20, 20, 0x0000ff, 0x808080));
    const b = new GridHelper(20, 20, 0x00ff00, 0x808080);

    this.engine.scene.add(b);

    b.rotateOnAxis(new Vector3(1, 0, 0), Math.PI / 2);

    this.engine.tick$.pipe(takeUntil(this.onDestroy$)).subscribe((tick) => {
      b.rotateX(0.01);
      b.rotateY(0.01);
      b.rotateZ(0.01);
    });
  }

  ngOnDestroy() {
    this.onDestroy$.next();
    this.onDestroy$.complete();
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
