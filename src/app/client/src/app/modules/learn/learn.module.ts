import { TelemetryModule } from '@sunbird/telemetry';
import { LearnRoutingModule } from './learn-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
 import { SharedModule } from '@sunbird/shared';
import { SuiModule } from 'ng2-semantic-ui/dist';
import { SlickModule } from 'ngx-slick';
import { NgInviewModule } from 'angular-inport';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  LearnPageComponent, CoursePlayerComponent, CourseConsumptionHeaderComponent,
  CourseConsumptionPageComponent, BatchDetailsComponent, EnrollBatchComponent, CreateBatchComponent,
  UpdateCourseBatchComponent, CurriculumCardComponent, UnEnrollBatchComponent} from './components';
import { CourseConsumptionService, CourseBatchService, CourseProgressService , AssessmentScoreService } from './services';
import { CourseDiscussService } from './../discussion/services/course-discuss/course-discuss.service';
import { CoreModule } from '@sunbird/core';
import { NotesModule } from '@sunbird/notes';
import { DashboardModule } from '@sunbird/dashboard';
import { DiscussionModule } from '@sunbird/discussion';
import {SharedFeatureModule} from '@sunbird/shared-feature';
import { PlayerHelperModule } from '@sunbird/player-helper';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    SuiModule,
    DashboardModule,
    SlickModule,
    FormsModule,
    LearnRoutingModule,
    CoreModule,
    ReactiveFormsModule,
    NotesModule,
    TelemetryModule,
    DiscussionModule, 
    NgInviewModule,
    SharedFeatureModule,
    PlayerHelperModule
  ],
  providers: [CourseConsumptionService, CourseBatchService, CourseProgressService, AssessmentScoreService, CourseDiscussService],
  declarations: [LearnPageComponent, CoursePlayerComponent, CourseConsumptionHeaderComponent,
    CourseConsumptionPageComponent, BatchDetailsComponent, EnrollBatchComponent, CreateBatchComponent,
    UpdateCourseBatchComponent, CurriculumCardComponent, UnEnrollBatchComponent]
})
export class LearnModule { }
