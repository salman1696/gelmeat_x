import { firebase } from '@react-native-firebase/messaging';
import {firebaseConfig} from './firebase-config';

let instance = null;
class FirebaseService {
  init() {
    if (!instance) {
      this.app = firebase.initializeApp();
      instance = this;
    }
  }

  login(params) {
    return firebase
      .auth()
      .signInWithEmailAndPassword(params.email, params.password);
  }

  signup(params) {
    console.log(params);
    return firebase
      .auth()
      .createUserWithEmailAndPassword(params.email, params.password);
  }

  saveUserInfo(params) {
    return firebase.database().ref('Users').child(params.uid).set(params);
  }
}

const firebaseService = new FirebaseService();

export default firebaseService;
