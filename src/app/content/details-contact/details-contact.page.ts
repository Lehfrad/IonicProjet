import { Component, OnInit } from '@angular/core';
import {Subscription} from 'rxjs';
import {AngularFireAuth} from '@angular/fire/auth';
import {ActivatedRoute, Router} from '@angular/router';
import {AngularFirestore} from '@angular/fire/firestore';
import {AngularFireDatabase} from '@angular/fire/database';

@Component({
  selector: 'app-details-contact',
  templateUrl: './details-contact.page.html',
  styleUrls: ['./details-contact.page.scss'],
})
export class DetailsContactPage implements OnInit {

  private routeSub: Subscription;
  private contactId: any;
  private userId: string;
  private connected: boolean;

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
      } else {
        console.log('oui');
        this.connected = true;
        this.userId = auth.uid;
      }
    });
  }

  ngOnInit() {
    this.routeSub = this.route.params.subscribe(params => {
      this.contactId = params['id'];
    });
  }
}
