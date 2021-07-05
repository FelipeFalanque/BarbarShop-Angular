import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AgendamentoGuard } from './auth/guards/agendamento.guard';
import { LoginPhoneComponent } from './auth/login-phone/login-phone.component';
import { ResetPasswordComponent } from './auth/reset-password/reset-password.component';
import { SendEmailComponent } from './auth/send-email/send-email.component';
import { NotfoundComponent } from './shared/notfound/notfound.component';


const routes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then(m => m.HomeModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./auth/login/login.module').then(m => m.LoginModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./auth/register/register.module').then(m => m.RegisterModule)
  },
  {
    path: 'send-email',
    component: SendEmailComponent
  },
  {
    path: 'reset-password',
    component: ResetPasswordComponent
  },
  {
    path: 'login-phone',
    component: LoginPhoneComponent
  },
  { 
    canActivate: [AgendamentoGuard],
    path: 'agendamento',
    loadChildren: () => import('./agendamento/agendamento.module').then(m => m.AgendamentoModule) },
  {
    path: "**",
    component: NotfoundComponent
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
