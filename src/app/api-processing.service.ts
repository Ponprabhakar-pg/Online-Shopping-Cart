import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class ApiProcessingService {

  baseUrl: String = 'https://uiexercise.onemindindia.com/api/';

  constructor(private http: HttpClient) { }



  processGetRequest(path: String){
    return this.http.get(this.baseUrl+''+path);
  }


  processPostRequest(path: String, data: any){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
      })
    };
    return this.http.post(this.baseUrl+''+path, data, httpOptions);
  }
}
