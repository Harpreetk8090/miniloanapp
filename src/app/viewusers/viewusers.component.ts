import { Component, OnInit } from '@angular/core';
import { LoanserviceService } from '../services/loanservice.service';
import { Router } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';
import { myinterface } from '../myinterface';
import { statusAdmin } from '../statusAdmin';
@Component({
  selector: 'app-viewusers',
  templateUrl: './viewusers.component.html',
  styleUrls: ['./viewusers.component.css']
})
export class ViewusersComponent implements OnInit {
  roleList: any;
  editForm!: FormGroup;
  selectedUser: any;
  selectedUserIndex: any;
  itemsPerPage = 5;
  currentPage = 1;
  userList: any;

  constructor(private _myserv: LoanserviceService, private _router: Router) {
    this.loadUsers();
  }

  ngOnInit(): void {

    this._myserv.getRole().subscribe((res:any) => {
      this.roleList = res
      console.log(res)
    })
    this.editForm = new FormGroup({
      mystatus: new FormControl('default')


    });
  }
  getSerialNumber(index: number): number {
    return (this.currentPage - 1) * this.itemsPerPage + index + 1;
  }
  get paginatedData() {
    const start = (this.currentPage - 1) * (this.itemsPerPage);
    const end = start + this.itemsPerPage;
    return this.userList?.slice(start, end)
  }
  changePage(page: number) {
    this.currentPage = page;
  }
  loadUsers() {
   
    this._myserv.getAllUserData().subscribe((res:myinterface[]) => {
      this.userList = res;
      console.log(this.userList)
    })
  }
  onEdit(myrow: any) {
    console.log(myrow)
    const index = this.userList.findIndex((user: any) => {

      return user.firstName === myrow.firstName
    });

    console.log(index);
    this.selectedUser = this.userList[index];
    this.selectedUserIndex = index;

    this.editForm.controls['mystatus'].setValue(myrow.mystatus)
console.log(this.editForm.controls['mystatus'].value)

  }

  updateUser() {
    this.userList[this.selectedUserIndex].isactive = this.editForm.value.mystatus;
    console.log(this.selectedUser)



    console.log(this.editForm.value.mystatus)


    const updatePayload = {
      'isactive': this.editForm.value.mystatus
    };
    this._myserv.updateUser(this.userList[this.selectedUserIndex].id, updatePayload).subscribe((res: any) => {
      console.log(this.userList[this.selectedUserIndex].id)
      console.log(updatePayload);
      let ref = document.getElementById("cancel")
      ref?.click();
      alert("updated successfully")
      this.editForm.reset();
      this.loadUsers();

    }, err => {
      alert("Something went wrong")
    })
  }
  deleteUser(myrow: any) {
    console.log(myrow);
    this._myserv.delUser(myrow.id).subscribe((res) => {
      console.log(res);
      alert("Are you sure you want to delete the user")
      this.loadUsers();
    })
  }
}
