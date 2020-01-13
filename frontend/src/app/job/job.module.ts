import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JobComponent } from './job/job.component';
import {SharedModule} from '../shared/shared.module';


@NgModule({
  declarations: [ JobComponent ],
  imports: [
    SharedModule
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
],
})

export class JobModule { }
