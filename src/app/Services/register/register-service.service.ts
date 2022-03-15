import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { catchError, Observable, throwError } from 'rxjs';
import { city } from 'src/app/Models/city';
import { doctorOrNurseRegister } from 'src/app/Models/Register/doctorOrNurseRegister';
import { doctorOrNurseRegisterOutput } from 'src/app/Models/Register/doctorOrNurseRegisterOutput';
import { state } from 'src/app/Models/states';

@Injectable({
  providedIn: 'root'
})

export class RegisterServiceService {
  baseUrl = "https://localhost:7017/api/";
  constructor(private http: HttpClient, private snackBar: MatSnackBar) { }

  registerUser(input: any, type: number): Observable<any> {
    console.log(input);
    if (type == 1) { // sick
      return this.http.post<any>(this.baseUrl + "Sick/RegisterSick", input).pipe();
    }
    else if (type == 2 || type == 3) {

      const form: FormData = new FormData();
      form.append("email", input.email);
      form.append("userName", input.userName);
      form.append("password", input.password);
      form.append("firstName", input.firstName);
      form.append("lastName", input.lastName);
      form.append("phoneNumber", input.phoneNumber);
      form.append("gender", input.gender);
      form.append("aboutMe", input.aboutMe);
      form.append("specialization", input.specialization);
      form.append("workAtHome", input.workAtHome);
      form.append("startTimeWork", input.startTimeWork);
      form.append("endTimeWork", input.endTimeWork);
      form.append("location", input.location);
      form.append("state", input.state);
      form.append("homeNumber", input.homeNumber);
      form.append("city", input.city);
      input.files.forEach((file: any) => form.append('files', file));

      if (type == 2) // doctor
        return this.http.post<any>(this.baseUrl + "Doctor/RegisterDoctor", form).pipe(catchError(this.errorHandler));
      else // nurse
        return this.http.post<any>(this.baseUrl + "Nurse/RegisterNurse/", form).pipe(catchError(this.errorHandler));
    }
    else { // hospital
      const form: FormData = new FormData();
      form.append("email", input.email);
      form.append("userName", input.userName);
      form.append("password", input.password);
      form.append("name", input.name);
      form.append("webSite", input.webSite);
      form.append("phoneNumber", input.phoneNumber);
      form.append("aboutHospital", input.aboutMe);
      form.append("location", input.location);
      form.append("homeNumber", input.homeNumber);
      form.append("city", input.city);
      input.documents.forEach((file: any) => form.append('documents', file));
      return this.http.post<any>(this.baseUrl + "Hospital/RegisterHospital", form).pipe(catchError(this.errorHandler));
    }
  }

  async isUserNameExist(username: string) {
    return await this.http.get<boolean>(this.baseUrl + "Account/IsUserNameExist/" + username).pipe(catchError(this.errorHandler));
  }

  async isEmailExist(email: string) {
    return await this.http.get<boolean>(this.baseUrl + "Account/IsEmailExist/" + email).pipe(catchError(this.errorHandler));
  }

  getCities(): Observable<city[]> {
    return this.http.get<city[]>(this.baseUrl + "Account/GetCities");
  }
  getStates(): Observable<state[]> {
    return this.http.get<state[]>(this.baseUrl + "Account/GetPersonStates");
  }


  errorHandler(error: HttpErrorResponse) {
    return throwError(error.error.message);
  }

}
