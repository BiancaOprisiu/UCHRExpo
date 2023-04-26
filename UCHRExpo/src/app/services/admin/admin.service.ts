import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument}
  from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { Admin } from '../../models/Admin';
import { map } from 'rxjs/operators';
//import { firestore } from 'firebase/app';
import { AngularFireAuth} from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { Exhibition } from 'src/app/models/Exhibition';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  adminsCollection: AngularFirestoreCollection<Admin>;
  admins: Observable<Admin[]>;
  exposCollection: AngularFirestoreCollection<Exhibition>;
  expos: Observable<Exhibition[]>;
  expoId: string;
  db:AngularFirestore;
  
  
  constructor(public angularfirestore: AngularFirestore, public afAuth: AngularFireAuth) {
    this.adminsCollection = this.angularfirestore.collection('Admin');
    
  }
  getUsernameForId(id : String){
    this.admins.subscribe((a)=> {
      for (let admin of a){
        if(admin.id == id)
          return admin.Username;
      }
    })
  }
  getAdmins() {
    return this.admins = this.adminsCollection.snapshotChanges().pipe(map(changes => {
      return changes.map(a => {
        const data = a.payload.doc.data() as Admin;
        data.id = a.payload.doc['id'];
        return data;
      });
    })
    )
  }

  getExpo(){
    return this.expos = this.exposCollection.snapshotChanges().pipe(map(changes => {
      return changes.map(a => {
        const data = a.payload.doc.data() as Exhibition;
        data.id = a.payload.doc['ZnjYui1gkBlqPuW6i981'];
        return data;
      });
    })
    )
  }

  async updateExpo(input: Exhibition)
  {
    console.log(input);

    

    const ref=this.db.doc('ZnjYui1gkBlqPuW6i981');
    ref.update({name: input.name,
      day: input.day,
      month: input.month,
      year: input.year});

    ref.delete();

    await this.exposCollection.doc('ZnjYui1gkBlqPuW6i981').update(input)


    const expo1 = this.exposCollection.doc('ZnjYui1gkBlqPuW6i981');
    await expo1.update(
      {
        name: input.name,
      day: input.day,
      month: input.month,
      year: input.year
      }
    )


    
  
  }

  getAdminByUsername(){
    return this.admins = this.adminsCollection.snapshotChanges().pipe(map(changes => {
      return changes.map(a => {
        const data = a.payload.doc.data() as Admin;
        data.id = a.payload.doc['id'];
        return data;
      });
    })
    )
  }

  getAdminByUsername1(dataId: string){
    console.log(dataId);
    return this.admins = this.angularfirestore.collection("Admin", ref=>ref.where("Username", "==", dataId)).snapshotChanges().pipe(map(changes => {
      return changes.map(a => {
        const data = a.payload.doc.data() as Admin;
        data.id = a.payload.doc['id'];
        return data;
      });
    })
    )
  }
}
