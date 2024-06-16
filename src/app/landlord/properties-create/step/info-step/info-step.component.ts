import { Component, EventEmitter, Output, input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { Control } from 'leaflet';
import { ButtonModule } from 'primeng/button';

import { InfoStepControlComponent } from './info-step-control/info-step-control.component';
import { NewListingInfo } from '../../../../shared/Models/core/listing-model';

@Component({
  selector: 'app-info-step',
  standalone: true,
  imports: [FormsModule, ButtonModule, FontAwesomeModule,InfoStepControlComponent],
  templateUrl: './info-step.component.html',
  styleUrl: './info-step.component.scss'
})
export class InfoStepComponent {

  infos = input.required<NewListingInfo>();

  @Output()
  infoChange = new EventEmitter<NewListingInfo>();

  @Output()
  stepValidityChange = new EventEmitter<boolean>();

  onInfoChange(newValue: number, valueType: string) {
    switch (valueType) {
      case "BATHS":
        this.infos().baths = {value: newValue}
        break;
      case "BEDROOMS":
        this.infos().bedrooms = {value: newValue}
        break;
      case "BEDS":
        this.infos().beds = {value: newValue}
        break;
      case "GUESTS":
        this.infos().guests = {value: newValue}
        break
    }

    this.infoChange.emit(this.infos());
    this.stepValidityChange.emit(this.validationRules());
  }

  validationRules(): boolean {
    return this.infos().guests.value >= 1;
  }

}
