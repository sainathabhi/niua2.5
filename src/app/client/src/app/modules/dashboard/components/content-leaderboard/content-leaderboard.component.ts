import { IInteractEventEdata, IInteractEventObject, TelemetryInteractDirective } from '@sunbird/telemetry';
import { IImpressionEventInput } from '../../../telemetry/interfaces/telemetry';
import { Component, OnInit, ViewChild, ViewEncapsulation, OnDestroy } from '@angular/core';
import { UsageService } from '../../services';
import * as _ from 'lodash-es';
import { DomSanitizer } from '@angular/platform-browser';
import { UserService, SearchService } from '@sunbird/core';
import { ToasterService, ResourceService, INoResultMessage, ConfigService } from '@sunbird/shared';
import { UUID } from 'angular2-uuid';
import { ActivatedRoute, Router } from '@angular/router';
import { ReportService } from '../../services/reports/reports.service';
import { DatePipe } from '@angular/common';
import { OnDelete } from 'fine-uploader/lib/core';
import { Subject } from 'rxjs';
import * as moment from 'moment';


import { mapChildrenIntoArray } from '@angular/router/src/url_tree';
import { Chart } from 'chart.js';
//import 'chartjs-plugin-labels';
////////////////////////////////////////
import { AddusserService } from '../../services/addusser/addusser.service';
import { content } from 'html2canvas/dist/types/css/property-descriptors/content';

@Component({
  selector: 'app-content-leaderboard',
  templateUrl: './content-leaderboard.component.html',
  styleUrls: ['./content-leaderboard.component.scss']
})
export class ContentLeaderboardComponent implements OnInit {

  telemetryImpression: IImpressionEventInput;
  constructor
  (
    private _httpService: AddusserService,
    public reportService: ReportService,
    private searchService:SearchService,
    private toasterService: ToasterService,
    public resourceService: ResourceService,
    ) { }

////////////Tab///////////////////////
  selectedCites: Object;
  checkoutForm: Object;
  //createOrgForm: FormGroup;
  organizationTab: boolean  = true;
  userTab: boolean = true;
//////////////////////////////////////
  cityList1: any = [];
  cityList: any = [];
  userList: any = [];
  Graph_Data_List=[];
  noResultMessage :any;
  noResult = true;
  strList="";
  colsUser=[];
  ////////popup//////////////////////
  tableData=[];
  popupTitle="Content wise Graphical Reports";
  selectedItems = [];
  addUserPopup: boolean = false;
    ////////////extra////////////////
    i=0;
    ////////////////////////////

    Table_Data_List=[];
    L1_Root_list=[];
    L2_Root_list=[];
    L1_Piechart:any;
    L2_Piechart:any;
   // rr=[];
    strTxt='';
    tooltip='';
  ////////////extra////////////////
  ngOnInit()
  {
    //this.getOrgList();
    this.getContentCreationStaticsReport();
    this.colsUser = [

      { field: 'User_Name',       header: 'Creator Name',      width: '150px' },
     // { field: 'organisation',  header: 'Organisation', width: '150px' },
      { field: 'Root_Organisation',      header: 'Root Organisation',     width: '150px' },
      { field: 'Sub_Organisation',   header: 'Sub Organisation',  width: '150px' },
      { field: 'Total_Content',     header: 'Total Content',    width: '150px' },
    ]
  }
//User_Name
  resetFields()
  {
    this.selectedCites = null;
  }
  /////Load content List////////////////////////////

  getOrgList()
  {
    this.cityList = [];

    const data = { "request": { "filters": { "isRootOrg":true, "status":1 } } };
    this.reportService.getOrganizationName(data).subscribe((response) => {
      if (_.get(response, 'responseCode') === 'OK')
      {
        if (response.result.response.count > 0)
        {
          this.cityList = _.reject(response.result.response.content,obj=>_.isEmpty(obj.orgName));
          this.cityList.sort((a, b) =>
          {
            if (a.orgName < b.orgName)
            return -1;
            if (a.orgName > b.orgName)
            return 1;
            return 0;
        });
        }
      } else
      {
        this.toasterService.error(this.resourceService.messages.emsg.m0007);
      }
    }, (err) =>
     {
      console.log(err);
      this.toasterService.error(this.resourceService.messages.emsg.m0007);
    });
  }

