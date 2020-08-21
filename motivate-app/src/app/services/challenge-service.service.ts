import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChallengeServiceService {

  apiURL: string = 'http://localhost:8000/api/';

  constructor(public http: HttpClient) {}

  httpHeaders: any ={
      headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
      }
  }

  getListChallenges(): Observable<any>{
      return this.http.get(this.apiURL + 'listChallenges');
  }
  getChallenge(id): Observable<any>{
      return this.http.get(this.apiURL + 'getChallenge/' + id);
  }

  createChallenge(form): Observable<any>{
      this.httpHeaders.headers['Authorization'] = "Bearer " + localStorage.getItem('userToken');
      return this.http.post(this.apiURL + 'postChallenge', form , this.httpHeaders);
  }

}
