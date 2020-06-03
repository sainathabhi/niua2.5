import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrgManagementRoutingModule } from './org-management-routing.module';
import { SuiModule } from 'ng2-semantic-ui';
import { ResourceService, ToasterService, RouterNavigationService, SharedModule } from '@sunbird/shared';
import { OrgTypeService } from './services';
import {
  CreateOrgTypeComponent, ViewOrgTypeComponent, OrganizationUploadComponent,
  BulkUploadComponent, StatusComponent
} from './components';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CoreModule } from '@sunbird/core';
import { TelemetryModule } from '@sunbird/telemetry';
import { NgInviewModule } from 'angular-inport';
// import { Angular2CsvModule } from 'angular2-csv';  Angular2CsvModule removed TODO: use Blob object to generate csv file

@NgModule({
  imports: [
    CommonModule,
    OrgManagementRoutingModule,
    SharedModule,
    SuiModule,
    FormsModule,
    ReactiveFormsModule,
    CoreModule,
    TelemetryModule,
    NgInviewModule
  ],
  declarations: [CreateOrgTypeComponent, ViewOrgTypeComponent, OrganizationUploadComponent,
    BulkUploadComponent, StatusComponent],
  exports: [BulkUploadComponent],
  providers: [ResourceService, ToasterService, RouterNavigationService, OrgTypeService]
})
export class OrgManagementModule { }