  getContentCreationStaticsReport()
  {
    //var filters= [];
    //var xx=this.checkoutForm.controls['selectedCities'].value
    //if (!_.isEmpty(this.selectedCites))
    //{
    //  filters= [{ "status": ["Live"], "framework": ["nulp"], "channel": [_.get(this.selectedCites, 'id')], "contentType": ["Course", 'Resource', 'Collection']}];
    //}
    //else
    //{
    //filters=[{ "status": ["Live"], "framework": ["nulp"], "contentType": ["Course", 'Resource', 'Collection']}];
    //}
    //alert('Selected :-'+JSON.stringify(filters));
    const data = {
      "request":
      {
        "query"   : "",
        "filters" : { "status": ["Live"],
                      "framework": ["nulp"],
                      "contentType": ["Course", 'Resource', 'Collection']},

        "limit"   : "1000",
        "sort_by" : { "lastUpdatedOn": "desc" },
        "fields"  :
        ["identifier", "creator", "organisation","copyright",
        "name", "contentType", "createdFor", "channel",
        "board", "medium", "gradeLevel", "subject",
        "lastUpdatedOn", "status", "createdBy",
        "framework", "createdOn", "lastPublishedOn"]
    }
    };
    //alert(JSON.stringify(data));
    this.reportService.getContentCreationStaticsReport(data).subscribe((response) =>
    {
      console.log('Receive data from api-'+JSON.stringify(response));
      if (_.get(response, 'responseCode') === 'OK')
      {
        if (response.result.count > 0)
        {
          var tableData = [];
          let tempObj = _.cloneDeep(response.result.content);
          tableData = tempObj;
          var self = this;
          ///////////////LOOPING ROOT ORG/////////////////////////////////
          var ChnlIds=[];
          var UserIds=[];
           ChnlIds = _.uniq(_.map(tempObj, 'channel'));
           UserIds = _.uniq(_.map(tempObj, 'createdBy'));
          //console.log('1-ChannelIds:-'+ChnlIds);
          //console.log('2-UserIds:-'+UserIds);
          /////////////////GET USER LIST/////////////////////////////////
          const reqParam = {  filters: { id:UserIds}}
          this.searchService.getUserList(reqParam).subscribe(response =>
            {
            this.userList = [];
            let userObj = _.cloneDeep(response.result.response.content);
            this.userList = userObj;
            //console.log( '----UserList---------');
            //console.log( this.userList);
            //////////////////GET CITY/ORG LIST/////////////////////////////
            const reqPayload = { "request": { "filters": { "id":ChnlIds, "isRootOrg":true} } };
            //const reqPayload = { "request": { "filters": { "id":ChnlIds, "isRootOrg":true, "status":1 } } };
            //const reqPayload = { "request": { "filters": { "isRootOrg":true, "status":1 } } };
            //const reqPayload = { "request": { "filters": { "isRootOrg":true} } };
              this.reportService.getOrganizationName(reqPayload).subscribe((response) =>
              {
                    this.cityList1 = [];
                    let cityObj = _.cloneDeep(response.result.response.content);
                    this.cityList1 = cityObj;
                    this.cityList1 = _.reject(response.result.response.content,obj=>_.isEmpty(obj.orgName));
                    //////////////////////////////////////////////////////////////////
                    this.InitializeGraph(tableData);
              ////////////////////////////////////////////////////
              }); //City close
              /////////////////////////////////////////////////////////////////
           }); //User Close
        }
        else
        {
          this.noResultMessage = {'messageText': 'messages.stmsg.m0131' };
          this.noResult = true;
        }
      }
      else
      {
        this.toasterService.error(this.resourceService.messages.emsg.m0007);
      }
    }, (err) => {
      console.log(err);
      this.toasterService.error(this.resourceService.messages.emsg.m0007);
    }); //Content close
  ////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////
  }
  ///////////////////////////////////////////////////

