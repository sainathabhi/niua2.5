import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProfilePageComponent, OrgUserManagementComponent, MyCalendarComponent } from './components';
import { AuthGuard } from '../../modules/core/guard/auth-gard.service';
import {
  OrganizationUploadComponent, UserUploadComponent,
  StatusComponent, OnBoardUserComponent
} from '@sunbird/org-management';

const telemetryEnv = 'profile';
const objectType = 'profile';
const routes: Routes = [
  {
    path: '', component: ProfilePageComponent,
    data: {
      telemetry: {
        env: telemetryEnv, type: 'view', mode: 'create', subtype: 'paginate', object: { type: objectType, ver: '1.0' }
      }, breadcrumbs: [{ label: 'Home', url: '/home' }, { label: 'Profile', url: '' }]
    }
  },
  {
    path: 'myCalendar', component: MyCalendarComponent
  },
  {
    path: 'orgUserManagement', component: OrgUserManagementComponent,
    data: {
      telemetry: {
        env: telemetryEnv, type: 'view', mode: 'create', subtype: 'paginate', object: { type: objectType, ver: '1.0' }
      }, breadcrumbs: [{ label: 'Home', url: '/home' }, { label: 'OrgUserManagement', url: '' }]
    },
    children: [
      {
        path: 'bulkUpload/organizationUpload', component: OrganizationUploadComponent,
        data: {
          redirectUrl: '/profile/orgUserManagement', roles: 'bulkUpload',
          telemetry: {
            env: telemetryEnv, type: 'view', mode: 'create',
            subtype: 'paginate', object: { type: objectType, ver: '1.0' }
          }
        }, canActivate: [AuthGuard]
      },
      {
        path: 'bulkUpload/userUpload', component: UserUploadComponent,
        data: {
          redirectUrl: '/profile/orgUserManagement', roles: 'bulkUpload',
          telemetry: {
            env: telemetryEnv, type: 'view', mode: 'create',
            subtype: 'paginate', object: { type: objectType, ver: '1.0' }
          }
        }, canActivate: [AuthGuard]
      },
      {
        path: 'bulkUpload/checkStatus', component: StatusComponent,
        data: {
          redirectUrl: '/profile/orgUserManagement', roles: 'bulkUpload',
          telemetry: {
            env: telemetryEnv, type: 'view', mode: 'create',
            subtype: 'paginate', object: { type: objectType, ver: '1.0' }
          }
        }, canActivate: [AuthGuard]
      },
      {
        path: 'bulkUpload/onboardUser', component: OnBoardUserComponent,
        data: {
          redirectUrl: '/profile/orgUserManagement', roles: 'bulkUpload',
          telemetry: {
            env: telemetryEnv, type: 'view', mode: 'create',
            subtype: 'paginate', object: { type: objectType, ver: '1.0' }
          }
        }, canActivate: [AuthGuard]
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileRoutingModule { }
