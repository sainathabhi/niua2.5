import { IInteractEventEdata, IInteractEventObject, TelemetryInteractDirective } from '@sunbird/telemetry';
import { IImpressionEventInput } from '../../../telemetry/interfaces/telemetry';
import { Component, OnInit, ViewChild, ViewEncapsulation, OnDestroy } from '@angular/core';
import { UsageService } from '../../services';
import * as _ from 'lodash';
import { DomSanitizer } from '@angular/platform-browser';
import { UserService } from '@sunbird/core';
import { ToasterService, ResourceService, INoResultMessage, ConfigService } from '@sunbird/shared';
import { UUID } from 'angular2-uuid';
import { ActivatedRoute, Router } from '@angular/router';
import { ReportService } from '../../services/reports/reports.service';
import { DatePipe } from '@angular/common';
import { OnDelete } from 'fine-uploader/lib/core';
import { Subject } from 'rxjs';
import * as moment from 'moment';
@Component({
  selector: 'app-content-dept-wise-report',
  templateUrl: './content-dept-wise-report.component.html',
  styleUrls: ['./content-dept-wise-report.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ContentDeptWiseReportComponent implements OnInit, OnDestroy {
  public unsubscribe = new Subject<void>();
  noResult: boolean = false;
  value: Date;
  currentDate: Date = new Date();
  moment: any;
  fromDate: Date;
  toDate: Date;
  tableData: any = [];
  allOrgName: any = [];
  allUserName: any = [];
  contentTypeList: any = [
    { name: 'Resource' },
    { name: 'Course' },
    { name: 'Collection' }
  ];
  cityList: any = [];
  departmentList: any = [];
  selectedCity: Object;
  selectedDepartment: Object;
  selectedContentType: Object;
  disableDepartment: boolean = false;
  cols: any[];
  noResultMessage: INoResultMessage;
  private activatedRoute: ActivatedRoute;
  telemetryImpression: IImpressionEventInput;
  constructor(private usageService: UsageService, private sanitizer: DomSanitizer, private configService: ConfigService,
    public userService: UserService, private toasterService: ToasterService,
    public resourceService: ResourceService, activatedRoute: ActivatedRoute, private router: Router, public reportService: ReportService, private datePipe: DatePipe
  ) {
    this.activatedRoute = activatedRoute;
  }
  ngOnInit() {
    this.disableDepartment = true;
    this.initializeDateFields();
    // this.getDepartmentList();
    // this.getOrgDetails();
    // this.getUserDetails();
    this.getOrgList();
  }
  initializeDateFields() {
    this.moment = moment();
    this.fromDate = new Date(this.moment.subtract(7, "days"));
    this.toDate = new Date();
  }
  getDepartmentList() {
    this.departmentList = _.map(_.compact(_.filter(_.cloneDeep(this.allOrgName), { rootOrgId: _.get(this.selectedCity, 'rootOrgId') })), function (obj) {
      obj['orgName'] = _.lowerCase(obj['orgName']);
      return obj;
    });
  }
  // getDepartmentList() {
  //   this.reportService.getDepartmentList('nulp').subscribe((response) => {
  //     if (_.get(response, 'responseCode') === 'OK') {
  //       if (response.result.framework.categories.length > 0) {
  //         if (!_.isEmpty(_.find(response.result.framework.categories, { code: 'board' }))) {
  //           this.departmentList = _.get(_.find(response.result.framework.categories, { code: 'board' }), 'terms');
  //         }
  //       }
  //     } else {
  //       this.toasterService.error(this.resourceService.messages.emsg.m0007);
  //     }
  //   }, (err) => {
  //     console.log(err);
  //     this.toasterService.error(this.resourceService.messages.emsg.m0007);
  //   });
  // }
  getContentCreationStaticsReport() {
    const data = {
      "request": {
        "query": "",
        "filters": {
          "status": [
            "Live"
          ],
          "framework": ["nulp"],
          "contentType": [_.get(this.selectedContentType, 'name')],
          "lastUpdatedOn": { ">=": this.datePipe.transform(this.fromDate, 'yyyy-MM-ddTHH:MM'), "<=": this.datePipe.transform(this.toDate, 'yyyy-MM-ddTHH:MM') }
        },
        "limit": "1000",
        "sort_by": {
          "lastUpdatedOn": "desc"
        },
        "fields": ["identifier", "creator", "organisation", "name", "contentType", "createdFor", "channel", "board", "medium", "gradeLevel", "subject", "lastUpdatedOn", "status", "createdBy", "framework", "createdOn", "lastPublishedOn"]
      }
    };
    if (!_.isEmpty(this.selectedCity) && !_.isEmpty(this.selectedDepartment) && !_.isEmpty(this.selectedContentType)) {
      this.reportService.getContentCreationStaticsReport(data).subscribe((response) => {
        if (_.get(response, 'responseCode') === 'OK') {
          if (response.result.count > 0) {
            this.tableData = [];
            let tempObj = _.cloneDeep(response.result.content);
            var self = this;
            tempObj = _.filter(_.cloneDeep(tempObj), function (obj) {
              if (_.indexOf(_.toArray(obj.createdFor), _.get(self.selectedDepartment, 'identifier')) > -1) {
                return obj;
              }
            });
            _.map(tempObj, function (obj) {
              obj.createdOn = self.datePipe.transform(obj.lastPublishedOn, 'MM/dd/yyyy');
              obj.OrgName = _.get(self.selectedCity, 'name');
              obj.departmentName = _.get(self.selectedDepartment, 'orgName');
              // if (!_.isEmpty(obj.channel)) {
              //   obj.OrgName = _.lowerCase(_.get(_.find(self.allOrgName, { 'id': obj.channel }), 'orgName'));
              // } else {
              //   obj.OrgName = '';
              // }
              obj.UserName = obj.creator;
              // if (!_.isEmpty(obj.createdBy)) {
              //   obj.UserName = _.get(_.find(self.allUserName, { 'id': obj.createdBy }), 'firstName') + " " + _.get(_.find(self.allUserName, { 'id': obj.createdBy }), 'lastName');
              // } else {
              //   obj.UserName = '';
              // }
            });
            this.noResult = false;
            this.tableData = tempObj;
            // this.tableData = _.filter(_.filter(tempObj, { OrgName: _.get(this.selectedCity, 'orgName') }), { board: _.get(this.selectedDepartment, 'name') });
            this.initializeColumns();
            if (_.isEmpty(this.tableData)) {
              this.noResultMessage = {
                'messageText': 'messages.stmsg.m0131'
              };
              this.noResult = true;
            }
          } else {
            this.noResultMessage = {
              'messageText': 'messages.stmsg.m0131'
            };
            this.noResult = true;
          }
        } else {
          this.toasterService.error(this.resourceService.messages.emsg.m0007);
        }
      }, (err) => {
        console.log(err);
        this.toasterService.error(this.resourceService.messages.emsg.m0007);
      });
    } else {
      if (_.isEmpty(this.selectedCity)) {
        this.toasterService.error("Please select the city");
      } else if (_.isEmpty(this.selectedDepartment)) {
        this.toasterService.error("Please select the department");
      } else if (_.isEmpty(this.selectedContentType)) {
        this.toasterService.error("Please select the content type");
      }
    }
  }
  getOrgList() {
    this.cityList = [];
    this.reportService.getOrgList().subscribe((response) => {
      if (_.get(response, 'responseCode') === 'OK') {
        if (response.result.count > 0) {
          // this.cityList = _.reject(response.result.channels, function (obj) {
          //   if (obj.name === 'nuis_test' || obj.name === 'niua_test' || obj.name === 'nuis' || obj.name === 'pwc') {
          //     return obj;
          //   }
          // });
          this.cityList = response.result.channels;
        }
      } else {
        this.toasterService.error(this.resourceService.messages.emsg.m0007);
      }
    }, (err) => {
      console.log(err);
      this.toasterService.error(this.resourceService.messages.emsg.m0007);
    });
  }
  getSubOrgList() {
    this.departmentList = [];
    const data = {
      "request": {
        "filters": {
          rootOrgId: _.get(this.selectedCity, 'identifier'),
          isRootOrg: false
        }
      }
    };
    this.reportService.getSubOrgList(data).subscribe((response) => {
      this.disableDepartment = true;
      if (_.get(response, 'responseCode') === 'OK') {
        if (response.result.response.count > 0) {
          this.disableDepartment = false;
          this.departmentList = response.result.response.content;
        }
      } else {
        this.toasterService.error(this.resourceService.messages.emsg.m0007);
      }
    }, (err) => {
      console.log(err);
      this.toasterService.error(this.resourceService.messages.emsg.m0007);
    });
  }
  getOrgDetails() {
    this.allOrgName = [];
    const data = {
      "request": {
        "filters": {}
      }
    };
    this.reportService.getOrganizationName(data).subscribe((response) => {
      if (_.get(response, 'responseCode') === 'OK') {
        if (response.result.response.content.length > 0) {
          this.allOrgName = response.result.response.content;
          this.cityList = _.map(_.compact(_.reject(_.cloneDeep(response.result.response.content), function (obj) {
            if (obj.isRootOrg === false || _.isEmpty(obj.orgName))
              return obj;
          })), function (obj) {
            obj['orgName'] = _.lowerCase(obj['orgName']);
            return obj;
          });
        }
      } else {
        this.toasterService.error(this.resourceService.messages.emsg.m0007);
      }
    }, (err) => {
      console.log(err);
      this.toasterService.error(this.resourceService.messages.emsg.m0007);
    });
  }
  getUserDetails() {
    this.allUserName = [];
    this.reportService.getUserList().subscribe((response) => {
      if (_.get(response, 'responseCode') === 'OK') {
        if (response.result.response.content.length > 0) {
          this.allUserName = response.result.response.content;
        }
      } else {
        this.toasterService.error(this.resourceService.messages.emsg.m0007);
      }
    }, (err) => {
      console.log(err);
      this.toasterService.error(this.resourceService.messages.emsg.m0007);
    });
  }
  initializeColumns() {
    this.cols = [
      { field: 'OrgName', header: 'City Name' },
      { field: 'departmentName', header: 'Creator Department' },
      { field: 'name', header: 'Name' },
      { field: 'board', header: 'Category' },
      { field: 'gradeLevel', header: 'Sub Category' },
      // { field: 'identifier', header: 'Identifier' },
      { field: 'subject', header: 'Topic' },
      { field: 'medium', header: 'Language' },
      { field: 'createdOn', header: 'Last Published On' },
      // { field: 'objectType', header: 'Object Type' },
      { field: 'framework', header: 'Framework' },
      { field: 'UserName', header: 'Created By' },
      { field: 'contentType', header: 'Content Type' },
      // { field: 'status', header: 'Status' }
    ]
  }
  resetFields() {
    this.initializeDateFields();
    this.selectedCity = null;
    this.selectedDepartment = null;
    this.selectedContentType = null;
    this.disableDepartment = true;
  }
  ngOnDestroy() {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }
}