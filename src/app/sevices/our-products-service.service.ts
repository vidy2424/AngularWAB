import { Student } from './../interface/student.interface';
import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpRequest, HttpHeaders } from '@angular/common/http';
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

    editOurProducts(data: Student, id: any): Observable<any> {
        const url = `/ourProducts/${id}`;
        return this.httpClient.put(this.serverUrl + url, data);
    }

    getOurProducts(): Observable<any> {
        const url = '/ourProducts/info';
        return this.httpClient.get(this.serverUrl + url);
    }
    deleteOurProducts(id: any): Observable<any> {
        const url = `/infoDeleteprod/${id}`;
       
        return this.httpClient.delete(this.serverUrl + url, { responseType: 'text' as 'json' });
        //return this.httpClient.delete(this.serverUrl + url);
    }



    upload(data): Observable<HttpEvent<any>> {
        const formData: FormData = new FormData();
        const formSubmissiomData = {
            product_name : data.email,
            product_info : data.password
        };
        formData.append('data', JSON.stringify(formSubmissiomData));
        formData.append('file', data.file);

        const req = new HttpRequest('POST', `${this.serverUrl}/product`, formData, {
         //   headers: headers.set('Content-Type', 'multipart/form-data'),
            // reportProgress: true,
            //  responseType: 'json'
        });

        return this.httpClient.request(req);
    }
  
    getFiles(): Observable<any> {
        return this.httpClient.get(`${this.serverUrl}/files`);
    }
}
