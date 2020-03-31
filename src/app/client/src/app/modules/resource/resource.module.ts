import { ResourceRoutingModule } from './resource-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResourceComponent } from './components';
import { SharedModule } from '@sunbird/shared';
import { SuiModule } from 'ng2-semantic-ui/dist';
import { SlickModule } from 'ngx-slick';
import { FormsModule } from '@angular/forms';
import { CoreModule } from '@sunbird/core';
import { NgInviewModule } from 'angular-inport';
import { TelemetryModule } from '@sunbird/telemetry';
import {SharedFeatureModule} from '@sunbird/shared-feature';
import { DiscussionModule } from './../discussion/discussion.module';
import { CourseDiscussService } from './../discussion/services/course-discuss/course-discuss.service';
@NgModule({
  imports: [
    CommonModule,
    ResourceRoutingModule,
    SharedModule,
    SuiModule,
    SlickModule,
    FormsModule,
    CoreModule,
    DiscussionModule,
    TelemetryModule,
    NgInviewModule,
    SharedFeatureModule
  ],
  providers: [CourseDiscussService],
  declarations: [ResourceComponent]
})
export class ResourceModule {
  }
