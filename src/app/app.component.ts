import { Component } from '@angular/core';
import { SmartForm } from './utilities/smart-form';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'the-isle-web';

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
      name: 'text',
      email: 'email',
      password: 'password',
      tags: 'text',
      address: {
        street: 'text',
        city: 'text',
        state: 'text',
        zip: 'text',
      },
    },
  });

  constructor(private builder: FormBuilder) {
    this.smartForm.formGroup.controls.tags.push(this.builder.control('a'));
    this.smartForm.formGroup.controls.tags.push(this.builder.control('b'));

    this.smartForm.formGroup.valueChanges.subscribe((value) => {
      console.log(value);
    });
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
