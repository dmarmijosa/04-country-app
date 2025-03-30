import { Component, inject, signal } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { CountryService } from '../../services/country.service';

@Component({
  imports: [],
  templateUrl: './countryPage.component.html',
})
export default class CountryPageComponent {
  countryCode = inject(ActivatedRoute);
  countryService=inject(CountryService);

  codeCountry = signal('');

  code = this.countryCode.params.subscribe((resp) => {
    this.codeCountry.set(resp['code']);
  });


  countryResource = rxResource({
    request: ()=> ({code: this.codeCountry()}),
    loader: ({request}) => {
      return this.countryService.searchByCountryByAlphaCode(request.code);
    }
  })
}
