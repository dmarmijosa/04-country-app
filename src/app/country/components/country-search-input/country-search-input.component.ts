import { Component, effect, input, linkedSignal, output } from '@angular/core';

@Component({
  selector: 'country-search-input',
  imports: [],
  templateUrl: './country-search-input.component.html',
})
export class CountrySearchInputComponent {
  placeholder = input.required<string>();
  initialValue = input<string>();

  loading = input(false);
  debounceEffect = input(3000);
  onSeachValue = output<string>();
  inputValue = linkedSignal<string>(() => this.initialValue() ?? '');

  // onSearch(value: string): void {
  //   this.onSeachValue.emit(value);
  // }
  debaunceEffect = effect((onCleanup) => {
    const value = this.inputValue();
    const timeout = setTimeout(() => {
      this.onSeachValue.emit(value);
    }, this.debounceEffect());
    onCleanup(() => {
      clearTimeout(timeout);
    });
  });
}
