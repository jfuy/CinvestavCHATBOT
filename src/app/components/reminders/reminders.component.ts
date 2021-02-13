import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator, MatSnackBar } from '@angular/material';
import { Reminder } from 'src/app/models/Reminder.model';
import { FirebaseService } from 'src/app/services/firebase/firebase.service';
import { AngularFireDatabase } from '@angular/fire/database';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reminders',
  templateUrl: './reminders.component.html',
  styleUrls: ['./reminders.component.css'],
  providers: [MatSnackBar]
})
export class RemindersComponent implements OnInit {

  dataSource: MatTableDataSource<Reminder>;
  displayedColumns: string[] = ['idKey','reminder','publication', 'delet'];
  textAreaReminder: string;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;


  constructor(
    private database: AngularFireDatabase,
    public firebase: FirebaseService,
    private router: Router,
    private snackBar: MatSnackBar,
    ) {
      
     }

  ngOnInit() {
    this.getRemind();
  }

  //para obtener los avisos que anteriormente han sido registrados en el sistema
  getRemind(){
    let arrayReminders: Array<Reminder>=[];        
    // let arrReminder: Reminder[] = [];
    this.database.database.ref('Recordatorios/').once('value').then((snapshot) => {
      const value = snapshot.val();     
      if (value !== null || value!==undefined) {
          for (var val in value) {
              let remindr = new Reminder(val,value[val].reminder, value[val].publication, value[val].delet);
              if(remindr){
                arrayReminders.push(remindr);
              }
          }
      }
      this.dataSource = new MatTableDataSource(arrayReminders);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
  });

}

//para dar de alta un aviso en el sistema
  registerReminder(){
    let date: Date = new Date();
    let data={
      reminder:this.textAreaReminder,
      publication: date.getDate()+"/"+(date.getMonth()+1)+"/"+date.getFullYear(),
      delet: 1,
    };
    this.firebase.addReminder(data);  

    this.openCustomerSnackBar();

    this.getRemind();
    this.textAreaReminder = "";
  }

  //para cambiar el estado de un aviso, de activado a desactivado y viceversa
  changeActivated(activated:Boolean, remin : Reminder){
    if(activated){
      remin.delet=1;
    }else{
      remin.delet=0;
    }
    let data={
      reminder:remin.reminder,
      publication: remin.publication,
      delet: remin.delet,
    };
    // console.log(remin); 
    this.firebase.updateReminderActivated(remin.idKey, data);
  }

  //para abrir una notificacion emergente y dar el mensaje de que el recordatorio se registro correctamente
  openCustomerSnackBar(){
    return this.snackBar.openFromComponent(CustomSnackBarComponent, {duration: 4000});
  }

  //regresar al menu principal
  menuP(){
    this.router.navigateByUrl("Menu");
  } 
}

@Component({
  selector: 'custom-snackbar',
  template: `<span style='color: #00ff4ce3;'><strong>Recordatorio Registrado Correctamente</strong></span>`
})
export class CustomSnackBarComponent{}
