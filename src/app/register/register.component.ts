import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { city } from '../Models/city';
import { doctorOrNurseRegister } from '../Models/Register/doctorOrNurseRegister';
import { hospitalRegister } from '../Models/Register/hospitalRgister';
import { sickRegister } from '../Models/Register/sickRegister';
import { state } from '../Models/states';
import { RegisterServiceService } from '../Services/register/register-service.service';
import { RegisterDialogComponent } from './dialogs/registerDialog/register-dialog/register-dialog.component';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  typeAccount = 1;
  doctorOrNurseRegisterData: doctorOrNurseRegister;
  sickRegisterData: sickRegister;
  hospitalRegisterData: hospitalRegister;
  showPassword = false;
  registerPhase1 = true;
  registerPhase2 = false;
  registerPhase3 = false;
  hospitalRegisterPhase = false;
  cities: city[] = [];
  personStates: state[] = [];

  registerFormPhase1 = this.formBuilder.group({
    userNameInput: ['', Validators.required],
    emailInput: ['', Validators.required],
    passwordInput: ['', Validators.required],
  });
  registerFormPhase2 = this.formBuilder.group({
    firstNameInput: ['', Validators.required],
    lastNameInput: ['', Validators.required],
    phoneNumberInput: ['', Validators.required],
    homeNumberInput: ['', Validators.required],
    locationInput: ['', Validators.required],
  });
  registerFormPhase3 = this.formBuilder.group({
    AboutMeInput: ['', Validators.required],
    specializationInput: ['', Validators.required],
    fromHoursInput: ['', Validators.required],
    fromMinutesInput: ['', Validators.required],
    toHoursInput: ['', Validators.required],
    toMinutesInput: ['', Validators.required],
    workForHomeInput: ['', Validators.required],
  });
  hospitalRegisterFormPhase = this.formBuilder.group({
    AboutMeInput: ['', Validators.required],
    phoneNumberInput: ['', Validators.required],
    homeNumberInput: ['', Validators.required],
    locationInput: ['', Validators.required],
    nameInput: ['', Validators.required],
    websiteInput: ['', Validators.required],
  });

  constructor(private formBuilder: FormBuilder, private snackBar: MatSnackBar,
    private router: Router, private registerService: RegisterServiceService, private dialog: MatDialog) {
    this.doctorOrNurseRegisterData = new doctorOrNurseRegister();
    this.sickRegisterData = new sickRegister();
    this.hospitalRegisterData = new hospitalRegister();
  }

  ngOnInit(): void {

    this.registerService.getCities().subscribe(data => {
      this.cities = data;
      console.log(this.cities);
    });

    this.registerService.getStates().subscribe(data => {
      this.personStates = data;
    });
  }

  selectOption(id: any) {
    this.typeAccount = id;
  }

  handleFileInput(event: any) {
    var files: File[] = event.target.files;
    if (files.length === 0) {
      return;
    }
    if (this.typeAccount == 2 || this.typeAccount == 3) {
      for (let i = 0; i < files.length; i++) {
        this.doctorOrNurseRegisterData.files.push(files[i]);
      }
    }
    else if (this.typeAccount == 4) {
      for (let i = 0; i < files.length; i++) {
        this.hospitalRegisterData.documents.push(files[i]);
      }
    }
  }

  async onSubmitPhase1(event: any) {
    this.typeAccount = parseInt(event.target.selectType.value);

    let userNameExist = false;
    let emailExist = false;
    let filesEmpty = false;
    let passwordNotHaveUpperCaseCharachter = this.checkIfStringHaveAtLeastOneUppercase(event.target.passwordInput.value) == true ? false : true;
    let passwordNotHaveLoweCaseCharachter = this.checkIfStringHaveAtLeastOneLowercase(event.target.passwordInput.value) == true ? false : true;
    let passwordNotHaveValidLength = this.checkIfStringHaveMinimumLengthGood(event.target.passwordInput.value, 8) == true ? false : true;
    let passwordNotHaveAtLeastOneNumber = this.checkIfStringHaveAtLeastOneDigit(event.target.passwordInput.value) == true ? false : true;
    let passwordNotHaveAtLeastOneSpeical = this.chechIfStringHasAtLeastOneSpeicalCharcter(event.target.passwordInput.value) == true ? false : true;
    let emailNotValid = this.checkIfStringIsVaildEmail(event.target.emailInput.value) == true ? false : true;

    var respnseUserNameExist = await (await this.registerService.isUserNameExist(event.target.userNameInput.value)).toPromise();
    if (respnseUserNameExist) {
      userNameExist = respnseUserNameExist.valueOf();
    }

    var responseEmailExist = await (await (this.registerService.isEmailExist(event.target.emailInput.value))).toPromise();
    if (responseEmailExist) {
      emailExist = responseEmailExist;
    }

    if (this.typeAccount != 1) {
      var files = (<HTMLInputElement>document.getElementById("filesInput"));
      if (files.value.length == 0)
        filesEmpty = true;
    }

    if (emailExist || userNameExist || filesEmpty || passwordNotHaveUpperCaseCharachter || passwordNotHaveAtLeastOneSpeical
      || passwordNotHaveLoweCaseCharachter || passwordNotHaveValidLength || passwordNotHaveAtLeastOneNumber || emailNotValid)
      await this.openDialog(userNameExist, emailExist, filesEmpty, passwordNotHaveUpperCaseCharachter, passwordNotHaveLoweCaseCharachter,
        passwordNotHaveValidLength, passwordNotHaveAtLeastOneNumber, passwordNotHaveAtLeastOneSpeical, emailNotValid);
    else {
      if (this.typeAccount == 1) { // sick
        this.sickRegisterData.email = event.target.emailInput.value;
        this.sickRegisterData.userName = event.target.userNameInput.value
        this.sickRegisterData.password = event.target.passwordInput.value
        this.registerPhase1 = false;
        this.registerPhase2 = true;
      }
      else if (this.typeAccount == 2 || this.typeAccount == 3) { // doctor or nurse
        this.doctorOrNurseRegisterData.email = event.target.emailInput.value;
        this.doctorOrNurseRegisterData.userName = event.target.userNameInput.value
        this.doctorOrNurseRegisterData.password = event.target.passwordInput.value
        this.registerPhase1 = false;
        this.registerPhase2 = true;
      }
      else { // hospital
        this.hospitalRegisterData.email = event.target.emailInput.value;
        this.hospitalRegisterData.userName = event.target.userNameInput.value
        this.hospitalRegisterData.password = event.target.passwordInput.value
        this.registerPhase1 = false;
        this.hospitalRegisterPhase = true;
      }
    }
  }

  onSubmitPhase2(event: any) {
    if (this.typeAccount == 1) { // sick
      this.sickRegisterData.firstName = event.target.firstNameInput.value;
      this.sickRegisterData.lastName = event.target.lastNameInput.value;
      this.sickRegisterData.phoneNumber = event.target.phoneNumberInput.value;
      this.sickRegisterData.homeNumber = event.target.homeNumberInput.value;
      this.sickRegisterData.location = event.target.locationInput.value;
      this.sickRegisterData.city = (event.target.selectCityInput.value);
      this.sickRegisterData.gender = parseInt(event.target.genderInput.value);
      this.sickRegisterData.state = parseInt(event.target.selectStateInput.value);
      this.registerService.registerUser(this.sickRegisterData, this.typeAccount).subscribe(data => {
        this.snackBar.open(data.message, 'close', {
          duration: 3000,
          horizontalPosition: 'start',
          verticalPosition: 'bottom',
        }); localStorage.setItem('username', data.data.userName);
        localStorage.setItem('token', data.data.token);
        this.router.navigateByUrl("/");
      }, err => {
        this.snackBar.open(err, 'close', {
          duration: 3000,
          horizontalPosition: 'start',
          verticalPosition: 'bottom',
        });
      });
    }
    else if (this.typeAccount == 2 || this.typeAccount == 3) { // doctor or nurse
      this.doctorOrNurseRegisterData.firstName = event.target.firstNameInput.value;
      this.doctorOrNurseRegisterData.lastName = event.target.lastNameInput.value;
      this.doctorOrNurseRegisterData.phoneNumber = event.target.phoneNumberInput.value;
      this.doctorOrNurseRegisterData.homeNumber = event.target.homeNumberInput.value;
      this.doctorOrNurseRegisterData.location = event.target.locationInput.value;
      this.doctorOrNurseRegisterData.city = (event.target.selectCityInput.value);
      this.doctorOrNurseRegisterData.gender = parseInt(event.target.genderInput.value);
      this.doctorOrNurseRegisterData.state = parseInt(event.target.selectStateInput.value);
      this.registerPhase2 = false;
      this.registerPhase3 = true;
    }
    else { // hospital
      this.hospitalRegisterData.name = event.target.nameInput.value;
      this.hospitalRegisterData.webSite = event.target.websiteInput.value;
      this.hospitalRegisterData.phoneNumber = event.target.phoneNumberInput.value;
      this.hospitalRegisterData.homeNumber = event.target.homeNumberInput.value;
      this.hospitalRegisterData.location = event.target.locationInput.value;
      this.hospitalRegisterData.city = (event.target.selectCityInput.value);
      this.hospitalRegisterData.aboutHospital = event.target.AboutMeInput.value;
      this.registerService.registerUser(this.hospitalRegisterData, this.typeAccount).subscribe(data => {
        this.snackBar.open(data.message, 'close', {
          duration: 3000,
          horizontalPosition: 'start',
          verticalPosition: 'bottom',
        }); localStorage.setItem('username', data.data.userName);
        localStorage.setItem('id', data.data.id);
        localStorage.setItem('token', data.data.token);
        this.router.navigateByUrl("/");
      }, err => {
        this.snackBar.open(err, 'close', {
          duration: 3000,
          horizontalPosition: 'start',
          verticalPosition: 'bottom',
        });
      });
    }
  }

  async openDialog(userNameExist: boolean, emailExist: boolean, filesEmptyExist: boolean,
    passwordNotHaveUpperCaseCharachter: boolean, passwordNotHaveLoweCaseCharachter: boolean,
    passwordNotHaveValidLength: boolean, passwordNotHaveAtLeastOneNumber: boolean, passwordNotHaveAtLeastOneSpeical: boolean, emailNotValid: boolean) {
    let dialogRef = this.dialog.open(RegisterDialogComponent, {
      width: '250px',
      data: {
        usernameExist: userNameExist,
        emailExist: emailExist,
        filesExist: filesEmptyExist,
        passwordNotHaveUpperCaseCharachter: passwordNotHaveUpperCaseCharachter,
        passwordNotHaveLoweCaseCharachter: passwordNotHaveLoweCaseCharachter,
        passwordNotHaveValidLength: passwordNotHaveValidLength,
        passwordNotHaveAtLeastOneNumber: passwordNotHaveAtLeastOneNumber,
        passwordNotHaveAtLeastOneSpeical: passwordNotHaveAtLeastOneSpeical,
        emailNotValid: emailNotValid
      }
    });
  }

  onSubmitPhase3(event: any) {
    if (this.typeAccount == 2 || this.typeAccount == 3) {// doctor or nurse
      let startTime = new Date();
      startTime.setHours(parseInt(event.target.fromHoursInput.value));
      startTime.setMinutes(parseInt(event.target.fromMinutesInput.value));
      let endTime = new Date();
      console.log("before :" + endTime)
      endTime.setHours(parseInt(event.target.toHoursInput.value));
      endTime.setMinutes(parseInt(event.target.toMinutesInput.value));
      console.log("after :" + endTime)
      this.doctorOrNurseRegisterData.aboutMe = event.target.AboutMeInput.value;
      this.doctorOrNurseRegisterData.specialization = event.target.specializationInput.value;
      this.doctorOrNurseRegisterData.workAtHome = event.target.workForHomeInput.value == "1" ? true : false;
      this.doctorOrNurseRegisterData.startTimeWork = startTime.toLocaleString();
      this.doctorOrNurseRegisterData.endTimeWork = endTime.toLocaleString();
      console.log("after2 :" + this.doctorOrNurseRegisterData.endTimeWork)
      this.registerService.registerUser(this.doctorOrNurseRegisterData, this.typeAccount).subscribe(data => {
        this.snackBar.open(data.message, 'close', {
          duration: 3000,
          horizontalPosition: 'start',
          verticalPosition: 'bottom',
        }); localStorage.setItem('username', data.data.userName);
        localStorage.setItem('id', data.data.id);
        localStorage.setItem('token', data.data.token);
        this.router.navigateByUrl("/");
      }, err => {
        this.snackBar.open(err, 'close', {
          duration: 3000,
          horizontalPosition: 'start',
          verticalPosition: 'bottom',
        });
      });
    }
  }

  checkIfStringHaveAtLeastOneDigit(s: string) {
    const regexToCheck = /(?=.*[0-9])/;
    return regexToCheck.test(s);
  }

  checkIfStringHaveAtLeastOneLowercase(s: string) {
    const regexToCheck = /(?=.*[a-z])/;
    return regexToCheck.test(s);
  }

  checkIfStringHaveAtLeastOneUppercase(s: string) {
    const regexToCheck = /(?=.*[A-Z])/;
    return regexToCheck.test(s);
  }

  chechIfStringHasAtLeastOneSpeicalCharcter(s: string) {
    const regexToCheck = /(?=.*\W)/;
    return regexToCheck.test(s);
  }

  checkIfStringIsVaildEmail(s: string) {
    const regexToCheck = /(^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$)/;
    return regexToCheck.test(s);
  }

  checkIfStringHaveMinimumLengthGood(s: string, n: any) {
    return s.length >= n;
  }

  toggleShow() {
    this.showPassword = !this.showPassword;
  }

}


