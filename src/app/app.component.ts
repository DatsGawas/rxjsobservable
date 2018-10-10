import {ApplicationRef, Component} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {filter, map} from 'rxjs/operators';
import {Observable, of} from "rxjs";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  countryData: any;
  countryData$: Observable<any>;

  datareader = 'response.data';

  constructor(private _httpClient: HttpClient) {

  }

  getCountry() {
  this.countryData$ = this._httpClient.get('assets/data/country.json').pipe(
      map(
        x => {
          return this.getResponseData(x);
        }
      )
    )
    this.countryData$.subscribe(
      res=>{
        debugger;
        this.countryData = res;
      }
    )

  }

  getResponseData(httpResponse: any) {
    let responsedata = httpResponse;
    if (this.datareader != null) {
      const dr = this.datareader.split('.');
      for (const ir of dr) {
        responsedata = responsedata[ir];
      }
    } else {
      responsedata = httpResponse;
    }

    return responsedata;
  }

  findCountry(event: any){

    if(event.target.value != '') {
      this.getFiterData(event.target.value).subscribe(
        res =>{
          this.countryData = res;
        }
      )
    } else {
      this.countryData$.subscribe(
        res=>{
          debugger;
          this.countryData = res;
        }
      )
    }



  }
  getFiterData( key: string) {
   return this.countryData$.pipe(
      map( result =>  result.filter(one => one.countryCode1 == key)
      )
    )
  }
}


