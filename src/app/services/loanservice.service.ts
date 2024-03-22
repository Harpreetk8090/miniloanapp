import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError } from 'rxjs';
import { myinterface } from '../myinterface';
import { repaymentstatus } from '../repaymentstatus';
import { statusAdmin } from '../statusAdmin';


@Injectable({
  providedIn: 'root'
})
export class LoanserviceService {



  private fetchDataWithToken(): Observable<myinterface[]> {

    const token = sessionStorage.getItem('JWT-Token');
    if (!token) {
      // Handle the absence of token, maybe throw an error or redirect to login
      throw new Error('Token not found in session storage');
    }

    // Set up the HTTP headers with the token
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    console.log(headers)
    // Make the HTTP request with the headers
    return this._http.get<myinterface[]>(this.apiurl)
      .pipe(
        catchError((error: any) => {
          console.log("error getting data with headers", error)
          throw error
        })
      )

  }

  apiurl = 'http://localhost:3000/users';
  constructor(private _http: HttpClient) { }

  signUp(data: myinterface): Observable<myinterface> {
    return this._http.post<myinterface>('http://localhost:3000/users', data)
  }

  getAll(): Observable<myinterface[]> {
    console.log("i am executed")
    // return this.fetchDataWithToken()
    return this._http.get<myinterface[]>(this.apiurl)
      .pipe(
        catchError((error: any) => {
          console.log('Error getting all data', error)
          throw error;
        })
      )
  }

  getAllUserData():Observable<myinterface[]> {

    return this.fetchDataWithToken();
  }

  updateUser(code: any, data: any) {
    return this._http.patch(this.apiurl + '/' + code, data)
  }
  updateUserInstallments(code: any, installments: any[]) {
    return this._http.patch(this.apiurl + '/' + code, { installments })
  }
  updateUserPayment(id: any, index: any, data: any) {
    const url = `${this.apiurl}/${id}`;
    return this._http.patch(url, data)
      .pipe(
        catchError((error: any) => {
          // Handle error appropriately (e.g., log error, display error message)
          console.error('Error updating payment:', error);
          throw error; // Rethrow the error to propagate it to the caller
        })
      );
  }
  isLoggedIn() {
    return sessionStorage.getItem('username') != null;
  }
  getUserRole() {
    return sessionStorage.getItem('username') != null ? sessionStorage.getItem('userrole')?.toString() : '';
  }
  getRole():Observable<statusAdmin[]> {
    return this._http.get<statusAdmin[]>('http://localhost:3000/mystatus');
  }
  delUser(id: any) {
    return this._http.delete(this.apiurl + '/' + id)
  }
  getUserById(id: string):Observable<myinterface> {
    return this._http.get<myinterface>(`http://localhost:3000/users/${id}`);
  }
  getRepaymentStatus():Observable<repaymentstatus[]> {
    return this._http.get<repaymentstatus[]>('http://localhost:3000/repaymentstatus')
  }
}
