import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { RESTCountry } from '../interfaces/rest-countries.interface';
import { catchError, delay, map, Observable, of, tap, throwError } from 'rxjs';
import { CountryMapper } from '../mappers/country.mapper';
import { Country } from '../interfaces/country.interface';

@Injectable({
  providedIn: 'root',
})
export class CountryService {
  private http = inject(HttpClient);
  private queryCachePorCapital = new Map<string, Country[]>();
  private queryCacheByCountry = new Map<string, Country[]>();
  private queryCacheByRegion = new Map<string, Country[]>();

  searchByCapital(query: string): Observable<Country[]> {
    query = query.toLowerCase();
    if (this.queryCachePorCapital.has(query))
      return of(this.queryCachePorCapital.get(query) ?? []);

    return this.http
      .get<RESTCountry[]>(`${environment.rest_api}/capital/${query}`)
      .pipe(
        map((resp) => CountryMapper.mapRestCountrysToRestCountryArray(resp)),
        tap((countries) => this.queryCachePorCapital.set(query, countries)),
        catchError((error) => {
          return this.errorMessage;
        })
      );
  }

  searchByCountry(query: string): Observable<Country[]> {
    query = query.toLowerCase();
    if (this.queryCacheByCountry.get(query))
      return of(this.queryCacheByCountry.get(query)! ?? []);

    return this.http
      .get<RESTCountry[]>(`${environment.rest_api}/name/${query}`)
      .pipe(
        map((resp) => CountryMapper.mapRestCountrysToRestCountryArray(resp)),
        tap((country) => this.queryCacheByCountry.set(query, country)),
        delay(2000),
        catchError((error) => {
          return this.errorMessage;
        })
      );
  }

  searchByCountryByAlphaCode(code: string): Observable<Country> {
    code = code.toUpperCase();
    return this.http
      .get<RESTCountry[]>(`${environment.rest_api}/alpha/${code}`)
      .pipe(
        map((resp) => CountryMapper.mapRestCountrysToRestCountryArray(resp)),
        map((countries) => countries.at(0)!),
        catchError((error) => {
          return this.errorMessage;
        })
      );
  }

  searchByRegion(query: string): Observable<Country[]> {
    query = query.toLowerCase();
    if (this.queryCacheByRegion.get(query))
      return of(this.queryCacheByRegion.get(query)! ?? []);

    return this.http
      .get<RESTCountry[]>(`${environment.rest_api}/region/${query}`)
      .pipe(
        map((resp) => CountryMapper.mapRestCountrysToRestCountryArray(resp)),
        tap((country) => this.queryCacheByRegion.set(query, country)),
        catchError((error) => {
          return this.errorMessage;
        })
      );
  }

  get errorMessage() {
    return throwError(
      () => new Error('No se pudo obtener información con ese query')
    );
  }
}
