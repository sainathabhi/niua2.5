import { Injectable } from '@angular/core';
import { ConfigService, RequestParam, ServerResponse, HttpOptions } from '@sunbird/shared';
import { LearnerService } from '@sunbird/core';
import { Observable } from 'rxjs';
  /**
 * This service is used to manage bulk upload of users data or organization data.
 * This service is also used to check status of uploaded file
 */
@Injectable()
export class OrgManagementService {
  /**
 * reference of config service.
 */
  public configService: ConfigService;
  /**
* reference of learner service.
*/
  public learnerService: LearnerService;
  /**
* for making upload api calls
* @param {RequestParam} requestParam interface
*/
  constructor(configService: ConfigService, learnerService: LearnerService) {
    this.learnerService = learnerService;
    this.configService = configService;
  }
    /**
 * This method is used to call upload api to upload organizations file
 */
  public bulkOrgUpload(req): Observable<ServerResponse> {
    const httpOptions: RequestParam = {
      url: this.configService.urlConFig.URLS.ADMIN.BULK.ORGANIZATIONS_UPLOAD,
      data: req
    };
    return this.learnerService.post(httpOptions);
  }
    /**
 * This method is used to call upload api to upload users file
 */
  public bulkUserUpload(req): Observable<ServerResponse> {
    const httpOptions: RequestParam = {
      url: this.configService.urlConFig.URLS.ADMIN.BULK.USER_UPLOAD_SHADOW,
      data: req
    };
    return this.learnerService.post(httpOptions);
  }
      /**
 * This method is used to call status api to get the status of uploaded file
 */
  getBulkUploadStatus(processId) {
    const options = {
      url: this.configService.urlConFig.URLS.ADMIN.BULK.STATUS + '/' + processId
    };
    return this.learnerService.get(options);
  }
  /**
 * This method is used to create the single user
 */
  public createUser(data): Observable<ServerResponse> {
    const httpOptions: RequestParam = {
      url: this.configService.urlConFig.URLS.USER.CREATE_V2,
      data: data
    };
    return this.learnerService.post(httpOptions);
  }
  /**
 * This method is used to assign user to the member org
 */
  public assignUser(data): Observable<ServerResponse> {
    const httpOptions: RequestParam = {
      url: this.configService.urlConFig.URLS.MEMBER.ADD,
      data: data
    };
    return this.learnerService.post(httpOptions);
  }
}
