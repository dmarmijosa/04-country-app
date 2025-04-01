import type { Country } from '../interfaces/country.interface';
import type { RESTCountry } from '../interfaces/rest-countries.interface';
export class CountryMapper {
  static mapRestCountriesToCountry(restCountry: RESTCountry): Country {
    return {
      cca2: restCountry.cca2,
      flag: restCountry.flag,
      flagSvg: restCountry.flags.svg,
      name: restCountry.translations['spa'].common ?? 'No Spanish name',
      capital: restCountry.capital.join(','),
      population: restCountry.population,
      region: restCountry.region,
      subRegion: restCountry.subregion
    };
  }

  static mapRestCountrysToRestCountryArray(
    restCountry: RESTCountry[]
  ): Country[] {
    return restCountry.map(this.mapRestCountriesToCountry);
  }
}
