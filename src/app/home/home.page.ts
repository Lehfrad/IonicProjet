import { Component } from '@angular/core';

// Firebase
import { AngularFireAuth } from '@angular/fire/auth';
import {Router} from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  dataUser = {
    email: '',
    password: ''
  };
  connected: boolean;

  constructor(
      public afAuth: AngularFireAuth,
      public router: Router
  ) {
    this.afAuth.authState.subscribe(auth => {
      if (!auth) {
        console.log('non');
        this.connected = false;
      } else{
        console.log('oui');
        this.connected = true;
      }
    });
  }
  isConnected(): boolean{
    return this.connected;
  }

  // Fonction pour se connecter
  login() {
    this.afAuth.signInWithEmailAndPassword(this.dataUser.email, this.dataUser.password)
        .then((user) => {
          this.router.navigate(['contact']);
        })
        .catch((error) => {
          window.alert(error.message);
        });
    this.dataUser = {
      email: '',
      password: ''
    };
  }
}
