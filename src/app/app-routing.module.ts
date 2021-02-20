import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateAccountComponent } from './core/create-account/create-account.component';
import { ForgotPasswordComponent } from './core/forgot-password/forgot-password.component';
import { LoginComponent } from './core/login/login.component';
import { EditorComponent } from './core/editor/editor.component';
import { LandingPageComponent } from './private/landing-page/landing-page.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', component: LandingPageComponent },
  { path: 'login', component: LoginComponent },
  { path: 'create-account', component: CreateAccountComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'editor', component: EditorComponent },
  { path: 'app', loadChildren: () => import('./private/private.module').then(m => m.PrivateModule) },
  { path: '**', redirectTo: 'login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
