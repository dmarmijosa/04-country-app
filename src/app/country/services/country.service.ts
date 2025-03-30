import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { RESTCountry } from '../interfaces/rest-countries.interface';
import { catchError, map, Observable, throwError } from 'rxjs';
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
        map((resp) => CountryMapper.mapRestCountrysToRestCountryArray(resp)),
        catchError((error) => {
          console.log(`Error fetching `, error);
          return throwError(
            () => new Error('No se pudo obtener información con ese query')
          );
        })
      );
  }

  searchByCountry(query: string): Observable<Country[]> {
    query = query.toLowerCase();
    return this.http
      .get<RESTCountry[]>(`${environment.rest_api}/name/${query}`)
      .pipe(
        map((resp) => CountryMapper.mapRestCountrysToRestCountryArray(resp)),
        catchError((error) => {
          console.log(`Error fetching `, error);
          return throwError(
            () => new Error('No se pudo obtener información con ese query')
          );
        })
      );
  }

}
