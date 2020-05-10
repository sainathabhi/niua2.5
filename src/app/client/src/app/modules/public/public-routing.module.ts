import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LandingPageComponent } from './components';
import { LandingpageGuard } from './services';
import { OfflineApplicationDownloadComponent } from '@sunbird/shared';
import { NuihComponent, LearnComponent, InnovateComponent, DataExchangeComponent, SmartGovComponent, AboutusComponent, ComingSoonComponent } from './module/nuih';
const routes: Routes = [
  {
    path: '', component: LandingPageComponent, canActivate: [LandingpageGuard],
    data: { telemetry: { env: 'public', pageid: 'landing-page', type: 'edit', subtype: 'paginate' } }
  },
  {
    path: 'explore', loadChildren: './module/explore/explore.module#ExploreModule'
  },
  {
    path: 'nuis', component: NuihComponent, data: {
      telemetry: {
        env: 'public', pageid: 'home', type: 'view', subtype: 'paginate'
      }
    }
  },
  {
    path: 'lms', component: LearnComponent, data: {
      telemetry: {
        env: 'public', pageid: 'lms', type: 'view', subtype: 'paginate'
      }
    }
  },
  {
    path: 'innovate', component: InnovateComponent, data: {
      telemetry: {
        env: 'public', pageid: 'innovate', type: 'view', subtype: 'paginate'
      }
    }
  },
  {
    path: 'iudx', component: DataExchangeComponent, data: {
      telemetry: {
        env: 'public', pageid: 'iudx', type: 'view', subtype: 'paginate'
      }
    }
  },
  {
    path: 'smartgov', component: SmartGovComponent, data: {
      telemetry: {
        env: 'public', pageid: 'smartgov', type: 'view', subtype: 'paginate'
      }
    }
  },
  {
    path: 'aboutus', component: AboutusComponent, data: {
      telemetry: {
        env: 'public', pageid: 'aboutus', type: 'view', subtype: 'paginate'
      }
    }
  },
  {
    path: 'comingsoon', component: ComingSoonComponent, data: {
      telemetry: {
        env: 'public', pageid: 'comingsoon', type: 'view', subtype: 'paginate'
      }
    }
  },
  {
    path: ':slug/explore', loadChildren: './module/explore/explore.module#ExploreModule'
  },
  {
    path: 'explore-course', loadChildren: './module/course/course.module#CourseModule'
  },
  {
    path: ':slug/explore-course', loadChildren: './module/course/course.module#CourseModule'
  },
  {
    path: ':slug/signup', loadChildren: './module/signup/signup.module#SignupModule'
  },
  {
    path: 'signup', loadChildren: './module/signup/signup.module#SignupModule'
  },
  {
    path: ':slug/sign-in/sso', loadChildren: './module/sign-in/sso/sso.module#SsoModule'
  },
  {
    path: 'sign-in/sso', loadChildren: './module/sign-in/sso/sso.module#SsoModule'
  },
  {
    path: 'play', loadChildren: './module/player/player.module#PlayerModule'
  },
  {
   path: ':slug/download/offlineapp', component: OfflineApplicationDownloadComponent
  },
  {
   path: 'download/offlineapp', component: OfflineApplicationDownloadComponent
   }];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PublicRoutingModule { }