  InitializeGraph(C_List:any)
  {
      //debugger;
      if (this.cityList1.length > 0)
      {

      }
      ///////////////////////////////////
      //console.log( '----C_List---------');
      //console.log(C_List);
      //console.log( '----UserList---------');
      //console.log( this.userList);
      //console.log( '----cityList----------');
      //console.log( this.cityList);
      //console.log("cityList:-"+JSON.stringify(this.cityList));
      //console.log("userList:-"+JSON.stringify(this.userList));
      //////////////////////////////////////////////////////////////
      ///////UPDATE USER LIST//////USER-ID-to-SUB-ORG-MAPING////////////////////
      this.userList.forEach(element =>
        {
          this.cityList1.forEach(element1 =>
            {
              if( element.organisations.length>1)
                  {
                    if((element1.identifier==element.organisations[1].organisationId) &&
                        (element.rootOrgId!=element.organisations[1].organisationId))
                        {
                          element.orgNameUser_new  =   element1.orgName
                          element.orgTypeUser_new  =   'Sub Organization';
                         }
                         else if(element.rootOrgId==element.organisations[1].organisationId)
                         {
                          element.orgNameUser_new  =  element.organisations[0].orgName;
                          element.orgTypeUser_new =   'Sub Organization';
                         }else
                         {
                          element.orgNameUser_new  =  element.organisations[0].orgName;
                          element.orgTypeUser_new =   'Root Organization';
                         }

                  }
                  else if( element.organisations.length==1)
                  {
                        element.orgNameUser_new =   element1.orgName
                        element.orgTypeUser_new  =   'Root Organization';
                  }
              });
        });
      //console.log("Updated userList:-"+JSON.stringify(this.userList));
      //console.log(this.userList);
      /////////////////Camposing comman content data list//////////////////////////
       this.Graph_Data_List=[];
      C_List.forEach(x =>
      {
        let CityTraced= this.cityList1.find(el => el.id === x.channel);
        let UserTraced= this.userList.find(el => el.id === x.createdBy);
          //console.log("cha:-"+x.createdBy+"  Traced-"+JSON.stringify(UserTraced));
          this.Graph_Data_List.push({
          "identifier":x.identifier,
          "copyright":x.copyright,
          "createdFor":x.createdFor,
          "creator":x.creator,
          "subject":x.subject,
          "channel":x.channel,
          "organisation":x.organisation,
          /////////////////////////////////////
          "RootOrgName_new_user":CityTraced["orgName"],
          "rootOrgName_new_city":UserTraced["rootOrgName"],
          "orgNameUser_new":UserTraced["orgNameUser_new"],
          "orgTypeUser_new":UserTraced["orgTypeUser_new"],
          "lastNameUser_new":UserTraced["lastName"],
          ////////////////////////////////////
          "createdBy":x.createdBy,
          "medium":x.medium,
          "name":x.name,
          "createdOn":x.createdOn,
          "objectType":x.objectType,
          "gradeLevel":x.gradeLevel,
          "framework":x.framework,
          "contentType":x.contentType,
          "Category":x.board,
          "lastPublishedOn":x.lastPublishedOn,
          "lastUpdatedOn":x.lastUpdatedOn,
          "status":x.status
        });
      });
      this.strList=JSON.stringify(this.Graph_Data_List);
      //console.log('Updated Graph_Data_List for json-----'+JSON.stringify(this.Graph_Data_List));
      ///////SHORTING//////////////////////////////////////////////////
      this.CreateLeaderBoardChart(this.Graph_Data_List);
  }

  CreateLeaderBoardChart(ResultCT:any)
  {
        //alert('LOAD');
        var L1_Name=[];
        var L1_Value=[];
        var L1_Filter=[];
        var L1_Colour=[];
        /////////////////////////////////////////////////////////////////
        this.L1_Root_list = this.groupBy1(ResultCT,"creator");
        var leader=[];
        debugger
        Object.keys(this.L1_Root_list).forEach( x=>
          {
            L1_Name.push(x);
            L1_Value.push(this.L1_Root_list[x].length);
            var xx=this.L1_Root_list[x];
            L1_Filter.push(x);
            L1_Colour.push(this.getRandomColorHex());
            leader.push(
                  {
                    "User_Name"         :x,
                    "Content_Data"      :this.L1_Root_list[x],
                    "organisation"      :xx[0].organisation,
                    "Root_Organisation":xx[0].rootOrgName_new_city,
                    "Sub_Organisation":xx[0].orgNameUser_new,
                    "Total_Content":this.L1_Root_list[x].length,

                  })
          });
          //console.log(leader);
          console.log('--------------'+JSON.stringify(leader));
          console.log('---top 10------------');
          var top10 = leader.sort(function(a, b) { return a.Total_Content < b.Total_Content ? 1 : -1; }).slice(0,10);
 console.log(top10);
 console.log('--------------'+JSON.stringify(top10));
          // var data = JSON.parse(json);
        //   leader.sort((a, b) =>
        //    {
        //      if (a.Total_Content > b.Total_Content)
        //      return -1;
        //      if (a.Total_Content < b.Total_Content)
        //      return 1;
        //      return 0;
        //  });

         //console.log('leader    :-'+JSON.stringify(leader));
         //alert('leader    :-'+JSON.stringify(leader));
         //////////////////////////////////////////////////////
        this.L1_Chart(L1_Name,L1_Value,L1_Filter,L1_Colour);
        this.popupTitle="Top 10 Content Creators are following";
        this.Table_Data_List=top10;
  }


