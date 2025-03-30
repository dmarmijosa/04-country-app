import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { RESTCountry } from '../interfaces/rest-countries.interface';
import { map, Observable } from 'rxjs';
import { CountryMapper } from '../mappers/country.mapper';
import { Country } from '../interfaces/country.interface';

@Injectable({
  providedIn: 'root',
})
export class CountryService {
  private http = inject(HttpClient);

  constructor() {}
  searchByCapital(query: string): Observable<Country[]> {
    query = query.toLowerCase();
    return this.http
      .get<RESTCountry[]>(`${environment.rest_api}/capital/${query}`)
      .pipe(
        map((resp)=>  CountryMapper.mapRestCountrysToRestCountryArray(resp))
      );
  }
}
