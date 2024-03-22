import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';


@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent implements OnInit {
@Input() totalItems!:number;
@Input () currentPage!:number;
@Input() itemsPerPage!:number;
@Output() onClick: EventEmitter<number> = new EventEmitter();
totalPages=0;
pages:number[]=[];
  constructor() { }

  ngOnInit(): void {
    if(this.totalItems)
    this.totalPages=Math.ceil(this.totalItems/this.itemsPerPage);
  // alert(this.totalPages)
  this.pages=Array.from({length:this.totalPages},(_,i)=>i+1);
  }
  pageClicked(page:number){
    if(page<=this.totalPages){this.onClick.emit(page);}

  }
}
