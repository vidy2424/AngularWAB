import { Student } from './../interface/student.interface';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OurProductsServiceService {

  constructor(private httpClient: HttpClient) { }

  serverUrl = 'http://localhost:8083/onlineshopping';


  OurProducts(data: Student): Observable<any> {
    const url = '/ourProducts';
    return this.httpClient.post(this.serverUrl + url, data);
  }

  editOurProducts(data: Student, id:any): Observable<any> {
    const url = `/ourProducts/${id}`;
    return this.httpClient.put(this.serverUrl + url, data);
}

  getOurProducts(): Observable<any> {
    const url = '/ourProducts/info';
    return this.httpClient.get(this.serverUrl + url);
  }
}
