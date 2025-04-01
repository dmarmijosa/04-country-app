import { Component, effect, input, output, signal } from '@angular/core';

@Component({
  selector: 'country-search-input',
  imports: [],
  templateUrl: './country-search-input.component.html',
})
export class CountrySearchInputComponent {
  placeholder = input.required<string>();
  inputValue = signal('');
  loading = input(false);
  debounceEffect = input(3000);
  onSeachValue = output<string>();
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
