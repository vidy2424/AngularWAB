import { Student } from './../interface/student.interface';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClientProductsServiceService {

  constructor(private httpClient: HttpClient) { }

  serverUrl = 'http://localhost:8083/onlineshopping';


  ClientProducts(data: Student): Observable<any> {
    const url = '/clientProducts';
    return this.httpClient.post(this.serverUrl + url, data);
  }

  editClientProducts(data: Student, id:any): Observable<any> {
    const url = `/clientProducts/${id}`;
    return this.httpClient.put(this.serverUrl + url, data);
}

  getClientProducts(): Observable<any> {
    const url = '/clientProducts/products';
    return this.httpClient.get(this.serverUrl + url);
  }

}
