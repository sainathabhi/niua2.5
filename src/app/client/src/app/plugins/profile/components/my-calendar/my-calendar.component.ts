import { Component, OnInit } from '@angular/core';
import { UserService } from '@sunbird/core';
import {
  ResourceService, ConfigService, ToasterService
} from '../../../../modules/shared';
import { ProfileService } from '../../services';
import { Router } from '@angular/router';
import * as _ from 'lodash-es';
import * as moment from 'moment';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import interactionPlugin from '@fullcalendar/interaction';
@Component({
  selector: 'app-my-calendar',
  templateUrl: './my-calendar.component.html',
  styleUrls: ['./my-calendar.component.scss']
})
export class MyCalendarComponent implements OnInit {
  events: any[];
  options: any;
  constructor(public profileService: ProfileService, public resourceService: ResourceService, public toasterService: ToasterService, public userService: UserService, public configService: ConfigService, public router: Router) { }
  ngOnInit() {
    this.profileService.getEnrolledCourses().subscribe(response => {
      this.events = _.filter(_.map(response.result.courses, function (obj) {
        obj.batchName = obj.batch.name;
        obj.title = obj.courseName;
        obj.url = `/learn/course/${obj.contentId}/batch/${obj.batchId}`;
        obj.enrollmentType = obj.batch.enrollmentType;
        obj.start = moment(new Date()).format('YYYY-MM-DD');
        obj.statusName = (obj.progress === 0) ? 'Not-Started' : ((obj.progress === obj.leafNodesCount || obj.progress > obj.leafNodesCount) ? 'Completed' : 'In-Progress');
        obj.statusName = (obj.statusName != 'Completed' && (new Date(obj.batch.endDate) < new Date())) ? 'Expired' : obj.statusName;
        return obj;
      }), obj => obj.statusName == 'Not-Started' || obj.statusName == 'In-Progress');
    });
    this.options = {
      plugins: [dayGridPlugin, timeGridPlugin, listPlugin, interactionPlugin],
      header: {
        left: 'prev,next,today',
        center: 'title',
        right: 'dayGridMonth,timeGridWeek,timeGridDay,listMonth'
      }
    }
  }
}