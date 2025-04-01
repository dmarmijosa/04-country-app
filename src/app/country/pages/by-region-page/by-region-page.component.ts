import { Component, inject, signal } from '@angular/core';
import { CountryListComponent } from '../../components/country-list/country-list.component';
import { Region } from '../../interfaces/region.type';
import { CountryService } from '../../services/country.service';
import { rxResource } from '@angular/core/rxjs-interop';
import { of } from 'rxjs';

@Component({
  imports: [CountryListComponent],
  templateUrl: './by-region-page.component.html',
})
export default class ByRegionPageComponent {
  countryService = inject(CountryService);
  public regions: Region[] = [
    'Africa',
    'Americas',
    'Asia',
    'Europe',
    'Oceania',
    'Antarctic',
  ];

  selectedRegion = signal<Region | null>(null);

  selectRegion(region: Region) {
    if (!region) {
      return;
    }
    this.selectedRegion.set(region);
  }

  regionResource = rxResource({
    request: () => ({ region: this.selectedRegion() }),
    loader: ({ request }) => {
      if (!request.region) return of([]);
      return this.countryService.searchByRegion(request.region);
    },
  });
}
