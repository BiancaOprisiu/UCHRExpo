import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogClose, MatDialogConfig } from '@angular/material/dialog';
// Firebase App (the core Firebase SDK) is always required and must be listed first
//import firebase from "firebase/app";
// If you are using v7 or any earlier version of the JS SDK, you should import firebase using namespace import
// import * as firebase from "firebase/app"

// If you enabled Analytics in your project, add the Firebase SDK for Analytics
import "firebase/analytics";

// Add the Firebase products that you want to use
import "firebase/firestore";

import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Exhibition } from '../models/Exhibition';
import { AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs';

import {AdminService} from '../services/admin/admin.service';

@Component({
  selector: 'app-add-exhibition-modal',
  templateUrl: './add-exhibition-modal.component.html',
  styleUrls: ['./add-exhibition-modal.component.css']
})
export class AddExhibitionModalComponent implements OnInit {

  input: Exhibition = {
    name: '',
    day: 0,
    month: 0,
    year: 2023
  }

  exposCollection: AngularFirestoreCollection<Exhibition>;
  expos: Observable<Exhibition[]>;

  constructor(private router: Router,  public dialog : MatDialog, private adminService: AdminService) { }

  ngOnInit(): void {
  }

  display=false;
  onClick() {
      this.display=true;
      this.adminService.updateExpo(this.input);

      console.log(this.input);
  }

}

