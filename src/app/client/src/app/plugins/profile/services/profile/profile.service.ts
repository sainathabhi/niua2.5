
import {mergeMap, map} from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { UserService, PermissionService, LearnerService } from '@sunbird/core';
import { ResourceService, ConfigService, IUserProfile, IUserData, ServerResponse } from '@sunbird/shared';
@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  /**
   * user id
   */
  userid: string;
  constructor(private learnerService: LearnerService,
    public userService: UserService, public configService: ConfigService) {
      this.userid = this.userService.userid;
    }
  /**
   * This method is used to update profile picture of the user
   */
  public updateAvatar(file) {
    return this.uploadMedia(file).pipe(mergeMap(results => {
      const req = {
        avatar: results.result.url
      };
      return this.updateProfile(req);
    }));
  }
  /**
   * This method invokes learner service to update user profile
   */
  public updateProfile(request) {
    const data = this.formatRequest(request);
    const options = {
      url: this.configService.urlConFig.URLS.USER.UPDATE_USER_PROFILE,
      data: data
    };
    return this.learnerService.patch(options).pipe(map(
      (res: ServerResponse) => {
        setTimeout(() => {
          this.userService.getUserProfile();
        }, this.configService.appConfig.timeOutConfig.setTime);
        return res;
      }
    ));
  }

  /**
   * This method call portal backend API and invokes learner service to update user profile with private url
   */
  public updatePrivateProfile(request) {
    const data = this.formatRequest(request);
    const options = {
      url: 'portal/user/v1/update',
      data: data
    };
    return this.learnerService.patch(options);
  }

  /**
   * This method is used to update user profile visibility
   */
  updateProfileFieldVisibility(request) {
    const data = this.formatRequest(request);
    const options = {
      url: this.configService.urlConFig.URLS.USER.UPDATE_PROF_VIS_FIELDS,
      data: data
    };
    return this.learnerService.post(options);
  }
  /**
   * This method invokes learner service to upload user profile picture
   */
  public uploadMedia(file) {
    const options = {
      url: this.configService.urlConFig.URLS.CONTENT.UPLOAD_MEDIA,
      data: file,
    };
    return this.learnerService.post(options);
  }
  /**
   * This method is used to format the request
   */
  private formatRequest(request) {
    request.userId = request.userId ? request.userId : this.userService.userid;
    return {
      params: {},
      request: request
    };
  }
  /**
   * This method is used to add new skills
   */
  public add(request) {
    const data = this.formatRequest(request);
    const options = {
      url: this.configService.urlConFig.URLS.USER.UPDATE_SKILLS,
      data: data
    };
    return this.learnerService.post(options).pipe(map(
      (res: ServerResponse) => {
        setTimeout(() => {
          this.userService.getUserProfile();
        }, this.configService.appConfig.timeOutConfig.setTime);
        return res;
      }));
  }
  /**
   * This method invokes learner service to get user respective skills
   */
  public getSkills() {
    const options = {
      url: this.configService.urlConFig.URLS.USER.SKILLS
    };
    return this.learnerService.get(options);
  }

  public getUserLocation(request) {
    const data = this.formatRequest(request);
    const options = {
      url: this.configService.urlConFig.URLS.USER.LOCATION_SEARCH,
      data: data
    };
    return this.learnerService.post(options);
  }

  public downloadCertificates(request) {
    const options = {
      url: this.configService.urlConFig.URLS.USER.DOWNLOAD_CERTIFICATE,
      data: request,
    };
    return this.learnerService.post(options);
  }
  getEnrolledCourses() {
    const option = {
      url: this.configService.urlConFig.URLS.COURSE.GET_ENROLLED_COURSES + '/' + this.userid,
      param: { ...this.configService.appConfig.Course.contentApiQueryParams, ...this.configService.urlConFig.params.enrolledCourses }
    };
    return this.learnerService.get(option);
  }
}
