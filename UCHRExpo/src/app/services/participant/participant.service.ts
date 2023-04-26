import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument }
  from 'angularfire2/firestore';
  import {AngularFireStorage, AngularFireStorageReference, AngularFireUploadTask} from 'angularfire2/storage';
import { from, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
//import { firestore } from 'firebase/app';
import { Participant } from '../../models/Participant';
import { AngularFireAuth} from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { Exhibition } from 'src/app/models/Exhibition';

//var storage = firebase.storage();
//var storageRef = firebase.storage().ref();

@Injectable({
  providedIn: 'root'
})
export class ParticipantService {
  participantCollection: AngularFirestoreCollection<Participant>;
  participants: Observable<Participant[]>;
  exposCollection: AngularFirestoreCollection<Exhibition>;
  expos: Observable<Exhibition[]>;
  
  constructor(firestore: AngularFirestore) {
    this.participantCollection = firestore.collection('participant'); 
    this.exposCollection=firestore.collection('Exhibition');
  }
  getMicroForId(id : String){
    this.participants.subscribe((p)=> {
      for (let participant of p){
        if(participant.id == id)
          return participant.microchip;
      }
    })
  }
  getClients() {
    return this.participants = this.participantCollection.snapshotChanges().pipe(map(changes => {
      return changes.map(a => {
        const data = a.payload.doc.data() as Participant;
        data.id = + a.payload.doc['id'] + " ";
        return data;
      });
    })
    )
  }
  
  addClient(participant: Participant) {
    this.participantCollection.add(participant);
  }

  getExpo(){
    return this.expos = this.exposCollection.snapshotChanges().pipe(map(changes => {
      return changes.map(a => {
        const data = a.payload.doc.data() as Exhibition;
        data.id = + a.payload.doc['id'] + " ";
        return data;
      });
    })
    )
  }
  
  updateProfile(input: any, idParticipant: string) {
    console.log(idParticipant)
    console.log(input.Microchip)
   
    this.participantCollection.doc(idParticipant).update({
        age: input.age,
        breed: input.breed,
        dog_name: input.dog_name,
        first_name: input.first_name,
        gender: input.gender,
        last_name: input.last_name,
        microchip: input.microchip,
        dog_picture: input.dog_picture,
        fee_confirmation: input.fee_confirmation
    })
      
  }
  
}