  L1_Chart(L1_Name:any,L1_Value:any,L1_Filter:any,L1_Colour:any)
  {
      this.L1_Piechart = new Chart('L1_Canvas',
      {
        type: 'bar',//'doughnut',//'pie',//'polarArea','horizontalBar',
        data:
            {
              labels  :             L1_Name,
              datasets: [{
                    data:           L1_Value,
                    borderColor:    L1_Filter,
                    borderSkipped:  L1_Filter,
                    backgroundColor:L1_Colour,
                    borderWidth: 1,
                    fill: true }
                  ]
            },
        options:
            {
            tooltips: { mode: 'index'},
            hover: { mode: 'index', intersect: true  },
            title:{ display : true,text:"Category wise Content Created",fontSize : 15, fontColor : "#111",},
            legend: { display :false ,labels: { fontColor: "green", }},
            scales: {
            xAxes: [{ scaleLabel: { display: true, labelString: '------Content Category -------->' } }],
            yAxes: [{ scaleLabel: { display: true, labelString: '------Number of Content-------->' } }],
                    },
            // plugins: {
            //   labels: [
            //             { render: 'label', fontColor: '#000', position: 'outside' },
            //             { render:'value',fontColor: '#000'}
            //           ]
            //         },
            }
      });
  }



  B1_Chart_showData(evt:any)
  {
    //this.resetGraph('B1');
    //var activePoint = this.B1_Piechart.getElementAtEvent(evt);
    //if (activePoint.length > 0)
    // {
    //  var clickedDatasetIndex = activePoint[0]._datasetIndex;
    //  var clickedElementindex = activePoint[0]._index;
    //  //var filter_data         = activePoint[0]._options.borderColor;  //pie
    //  var filter_data           = activePoint[0]._model.borderSkipped;  //bar
    //  this.strTxt=JSON.stringify(activePoint[0]._model);
    //  var label = this.B1_Piechart.data.labels[clickedElementindex];
    //  var value = this.B1_Piechart.data.datasets[clickedDatasetIndex].data[clickedElementindex];
    //  //alert("Clicked: label:-" + label + " value- " + value +  " - " + clickedElementindex +' filter-'+filter_data);
    //  //console.log('------B1_Root_list-----orgType filter_list---'+filter_data);
    //  //console.log(this.B1_Root_list[filter_data] );
    //  this.B2_Root_list=this.groupBy1(this.B1_Root_list[filter_data],"orgTypeUser_new");
    //  //console.log('------B2_Root_list---');
    //  //console.log(this.B2_Root_list);
    //  this.popupTitle=this.B1_Root_list[filter_data].length+" Content(s) Created in '"+filter_data+"' Category.";
    //  this.tooltip=filter_data;
    //  this.Table_Data_List=this.B1_Root_list[filter_data];
//
    //}
  }

  //////////////////////////////////////
  getRandomColorHex()
  {
  //  var hex = "0123456789ABCDEF",
  //      color = "#";
  //  for (var i = 1; i <= 6; i++)
  //  {
  //    color += hex[Math.floor(Math.random() * 16)];
  //  }
    var color= ["red", "green", "blue", "purple", "magenta","aqua", "salmon", "darkgray", "pink", "coral"];
    //var min=0;
    //var max=color.length-1;
    //var rand= Math.floor(Math.random() * (max - min + 1) + min);
    this.i++;
    return color[this.i%color.length-1];
  }

  groupBy1(list, key)
  {
   return list.reduce(function(rv, x)
   {
     (rv[x[key]] = rv[x[key]] || []).push(x);
     return rv;
   }, {});
  };
  resetGraph(ngClick:any)
  {
    if(ngClick=="B1")
     {
    //  this.B2_Piechart=new Chart("B2_Canvas", { type: "bar", data: {} ,options: {} });
      //this.Table_Data_List=[];
      //this.B2_Root_list=[];
      //alert(88);
    }
    else  if(ngClick=="B2")
    {
      //this.Table_Data_List=[];
      //this.B2_Root_list=[];
    }
  }
}
