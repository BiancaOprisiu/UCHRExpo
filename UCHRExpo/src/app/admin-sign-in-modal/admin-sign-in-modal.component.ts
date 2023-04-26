import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogClose, MatDialogConfig } from '@angular/material/dialog';
// Firebase App (the core Firebase SDK) is always required and must be listed first
//import firebase from "firebase/app";
// If you are using v7 or any earlier version of the JS SDK, you should import firebase using namespace import
// import * as firebase from "firebase/app"

// If you enabled Analytics in your project, add the Firebase SDK for Analytics
import "firebase/analytics";

// Add the Firebase products that you want to use
import "firebase/auth";
import "firebase/firestore";

import {AdminService} from '../services/admin/admin.service';
import {AuthService} from '../services/auth/auth.service';
import { Admin } from '../models/Admin';
import { AdminPageComponent } from '../admin-page/admin-page.component';

import { Router, ActivatedRoute, ParamMap } from '@angular/router';
  

@Component({
  selector: 'app-admin-sign-in-modal',
  templateUrl: './admin-sign-in-modal.component.html',
  styleUrls: ['./admin-sign-in-modal.component.css']
})

export class AdminSignInModalComponent implements OnInit {

  
  input: Admin = {
    Username: '',
    Password: ''
  }

  constructor(private router: Router, private authService : AuthService,  public dialog : MatDialog) { }
  
  ngOnInit(): void {
  }

  display=false;
  onClick() {
      this.authService.loginAdmin(
        this.input.Username,
        this.input.Password
      );
      this.display=true;
  }

  }
