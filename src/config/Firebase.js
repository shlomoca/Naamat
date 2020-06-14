import  firebase from 'firebase'
import 'firebase/firestore'
import 'firebase/storage'
import 'firebase/auth';


 const firebaseConfig = {
    apiKey: "AIzaSyCWPELpGB-6l7o1GS0OkM4KNPONvgQsvus",
    authDomain: "naamat-vc.firebaseapp.com",
    databaseURL: "https://naamat-vc.firebaseio.com",
    projectId: "naamat-vc",
    storageBucket: "naamat-vc.appspot.com",
    messagingSenderId: "1000005065023",
    appId: "1:1000005065023:web:a992a23bac3eceec8edb8a",
    measurementId: "G-5KW5LHL765"
  };
  firebase.initializeApp(firebaseConfig);
  export const storage = firebase.storage();
  export const db = firebase.firestore();
  export const auth = firebase.auth();

  
export default{firebase};