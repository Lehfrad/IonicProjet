import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {
  dataUser = {
    email: '',
    password: '',
    retype: '',
    username: '',
    firstName: '',
    lastName: '',
    birthdate: '',
    age: '',
    adress: ''
  };
  constructor(
      public afAuth: AngularFireAuth,
      public router: Router,
      public firestore: AngularFirestore
  ) { }

  ngOnInit() {
  }

  signUp(){
    if (this.dataUser.password === this.dataUser.retype){
      this.afAuth.createUserWithEmailAndPassword(this.dataUser.email, this.dataUser.password)
          .then((auth) => {
            this.database(
                auth.user.uid,
                this.dataUser.email,
                this.dataUser.username,
                this.dataUser.firstName,
                this.dataUser.lastName,
                this.dataUser.birthdate,
                this.dataUser.age,
                this.dataUser.adress);


            this.router.navigate(['contact']);
          })
          .catch((error) => {
            window.alert(error.message);
          });
    }else {
      window.alert('Les mots de passes ne sont pas les mêmes');
    }

  }

  database(
      id: string,
      email: string,
      username: string,
      firstName: string,
      lastName: string,
      birthdate: string,
      age: string,
      adress: string
  ): Promise<void>{
    return this.firestore.doc(`users/${id}`).set({
      id,
      email,
      username,
      firstName,
      lastName,
      birthdate,
      age,
      adress,
    });
  }

}
