import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormInputType,
  InputConfig,
  SmartForm,
} from '../../utilities/smart-form';
import {
  FormArray,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { Subject } from 'rxjs';
import { UserFormGroup } from '../../app.component';

@Component({
  selector: 'app-smart-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './smart-form.component.html',
  styleUrls: ['./smart-form.component.scss'],
})
export class SmartFormComponent<T extends FormGroup = BaseFormGroup>
  implements OnInit, OnDestroy
{
  @Input() smartForm!: SmartForm<T>;

  x = new FormControl('');

  private readonly unsubscribe$ = new Subject<void>();

  get controls() {
    return this.smartForm.formGroup.controls as T['controls'];
  }
  get controlKeys() {
    return Object.keys(this.controls) as (keyof T['controls'])[];
  }

  constructor() {}

  ngOnInit(): void {
    if (!this.smartForm) {
      throw new Error('SmartFormComponent: smartForm is undefined');
    }
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  getFormControl(key: keyof T['controls']): FormControl | undefined {
    const control = this.controls[key];

    if (control instanceof FormControl) {
      return control;
    }

    return undefined;
  }

  getType(key: keyof T['controls']) {
    return this.smartForm.options.inputConfig[key];
  }
}

type BaseFormGroup = FormGroup<{
  [key: string]: FormControl<any> | BaseFormGroup | FormArray<any>;
}>;
