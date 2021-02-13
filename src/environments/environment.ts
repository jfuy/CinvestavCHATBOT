// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
/**
 * variable del entorno del sistema con valores en todo el sistema  
 */

 //chatbotProfesor Original = dc001010f75e42dbb1e41db49ab43d8a 	
export const environment = {
  production: false,
  dialogflow:{
    cinvestavChatbot:"139c80b0b3214d14a29877c4fa62e692",
    cinvestavChatbotProfesor:"dc001010f75e42dbb1e41db49ab43d8a"
  },
  firebase: {
    /*apiKey: "AIzaSyCfsNVhrr-acJ246R23wx-YVUIVcY86WQc",
    authDomain: "cinvestavchatbot.firebaseapp.com",
    databaseURL: "https://cinvestavchatbot.firebaseio.com",
    projectId: "cinvestavchatbot",
    storageBucket: "cinvestavchatbot.appspot.com",
    messagingSenderId: "984782490625",
    appId: "1:984782490625:web:a6f4858d404f307b900400"*/
    apiKey: "AIzaSyDrw3rUOysLX__KgQez80s1kQz6jdIieMQ",
    authDomain: "chatbotcinvestav2.firebaseapp.com",
    databaseURL: "https://chatbotcinvestav2-default-rtdb.firebaseio.com",
    projectId: "chatbotcinvestav2",
    storageBucket: "chatbotcinvestav2.appspot.com",
    messagingSenderId: "492383338406",
    appId: "1:492383338406:web:68b68b725b8576d8951967",
    measurementId: "G-XVDNK3XLK8"
  },
  token: "tokenPrueba",
};



/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
