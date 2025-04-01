import { Component, inject, signal } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { CountryService } from '../../services/country.service';
import { NotFoundComponent } from '../../../shared/componets/not-found/not-found.component';
import { LoadingComponent } from "../../../shared/componets/loading/loading.component";
import { CountryInformationComponent } from './country-information/country-information.component';

@Component({
  imports: [NotFoundComponent, LoadingComponent, CountryInformationComponent],
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
