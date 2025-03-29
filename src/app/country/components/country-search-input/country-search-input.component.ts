import { Component, input, output } from '@angular/core';

@Component({
  selector: 'country-search-input',
  imports: [],
  templateUrl: './country-search-input.component.html',
})
export class CountrySearchInputComponent {

  placeholder = input.required<string>();
  onSeachValue = output<string>();
  onSearch(value: string): void {
    this.onSeachValue.emit(value);
  }
}
