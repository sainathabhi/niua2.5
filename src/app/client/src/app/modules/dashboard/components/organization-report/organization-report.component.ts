import { Component, OnInit } from '@angular/core';
import { AddusserService } from '../../services/addusser/addusser.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-organization-report',
  templateUrl: './organization-report.component.html',
  styleUrls: ['./organization-report.component.scss']
})
export class OrganizationReportComponent implements OnInit {
  currentDate: Date = new Date();
  fromDate: Date;
  toDate: Date;
  orgSearchData: any;
  countOrgRecord: any;
  showOrgData: any[] = new Array();
  status: string;
  orgType: string;
  rootOrgName: any;
  myStartDateOrg=[];
  newStartDateOrg: Date;
  newTimeStampStartDateOrg: number;
  myEndDateOrg=[];
  newEndDateOrg: Date;
  newTimeStampEndDateOrg: number;
  showLineChartUserData: any = new Array()
  cols: { field: string; header: string; width: string; }[];
  noResultMessage:any;
  sucesErrorPopup: boolean= false;
  popupMsg: string;
  constructor(private datePipe: DatePipe,private _httpService: AddusserService) { }
  ngOnInit() {
    this.initializeColumnsOrg();
    this.noResultMessage = {
      'messageText': "No Records found"
    };
  }
  initializeColumnsOrg()
  {
    this.cols = [
      { field: 'orgName', header: 'Organization', width: '170px' },
      { field: 'orgType', header: 'Organization Type', width: '170px' },
      { field: 'description', header: 'Description', width: '170px' },
      { field: 'channel', header: 'Channel', width: '170px' },
      { field: 'status', header: 'Status', width: '170px' }, 
    ]
  
  }

closeSucesErrorPopup()
{
this.sucesErrorPopup = false
}

getOrgChartDetail( )
{
  if(this.fromDate == null || this.fromDate == undefined)
  {
    this.popupMsg ="Please Enter a From Date";
    this.sucesErrorPopup=true
  
  }
  else if(this.toDate == null || this.toDate == undefined)
  {
    this.popupMsg ="Please Enter a To Date";
    this.sucesErrorPopup=true
    
  }
  let tempArray:any;
  tempArray= {
    'request': {
      'query': '',
      'filters': {
      }
    }
  }
  this._httpService.orgSearch(tempArray).subscribe(res => {
    this.orgSearchData = res.result.response.content;
    this.countOrgRecord = res.result.response.count;
    this.showOrgData = [];
    res.result.response.content.forEach(element => {

      if(element.status==1)
      {
        this.status =   'Active';
      }
      else if(element.status==0)
      {
        this.status =   'Inactive';
      }

      if(element.isRootOrg==true)
      {
        this.orgType =   'Root  Organization';
      }
      else if(element.isRootOrg==false)
      {
        this.orgType =   'Sub Organization';
      }

      if(element.isRootOrg)
      {
        this.rootOrgName = element.orgName;
    // this.showOrgData1.push({"orgType":this.orgType,"id": element.id,"orgName": element.orgName,"description":element.description,"channel":element.channel,"status":this.status})
      }
      this.showOrgData.push({"createdDate":element.createdDate,"orgType":this.orgType,"id": element.id,"orgName": element.orgName,"description":element.description,"channel":element.channel,"status":this.status})    
    });
    var startDate =  this.datePipe.transform(this.fromDate, 'yyyy-MM-dd')
    var endDate =  this.datePipe.transform(this.toDate, 'yyyy-MM-dd')
    this.myStartDateOrg= startDate.split("-");
    this.newStartDateOrg = new Date( this.myStartDateOrg[0], this.myStartDateOrg[1] - 1, this.myStartDateOrg[2]); 
    this.newTimeStampStartDateOrg=this.newStartDateOrg.getTime()
    console.log(this.newTimeStampStartDateOrg);
    this.myEndDateOrg= endDate.split("-");
    this.newEndDateOrg = new Date( this.myEndDateOrg[0], this.myEndDateOrg[1] - 1, this.myEndDateOrg[2]); 
    this.newTimeStampEndDateOrg=this.newEndDateOrg.getTime()
    this.showLineChartUserData = [];
    this.showOrgData.forEach(xy =>
    {
    var myDate =  xy.createdDate.split(" ");
    var  myNewDate = myDate[0].split("-");
    var newDate = new Date( myNewDate[0], myNewDate[1] - 1, myNewDate[2]);       
    var newTimeStampDate=newDate.getTime()
    if(newTimeStampDate>=this.newTimeStampStartDateOrg && newTimeStampDate <= this.newTimeStampEndDateOrg)
    {                            
        this.showLineChartUserData.push(xy)
    }
    });
     console.log('Organization data====')
     console.log(this.showLineChartUserData)
     console.log('Organization data====')

  });
}

}
