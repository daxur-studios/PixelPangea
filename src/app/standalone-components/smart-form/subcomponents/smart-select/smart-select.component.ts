import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SmartFormFieldComponent } from '@standalone-components/smart-form/smart-form';

@Component({
  selector: 'app-smart-select',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './smart-select.component.html',
  styleUrls: ['./smart-select.component.scss']
})
export class SmartSelectComponent extends SmartFormFieldComponent{

}
