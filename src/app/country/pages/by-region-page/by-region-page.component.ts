import { Component, inject, linkedSignal, signal } from '@angular/core';
import { CountryListComponent } from '../../components/country-list/country-list.component';
import { Region } from '../../interfaces/region.type';
import { CountryService } from '../../services/country.service';
import { rxResource } from '@angular/core/rxjs-interop';
import { of } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

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

  activatedRouter = inject(ActivatedRoute);
  router = inject(Router);
  queryParams = (this.activatedRouter.snapshot.queryParamMap.get('region') ??
    '') as Region;
  selectedRegion = linkedSignal<Region>(() => this.queryParams ?? 'Americas');

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
      this.router.navigate(['/country/by-region'], {
        queryParams: {
          region: request.region,
        },
      });
      return this.countryService.searchByRegion(request.region);
    },
  });
}
