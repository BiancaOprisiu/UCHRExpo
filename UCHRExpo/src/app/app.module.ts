import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { AngularFireModule } from '@angular/fire';
import { AngularFireAnalyticsModule } from '@angular/fire/analytics';
import { AngularFirestoreModule } from '@angular/fire/firestore'
import { environment } from '../environments/environment';
import { FormComponent } from'../app/form/form.component'; 
import { FormsModule } from '@angular/forms';
import {AngularFirestore} from '@angular/fire/firestore';
import {AngularFireDatabase} from '@angular/fire/database';

// Firebase modules
import { AngularFireStorage, AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';

import {ParticipantService} from '../app/services/participant/participant.service';
import { AdminSignInModalComponent } from './admin-sign-in-modal/admin-sign-in-modal.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import {MatCardModule} from '@angular/material/card';

import { AdminPageComponent } from './admin-page/admin-page.component';
import { ParticipantDetailsComponent } from './participant-details/participant-details.component';

import { AddExhibitionModalComponent } from './add-exhibition-modal/add-exhibition-modal.component';


@NgModule({
  declarations: [
    AppComponent,
    //AngularFireDatabase,
    //AngularFirestore,
    FormComponent,
    AdminSignInModalComponent,
    AdminPageComponent,
    ParticipantDetailsComponent,
    AddExhibitionModalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAnalyticsModule,
    AngularFirestoreModule,
    //AngularFireStorage,
    AngularFireStorageModule,
    AngularFireAuthModule,
    FormsModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MatCardModule
  ],
  providers: [
    {
      provide: MatDialogRef,
      useValue: {}
    },
    
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
