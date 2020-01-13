import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import {SharedModule} from '../shared/shared.module';
import { UserComponent } from './user/user.component';

@NgModule({
  declarations: [ UserComponent ],
  imports: [
    SharedModule
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
],
})

export class UserModule { }
