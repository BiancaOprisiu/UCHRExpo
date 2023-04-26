import { Component, OnInit } from '@angular/core';
import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreCollectionGroup, AngularFirestoreDocument }
  from 'angularfire2/firestore';
import { AngularFireStorage, AngularFireStorageReference, AngularFireUploadTask } from 'angularfire2/storage'

import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';
import { AngularFireAuth} from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { ParticipantService } from '../services/participant/participant.service';
import {Participant} from '../models/Participant';
import {Exhibition} from '../models/Exhibition';
import { AdminSignInModalComponent } from '../admin-sign-in-modal/admin-sign-in-modal.component';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';


function validateForm() {
  var x = document.forms["participantForm"]["firstName"].value;
  if (x == "") {
    alert("First name must be filled out");
    return false;
  }
  x = document.forms["participantForm"]["lastName"].value;
  if (x == "") {
    alert("Last name must be filled out");
    return false;
  }
  x = document.forms["participantForm"]["dogName"].value;
  if (x == "") {
    alert("Dog name must be filled out");
    return false;
  }
  x = document.forms["participantForm"]["dogAge"].value;
  if (x == "0") {
    alert("Dog age must be filled out");
    return false;
  }
  x = document.forms["participantForm"]["dogGender"].value;
  if (x == "") {
    alert("Dog gender must be filled out");
    return false;
  }
  x = document.forms["participantForm"]["microchip"].value;
  if (x == "") {
    alert("Microchip must be filled out");
    return false;
  }
  return true;}

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})

export class FormComponent implements OnInit {

  input: Participant = {
    age: 0,
    breed: 'rasa comuna',
    dog_name: '',
    first_name: '',
    gender: '',
    last_name: '', 
    microchip: '',
    dog_picture: '',
    fee_confirmation: ''
  }
  event: any;
  event10: any;
  finalurl1
  finalurl2
  event1
  url: any;
  url1: any;
  autoID: string
  autoID1: string
  downloadURL1: Observable<string>
  downloadURL2: Observable<string>
  uploadProgress$: Observable<number>

  counter: boolean = false;

  participantCollection: AngularFirestoreCollection<Participant>;
  participants: Observable<Participant[]>;

  exhibitionCollection: AngularFirestoreCollection<Exhibition>;
  exhibitions: Exhibition[];

  getMicroForId(id : String){
    this.participants.subscribe((p)=> {
      for (let participant of p){
        if(participant.id == id)
          return participant.microchip;
      }
    })
  }

  constructor(private participantService: ParticipantService, public angularfirestore: AngularFirestore, public dialog: MatDialog, public fire: AngularFirestore , public afStorage: AngularFireStorage) { }

  ngOnInit() : void {
    this.participantService.getExpo().subscribe(exhibitions=>{this.exhibitions=exhibitions});
  }


  onClick(){
    this.input.dog_picture=this.url;
    this.input.fee_confirmation=this.url1;
    console.log(this.input);
    if(this.input.dog_picture==undefined)
      alert('Dog picture must be filled out');
    if(this.input.fee_confirmation==undefined)
      alert('Fee confirmation must be filled out');
    if(!validateForm())
      alert('No empty fields allowed');
    else
    {
      this.participantService.addClient(this.input);
      alert('Success');
    }
  }

  updateProfile2(input: any, idParticipant: string) {
    console.log(idParticipant)
   
    this.participantCollection.doc(idParticipant).update({
        dog_picture: this.finalurl1,
        //fee_confirmation: this.finalurl2
    })
      
  }

  upload1(event) {
    this.event1 = event;
    if(this.event1.target.files[0] == null){
      alert("Please upload a file")
      return
    }
    const autoID = this.fire.createId();
    const ref = `DogPictures/${autoID}`;
    const fileref = this.afStorage.ref(ref)
    const task = this.afStorage.upload(ref, this.event1.target.files[0])
    task.snapshotChanges().pipe(finalize(() => {
      this.downloadURL1 = fileref.getDownloadURL()
      this.downloadURL1.subscribe(url => {
        if(url){
          this.url = url
        }
      })
      })
    ).subscribe(url => {
      if(url){
        this.finalurl1 = url
      }
    })
  }

  upload2(event) {
    this.event1 = event;
    if(this.event1.target.files[0] == null){
      alert("Please upload a file")
      return
    }
    const autoID = this.fire.createId();
    const ref = `FeeConfirmation/${autoID}`;
    const fileref = this.afStorage.ref(ref)
    const task = this.afStorage.upload(ref, this.event1.target.files[0])
    //this.uploadProgress$ = task.percentageChanges()
    task.snapshotChanges().pipe(finalize(() => {
      this.downloadURL2 = fileref.getDownloadURL()
      this.downloadURL2.subscribe(url1 => {
        if(url1){
          this.url1 = url1
        }
        console.log(this.url1)

      })
      })
    ).subscribe(url1 => {
      if(url1){
        this.finalurl2 = url1
        
      }
      
    })
  }

  openAdminSignInModal(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = false;
    dialogConfig.width = "60%";
    this.dialog.open(AdminSignInModalComponent,
      {
        width: "600px",
        height: "400px",
        disableClose: true
      });
  }

}

