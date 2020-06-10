import { SharedFeatureModule } from '@sunbird/shared-feature';
import { ProfileService } from './services';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@sunbird/shared';
import { SlickModule } from 'ngx-slick';
import { ProfileRoutingModule } from './profile-routing.module';
import {
  ProfilePageComponent, ProfileBadgeComponent, UpdateContactDetailsComponent, UpdateUserDetailsComponent,
  AccountRecoveryInfoComponent, OrgUserManagementComponent, MyCalendarComponent
} from './components';
import { SuiSelectModule, SuiModalModule, SuiAccordionModule, SuiPopupModule, SuiDropdownModule,
  SuiProgressModule, SuiRatingModule, SuiCollapseModule } from 'ng2-semantic-ui';
import { CoreModule } from '@sunbird/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OrgManagementModule } from '@sunbird/org-management';
// import { WebExtensionModule } from '@project-sunbird/web-extensions';
import { TelemetryModule } from '@sunbird/telemetry';
import { AvatarModule } from 'ngx-avatar';
import { FullCalendarModule } from 'primeng/fullcalendar';
@NgModule({
  imports: [
    FullCalendarModule,
    CommonModule,
    ProfileRoutingModule,
    SharedModule,
    SuiSelectModule, SuiModalModule, SuiAccordionModule, SuiPopupModule, SuiDropdownModule,
    SuiProgressModule, SuiRatingModule, SuiCollapseModule,
    CoreModule,
    FormsModule,
    ReactiveFormsModule,
    OrgManagementModule,
    // WebExtensionModule,
    TelemetryModule,
    SlickModule,
    AvatarModule,
    SharedFeatureModule
  ],
  declarations: [ProfilePageComponent, ProfileBadgeComponent, UpdateContactDetailsComponent, UpdateUserDetailsComponent,
   AccountRecoveryInfoComponent, OrgUserManagementComponent, MyCalendarComponent],
  providers: []
})
export class ProfileModule { }
