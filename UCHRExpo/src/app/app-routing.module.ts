import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminPageComponent } from './admin-page/admin-page.component';
import { FormComponent } from './form/form.component';
import {AdminSignInModalComponent} from './admin-sign-in-modal/admin-sign-in-modal.component';

const routes: Routes = [
  { path: '', component: FormComponent },
  { path: 'admin-page', component: AdminPageComponent },
  { path: 'admin-sign-in', component: AdminSignInModalComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
