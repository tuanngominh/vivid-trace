import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'

const config = {
  apiKey: "AIzaSyButWBDUS6KDb2ohPzBM7ZfVeaFlwUvx6s",
  authDomain: "vivid-trace.firebaseapp.com",
  databaseURL: "https://vivid-trace.firebaseio.com",
  storageBucket: "vivid-trace.appspot.com",
  messagingSenderId: "1046612858521"
}

firebase.initializeApp(config)

export default firebase

