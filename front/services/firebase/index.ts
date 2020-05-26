import * as firebase from "firebase";
import config from "./config";

class Firebase {
  constructor() {
    if (!firebase.apps.length) {
      firebase.initializeApp(config);
    }
  }

  login() {
    const provider = new firebase.auth.TwitterAuthProvider();
    return firebase
      .auth()
      .signInWithPopup(provider)
      .then(res => {
        return res;
      })
      .catch(err => {
        console.error(err);
        throw err;
      });
  }

  logout() {
    return firebase.auth().signOut();
  }
}

export default new Firebase();
