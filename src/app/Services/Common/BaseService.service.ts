import { HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { throwError } from "rxjs";

export abstract class BaseServices {
  public  HostUrl:String="https://syrian-medicine.herokuapp.com/api";
  getoption():any{
    var headersObject = new HttpHeaders().set("Authorization", "Bearer " + localStorage.getItem('token'));
    const httpOptions = {
      headers: headersObject
    };
    return httpOptions;
  }
  errorHandler(error: HttpErrorResponse) {
    return throwError(error.error.message);
  }
}
