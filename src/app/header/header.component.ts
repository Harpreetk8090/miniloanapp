import { Component, DoCheck, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoanserviceService } from '../services/loanservice.service';
import { myinterface } from '../myinterface';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements DoCheck, OnInit {
  isMenuReqd = false;

  isAdmin = false;
  getitem!: string|null ;
  allData: myinterface[]=[];
  getName:myinterface | undefined ;

  constructor(private _route: Router, private _myserv: LoanserviceService) { }
  ngOnInit(): void {
    let item = sessionStorage.getItem('username')
    this.getitem = item;
    console.log(`user id is ${this.getitem}`)
    this.getAllData();
  }

  getAllData() {
    this._myserv.getAll().subscribe((res:myinterface[]) => {
      this.allData = res;
      const myObj = this.allData.find((user: myinterface) => {

        return user.id === this.getitem
      });
      this.getName = myObj;
      console.log(this.getName?.firstName);
    })
  }
  ngDoCheck(): void {


    let currentUrl = this._route.url;
    if (currentUrl == '/login' || currentUrl == '/makeloan') {
      this.isMenuReqd = false;
    } else {
      this.isMenuReqd = true;

    }
    if (this._myserv.getUserRole() === 'admin') {
      this.isAdmin = true;
    } else {
      this.isAdmin = false;
    }
  }

}
