import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OrganisationComponent, CourseConsumptionComponent, CourseProgressComponent, UsageReportsComponent, AllReportsComponent, AddUserssComponent,ReportsComponent, UserReportComponent, OrganizationReportComponent, ContentReportComponent, ContentCategoryWiseComponent } from './components/';
import { AuthGuard } from '../core/guard/auth-gard.service';

const routes: Routes = [
  {
    path: 'allDashboard', component: AllReportsComponent,
    data: {
      roles: 'allDashboard',
      telemetry: { env: 'allDashboard', pageid: 'allDashboard', type: 'view' },
      breadcrumbs: [{ label: 'Home', url: '/home' }, { label: 'All Dashboard', url: '' }]
    }
  },
  {
    path: 'myActivity', component: CourseConsumptionComponent,
    data: {
      telemetry: { env: 'course', pageid: 'course-creator-dashboard', type: 'view' },
      breadcrumbs: [{ label: 'Home', url: '/home' },
      { label: 'Course', url: '/learn' }, { label: 'Course Creator Dashboard', url: '' }]
    }
  },
  {
    path: 'addusess', component: AddUserssComponent
  
  },
  {
    path: 'userreports', component: ReportsComponent
  
  },
  {
    path: 'reportsdatewise', component: UserReportComponent
  
  },
  {
    path: 'organization-report', component: OrganizationReportComponent
  
  },
  {
    path: 'content-report', component: ContentReportComponent
  
  },
  {
    path: 'category-report', component: ContentCategoryWiseComponent
  
  },
  {
    path: 'activity/course/consumption/:id/:timePeriod', component: CourseConsumptionComponent,
    data: {
      telemetry: { env: 'course', pageid: 'course-creator-dashboard', type: 'view' },
      breadcrumbs: [{ label: 'Home', url: '/home' },
      { label: 'Course', url: '/learn' }, { label: 'Course Creator Dashboard', url: '' }]
    }
  },
  {
    path: 'organization', component: UsageReportsComponent, canActivate: [AuthGuard],
    data: {
      roles: 'dashboardRole',
      telemetry: { env: 'dashboard', pageid: 'org-admin-dashboard', type: 'view' },
      breadcrumbs: [{ label: 'Home', url: '/home' },
      { label: 'Profile', url: '/profile' }, { label: 'Organization Admin Dashboard', url: '' }]
    }
  },
  {
    path: 'organization/creation/:id/:timePeriod', component: OrganisationComponent,
    data: {
      telemetry: { env: 'profile', pageid: 'org-admin-dashboard', type: 'view' },
      breadcrumbs: [{ label: 'Home', url: '/home' },
      { label: 'Profile', url: '/profile' }, { label: 'Organization Admin Dashboard', url: '' }]
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
