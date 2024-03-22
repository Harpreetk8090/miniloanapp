import { Component, OnInit } from '@angular/core';
import { LoanserviceService } from './services/loanservice.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'mybankapp';
  constructor(public _myserv:LoanserviceService){}
  ngOnInit(): void {
    
  }
}
