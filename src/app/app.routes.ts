import { Routes } from '@angular/router';
import { HomeComponent } from './component/home/home.component';
import { Login } from './component/login/login';
import { SignupComponent } from './component/signup/signup.component';

export const routes: Routes = [
  {
    path: '',
    component: Login,
  },
  {
    path: 'signup',
    component: SignupComponent,
  },
  {
    path: 'home',
    component: HomeComponent,
  },
];
