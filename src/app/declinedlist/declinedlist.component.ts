import { Component, OnInit } from '@angular/core';
import { LoanserviceService } from '../services/loanservice.service';
import { myinterface } from '../myinterface';

@Component({
  selector: 'app-declinedlist',
  templateUrl: './declinedlist.component.html',
  styleUrls: ['./declinedlist.component.css']
})
export class DeclinedlistComponent implements OnInit {

  constructor(private _myserv:LoanserviceService) { }
  getAllData:myinterface[]=[];
  declinedData:myinterface[]=[];
    ngOnInit(): void {
      this.getDeclinedLoan();
    }
  getDeclinedLoan(){
    this._myserv.getAll().subscribe((res:myinterface[])=>{
      console.log(res);
      this.getAllData=res;
      const findDeclinedArray=this.getAllData.filter((user:myinterface)=>{
      return user.isactive==='Declined'
    })
    console.log(findDeclinedArray)
    this.declinedData=findDeclinedArray
    })
  }

}
