import { Component, OnInit } from '@angular/core';
import { LoanserviceService } from '../services/loanservice.service';
import { myinterface } from '../myinterface';

@Component({
  selector: 'app-pendinglist',
  templateUrl: './pendinglist.component.html',
  styleUrls: ['./pendinglist.component.css']
})
export class PendinglistComponent implements OnInit {

  constructor(private _myserv: LoanserviceService) { }
  getAllData: myinterface[]=[];
  pendingData: myinterface[]=[];
  ngOnInit(): void {
    this.getPendingLoan();
  }
  getPendingLoan() {
    this._myserv.getAll().subscribe((res:myinterface[]) => {
      console.log(res);
      this.getAllData = res;
      const findPendingArray = this.getAllData.filter((user: myinterface) => {
        return user.isactive === 'Pending' || user.isactive === 'false'
      })
      console.log(findPendingArray)
      this.pendingData = findPendingArray
    })
  }
}
