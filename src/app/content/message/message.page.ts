import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import {ActivatedRoute, Router} from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireDatabase } from '@angular/fire/database';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-message',
  templateUrl: './message.page.html',
  styleUrls: ['./message.page.scss'],
})
export class MessagePage implements OnInit {
  connected: boolean;
  messageText: any;
  userId: any;
  contactId: any;
  messages = [];

  private routeSub: Subscription;

  constructor(
      public afAuth: AngularFireAuth,
      private router: Router,
      public firestore: AngularFirestore,
      public afDatabase: AngularFireDatabase,
      private route: ActivatedRoute
  ) {
    this.afAuth.authState.subscribe(auth => {
      if (!auth) {
        console.log('non');
        this.connected = false;
        this.router.navigate(['home']);
      } else{
        console.log('oui');
        this.connected = true;
        this.userId = auth.uid;
        this.getMessages();
      }
    });
  }

  ngOnInit() {
    this.routeSub = this.route.params.subscribe(params => {
      this.contactId = params['id'];
    });
  }
  sendMessage(){
    this.afDatabase.list('Messages/').push({
      userId: this.userId,
      text: this.messageText,
      date: new Date().toISOString(),
      contactId: this.contactId
    });
    this.messageText = '';
  }

  getMessages(){
    this.afDatabase.list('Messages/').snapshotChanges(['child_added'])
        .subscribe(actions => {
          this.messages = [];
          actions.forEach(action => {
            if (action.payload.exportVal().userId === this.userId && action.payload.exportVal().contactId === this.contactId){
              this.messages.push({
                text: action.payload.exportVal().text,
                userId: action.payload.exportVal().userId,
                date: action.payload.exportVal().date
              });
            }
            else if (action.payload.exportVal().contactId === this.userId && action.payload.exportVal().userId === this.contactId) {
              this.messages.push({
                text: action.payload.exportVal().text,
                userId: action.payload.exportVal().userId,
                date: action.payload.exportVal().date
              });
            }
          });
        });
  }
}
