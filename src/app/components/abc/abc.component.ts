import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-abc',
  templateUrl: './abc.component.html',
  styleUrls: ['./abc.component.css']
})
export class AbcComponent implements OnInit {

  contenido;

  constructor() { }

  ngOnInit() {

    // //admin.initializeApp(firebaseConfig);
    // // var database = firebase.database();
    // //agent.add('estamos consultando examenes!');
    // var t = null;

    // const examenes = admin.database().ref("Examenes").once('value', (snapshot) => {
    //     snapshot.forEach((childSnapshot) => {
    //         var childKey = childSnapshot.key;
    //         var childData = childSnapshot.val();
    //         t = childKey + " " + childData+" "+t;
    //         // console.log('DATOSSSSSSSSSSS: ' + childData);
    //     });

    //     this.contenido = t;

    // });
    // console.log(t);
    // //agent.add('estamos consultando examenes!');

    // //agent.add('Resultado: ' + examenes);
    // //agent.add('RESULTADO: ' + from_data.data);



  }

}
