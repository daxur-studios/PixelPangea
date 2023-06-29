import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import {
  FormGroup,
  AbstractControl,
  FormControl,
  FormArray,
} from '@angular/forms';
import { Subject } from 'rxjs';

export class SmartForm<T extends FormGroup> implements ISmartForm {
  public readonly formGroup: T;

  constructor(public readonly options: ISmartFormOptions<T>) {
    this.formGroup = options.formGroup;
  }
}
export interface ISmartForm {
  formGroup: FormGroup;
}

export interface ISmartFormOptions<T extends FormGroup> {
  formGroup: T;

  /**
   * Allow user to set some properties of the formGroup to be of a specific type of input `FormInputType`
   * as well as allow nested formGroups to be set to a specific type of input `FormInputType`.
   */
  inputConfig: InputConfig<T>;
}

export type InputConfig<T extends FormGroup> = {
  [K in keyof T['controls']]?: T['controls'][K] extends FormArray<infer U>
    ? IInputOptions
    : T['controls'][K] extends FormControl<infer U>
    ? IInputOptions
    : T['controls'][K] extends FormGroup<infer U>
    ? InputConfig<T['controls'][K]>
    : never;
};

export interface IInputOptions {
  type: FormInputType;
  label?: string;
}

export type FormInputType =
  | 'text'
  | 'number'
  | 'email'
  | 'password'
  | 'checkbox';

const test = new FormGroup({
  name: new FormControl(''),
  email: new FormControl(''),
  address: new FormGroup({
    street: new FormControl(''),
    zip: new FormControl(''),
    tenant: new FormGroup({
      name: new FormControl(''),
    }),
  }),
  tags: new FormArray([
    new FormControl('a'),
    new FormControl('b'),
    new FormControl('c'),
  ]),
});

const smartForm = new SmartForm({
  formGroup: test,
  inputConfig: {
    name: {
      label: 'Name',
      type: 'text',
    },
    email: {
      type: 'email',
    },
    address: {
      // street: 'text',
      zip: {
        type: 'number',
      },
      tenant: {
        name: {
          type: 'text',
        },
      },
    },
  },
});

smartForm.formGroup.controls.tags.push(new FormControl('d'));

@Component({
  selector: 'base-smart-form-field',
  template: ``,
  styles: [],
})
export class SmartFormFieldComponent<CONTROL = FormControl>
  implements OnInit, OnDestroy
{
  @Input() control!: CONTROL;

  readonly unsubscribe: Subject<void> = new Subject();

  constructor(public readonly smartForm: SmartForm<FormGroup>) {}

  ngOnInit() {}
  ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }
}
