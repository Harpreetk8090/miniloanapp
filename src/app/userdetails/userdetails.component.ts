import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoanserviceService } from '../services/loanservice.service';
import { DatePipe } from '@angular/common';
import { FormControl, FormGroup } from '@angular/forms';
import { myinterface } from '../myinterface';
import { repaymentstatus } from '../repaymentstatus';

@Component({
  selector: 'app-userdetails',
  templateUrl: './userdetails.component.html',
  styleUrls: ['./userdetails.component.css']
})
export class UserdetailsComponent implements OnInit {

  constructor(private _myserv: LoanserviceService, private _activatedRoute: ActivatedRoute, private _datepipe: DatePipe) { }
  userData: any;
  installmentAmount!: number;
  buttonDisabled: boolean = false;
  weeklyRepayments: { date: string; amount: number; payment: String }[] = [];
  repaymentOptions: repaymentstatus[]=[];
  editForm!: FormGroup
  startDate = new Date();
  indexForPayment!: number;
  myUserID: string| null="";
  ngOnInit(): void {
    const item = sessionStorage.getItem('username');
    console.log(item);
    let userID = this._activatedRoute.snapshot.paramMap.get('id');
    console.log(`userID in userdetails comp is ${userID}`);
    this.myUserID = userID;
    this.loadUserByID();
   
    this._myserv.getRepaymentStatus().subscribe((res:repaymentstatus[]) => {
      this.repaymentOptions = res;
      console.log(res);
    })
    this.editForm = new FormGroup({
      myInstallment: new FormControl('default')
    })
  }
  loadUserByID() {
    this.myUserID && this._myserv.getUserById(this.myUserID).subscribe((res:myinterface) => {
      console.log(res);
      this.userData = res;
    })
  }

  loanapp() {

    const weeklypayments = this.userData.loanamount / this.userData.loanterm;
    if (this.userData.installments?.length > 0) {
      this.weeklyRepayments = this.userData.installments;
    } else {
      for (let i = 1; i <= this.userData.loanterm; i++) {

        const repaymentDate = new Date(this.startDate);
        const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
        repaymentDate.setDate(repaymentDate.getDate() + i * 7);
        const repaymentAmount = i < this.userData.loanterm ? weeklypayments : this.userData.loanamount - (weeklypayments * (this.userData.loanterm - 1));
        const formattedDate = repaymentDate.toLocaleDateString('en-US', options);
        this.weeklyRepayments.push({ date: formattedDate, amount: repaymentAmount, payment: '' });
      }
      console.log(this.weeklyRepayments);
      this.userData.installments = this.weeklyRepayments;
      console.log(this.userData)
      this.updateInstallment();
    }

    this.buttonDisabled = true;
  }
  editStatus(row:any) {
    console.log(row)
    const index = this.weeklyRepayments.findIndex((mydata) => {
      return mydata.date === row.date;
    })
    this.editForm.patchValue({
      myInstallment: row.payment // Set the form control to the current payment status
    });
    console.log(index);
    this.indexForPayment = index;
    this.editForm.controls['myInstallment'].setValue(row.myInstallment)
    console.log(this.editForm.controls['myInstallment'].value);
  }
  // this.userData.installments[this.indexForPayment]
  updatePaymentStatus() {

    const paymentStatus = this.editForm.value.myInstallment;
    console.log(paymentStatus)

    // Update the payment status of the installment
    this.userData.installments[this.indexForPayment].payment = paymentStatus;
    console.log(this.userData.installments[this.indexForPayment].payment)
    this.userData.installments[this.indexForPayment].payment = this.editForm.value.myInstallment;
    console.log(this.userData.installments[this.indexForPayment].payment)
    const installmentToUpdate = this.userData.installments[this.indexForPayment];
    console.log(this.userData.installments[this.indexForPayment])
    console.log(installmentToUpdate)
    // const updatePayload = {
    //   'payment': this.editForm.value.myInstallment
    // };
    this.weeklyRepayments[this.indexForPayment].payment = this.editForm.value.myInstallment;
    // console.log(updatePayload)
    this._myserv.updateUserPayment(this.myUserID, this.indexForPayment, { 'installments': this.weeklyRepayments }).subscribe((res) => {
      console.log(res);
      let ref=document.getElementById("cancel");
      ref?.click();
      alert("payment updated")
      this.editForm.reset();
      this.loadUserByID();
      // console.log(updatePayload)
    }, err => {
      console.log("something went wrong")
    })
  }
  updateInstallment() {

    console.log(this.userData.installments)
    this._myserv.updateUserInstallments(this.userData.id, this.weeklyRepayments).subscribe((res) => {
      console.log(res);
      console.log("data updated with installments");

    })
  }
}
