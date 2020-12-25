import { AngularMultiSelectModule } from 'angular2-multiselect-dropdown/angular2-multiselect-dropdown';
// Angular modules
import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// Modules
import { ChartsModule } from 'ng2-charts';
import { ChartModule } from 'primeng/chart';
import { SuiModule } from 'ng2-semantic-ui';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { TelemetryModule } from '@sunbird/telemetry';
import { DiscussionModule } from './../discussion/discussion.module';
// Custome component(s) and services
import {
  CourseConsumptionService, DashboardUtilsService, OrganisationService,
  RendererService, LineChartService, DownloadService, CourseProgressService,
  UsageService
} from './services';
import { OrganisationComponent, CourseConsumptionComponent, CourseProgressComponent, UsageReportsComponent, ContentCreationStaticsComponent, CityWiseReportComponent, DeptCityWiseReportComponent, ContentDeptWiseReportComponent, TotalUserComponent, AllReportsComponent, DataTableComponent, DataChartComponent } from './components';
import { NgxDaterangepickerMd } from 'ngx-daterangepicker-material';
// SB core and shared services
import { CoreModule, SearchService } from '@sunbird/core';
import { SharedModule } from '@sunbird/shared';
import { OrderModule } from 'ngx-order-pipe';
// Imported Primeng Calendar Module
import { CalendarModule } from 'primeng/calendar';
import { TableModule } from 'primeng/table';
import { DropdownModule } from 'primeng/dropdown';
import { PermissionDirective } from './directives';
import { AddUserssComponent } from './components/add-userss/add-userss.component';
import { UserSearchService } from '../search/services';
import { SlickModule } from 'ngx-slick';
import {SharedFeatureModule} from '@sunbird/shared-feature';
import { BatchService } from '../workspace/services';
import { MultiSelectModule } from 'primeng/multiselect';
@NgModule({
  imports: [
    CommonModule,
    DashboardRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    ChartsModule,
    ChartModule,
    SuiModule,
    SharedModule,
    OrderModule,
    AngularMultiSelectModule,
    TelemetryModule,
    NgxDaterangepickerMd.forRoot(),
    DiscussionModule,
    CalendarModule,
    TableModule,
    DropdownModule,
    SlickModule,
    CoreModule,
    SharedFeatureModule,
    MultiSelectModule

  ],
  declarations: [CourseConsumptionComponent, OrganisationComponent, CourseProgressComponent, UsageReportsComponent,
    DataTableComponent, DataChartComponent, ContentCreationStaticsComponent, CityWiseReportComponent, DeptCityWiseReportComponent, ContentDeptWiseReportComponent, TotalUserComponent, AllReportsComponent, PermissionDirective, AddUserssComponent],
  exports: [CourseProgressComponent, DataTableComponent, PermissionDirective],
  providers: [
    RendererService,
    DashboardUtilsService,
    SearchService,
    BatchService,
    UserSearchService,
    LineChartService,
    CourseConsumptionService,
    OrganisationService, DownloadService, CourseProgressService, UsageService, DatePipe]
})
export class DashboardModule { }
