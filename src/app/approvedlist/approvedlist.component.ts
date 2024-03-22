import { Component, OnInit } from '@angular/core';
import { LoanserviceService } from '../services/loanservice.service';
import { myinterface } from '../myinterface';

@Component({
  selector: 'app-approvedlist',
  templateUrl: './approvedlist.component.html',
  styleUrls: ['./approvedlist.component.css']
})
export class ApprovedlistComponent implements OnInit {

  constructor(private _myserv:LoanserviceService) { }
  getAllData:myinterface[]=[];
  approvedData:myinterface[]=[];
    ngOnInit(): void {
      this.getApprovedLoan();
    }
  getApprovedLoan(){
    this._myserv.getAll().subscribe((res:myinterface[])=>{
      console.log(res);
      this.getAllData=res;
      const findApprovedArray=this.getAllData.filter((user:any)=>{
      return user.isactive==='Approved'
    })
    console.log(findApprovedArray)
    this.approvedData=findApprovedArray
    })
  }

}
