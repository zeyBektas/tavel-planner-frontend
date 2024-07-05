import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  public async get<T>(location: string, params?: HttpParams) {
    return this.http.get<T>(`${environment.BASE_URL}${location}`, {
      params: params,
    });
  }

  public async post(location: string, data: any, params?: HttpParams) {
    return this.http.post(`${environment.BASE_URL}${location}`, data, {
      params: params,
    });
  }

  public async put(location: string, data?: any, params?: HttpParams) {
    return this.http.put(`${environment.BASE_URL}${location}`, data, {
      params: params,
    });
  }

  public async delete(location: string, params?: HttpParams) {
    return this.http.delete(`${environment.BASE_URL}${location}`, {
      params: params,
    });
  }
}
