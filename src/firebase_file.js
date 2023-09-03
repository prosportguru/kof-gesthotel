import  firebase from "@firebase/app";
import "@firebase/auth";
import "@firebase/firestore";
import "@firebase/storage";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDb54OrPh6Sdbcjf24ua1o9ehEtbljy-Ms",
    authDomain: "kof-gesthotel.firebaseapp.com",
    projectId: "kof-gesthotel",
    storageBucket: "kof-gesthotel.appspot.com",
    messagingSenderId: "901158507173",
    appId: "1:901158507173:web:400a87c054b9cea9e1734c"
  };

let app;
if(firebase.apps.length==0){
  app=firebase.initializeApp(firebaseConfig);
}else{
  app=firebase.app();
}

const db=app.firestore();
const auth=app.auth();
const storage=app.storage();

export {db,auth,storage};