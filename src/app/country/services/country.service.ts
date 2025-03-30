import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '@environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CountryService {
  private http = inject(HttpClient);

  constructor() {}
  searchByCapital(query: string) {
    query = query.toLowerCase();
    return this.http.get(`${environment.rest_api}/capital/${query}`);
  }
}
