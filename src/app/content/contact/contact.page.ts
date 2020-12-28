import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from '../../models/user';
import {AngularFirestore} from '@angular/fire/firestore';
import {AngularFireDatabase} from '@angular/fire/database';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.page.html',
  styleUrls: ['./contact.page.scss'],
})
export class ContactPage implements OnInit {
  connected: boolean;
  public userList: Observable<User[]>;
  id: any;
  lastMessageUser: any;

  constructor(
      public afAuth: AngularFireAuth,
      private router: Router,
      public firestore: AngularFirestore,

      public afDatabase: AngularFireDatabase
  ) {
    this.afAuth.authState.subscribe(auth => {
      if (!auth) {
        console.log('non');
        this.connected = false;
        this.router.navigate(['home']);
      } else{
        console.log('oui');
        this.connected = true;
        this.id = auth.uid;
      }
    });
  }

  ngOnInit() {
    this.userList = this.getUserList();
  }

  getUserList(){
    return this.firestore.collection<User>(`users`).valueChanges();
  }

  logout(){
    this.afAuth.signOut();
  }

  /*getMessages(contactId: string){
    const variableName = 'message' + contactId;
    console.log(variableName);
    this.afDatabase.list('Messages/').snapshotChanges(['child_moved'])
        .subscribe(actions => {
          actions.forEach(action => {
            if (action.payload.exportVal().userId === this.id && action.payload.exportVal().contactId === contactId){
              this.lastMessageUser = action.payload.exportVal().text;
            }
            else if (action.payload.exportVal().contactId === this.id && action.payload.exportVal().userId === contactId) {
              this.lastMessageUser = action.payload.exportVal().text;
            }
          });
        });
    return this.lastMessageUser;
  }*/
}
