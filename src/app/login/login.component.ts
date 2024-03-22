import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { LoanserviceService } from '../services/loanservice.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import * as CryptoJS from 'crypto-js';
import { myinterface } from '../myinterface';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;
  constructor(private _fb: FormBuilder, private _myserv: LoanserviceService, private _toastr: ToastrService, private _router: Router) {
    sessionStorage.clear();
  }
  userData: myinterface[] = [];
  ngOnInit(): void {
    this.loginForm = this._fb.group({
      firstName: new FormControl('', Validators.compose([
        Validators.minLength(5),
        Validators.maxLength(25),
        Validators.required])),
      password: new FormControl('', Validators.compose([
        Validators.minLength(5),
        Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/),
        Validators.required]))
    })

  }
  generateToken(data: string): string {
    // Generate SHA-256 hash
    const hash = CryptoJS.SHA256(data);
    // Convert hash to string
    const hashString = hash.toString(CryptoJS.enc.Hex);
    return hashString;
  }
  account_validation_messages = {
    'firstName': [
      { type: 'required', message: 'Firstname is required' },
      { type: 'minlength', message: 'Firstname  must be at least 5 characters long' },
      { type: 'maxlength', message: 'Firstname  cannot be more than 25 characters long' }
    ],
    'password': [
      { type: 'required', message: 'Password is required' },
      { type: 'minlength', message: 'Password must be at least 5 characters long' },
      { type: 'pattern', message: 'Your password must contain at least one uppercase, one lowercase, and one number' }
    ],
  }
  proceedLogin() {
    if (this.loginForm.valid) {
      this._myserv.getAll().subscribe((res: myinterface[]) => {
        this.userData = res;
        console.log(this.userData)
        const user = res.find((a: myinterface) => {

          return a.firstName === this.loginForm.value.firstName && a.password === this.loginForm.value.password
        })

        if (user) {
          if (user.isactive === 'true') {

            this._toastr.success("admin successfully logged in")
            let mytoken = `${user.firstName}${user.password}`
            const token = this.generateToken(mytoken)
            console.log(token)
            sessionStorage.setItem('username', user.id);
            sessionStorage.setItem('userrole', user.role);
            sessionStorage.setItem('JWT-Token', token)
            this._router.navigate(['']);
          } else if (user.isactive === 'Approved') {
            this._toastr.success("user successfully logged in")
            this.loginForm.reset();
            sessionStorage.setItem('username', user.id);
            sessionStorage.setItem('userrole', user.role);
            this._router.navigate(['/homeuser']);
          }


          else {
            this._toastr.warning("Please contact admin to approve your loan")

            this.loginForm.reset();
          }
        } else {
          this._toastr.warning("Invalid Username or Password")
          this.loginForm.reset();
        }

      }, err => {
        this._toastr.error(`Something went wrong. ${err.message}`)

      })

    }



  }
}
