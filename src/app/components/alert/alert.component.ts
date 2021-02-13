import { Component, OnInit, Injector, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css'] 
})
export class AlertComponent implements OnInit {

  constructor(
    public dialogRef : MatDialogRef<AlertComponent>,
    @Inject(MAT_DIALOG_DATA) public message:string
  ) { }

  onClickNo():void{
    this.dialogRef.close()
  }
  ngOnInit() {
  }

}
