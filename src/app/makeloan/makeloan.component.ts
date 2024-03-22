import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { LoanserviceService } from '../services/loanservice.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { myinterface } from '../myinterface';
@Component({
  selector: 'app-makeloan',
  templateUrl: './makeloan.component.html',
  styleUrls: ['./makeloan.component.css']
})
export class MakeloanComponent implements OnInit {
  signForm!: FormGroup;
  constructor(private _fb: FormBuilder, private _myserv: LoanserviceService, private _toastr: ToastrService, private _router: Router) {
    this.signForm = this._fb.group({
      firstName: new FormControl('', Validators.compose([
        Validators.maxLength(25),
        Validators.minLength(5),
        Validators.required
      ])),
      lastName: new FormControl('', Validators.compose([
        Validators.maxLength(25),
        Validators.minLength(5),

        Validators.required
      ])),
      email: new FormControl('', Validators.compose([
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$'),
        Validators.required
      ])),
      password: new FormControl('', Validators.compose([
        Validators.minLength(5),
        Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/),
        Validators.required
      ])),
      loanterm: new FormControl('', Validators.compose([
        Validators.min(1),
        Validators.required
      ])),
      loanamount: new FormControl('', Validators.compose([
        Validators.min(5000),
        Validators.max(500000),
        Validators.required
      ])),
      role: new FormControl(''),
      isactive: new FormControl('false'),
      repayment: new FormControl('false'),
      installments: new FormControl('')
    })
  }

  ngOnInit(): void {
  }
  account_validation_messages = {
    'firstName': [
      { type: 'required', message: 'Firstname is required' },
      { type: 'minlength', message: 'Firstname  must be at least 5 characters long' },
      { type: 'maxlength', message: 'Firstname  cannot be more than 25 characters long' }
    ],
    'lastName': [
      { type: 'required', message: 'Lastname is required' },
      { type: 'minlength', message: 'Lastname must be at least 5 characters long' },
      { type: 'maxlength', message: 'Lastname cannot be more than 25 characters long' }
    ],
    'email': [
      { type: 'required', message: 'Email is required' },
      { type: 'pattern', message: 'Enter a valid email' }
    ],

    'password': [
      { type: 'required', message: 'Password is required' },
      { type: 'minlength', message: 'Password must be at least 5 characters long' },
      { type: 'pattern', message: 'Your password must contain at least one uppercase, one lowercase, and one number' }
    ],
    'loanterm': [
      { type: 'required', message: 'Loan term is required' },
      { type: 'min', message: 'Loan term should be greater than 0' }
    ],
    'loanamount': [
      { type: 'required', message: 'Loan Amount is required' },
      { type: 'max', message: 'Loan Amount cannot be greater than 5 lakh' },
      { type: 'min', message: 'Loan Amount cannot be smaller than 5000' },
    ],
  }
  onFormSubmit(){

    if (this.signForm.valid) {
      this._myserv.signUp(this.signForm.value).subscribe((res:myinterface ) => {
        console.log(this.signForm.value)

        this._router.navigate(['login'])
        this._toastr.success(`Loan application with name ${this.signForm.value.firstName} registered successfully`)

      }, err => {
        this._toastr.error(`Something went wrong.`)

      })
    }


  }
}
