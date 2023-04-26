import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Participant } from '../models/Participant';
import { AdminService } from '../services/admin/admin.service';
import { AuthService } from '../services/auth/auth.service';
import { ParticipantService } from '../services/participant/participant.service';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument }
  from 'angularfire2/firestore';
import { from, Observable } from 'rxjs';
import { map, subscribeOn } from 'rxjs/operators';
import {MatCardModule} from '@angular/material/card';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { AddExhibitionModalComponent} from '../add-exhibition-modal/add-exhibition-modal.component';

@Component({
  selector: 'admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.css']
})
export class AdminPageComponent implements OnInit {
  participantCollection: AngularFirestoreCollection<Participant>;
  participants: Participant[];
  id: string;
  dog: Participant;
  //dialog: any;
  

  constructor(private participantService: ParticipantService, public dialog: MatDialog, private adminService: AdminService, public authService: AuthService, private afs: AngularFirestore)
  {
    this.participantCollection = afs.collection('participant'); 
  }


  ngOnInit(): void {
    this.participantService.getClients().subscribe(participants=>{this.participants=participants});
    
  }

  onClick(dog: Participant){
    this.dog=dog;
    console.log(this.dog)
  }

  openExpoModal(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = false;
    dialogConfig.width = "60%";
    this.dialog.open(AddExhibitionModalComponent,
      {
        width: "250px",
        height: "300px",
        disableClose: true
      });
  }
  }
  
