import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { CreateAccountComponent } from './create-account/create-account.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { LoginComponent } from './login/login.component';
import { CodemirrorModule } from '@ctrl/ngx-codemirror';
import { EditorComponent } from './editor/editor.component';

@NgModule({
  declarations: [
    CreateAccountComponent,
    ForgotPasswordComponent,
    LoginComponent,
    EditorComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    CodemirrorModule
  ],
  exports: [
    FormsModule,
    ReactiveFormsModule,
    SharedModule
  ]
})
export class CoreModule { }
