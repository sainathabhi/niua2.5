import { UserService } from '../../../core/services/user/user.service';
import { ValidationserviceService } from './../../../shared/regex/validationservice.service';
import { ServerResponse } from './../../../shared/interfaces/serverResponse';  
import { ResourceService } from './../../../shared/services/resource/resource.service';
import { ToasterService } from './../../../shared/services/toaster/toaster.service';
import { AddusserService } from './../../services/addusser/addusser.service';
import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { IInteractEventInput, IImpressionEventInput } from '@sunbird/telemetry';
import {
  NavigationHelperService
} from '@sunbird/shared';
import { Subject } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { UserSearchService } from '../../../search/services';
import * as _ from 'lodash-es';
//import { UserSearchService } from 'src/app/modules/search/services';
//import { ValidationserviceService } from 'src/app/modules/shared/regex/validationservice.service';
@Component({
  selector: 'app-add-userss',
  templateUrl: './add-userss.component.html',
  styleUrls: ['./add-userss.component.scss']
})
export class AddUserssComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild('multiSelect') multiSelect;
  createUserForm: FormGroup;
  addRoleForm: FormGroup;
  addOrgForm: FormGroup;
  editUserForm: FormGroup;
  confirmUserForm: FormGroup;
  genericForm: FormGroup;
  addUserPopup: boolean = false;
  addRolePopup: boolean = false;
  addOrgPopup: boolean = false;
  genericPopup: boolean = false;
  confirmPopup: boolean = false;
  editeUserPopup: boolean = false;
  sucesErrorPopup: boolean = false;
  confirmBlock: any;
  profiledata:any
  public unsubscribe$ = new Subject<void>();
  public telemetryImpression: IImpressionEventInput;

  userSearchForm: FormGroup;
  countUserRecord: any;
  userData: any = new Array()
  searchDataArr: any = new Array()
  orgListArr: any = new Array()
  roleEditData: any = new Array()
  notifications: any = new Array()
  editOrgNameArr: any = new Array()
  showUserData: any[] = new Array();
  roleDataArr: any = new Array()
  loggedInUserId: string;
  userId: string;

  dropdownList = [];
  selectedItems = [];
  addRoleselectedItems= [];
  dropdownSettings = {};
   selectedRootOrgOption:any="";
    getAllOrgData:any[] = new Array();
 /**
   * To call resource service which helps to use language constant
   */
  public resourceService: ResourceService;

    /**
   * To show toaster(error, success etc) after any API calls
   */
  private toasterService: ToasterService;
  /**
	 * This variable sets the user id
	 */
 
  /**
  * To get user profile of logged-in user
  */

  orgName: any;
 /**
 * To get user profile of logged-in user
 */

 private userSearchService: UserSearchService;

 public selectedMentors: any = [];
 public getOrgMentorList: Array<any> = [];
 public mentorList: Array<any> = [];
 public subMentorList: Array<any> = [];
 public mentorListnew: Array<any> = [];

  showLoader = true;
  showError = false;
  userDetails: any;
  orgData: any;
  userLoginData: any;
  userLoginDataChannel: any = null;
  subOrgName: any;
  organisationId: any;
  userOrg: any;
  checkRootOrg: boolean;
  orgDatalength: any;
  blockUserid: any;
  blockId: any;
  onchangeorgName: any;
  strOrgname: any;
  orgId: any;
  onchangeorgId: any;
  editeUserData: any;
  popupMsg: any;
  orgRootStatus: void;
  roleEditeUserData: any;
  addRoleorgId: any;
  gridUserId: any;
  createUserId: any;
  orgEditeUserData: any;
  gridOrgUserId: any;
  addOrgId: any;
  onchangeaddOrgName: any;
  onchangeaddOrgId: any;
  filteredValuesLength: any;
  cols: any[];
  status: string;
  statusList: any[];
  statuslistArry: any;
  statuslistArryData: any[] = new Array();


  orgList: any[];
  orgListData: any[] = new Array();
  orgListArry: any;
  countOrgRecord: any;
  createOrgForm: FormGroup;
  createRootOrgForm: FormGroup;
  editOrgForm: FormGroup;
  editStatusForm: FormGroup;

  //organization variable

  addOrgrPopup: boolean = false;
  orgSearchData: any;
  statusOrg: string;
  orgListOrg: any[];
  orgListDataOrg: any[] = new Array();
  orgListArryOrg: any;
  statusListOrg: any[];
  statuslistArryOrg: any;
  statuslistArryDataOrg: any[] = new Array();
  rootOrgId: any;
  editOrgrPopup: boolean = false;
  subOrgofRoot: boolean = false;
  findePublic: boolean = false;
  getOrgData: any= null;
  getOrgName: any;
  removeOrgUserdataAll: any;
  getdescription: any;
  getData: { getOrgName: any; };

  orgDataId: string;
  orgType: string;
  result: number =0;
  showOrgData: any[] = new Array();
  showOrgData1: any[] = new Array();
  showOrgData2: any[] = new Array();
  removeOrgFormId: any;
  rootOrgName: any= null;
  editOrgrStatusPopup: boolean= false;
  //orgStatus: { label: string; value: string; }[];
  orgStatusVal: any;
  orgStatus: any = [];



  applicant: any;
  orgStat: number;
  addRootOrgrPopup: boolean = false;
  rootOrgIdCreate: any;
  rootorganisationId: any;
  randomNumber: number;
  filteredValuesLengthOrg: any;
  colsUser: any[];
  subOrgNameOrg: any = null;
  orgDataRole: any;
  systemVar: string;
  rootOrgIdOrgName: any;
  rootOrgIdOrg: any;
  channelListOrg: any[];
  channelListOrgArry: any;
  channelListOrgArryData: any[] = new Array();
  orgDataLength: any;
  removeOrgUserId: any;
  userOrgLength: any;
  isRootSubCondition: any;
  orgStatusValOrg:any='';
  addorgSelectName: string;
  orgNameUser: any;
  orgTypelListOrg: any[];
  orgTypeOrgArry: any;
  orgTypeListOrgArryData: any[] = new Array();
  orgTypeUser: any;
  orgTypelListUser: any[];
  orgTypelListUserArry: any;
  orgTypeListUserArryData: any[] = new Array();
  confirmPopupMsg: string;
  isrootOrganization: string;
  channel: any;
  userTab: boolean = false;
  organizationTab: boolean  = false;
  UploadTemplate:boolean  = false;
  onchangeChanelName: any;
  checkOrgExistsPopup: boolean;


  

  //organization variables





  /**
  * Constructor to create injected service(s) object
  *
  * Default method of DeleteComponent class
  *
  * @param {UserSearchService} userSearchService Reference of UserSearchService
  * @param {ResourceService} resourceService Reference of ResourceService
  * @param {ToasterService} toasterService Reference of ToasterService
  
  */

  constructor(public userService: UserService, private _httpService: AddusserService,private activatedRoute: ActivatedRoute,public router: Router,toasterService: ToasterService, resourceService: ResourceService,userSearchService: UserSearchService,private _validation:ValidationserviceService, public navigationhelperService: NavigationHelperService) { 

    this.resourceService = resourceService;
    this.toasterService = toasterService;
    this.userSearchService = userSearchService;
    this.userId = this.userService.userid;


    this.orgStatus = [{
      "status": "Active",
      "value": 1
  }, {
      "status": "Inactive",
      "value": 0
  }];

  }

  ngOnInit() {
    this.createUserForm = new FormGroup({
      firstname:  new FormControl("",  [Validators.required,Validators.pattern(this._validation.alphabetRegex)]),
      lastname: new FormControl("",  [Validators.pattern(this._validation.alphabetRegex)]),
      emailid: new FormControl("",  [Validators.required,Validators.pattern(this._validation.emailRegex)]),
      phone: new FormControl("",  [Validators.required,Validators.pattern(this._validation.mobileno)]),
      isrootSub:new FormControl(null),
      subRootorgname:new FormControl(null),
      orgname: new FormControl(null,Validators.required),
      role:new FormControl(null),
     })
     
     
     this.editUserForm = new FormGroup({
      editfirstname: new FormControl(null,Validators.required),
      editlastname: new FormControl(null,Validators.required),
      editemailid: new FormControl(null,Validators.required),
      edituserid: new FormControl(null),
      editphone: new FormControl(null),
      // editorgname: new FormControl(null),
      // editrole: new FormControl(null),
     })

     this.addRoleForm = new FormGroup({
      addrole: new FormControl(null),
      editroleorgid: new FormControl(null),
      gridUserId: new FormControl(null),
     })
     
     this.addOrgForm = new FormGroup({
      addOrgname: new FormControl(null,Validators.required),
      addOrgrole: new FormControl(null,Validators.required),
      gridOrgUserId: new FormControl(null),
     })

     this.confirmUserForm = new FormGroup({
      blockUserid: new FormControl(null),
      blockid: new FormControl(null),
     })

     this.genericForm = new FormGroup({
      genericId: new FormControl(null),
      genericUserId: new FormControl(null),
     })
     this.populateUserProfile();
     this.initializeColumns();
    // this.getOrgList();
     
    this.selectedItems = [
      {"id":1,"itemName":"PUBLIC"}    
  ];
  this.dropdownList = [
   {"id":1,"itemName":"PUBLIC"},
   ];
  this.dropdownSettings = { 
    text: "Select Role",
            selectAllText: 'Select All',
            unSelectAllText: 'UnSelect All',
            classes: "myclass custom-class",
            primaryKey: "id",
            enableSearchFilter: false,
            labelKey: 'itemName',
            badgeShowLimit: 5
  };   
  
  this.createOrgForm = new FormGroup({
     rootOrgName: new FormControl(null,Validators.required),
    orgName: new FormControl(null,Validators.required),
    description: new FormControl(null,Validators.required),
   })


   this.createRootOrgForm = new FormGroup({
    orgName: new FormControl(null,Validators.required),
    description: new FormControl(null,Validators.required),
   })

   this.editOrgForm = new FormGroup({
    orgName: new FormControl(this.getOrgName,Validators.required),
    description: new FormControl(this.getdescription,Validators.required),
   })


   this.editStatusForm = new FormGroup({
    orgStatus: new FormControl('',Validators.required)
   })
   
  this.initializeColumnsOrg();
  this.getUserProfileOrg()
  this.getOrgDataUser()
  
  //this.getUserOrganization()

 // this.getOrgDataSearch()
  
  }
  
  
   getOrgDataUser()
  {
      let tempArray : any
      tempArray= {
      "request": {
      "filters": {
      },
      "limit": 1000,
      "offset": 0
      }
      }
      this._httpService.getSuborgData(tempArray).subscribe(res => {
      console.log('get the organization');

      res.result.response.content.forEach(element => {
      this.getAllOrgData.push({"orgName":element.orgName,"identifier":element.identifier})
  
      });
      },err=>{
      // this.popupMsg=err.params.errmsg;
      console.log(err)
      });
  }

  initializeColumns() {
    this.colsUser = [
      { field: 'orgName', header: 'Organization', width: '150px' },
      // { field: 'orgType', header: 'Organization Type', width: '150px' },
      { field: 'firstName', header: ' First Name', width: '150px' },
      { field: 'lastName', header: 'Last Name', width: '150px' },
      { field: 'email', header: 'Email', width: '150px' },
      { field: 'phone', header: 'Mobile', width: '150px' },
      { field: 'status', header: 'Status', width: '150px' },
    ]
  }
  onFilter(event, dt) {
    this.filteredValuesLength = event.filteredValue.length;
   // alert(this.filteredValuesLength)
    if( this.filteredValuesLength == this.countUserRecord)
    {
     this.countUserRecord = this.countUserRecord;
    }
    else if( this.filteredValuesLength != this.countUserRecord)
    {
     this.countUserRecord = this.filteredValuesLength;
    }
    else
    {
     this.countUserRecord = this.countUserRecord;
    }
  } 
onItemSelect(item:any){
    console.log("single item");
    console.log(this.selectedItems);
}
OnItemDeSelect(item:any){
    console.log(item);
    console.log(this.selectedItems);
}
onSelectAll(items: any){
    console.log(items);
}
onDeSelectAll(items: any){
    console.log(items);
}
superAdminOrgList()
{
  this.dropdownList = [
    {"id":1,"itemName":"PUBLIC"},
    {"id":2,"itemName":"CONTENT_CREATOR"},
    {"id":3,"itemName":"CONTENT_REVIEWER"},
    {"id":4,"itemName":"COURSE_MENTOR"},
    {"id":5,"itemName":"ORG_ADMIN"},
    {"id":6,"itemName":"ORG_MODERATOR"},
    {"id":7,"itemName":"ORG_MANAGEMENT"},
    {"id":8,"itemName":"SYSTEM_ADMINISTRATION"},
   
  ]; 
  return this.dropdownList;
}
rootAdminOrgList()
{
  this.dropdownList = [
    {"id":1,"itemName":"PUBLIC"},
    {"id":2,"itemName":"CONTENT_CREATOR"},
    {"id":3,"itemName":"CONTENT_REVIEWER"},
    {"id":4,"itemName":"COURSE_MENTOR"},
    {"id":5,"itemName":"ORG_ADMIN"},
    {"id":6,"itemName":"ORG_MANAGEMENT"},
    {"id":7,"itemName":"ORG_MODERATOR"},
   
  ];
  return this.dropdownList; 
}
subRootAdminOrgList()
{
  this.dropdownList = [
    {"id":1,"itemName":"PUBLIC"},
    {"id":2,"itemName":"CONTENT_CREATOR"},
    {"id":3,"itemName":"CONTENT_REVIEWER"},
    {"id":4,"itemName":"COURSE_MENTOR"},
    {"id":5,"itemName":"ORG_ADMIN"},
    {"id":6,"itemName":"ORG_MODERATOR"},
   
  ]; 
}
getRoleName(str:any)
{
  this.subMentorList=[]
  this.createUserForm.value['isrootSub']
  console.log(str.target.value);
  this.strOrgname=str.target.value;
  this.onchangeorgName=this.strOrgname.split("/");
  console.log(this.onchangeorgName);
  if(this.systemVar=='notpresent')
  {
  if( this.onchangeorgName[2]=="true")
  {
   this.rootAdminOrgList();
  }
  else{
    this.subRootAdminOrgList();
  }
}
else if(this.systemVar=='present')
{
  if(this.createUserForm.value['isrootSub']=='yes')
  {
   this.superAdminOrgList();
}
else{
  this.subRootAdminOrgList();
}
}
  if(this.createUserForm.value['isrootSub']=='no')
  {
    let subOrgList : any;
    subOrgList={
      "request": {
        "filters": {
          "rootOrgId": this.onchangeorgName[1],
          isRootOrg: false
        },
        "limit": 100,
        "offset": 0
      }

    }
    console.log(subOrgList)
    this._httpService.getSuborgData(subOrgList).subscribe(res=>{
      console.log("----get sub org  list-------------")     
      console.log(res) 
      this.subMentorList =res.result.response.content;
   },err=>{
   console.log(err)
   })
  }
}

 /**
   * This method fetches the user data
	 */
  populateUserProfile() {
    this.showLoader = true;
    const option = { userId: this.userId };
    this.userSearchService.getUserById(option).subscribe(
      (apiResponse: ServerResponse) => {
       console.log("--user profile data-----")
       console.log(apiResponse.result.response)
       this.userLoginData = apiResponse.result.response;
       this.userLoginDataChannel =  apiResponse.result.response.channel;
       this.orgData = apiResponse.result.response.organisations;
       sessionStorage.setItem("orgDatalength", this.orgData.length);
       sessionStorage.setItem("userLoginDataChannel", this.userLoginDataChannel);
       //Organization tab is visible for system admin and Root Admin
       for (var i = 0; i < this.orgData.length; i++) {  
         if((this.orgData.length>1) && (this.userLoginData.rootOrgId!=this.orgData[1].organisationId))
         {
            this.orgDataRole=this.orgData[1].roles
         }
         else if(this.orgData.length==1)
         {
             this.orgDataRole=this.orgData[0].roles
         }

        if(this.orgDataRole.includes("ORG_ADMIN") || this.orgDataRole.includes("SYSTEM_ADMINISTRATION"))
        {
          this.userTab = true;
          if(this.orgData.length==1)
          {
          this.organizationTab = true;
          this.UploadTemplate = true;
          }


        }
        else
        {
           if(this.orgDataRole.includes("ORG_MANAGEMENT"))
           {
            this.organizationTab = true;
            this.UploadTemplate = true;
           }
           if(this.orgDataRole.includes("ORG_MODERATOR"))
           {
            this.userTab = true;
            this.UploadTemplate = true;
           }
        }
       
       
        if(this.orgData.length == 1)
        {
          this.checkRootOrg= true;
          for( var k = 0; k < this.orgDataRole.length; k++ ) {
            if(this.orgDataRole[k] =="SYSTEM_ADMINISTRATION"){
              this.systemVar='present'; 
              this.isrootOrganization='yes'            
            }
            else{
              this.systemVar='notpresent';
            }
          }
          this.getOrgList(this.systemVar)
          console.log("-----system var----")
          console.log(this.systemVar)            
        }
        else if(this.orgData.length == 2)
        {
          this.systemVar='notpresent';
         // this.subOrgName = this.orgData[1].orgName;
        //  sessionStorage.setItem("subOrgName", this.subOrgName);
          this.organisationId = this.orgData[1].organisationId;
          if(this.mentorList.length==0)
          {
            debugger
            let tempArray : any
        tempArray= {
        "request": {
        "filters": {
        },
        "limit": 1000,
        "offset": 0
        }
        }
        this._httpService.getSuborgData(tempArray).subscribe(res => {
        console.log('get the firstttttttttttttttttttttt organization');
          console.log(res.result.response.content);
        res.result.response.content.forEach(element2 => {
          if(element2.identifier==this.orgData[1].organisationId)
                  {
                   this.subOrgName = element2.orgName

                  
                  }
  
          });
       
         
          if(this.mentorList.length==0)
          {
         sessionStorage.setItem("subOrgName", this.subOrgName);
        console.log("---mentor list1111111")
        sessionStorage.setItem("subOrgName", this.subOrgName);
        this.mentorList.push( {'id' :this.organisationId,'orgName': this.subOrgName,channel: this.userLoginDataChannel,'isRootOrg':false}) 
        console.log(this.mentorList)
          }
        },err=>{
        // this.popupMsg=err.params.errmsg;
        console.log(err)
        });
          }
          this.checkRootOrg= false;
        }
     }
     this.populateUserSearch(this.userLoginDataChannel,this.organisationId,this.systemVar);
      },
      err => {
        this.toasterService.error(this.resourceService.messages.emsg.m0005);
        this.showLoader = false;
        this.showError = true;
      }
    );
  }

 populateUserSearch(userLoginDataChannel,organisationId,systemVar)
  {
    //sessionStorage.setItem("orgDatalength", this.orgData.length);
    this.orgDatalength = sessionStorage.getItem("orgDatalength")
    this.subOrgName = sessionStorage.getItem("subOrgName")
      let tempArray : any
      if(this.orgDatalength ==1)
      {
        if(systemVar=='present')
        {
        tempArray= {
          'request': {
            'query': '',
            'filters': {
              
            }
          }
        }
      }
      if(systemVar=='notpresent')
      {

        tempArray= {
          'request': {
            'query': '',
            'filters': {
              "channel":userLoginDataChannel
            },
            'limit': 1000
          }
        }
      }
      
      }
      else if(this.orgDatalength==2)
      {

        tempArray= {
          'request': {
            'query': organisationId,
            'filters': {
            },
            'limit': 1000
          }
        }
    
      }     
    // this.showUserData = [];
     // this.orgName ="";
    // this.orgNameUser ="";
      this._httpService.userSearch(tempArray).subscribe(res => {
        this.countUserRecord = res.result.response.count;
       // this.userData = res.result.response['content'];
        this.userData = res.result.response.content;
       
        this.showUserData = [];
        this.statuslistArryData =[];
        this.orgListData =[];
      // this.orgNameUser ="";
        res.result.response.content.forEach(element => {
         // if(element.eNqFlage){
          //this.userOrgLength=element.organisations.length;
         
         
        
         if(element.status==1)
         {
           this.status =   'Active';
         }
         else if(element.status==0)
         {
           this.status =   'Inactive';
         }


         console.log('Organizations');
         console.log(this.getAllOrgData);
        /// this.orgIdUser = element.organisations[1].organisationId
         console.log('Organizations');
        
        if(this.orgDatalength ==1)
        {
          this.userOrgLength =  element.organisations.length;
        this.getAllOrgData.forEach(element1 => {

         // debugger
          if( element.organisations.length>1)
          {
          if((element1.identifier==element.organisations[1].organisationId) && (element.rootOrgId!=element.organisations[1].organisationId))
          {
           this.orgNameUser  = element1.orgName
           this.orgTypeUser =   'Sub Organization';
          }
          else if(element.rootOrgId==element.organisations[1].organisationId)
          {
            this.orgNameUser  = element.organisations[0].orgName;
            this.orgTypeUser =   'Sub Organization';
          }
    
          }
         });

         if( element.organisations.length==1)
          {
            this.orgNameUser  = element.organisations[0].orgName;
            this.orgTypeUser =   'Root  Organization';
          }
        }
        else if(element.organisations.length >1)
        {
          this.orgNameUser =   this.subOrgName;
          this.orgTypeUser =   'Sub Organization';
        }
         

        if(element.firstName== 'Medical')
        {
         console.log( this.orgTypeUser);
         console.log(element);
         console.log(this.userOrgLength);
        console.log(this.orgNameUser+'====================================wee'+element.firstName)
        } 
         this.showUserData.push({"orgType": this.orgTypeUser,"userId":element.id,"uStatus":element.status,"createdDate":element.createdDate,"firstName": element.firstName,"lastName":element.lastName,"email":element.email,"phone":element.phone,"orgLength":  element.organisations.length,"orgName":this.orgNameUser,"status":this.status,"userOrglengths":this.userOrgLength})
         // this.showUserData.push({"userId":element.id,"uStatus":element.status,"firstName": element.firstName,"lastName":element.lastName,"email":element.email,"phone":element.phone,"orgLength":  element.organisations.length,"orgName":this.orgName})
        
         
        });


     this.showUserData =  this.showUserData.sort((a, b) => new Date(b.createdDate).getTime() - new Date(a.createdDate).getTime())

        console.log('showUserData');
        console.log(this.showUserData);
        console.log('showUserData11');


        this.orgTypelListUser = this.showUserData
        .map(item => item.orgType)
        .filter((value, index, self) => self.indexOf(value) === index)
        this.orgTypelListUserArry  = this.orgTypelListUser.filter(f => f !== undefined && f !== null) as any;
        this.orgTypelListUserArry.forEach(element => {
        this.orgTypeListUserArryData.push({"label": element,"value":element})
        });

        this.statusList = this.showUserData
        .map(item => item.status)
        .filter((value, index, self) => self.indexOf(value) === index)
        this.statuslistArry  = this.statusList.filter(f => f !== undefined && f !== null) as any;
        this.statuslistArry.forEach(element => {
        this.statuslistArryData.push({"label": element,"value":element})
        });


        this.orgList = this.showUserData
        .map(item => item.orgName)
        .filter((value, index, self) => self.indexOf(value) === index)
        this.orgListArry  = this.orgList.filter(f => f !== undefined && f !== null) as any;
        this.orgListArry.forEach(element => {
        this.orgListData.push({"label": element,"value":element})
        });




      });    
  }
/**
   * This method use for add user
	 */
  createUserFormSubmit()
  { 
    this.findePublic=false; 
    this.roleDataArr=[];
    
      // return;

    this.userLoginDataChannel = sessionStorage.getItem("userLoginDataChannel")
    this.isRootSubCondition= this.createUserForm.value['isrootSub']
    this.orgId=this.createUserForm.value['orgname']
    this.onchangeorgName=this.orgId.split("/");
    this.onchangeorgId = this.onchangeorgName[1]
    this.onchangeChanelName=this.onchangeorgName[2]
    this.orgRootStatus= this.onchangeorgName[3]
	console.log(this.onchangeorgName);
	const currentDate = new Date();
    const timestamp = currentDate.getTime();
    console.log("time stapppppppppp")
    console.log(timestamp)
   
      let tempArray : any
      tempArray = 
    {
      "request":{
        "email": this.createUserForm.value['emailid'],
        "firstName":this.createUserForm.value['firstname'],
        "lastName": this.createUserForm.value['lastname'],
        "phone":this.createUserForm.value['phone'],
        "channel": this.onchangeChanelName,
        "userName":"username_"+timestamp,
        "phoneVerified": true,
        "emailVerified": true
      }
    }  
    console.log(tempArray);  
   // return
    this._httpService.createUserDetailSave(tempArray).subscribe(res=>{
      this.addUserPopup=false
      if(res.result.response=='SUCCESS')
      {
       this.createUserId=res.result.userId
       this.addroleOrganization(this.createUserId,this.onchangeorgId,this.orgRootStatus,this.isRootSubCondition);
      // location.reload()
      }
     },err=>{
      console.log(err)
      this.sucesErrorPopup=true 
      this.popupMsg=err.error.params.errmsg;
     
     })
  }
/**
   * This method used for add role in user
	 */
  addroleOrganization(creatUserId:any,orgId:any,orgRootStatus:any,isRootSubCondition:any)
  {
    this.popupMsg='';
    let tempOrgArray : any
    this.selectedItems.forEach(element => {
      this.roleDataArr.push(element.itemName)
       });
       console.log(this.roleDataArr)
      if( this.roleDataArr.length > 0 ) {
         for( var i = 0; i < this.dropdownList.length; i++ ) {            
            if(this.roleDataArr[i] =="PUBLIC"){
             this.findePublic=true;           
             }        
         }
       }
       if(this.findePublic==false)
       {
        this.roleDataArr.push("PUBLIC"); 
       }
       console.log("public  role")
       console.log(this.roleDataArr)
    tempOrgArray =
    {
      "request": {
        "organisationId":orgId,
        "roles": this.roleDataArr,
        "userId": creatUserId
      }
    }
    console.log(tempOrgArray)
    console.log(orgRootStatus);
   // return
   if(isRootSubCondition=='yes' || isRootSubCondition==null )
   {
   if(orgRootStatus=="false")
   {
    this._httpService.addroleSubRootOrganization(tempOrgArray).subscribe(res=>{
        console.log("role org file");
        console.log(res);          
        this.sucesErrorPopup=true      
        this.popupMsg=res.result.response;
        //this.populateUserProfile();
     },err=>{
      this.popupMsg=err.params.errmsg;
     console.log(err)
     })
    console.log(tempOrgArray)
   }
   if(orgRootStatus=="true")
   {
    this._httpService.addroleRootOrganization(tempOrgArray).subscribe(res=>{       
      this.sucesErrorPopup=true      
      this.popupMsg=res.result.response;
     // this.populateUserProfile();
   },err=>{
    console.log(err)
    this.popupMsg=err.params.errmsg;
   console.log(err)
   })
  console.log(tempOrgArray)
   }
  }
  else if(isRootSubCondition=='no')
  {
    tempOrgArray =
    {
      "request": {
        "organisationId":this.createUserForm.value['subRootorgname'],
        "roles": this.roleDataArr,
        "userId": creatUserId
      }
    }
    console.log(tempOrgArray)
    this._httpService.addroleSubRootOrganization(tempOrgArray).subscribe(res=>{
         console.log("role org file");
         console.log(res);          
         this.sucesErrorPopup=true      
         this.popupMsg=res.result.response;
        // this.populateUserProfile();
      },err=>{
       this.popupMsg=err.params.errmsg;
      console.log(err)
      })
     console.log(tempOrgArray)
  }
}
 /**
   * This method used for get user by userid
	 */
  editUser(creatUserId:any)
  {
    console.log(creatUserId)
    this.editeUserPopup=true
    this._httpService.getEditUserById(creatUserId).subscribe(res=>{
    console.log(res)
    this.editeUserData=res.result.response;
    this.editOrgNameArr=res.result.response.organisations;
     },err=>{
     console.log(err)
     })
  }

  /**
   * This method used for edit user form submit
	 */
  editUserFormSubmit()
  {
    this.popupMsg='';
    let tempArray : any
    tempArray = 
    {
      "request":{
        "userId": this.editUserForm.value['edituserid'],
        "email": this.editUserForm.value['editemailid'],
        "lastName": this.editUserForm.value['editlastname'],
        "emailVerified": true
      }
  }
  console.log(tempArray);
  this._httpService.updateUserData(tempArray).subscribe(res=>{
    console.log(res) 
   },err=>{
     console.log(err)
     this.sucesErrorPopup=true;
     this.popupMsg=err.error.params.errmsg
   })
 
}

/**
   * This method for fetches the org list 
	 */
  getOrgList(systemVar:any)
  {
    this.userLoginDataChannel = sessionStorage.getItem("userLoginDataChannel")
    let tempArray : any
    if(systemVar=='present')
    {   
    tempArray= {
      'request': {
        'query': '',
        'filters': {
          isRootOrg: true
        },
        'limit': 100
      }
    }
  }
  else{
    tempArray= {
      'request': {
        'query': '',
        'filters': {
          "channel":this.userLoginDataChannel
         
        },
        'limit': 100
      }
    }
  }
  console.log("--------syssteemevar------"+systemVar)
  console.log(tempArray)
      this._httpService.getOrgDetail(tempArray).subscribe(res=>{
      this.orgListArr =res.result.response.content;
      console.log("-----org  listt-----")
      console.log(this.orgListArr)
      this.mentorList = this.orgListArr.sort(function(a, b) {
       return b.isRootOrg - a.isRootOrg
      })
     
     },err=>{
     console.log(err)
     })

  }
  getSubRootOrganization(strOrg:any)
  {
    console.log(strOrg.target.value);
    if(strOrg.target.value=='yes')
    {
     this.subOrgofRoot=false; 
    }
    else if(strOrg.target.value=='no')
    {
      this.subOrgofRoot=true;  
    }
    if(this.systemVar=='present')
    {
    if(this.createUserForm.value['isrootSub']=='yes')
    {
    this.superAdminOrgList();
    }
   else{
    this.subRootAdminOrgList();
   }
   }

   
  } 
 /**
   * This method used for fetch particular user organization data 
	 */ 

  getUserOrgList(userChannel:any)
  {
    
    let tempArray : any
    tempArray= {
      'request': {
        'query': '',
        'filters': {
          "channel":userChannel
        },
        'limit': 100
      }
    }
      this._httpService.getOrgDetail(tempArray).subscribe(res=>{
      this.orgListArr =res.result.response.content;
     this.getOrgMentorList = this.orgListArr.sort(function(a, b) {
       return b.isRootOrg - a.isRootOrg
      })
     
     },err=>{
     console.log(err)
     })

  }

  /**
   * This method used for add role button form submit
	 */
  addRoleFormSubmit()
  {
    this.findePublic=false; 
    this.roleDataArr=[];
    this.orgId=this.addRoleForm.value['editroleorgid']
    this.gridUserId=this.addRoleForm.value['gridUserId']
    this.selectedItems.forEach(element => {
      this.roleDataArr.push(element.itemName)
       });
       console.log(this.roleDataArr)
      if( this.roleDataArr.length > 0 ) {
         for( var i = 0; i < this.dropdownList.length; i++ ) {            
            if(this.roleDataArr[i] =="PUBLIC"){
             this.findePublic=true;           
             }        
         }
       }
       if(this.findePublic==false)
       {
        this.roleDataArr.push("PUBLIC"); 
       }
       console.log("public  role")
       console.log(this.roleDataArr)
    let addRoletempArray : any
    addRoletempArray =
    {
      "request": {
        "organisationId": this.orgId,
        "roles": this.roleDataArr,
        "userId": this.gridUserId
      }
    }
console.log( addRoletempArray);
//return;
    this._httpService.addroleRootOrganization(addRoletempArray).subscribe(res=>{ 
      this.addRolePopup = false     
      this.sucesErrorPopup=true      
      this.popupMsg=res.result.response;
    //  this.populateUserProfile();
   },err=>{
    this.popupMsg=err.params.errmsg;
   console.log(err)
   })
  }
/**
   * This method used for fetch role detail
	 */
  addRole(gridUserId:any)
  {
    this.roleEditData=[];
    this.addRoleorgId='';
    this.gridUserId=gridUserId;
    this.selectedItems=[];
    this.selectedItems = [
      {"id":1,"itemName":"PUBLIC"}   
  ];
  this._httpService.getEditUserById(gridUserId).subscribe(response => { 
        this.roleEditeUserData=response.result.response; 
        console.log(this.roleEditeUserData) 
        console.log(this.roleEditeUserData) 
        if(this.roleEditeUserData.organisations.length == 1)
        {
         this.addRolePopup = true
         this.rootAdminOrgList();
         this.roleEditData=this.roleEditeUserData.organisations[0].roles;
         this.addRoleorgId = this.roleEditeUserData.organisations[0].organisationId;
        }                              
        else if((this.roleEditeUserData.organisations.length >1) && (this.roleEditeUserData.rootOrgId!=this.roleEditeUserData.organisations[1].organisationId))
        {
         this.addRolePopup = true
         this.subRootAdminOrgList();
         this.roleEditData=this.roleEditeUserData.organisations[1].roles;
         this.addRoleorgId = this.roleEditeUserData.organisations[1].organisationId;
        }
       else  if((this.roleEditeUserData.organisations.length > 1) && (this.roleEditeUserData.rootOrgId==this.roleEditeUserData.organisations[1].organisationId))
        {
         this.addRolePopup = true
         this.rootAdminOrgList();
         this.roleEditData=this.roleEditeUserData.organisations[0].roles;
         this.addRoleorgId = this.roleEditeUserData.organisations[0].organisationId;
        } 
        if( this.roleEditData.length > 0 ) {
         for( var i = 0; i < this.dropdownList.length; i++ ) {      
          for( var j = 0; j < this.roleEditData.length; j++ ) {
            if(this.roleEditData[j] !="PUBLIC"){
            if( this.roleEditData[j] == this.dropdownList[i].itemName ) {
                    this.selectedItems.push({"id" :this.dropdownList[i].id,"itemName":this.dropdownList[i].itemName});
               } 
             }   
           }
         }
       } 
  }, (err) => {
    console.log(err);
  
  });

      
  }
  /**
   * This method used for add org button form submit 
	 */
  addOrgFormSubmit()
  {
    this.findePublic=false; 
    this.roleDataArr=[];
    this.gridOrgUserId=this.addOrgForm.value['gridOrgUserId']
    this.addOrgId=this.addOrgForm.value['addOrgname']
    this.onchangeaddOrgName=this.addOrgId.split("/");
    this.onchangeaddOrgId = this.onchangeaddOrgName[1]
    this.selectedItems.forEach(element => {
      this.roleDataArr.push(element.itemName)
       });
       console.log(this.roleDataArr)
      if( this.roleDataArr.length > 0 ) {
         for( var i = 0; i < this.dropdownList.length; i++ ) {            
            if(this.roleDataArr[i] =="PUBLIC"){
             this.findePublic=true;           
             }        
         }
       }
       if(this.findePublic==false)
       {
        this.roleDataArr.push("PUBLIC"); 
       }
       console.log("public  role")
       console.log(this.roleDataArr)
       
    let addOrgtempArray : any
    addOrgtempArray =
    {
      "request": {
        "organisationId": this.onchangeaddOrgId,
        "roles": this.roleDataArr,
        "userId": this.gridOrgUserId
      }
    }
console.log( addOrgtempArray);
//return;
    this._httpService.addroleSubRootOrganization(addOrgtempArray).subscribe(res=>{ 
      this.addOrgPopup = false        
      this.sucesErrorPopup=true      
      this.popupMsg=res.result.response;
      //this.populateUserProfile();
   },err=>{
    this.popupMsg=err.params.errmsg;
   console.log(err)
   })

  }

  /**
   * This method used for fetch org detail
	 */
  addOrg(gridOrgUserId:any)
  {
    this.gridOrgUserId=gridOrgUserId;
    this.selectedItems=[];
    this.selectedItems = [
      {"id":1,"itemName":"PUBLIC"}   
  ];
    this._httpService.getEditUserById(gridOrgUserId).subscribe(res=>{    
      console.log(res)  
      this.orgEditeUserData=res.result.response;  
      if(this.orgEditeUserData.organisations.length == 1)
    {
      this.addOrgPopup = true
      this.rootAdminOrgList();
     this.roleEditData=this.orgEditeUserData.organisations[0].roles;
     this.addRoleorgId = this.orgEditeUserData.organisations[0].organisationId;
     this.addorgSelectName=this.orgEditeUserData.organisations[0].orgName+'/'+this.orgEditeUserData.organisations[0].organisationId+'/'+true;
    this.getUserOrgList(this.orgEditeUserData.channel)
    }                              
    else if(this.orgEditeUserData.organisations.length >1)
    {
      this.addOrgPopup = true
      this.subRootAdminOrgList();
     this.roleEditData= this.orgEditeUserData.organisations[1].roles;
     this.addRoleorgId =  this.orgEditeUserData.organisations[1].organisationId;
     //this.addorgSelectName=this.orgEditeUserData.organisations[1].orgName+'/'+this.orgEditeUserData.organisations[1].organisationId+'/'+false;
    }
    }, (err) => {
      console.log(err);
    });
    
    // if( this.roleEditData.length > 0 ) {
    //   for( var i = 0; i < this.dropdownList.length; i++ ) {      
    //    for( var j = 0; j < this.roleEditData.length; j++ ) {
    //      if(this.roleEditData[j] !="PUBLIC"){
    //      if( this.roleEditData[j] == this.dropdownList[i].itemName ) {
    //              this.selectedItems.push({"id" :this.dropdownList[i].id,"itemName":this.dropdownList[i].itemName});
    //         } 
    //       }   
    //     }
    //   }
    // }
  }
  
  blockState(userIds:any,blockId:any){
    console.log("--popup data--"+userIds+'---'+blockId)
    this.blockUserid=userIds;
    this.blockId=blockId;
    this.confirmPopup=true;
    if(blockId==1)
    {
    this.confirmPopupMsg="Are you sure you want to block the user";
    }
    if(blockId==0)
    {
      this.confirmPopupMsg="Are you sure you want to Unblock the user";
    }
  }
  blockConfirmState()
  {
    this.confirmPopup=false;
   this.blockUserid = this.confirmUserForm.value['blockUserid']
   this.blockId = this.confirmUserForm.value['blockid']
   if(this.blockId==1)
   {
       this.userBlock( this.blockUserid);
   }
   if(this.blockId==0)
   {
       this.userUnBlock( this.blockUserid);
   }
  }
  /**
   * This method used for user block
	 */
  userBlock(userIds:any)
  {
   // this.confirmPopup=false;
    console.log(userIds);
    let tempArray : any
    tempArray= {
    "request": {
      "userId": userIds
      }
    }
    console.log(tempArray)
    this._httpService.userBlock(tempArray).subscribe(res=>{
      console.log("block  file");
      if(res.result.response=='SUCCESS')
      {
        this.populateUserProfile();
      }
      console.log(res);
     },err=>{
     console.log(err)
     this.sucesErrorPopup=true 
     this.popupMsg="User registration is incomplete and is already inactive..";
     })
    
  }
  /**
   * This method used for user unblock
	 */
  userUnBlock(userIds:any)
  {
   // this.confirmPopup=false;
    console.log(userIds);
    let tempArray : any
    tempArray= {
    "request": {
      "userId": userIds
      }
    }
    console.log(tempArray)
    this._httpService.userUnBlock(tempArray).subscribe(res=>{
      console.log("Unblock  file");
      console.log(res);

      if(res.result.response=='SUCCESS')
      {
        this.populateUserProfile();
      }
     },err=>{
     console.log(err)
     this.populateUserProfile();
     })
  }
  show()
  {
    this.selectedItems=[];
    this.selectedItems = [
      {"id":1,"itemName":"PUBLIC"}   
  ];
    this.addUserPopup=false
    this.addUserPopup=true
    this.addRolePopup = false
    this.addOrgPopup = false
  }
  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
  
  ngAfterViewInit () {
    setTimeout(() => {
      this.telemetryImpression = {
        context: {
          env: this.activatedRoute.snapshot.data.telemetry.env
        },
        edata: {
          type: this.activatedRoute.snapshot.data.telemetry.type,
          pageid: this.activatedRoute.snapshot.data.telemetry.pageid,
          uri: this.router.url,
          subtype: this.activatedRoute.snapshot.data.telemetry.subtype,
          duration: this.navigationhelperService.getPageLoadTime()
        }
      };
    });
  }
  closeOrgPopup()
  {
   
    this.checkOrgExistsPopup= false
  
  }
  closepopup()
  {
   
    this.editeUserPopup= false
    this.confirmPopup=false;
    this.addUserPopup=false 
    this.genericPopup=false  
    this.addRolePopup = false
    this.addOrgPopup = false
    this.addRoleForm.reset()
   // this.populateUserProfile();
  }
  closeSucesErrorPopup()
  {
    //location.reload();
   //this.populateUserProfile();
    this.sucesErrorPopup = false
    //this.populateUserProfile();
	 window.location.reload();
  }

///organization component code
removeOrg(orgUserId:any)
{ 
  this.removeOrgUserId=orgUserId;
  this._httpService.getEditUserById(this.removeOrgUserId).subscribe(res=>{
    console.log("---remove org data---")
    console.log(res)
    this.genericPopup=true
      if (res.result.response.organisations.length > 0) { 
        if(res.result.response.rootOrgId!=res.result.response.organisations[1].organisationId)  
        {  
        this.removeOrgUserdataAll= res.result.response.organisations[1].organisationId;
        }
        else
        {
          this.removeOrgUserdataAll= res.result.response.organisations[0].organisationId;  
        }
    } 
  }, (err) => {
    console.log(err);
  });


console.log(this.removeOrgUserdataAll)
}
removeOrgSubmit()
{
  this.removeOrgFormId=this.genericForm.value['genericId']
  let removeTempArray:any
  removeTempArray= {
    "request": {
    "organisationId": this.removeOrgFormId,
    "userId": this.genericForm.value['genericUserId']
    }
    }
    console.log(removeTempArray);
  this._httpService.removeOrg(removeTempArray).subscribe(res=>{
    console.log(res)
    this.genericPopup=false
    location.reload();
  }, (err) => {
    console.log(err);
  });

}



createRootOrgFormSubmit()
{  
  let tempArray1 : any
  tempArray1= {
    'request': {
    'query': '',
    'filters': {
    "orgName":this.createRootOrgForm.value['orgName']
    }
    }
    }
    this._httpService.orgSearch(tempArray1).subscribe(res=>{
    this.countOrgRecord = res.result.response.count;
    if(this.countOrgRecord>0)
    {
      this.checkOrgExistsPopup = true;
  
    }
    else if(this.countOrgRecord==0) {
      this.checkOrgExistsPopup = false; 


      this.userLoginDataChannel = sessionStorage.getItem("userLoginDataChannel")
      this.rootOrgId = sessionStorage.getItem("rootOrgId")
      this.randomNumber = Math.floor(Math.random() * 90000) + 10000
      //this.checkOrgExists(this.createRootOrgForm.value['orgName']);
  
        let tempArray : any
        tempArray = 
      {
        "request":{
          "orgName": this.createRootOrgForm.value['orgName'],
          "description":this.createRootOrgForm.value['description'],
          "isRootOrg": true,
          "channel": 'channel_'+this.randomNumber
        }
    
      } 
     // this.showOrgData = [];
      //this.showOrgData1 = [];
      //this.showOrgData2 = [];   
      this._httpService.createRootOrgDetailSave(tempArray).subscribe(res=>{
        console.log("ts file");
       // this.getUserProfile();
       //organisationId
     //  this.rootorganisationId =  res.result['organisationId'];
       console.log('organisationId1');
       console.log(res);
       console.log(res.result);
       console.log(res.result.organisationId);
       console.log(res.result['organisationId']);
      // console.log(this.rootOrgIdCreate);
       console.log('organisationId1');
       this.updatePatch(res.result['organisationId'])
      // this.chkUrl()
      this.contentPublishFormData(res.result['organisationId'])
      this.contentPublishFormData(res.result['organisationId'])
      this.contentRejectFormData(res.result['organisationId'])
      this.collectionPublishFormData(res.result['organisationId'])
      this.requestChangeFormCollectionData(res.result['organisationId'])
      this.collectionReviewFormData(res.result['organisationId'])
      this.collectionResourceFilterFormData(res.result['organisationId'])
      this.collectionCreateFormData(res.result['organisationId'])
      this.collectionSaveFormData(res.result['organisationId'])
      this.lessonPublishFormData(res.result['organisationId'])
      this.requestChangeFormLessonPlamData(res.result['organisationId'])
      this.lessonPlanSaveData(res.result['organisationId'])
      this.lessonPlanResourceFilterFormData(res.result['organisationId'])
      this.lessonPlanReviewFormData(res.result['organisationId'])
      this.lessonPlanCreateFormData(res.result['organisationId'])
      this.publishFormResourceData(res.result['organisationId'])
      this.userPrefrenceFormData(res.result['organisationId'])
      this.requestChangeFormResourceData(res.result['organisationId'])
      this.resourceCreateFormData(res.result['organisationId'])
      this.resourceSaveFormData(res.result['organisationId'])
      this.resourceReviewFormData(res.result['organisationId'])
      this.courseRejectCopyFormData(res.result['organisationId'])
      this.publishFormCourseData(res.result['organisationId'])
      this.courseCreateFormData(res.result['organisationId'])
      this.courseSaveFormData(res.result['organisationId'])
      this.courseUnitSaveFormData(res.result['organisationId'])
      this.courseReviewFormData(res.result['organisationId'])
      this.courseResourceFilterFormData(res.result['organisationId'])
      this.courseFilterFormData(res.result['organisationId'])
      this.questionMetaSearchFormData(res.result['organisationId'])
      this.questionFilterFormData(res.result['organisationId'])
      this.almyContentSearchFormData(res.result['organisationId'])
      this.exploreSearchFormData(res.result['organisationId'])
      this.exploreCourseFilterFormData(res.result['organisationId'])
      this.exploreCourseSearchFormData(res.result['organisationId'])
      this.librarySearchFormData(res.result['organisationId'])
    
       this.editOrgrPopup=false 
      this.addRootOrgrPopup=false
      this.addOrgrPopup=false
      this.editOrgrStatusPopup=false
      this.sucesErrorPopup=true 
      this.popupMsg=res.result.response;
      this.getUserProfileOrg()
     // location.reload()
       },err=>{
       console.log(err)
       this.popupMsg=err.params.errmsg;
       this.toasterService.error(this.resourceService.messages.emsg.m0005);
       })
      
    }
    },err=>{
    console.log(err)
    
    })



 
}


updatePatch(OrgId:any)
{  
    let tempArray : any
    tempArray = 
    {'request': {'channel': {'defaultFramework': 'nulp'}}} 
    this._httpService.updatePatch(tempArray,OrgId).subscribe(res=>{
   console.log(res);
   console.log(this.rootOrgIdCreate);
   console.log('chakshu');
    this.addOrgrPopup=false
   },err=>{
    this.toasterService.error(this.resourceService.messages.emsg.m0005);
   console.log(err)
   })
}




contentPublishFormData(rootOrgIdCreate:any)
{


  let tempArray1 : any
  tempArray1 = 
  {
    "request": {
      "framework": "*",
      "rootOrgId": rootOrgIdCreate,
          "type": "content",
          "subType": "resource",
          "action": "publish",
        "data": {
          "templateName": "defaultTemplate",
          "action": "publish",
          "fields": [
            {
              "title": "Please confirm that ALL the following items are verified (by ticking the check-boxes) before you can publish:",
              "contents": [
                {
                  "name": "Appropriateness",
                  "checkList": [
                    "No Hate speech, Abuse, Violence, Profanity",
                    "No Sexual content, Nudity or Vulgarity",
                    "No Discrimination or Defamation",
                    "Is suitable for stakeholders"
                  ]
                },
                {
                  "name": "Content details",
                  "checkList": [
                    "Appropriate Title, Description",
                    "Correct Category, Sub-Category, Topic, Language",
                    "Appropriate tags such as Resource Type, Concepts",
                    "Relevant Keywords"
                  ]
                },
                {
                  "name": "Usability",
                  "checkList": [
                    "Content plays correctly",
                    "Can see the content clearly on Desktop and App",
                    "Audio (if any) is clear and easy to understand",
                    "No Spelling mistakes in the text",
                    "Language is simple to understand"
                  ]
                }
              ]
            }
          ]
        }
      }
  }

  this._httpService.createForm(tempArray1).subscribe(res=>{
    console.log("ts file");
  
    this.addOrgrPopup=false
   
   },err=>{
    this.toasterService.error(this.resourceService.messages.emsg.m0005);
   console.log(err)
   })
}





contentRejectFormData(rootOrgIdCreate:any)
{


  let tempArray1 : any
  tempArray1 = 
  {
    "request": {
      "framework": "nulp",
      "rootOrgId": rootOrgIdCreate,
          "type": "content",
          "subType": "collection",
          "action": "publish",
        "data": {
          "templateName": "defaultTemplate",
          "action": "publish",
          "fields": [
            {
              "title": "Please confirm that ALL the following items are verified (by ticking the check-boxes) before you can publish:",
              "contents": [
                {
                  "name": "Appropriateness",
                  "checkList": [
                    "No Hate speech, Abuse, Violence, Profanity",
                    "No Sexual content, Nudity or Vulgarity",
                    "No Discrimination or Defamation",
                    "Is suitable for stakeholders"
                  ]
                },
                {
                  "name": "Content details",
                  "checkList": [
                    "Appropriate Title, Description",
                    "Correct Category, Sub-Category, Topic, Language",
                    "Appropriate tags such as Resource Type, Concepts",
                    "Relevant Keywords"
                  ]
                },
                {
                  "name": "Usability",
                  "checkList": [
                    "Content plays correctly",
                    "Can see the content clearly on Desktop and App",
                    "Audio (if any) is clear and easy to understand",
                    "No Spelling mistakes in the text",
                    "Language is simple to understand"
                  ]
                }
              ]
            }
          ]
        }
      }
  }
  this._httpService.createForm(tempArray1).subscribe(res=>{
    console.log("ts file");
  
    this.addOrgrPopup=false
   
   },err=>{
    this.toasterService.error(this.resourceService.messages.emsg.m0005);
   console.log(err)
   })
}



collectionPublishFormData(rootOrgIdCreate:any)
{


  let tempArray1 : any
  tempArray1 = 
  {
    "request": {
      "framework": "nulp",
      "rootOrgId": rootOrgIdCreate,
          "type": "content",
          "subType": "collection",
          "action": "publish",
        "data": {
          "templateName": "defaultTemplate",
          "action": "publish",
          "fields": [
            {
              "title": "Please confirm that ALL the following items are verified (by ticking the check-boxes) before you can publish:",
              "contents": [
                {
                  "name": "Appropriateness",
                  "checkList": [
                    "No Hate speech, Abuse, Violence, Profanity",
                    "No Sexual content, Nudity or Vulgarity",
                    "No Discrimination or Defamation",
                    "Is suitable for stakeholders"
                  ]
                },
                {
                  "name": "Content details",
                  "checkList": [
                    "Appropriate Title, Description",
                    "Correct Category, Sub-Category, Topic, Language",
                    "Appropriate tags such as Resource Type, Concepts",
                    "Relevant Keywords"
                  ]
                },
                {
                  "name": "Usability",
                  "checkList": [
                    "Content plays correctly",
                    "Can see the content clearly on Desktop and App",
                    "Audio (if any) is clear and easy to understand",
                    "No Spelling mistakes in the text",
                    "Language is simple to understand"
                  ]
                }
              ]
            }
          ]
        }
      }
  }
  this._httpService.createForm(tempArray1).subscribe(res=>{
    console.log("ts file");
  
    this.addOrgrPopup=false
   
   },err=>{
    this.toasterService.error(this.resourceService.messages.emsg.m0005);
   console.log(err)
   })
}


requestChangeFormCollectionData(rootOrgIdCreate:any)
{


  let tempArray1 : any
  tempArray1 = 
  {
    "request": {
      "type": "content",
              "subType": "collection",
              "action": "requestforchanges",
            
              "framework": "nulp",
              "rootOrgId": rootOrgIdCreate,
        "data": {
          "templateName": "defaultTemplate",
          "action": "requestforchanges",
        "fields": [
            {
              "title": "Please tick the reasons for requesting changes and provide detailed comments:",
              "otherReason": "Other Issue(s) (if there are any other issues, tick this and provide details in the comments box)",
              "contents": [
                {
                  "name": "Appropriateness",
                  "checkList": [
                    "No Hate speech, Abuse, Violence, Profanity",
                    "No Sexual content, Nudity or Vulgarity",
                    "No Discrimination or Defamation",
                    "Is suitable for stakeholders"
                  ]
                },
                {
                  "name": "Content details",
                  "checkList": [
                    "Appropriate Title, Description",
                    "Correct Category, Sub-Category, Topic, Language",
                    "Appropriate tags such as Resource Type, Concepts",
                    "Relevant Keywords"
                  ]
                },
                {
                  "name": "Usability",
                  "checkList": [
                    "Content plays correctly",
                    "Can see the content clearly on Desktop and App",
                    "Audio (if any) is clear and easy to understand",
                    "No Spelling mistakes in the text",
                    "Language is simple to understand"
                  ]
                }
              ]
            }
          ]
        }
      }
  }
  this._httpService.createForm(tempArray1).subscribe(res=>{
    console.log("ts file");
  
    this.addOrgrPopup=false
   
   },err=>{
   console.log(err)
   })
}



collectionReviewFormData(rootOrgIdCreate:any)
{


  let tempArray1 : any
  tempArray1 = 
  {
    "request": {
                
            "type": "content",
            "subType": "collection",
            "action": "review",
            "rootOrgId": rootOrgIdCreate,
            "framework": "nulp",
            "data": {
                "templateName": "defaultTemplate",
                "action": "review",
                "fields": [
                                    
                          {
                            "code": "appicon",
                            "dataType": "url",
                            "description": "App Icon",
                            "editable": true,
                            "index": 1,
                            "inputType": "file",
                            "label": "App Icon",
                            "name": "App Icon",
                            "placeholder": "App Icon",
                            "renderingHints": {},
                            "required": false,
                            "visible": true
                        },
                        {
                            "code": "name",
                            "dataType": "text",
                            "description": "Title of the content",
                            "editable": true,
                            "index": 2,
                            "inputType": "text",
                            "label": "Title",
                            "name": "Title",
                            "placeholder": "Enter Title For Book",
                            "renderingHints": {},
                            "required": true,
                            "visible": true
                        },
                        {
                            "code": "description",
                            "dataType": "text",
                            "description": "Brief description",
                            "editable": true,
                            "index": 3,
                            "inputType": "textarea",
                            "label": "Description",
                            "name": "Description",
                            "placeholder": "Brief description about the Book",
                            "renderingHints": {},
                            "required": false,
                            "visible": true
                        },
                        {
                            "code": "keywords",
                            "dataType": "list",
                            "description": "Keywords for the content",
                            "editable": true,
                            "index": 4,
                            "inputType": "keywordsuggestion",
                            "label": "keywords",
                            "name": "Keywords",
                            "placeholder": "Enter Keywords",
                            "required": false,
                            "visible": true
                        },
                       {
                            "code": "board",
                            "dataType": "text",
                            "description": "Category",
                            "editable": true,
                            "index": 5,
                            "inputType": "select",
                            "label": "Category",
                            "name": "Category",
                            "placeholder": "Select Category",
                            "renderingHints": {},
                            "required": true,
                            "visible": true,
                             "depends": [
                                "gradeLevel"
                            ]
                        },
    
                         {
                            "code": "gradeLevel",
                            "dataType": "list",
                            "description": "Sub-Category",
                            "editable": true,
                            "index": 6,
                            "inputType": "select",
                            "label": "Sub-Category",
                            "name": "Sub-Category",
                            "placeholder": "Select Sub-Category",
                            "renderingHints": {},
                            "required": true,
                            "visible": true
                        },
                       
                        {
                            "code": "subject",
                            "dataType": "text",
                            "description": "Topic",
                            "editable": true,
                            "index": 7,
                            "inputType": "select",
                            "label": "Topic",
                            "name": "Topic",
                            "placeholder": "Select Topic",
                            "renderingHints": {},
                            "required": true,
                            "visible": true
                        },
    
                        {
                            "code": "medium",
                            "dataType": "text",
                            "description": "Language",
                            "editable": true,
                            "index": 8,
                            "inputType": "select",
                            "label": "Language",
                            "name": "Language",
                            "placeholder": "Select Language",
                            "renderingHints": {},
                            "required": false,
                            "visible": true
                        },
                                           
                       
                        
                        {
                            "code": "attributions",
                            "dataType": "list",
                            "description": "Attributions",
                            "editable": true,
                            "index": 8,
                            "inputType": "text",
                            "label": "Attributions",
                            "name": "attribution",
                            "placeholder": "",
                            "renderingHints": {},
                            "required": false,
                            "visible": true
                        }
                ]
            }
        }
    }
    
    this._httpService.createForm(tempArray1).subscribe(res=>{
    console.log("ts file");
  
    this.addOrgrPopup=false
   
   },err=>{
   console.log(err)
   })
}



collectionResourceFilterFormData(rootOrgIdCreate:any)
{


  let tempArray1 : any
  tempArray1 = 
  {
    "request": {
                
            "type": "content",
            "subType": "collection",
            "action": "resource-filters",
            "rootOrgId": rootOrgIdCreate,
            "framework": "nulp",
            "data": {
                "templateName": "defaultTemplate",
                    "action": "resource-filters",
                    "fields": [
                        {
                            "code": "name",
                            "dataType": "text",
                            "name": "Name",
                            "lable": "Name",
                            "label": "Name",
                            "description": "Name",
                            "editable": true,
                            "placeholder": "Name",
                            "inputType": "text",
                            "required": false,
                            "displayProperty": "Editable",
                            "visible": true,
                            "renderingHints": {
                                "semanticColumnWidth": "twelve"
                            },
                            "index": 1
                        },
                        {
                            "code": "description",
                            "dataType": "text",
                            "description": "Brief description",
                            "editable": true,
                            "index": 2,
                            "inputType": "textarea",
                            "label": "Description",
                            "name": "Description",
                            "placeholder": "Brief description about the Book",
                            "renderingHints": {},
                            "required": false,
                            "visible": true
                        }
                    ]
            }
        }
    }
    
    
    this._httpService.createForm(tempArray1).subscribe(res=>{
    console.log("ts file");
  
    this.addOrgrPopup=false
   
   },err=>{
   console.log(err)
   })
}



collectionCreateFormData(rootOrgIdCreate:any)
{


  let tempArray1 : any
  tempArray1 = 
  {
    "request": {
                
           "type": "content",
                "subType": "collection",
                "action": "create",
                "rootOrgId": rootOrgIdCreate,
                "framework": "nulp",
                "data": {
                    "templateName": "defaultTemplate",
                    "action": "create",
                    "fields": [
                        {
                            "code": "name",
                            "dataType": "text",
                            "name": "Name",
                            "lable": "Name",
                            "label":"Name",
                            "description": "Name",
                            "editable": true,
                            "placeholder": "Name",
                            "inputType": "text",
                            "required": false,
                            "displayProperty": "Editable",
                            "visible": true,
                            "renderingHints": {
                                "semanticColumnWidth": "twelve"
                            },
                            "index": 1
                        },
                        {
                            "code": "description",
                            "dataType": "text",
                            "description": "Brief description",
                            "editable": true,
                            "index": 2,
                            "inputType": "textarea",
                            "label": "Description",
                            "name": "Description",
                            "placeholder": "Brief description about the Book",
                            "renderingHints": {},
                            "required": false,
                            "visible": true
                        }
                        
                        
                ]
            }
        }
    }
    
    
    this._httpService.createForm(tempArray1).subscribe(res=>{
    console.log("ts file");
  
    this.addOrgrPopup=false
   
   },err=>{
   console.log(err)
   })
}


collectionSaveFormData(rootOrgIdCreate:any)
{


  let tempArray1 : any
  tempArray1 = 
  {
    "request": {
                
            "type": "content",
            "subType": "collection",
            "action": "save",
            "rootOrgId": rootOrgIdCreate,
            "framework" :"nulp",
            "data": {
                "templateName": "defaultTemplate",
                "action": "save",
                "fields": [
                        {
                            "code": "appicon",
                            "dataType": "url",
                            "description": "App Icon",
                            "editable": true,
                            "index": 1,
                            "inputType": "file",
                            "label": "App Icon",
                            "name": "App Icon",
                            "placeholder": "App Icon",
                            "renderingHints": {},
                            "required": false,
                            "visible": true
                        },
                        {
                            "code": "name",
                            "dataType": "text",
                            "description": "Title of the content",
                            "editable": true,
                            "index": 2,
                            "inputType": "text",
                            "label": "Title",
                            "name": "name",
                            "placeholder": "Enter Title For Collection",
                            "renderingHints": {},
                            "required": true,
                            "visible": true
                        },
                        {
                            "code": "description",
                            "dataType": "text",
                            "description": "Brief description",
                            "editable": true,
                            "index": 3,
                            "inputType": "textarea",
                            "label": "Description",
                            "name": "Description",
                            "placeholder": "Brief description about the Collection",
                            "renderingHints": {},
                            "required": false,
                            "visible": true
                        },
                        {
                            "code": "keywords",
                            "dataType": "list",
                            "description": "Keywords for the content",
                            "editable": true,
                            "index": 4,
                            "inputType": "keywordsuggestion",
                            "label": "keywords",
                            "name": "Keywords",
                            "placeholder": "Enter Keywords",
                            "required": false,
                            "visible": true
                        },
                         {
                            "code": "board",
                            "dataType": "text",
                            "description": "Category",
                            "editable": true,
                            "index": 5,
                            "inputType": "select",
                            "label": "Category",
                            "name": "Category",
                            "placeholder": "Select Category",
                            "renderingHints": {},
                            "required": false,
                            "visible": true,
                             "depends": [
                                "gradeLevel"
                            ]
                        },
                         {
                            "code": "gradeLevel",
                            "dataType": "list",
                            "description": "Sub-Category",
                            "editable": true,
                            "index": 6,
                            "inputType": "select",
                            "label": "Sub-Category",
                            "name": "Sub-Category",
                            "placeholder": "Select Sub-Category",
                            "renderingHints": {},
                            "required": false,
                            "visible": true
                        },
                        {
                            "code": "subject",
                            "dataType": "list",
                            "description": "Topic",
                            "editable": true,
                            "index": 7,
                            "inputType": "select",
                            "label": "Topic",
                            "name": "Topic",
                            "placeholder": "Select Topic",
                            "renderingHints": {},
                            "required": false,
                            "visible": true
                        },
    
                      
                         {
                            "code": "medium",
                            "dataType": "list",
                            "description": "Language",
                            "editable": true,
                            "index": 8,
                            "inputType": "select",
                            "label": "Language",
                            "name": "Language",
                            "placeholder": "Select Language",
                            "renderingHints": {},
                            "required": false,
                            "visible": true
                        }
                        ,
                                           
                        {
                            "code": "attributions",
                            "dataType": "list",
                            "description": "Attributions",
                            "editable": true,
                            "index": 9,
                            "inputType": "text",
                            "label": "Attributions",
                            "name": "attribution",
                            "placeholder": "",
                            "renderingHints": {},
                            "required": false,
                            "visible": true
                        }
                     
                ]
            }
        }
    }
    
    
    this._httpService.createForm(tempArray1).subscribe(res=>{
    console.log("ts file");
  
    this.addOrgrPopup=false
   
   },err=>{
   console.log(err)
   })
}



lessonPublishFormData(rootOrgIdCreate:any)
{


  let tempArray1 : any
  tempArray1 = 
  {
    "request": {
      "framework": "nulp",
      "rootOrgId": rootOrgIdCreate,
          "type": "content",
          "subType": "LessonPlan",
          "action": "publish",
        "data": {
          "templateName": "defaultTemplate",
          "action": "publish",
          "fields": [
            {
              "title": "Please confirm that ALL the following items are verified (by ticking the check-boxes) before you can publish:",
              "contents": [
                {
                  "name": "Appropriateness",
                  "checkList": [
                    "No Hate speech, Abuse, Violence, Profanity",
                    "No Sexual content, Nudity or Vulgarity",
                    "No Discrimination or Defamation",
                    "Is suitable for stakeholders"
                  ]
                },
                {
                  "name": "Content details",
                  "checkList": [
                    "Appropriate Title, Description",
                    "Correct Category, Sub-Category, Topic, Language",
                    "Appropriate tags such as Resource Type, Concepts",
                    "Relevant Keywords"
                  ]
                },
                {
                  "name": "Usability",
                  "checkList": [
                    "Content plays correctly",
                    "Can see the content clearly on Desktop and App",
                    "Audio (if any) is clear and easy to understand",
                    "No Spelling mistakes in the text",
                    "Language is simple to understand"
                  ]
                }
              ]
            }
          ]
        }
      }
  }
    
    
  this._httpService.createForm(tempArray1).subscribe(res=>{
    console.log("ts file");
  
    this.addOrgrPopup=false
   
   },err=>{
   console.log(err)
   })
}



requestChangeFormLessonPlamData(rootOrgIdCreate:any)
{


  let tempArray1 : any
  tempArray1 = 
  {
    "request": {
      "type": "content",
              "subType": "LessonPlan",
              "action": "requestforchanges",
            
              "framework": "nulp",
              "rootOrgId": rootOrgIdCreate,
        "data": {
          "templateName": "defaultTemplate",
          "action": "requestforchanges",
        "fields": [
            {
              "title": "Please tick the reasons for requesting changes and provide detailed comments:",
              "otherReason": "Other Issue(s) (if there are any other issues, tick this and provide details in the comments box)",
              "contents": [
                {
                  "name": "Appropriateness",
                  "checkList": [
                    "No Hate speech, Abuse, Violence, Profanity",
                    "No Sexual content, Nudity or Vulgarity",
                    "No Discrimination or Defamation",
                    "Is suitable for stakeholders"
                  ]
                },
                {
                  "name": "Content details",
                  "checkList": [
                    "Appropriate Title, Description",
                    "Correct Category, Sub-Category, Topic, Language",
                    "Appropriate tags such as Resource Type, Concepts",
                    "Relevant Keywords"
                  ]
                },
                {
                  "name": "Usability",
                  "checkList": [
                    "Content plays correctly",
                    "Can see the content clearly on Desktop and App",
                    "Audio (if any) is clear and easy to understand",
                    "No Spelling mistakes in the text",
                    "Language is simple to understand"
                  ]
                }
              ]
            }
          ]
        }
      }
  }
    
    
  this._httpService.createForm(tempArray1).subscribe(res=>{
    console.log("ts file");
  
    this.addOrgrPopup=false
   
   },err=>{
   console.log(err)
   })
}





lessonPlanSaveData(rootOrgIdCreate:any)
{


  let tempArray1 : any
  tempArray1 = 
  {
    "request": {
                
            "type": "content",
            "subType": "lessonplan",
            "action": "save",
            "rootOrgId": rootOrgIdCreate,
            "framework" :"nulp",
            "data": {
                "templateName": "defaultTemplate",
                "action": "save",
                "fields": [
                           {
                            "code": "appicon",
                            "dataType": "url",
                            "description": "App Icon",
                            "editable": true,
                            "index": 1,
                            "inputType": "file",
                            "label": "App Icon",
                            "name": "App Icon",
                            "placeholder": "App Icon",
                            "renderingHints": {},
                            "required": false,
                            "visible": true
                        },
                        {
                            "code": "name",
                            "dataType": "text",
                            "description": "Title of the content",
                            "editable": true,
                            "index": 2,
                            "inputType": "text",
                            "label": "Title",
                            "name": "Title",
                            "placeholder": "Enter Title For Book",
                            "renderingHints": {},
                            "required": false,
                            "visible": true
                        },
                        {
                            "code": "description",
                            "dataType": "text",
                            "description": "Brief description",
                            "editable": true,
                            "index": 3,
                            "inputType": "textarea",
                            "label": "Description",
                            "name": "Description",
                            "placeholder": "Brief description about the Book",
                            "renderingHints": {},
                            "required": false,
                            "visible": true
                        },
                        {
                            "code": "keywords",
                            "dataType": "list",
                            "description": "Keywords for the content",
                            "editable": true,
                            "index": 4,
                            "inputType": "keywordsuggestion",
                            "label": "keywords",
                            "name": "Keywords",
                            "placeholder": "Enter Keywords",
                            "required": false,
                            "visible": true
                        },
                        {
                            "code": "board",
                            "dataType": "text",
                            "description": "Category",
                            "editable": true,
                            "index": 5,
                            "inputType": "select",
                            "label": "Category",
                            "name": "Category",
                            "placeholder": "Select Category",
                            "renderingHints": {},
                            "required": false,
                            "visible": true,
                             "depends": [
                                "gradeLevel"
                            ]
                        },
    
                         {
                            "code": "gradeLevel",
                            "dataType": "list",
                            "description": "Sub-Category",
                            "editable": true,
                            "index": 6,
                            "inputType": "select",
                            "label": "Sub-Category",
                            "name": "Sub-Category",
                            "placeholder": "Select Sub-Category",
                            "renderingHints": {},
                            "required": false,
                            "visible": true
                        },
                       
                        {
                            "code": "subject",
                            "dataType": "list",
                            "description": "Topic",
                            "editable": true,
                            "index": 7,
                            "inputType": "select",
                            "label": "Topic",
                            "name": "Topic",
                            "placeholder": "Select Topic",
                            "renderingHints": {},
                            "required": false,
                            "visible": true
                        },
    
                        {
                            "code": "medium",
                            "dataType": "list",
                            "description": "Language",
                            "editable": true,
                            "index": 8,
                            "inputType": "select",
                            "label": "Language",
                            "name": "Langauge",
                            "placeholder": "Select Language",
                            "renderingHints": {},
                            "required": false,
                            "visible": true
                        },
                                           
                       
                        {
                            "code": "attributions",
                            "dataType": "list",
                            "description": "Attributions",
                            "editable": true,
                            "index": 8,
                            "inputType": "text",
                            "label": "Attributions",
                            "name": "attribution",
                            "placeholder": "",
                            "renderingHints": {},
                            "required": false,
                            "visible": true
                        }
                ]
            }
        }
    }
    
    
    
    this._httpService.createForm(tempArray1).subscribe(res=>{
    console.log("ts file");
  
    this.addOrgrPopup=false
   
   },err=>{
   console.log(err)
   })
}



lessonPlanResourceFilterFormData(rootOrgIdCreate:any)
{


  let tempArray1 : any
  tempArray1 = 
  {
    "request": {
                
            "type": "content",
            "subType": "lessonplan",
            "action": "resource-filters",
            "rootOrgId": rootOrgIdCreate,
            "framework": "nulp",
            "data": {
                "templateName": "defaultTemplate",
                    "action": "resource-filters",
                    "fields": [
                        {
                            "code": "name",
                            "dataType": "text",
                            "name": "Name",
                            "lable": "Name",
                            "label": "Name",
                            "description": "Name",
                            "editable": true,
                            "placeholder": "Name",
                            "inputType": "text",
                            "required": false,
                            "displayProperty": "Editable",
                            "visible": true,
                            "renderingHints": {
                                "semanticColumnWidth": "twelve"
                            },
                            "index": 1
                        },
                        {
                            "code": "description",
                            "dataType": "text",
                            "description": "Brief description",
                            "editable": true,
                            "index": 2,
                            "inputType": "textarea",
                            "label": "Description",
                            "name": "Description",
                            "placeholder": "Brief description about the Book",
                            "renderingHints": {},
                            "required": false,
                            "visible": true
                        }
                    ]
            }
        }
    }
    
    
    this._httpService.createForm(tempArray1).subscribe(res=>{
    console.log("ts file");
  
    this.addOrgrPopup=false
   
   },err=>{
   console.log(err)
   })
}



lessonPlanReviewFormData(rootOrgIdCreate:any)
{


  let tempArray1 : any
  tempArray1 = 
  {
    "request": {
                
            "type": "content",
            "subType": "lessonplan",
            "action": "review",
            "rootOrgId": rootOrgIdCreate,
            "framework": "nulp",
            "data": {
                "templateName": "defaultTemplate",
                "action": "review",
                "fields": [
                                    
                          {
                            "code": "appicon",
                            "dataType": "url",
                            "description": "App Icon",
                            "editable": true,
                            "index": 1,
                            "inputType": "file",
                            "label": "App Icon",
                            "name": "App Icon",
                            "placeholder": "App Icon",
                            "renderingHints": {},
                            "required": false,
                            "visible": true
                        },
                        {
                            "code": "name",
                            "dataType": "text",
                            "description": "Title of the content",
                            "editable": true,
                            "index": 2,
                            "inputType": "text",
                            "label": "Title",
                            "name": "Title",
                            "placeholder": "Enter Title For Book",
                            "renderingHints": {},
                            "required": true,
                            "visible": true
                        },
                        {
                            "code": "description",
                            "dataType": "text",
                            "description": "Brief description",
                            "editable": true,
                            "index": 3,
                            "inputType": "textarea",
                            "label": "Description",
                            "name": "Description",
                            "placeholder": "Brief description about the Book",
                            "renderingHints": {},
                            "required": false,
                            "visible": true
                        },
                        {
                            "code": "keywords",
                            "dataType": "list",
                            "description": "Keywords for the content",
                            "editable": true,
                            "index": 4,
                            "inputType": "keywordsuggestion",
                            "label": "keywords",
                            "name": "Keywords",
                            "placeholder": "Enter Keywords",
                            "required": false,
                            "visible": true
                        },
                       {
                            "code": "board",
                            "dataType": "text",
                            "description": "Category",
                            "editable": true,
                            "index": 5,
                            "inputType": "select",
                            "label": "Category",
                            "name": "Category",
                            "placeholder": "Select Category",
                            "renderingHints": {},
                            "required": true,
                            "visible": true,
                             "depends": [
                                "gradeLevel"
                            ]
                        },
    
                         {
                            "code": "gradeLevel",
                            "dataType": "list",
                            "description": "Sub-Category",
                            "editable": true,
                            "index": 6,
                            "inputType": "select",
                            "label": "Sub-Category",
                            "name": "Sub-Category",
                            "placeholder": "Select Sub-Category",
                            "renderingHints": {},
                            "required": true,
                            "visible": true
                        },
                       
                        {
                            "code": "subject",
                            "dataType": "text",
                            "description": "Topic",
                            "editable": true,
                            "index": 7,
                            "inputType": "select",
                            "label": "Topic",
                            "name": "Topic",
                            "placeholder": "Select Topic",
                            "renderingHints": {},
                            "required": true,
                            "visible": true
                        },
    
                        {
                            "code": "medium",
                            "dataType": "text",
                            "description": "Language",
                            "editable": true,
                            "index": 8,
                            "inputType": "select",
                            "label": "Language",
                            "name": "Language",
                            "placeholder": "Select Language",
                            "renderingHints": {},
                            "required": false,
                            "visible": true
                        },
                                           
                       
                        
                        {
                            "code": "attributions",
                            "dataType": "list",
                            "description": "Attributions",
                            "editable": true,
                            "index": 8,
                            "inputType": "text",
                            "label": "Attributions",
                            "name": "attribution",
                            "placeholder": "",
                            "renderingHints": {},
                            "required": false,
                            "visible": true
                        }
                ]
            }
        }
    }
    
    
    
    this._httpService.createForm(tempArray1).subscribe(res=>{
    console.log("ts file");
  
    this.addOrgrPopup=false
   
   },err=>{
   console.log(err)
   })
}



lessonPlanCreateFormData(rootOrgIdCreate:any)
{


  let tempArray1 : any
  tempArray1 = 
  {
    "request": {
                
           "type": "content",
                "subType": "lessonplan",
                "action": "create",
                "rootOrgId":rootOrgIdCreate,
                "framework": "nulp",
                "data": {
                    "templateName": "defaultTemplate",
                    "action": "create",
                    "fields": [
                        {
                            "code": "name",
                            "dataType": "text",
                            "name": "Name",
                            "lable": "Name",
                            "label":"Name",
                            "description": "Name",
                            "editable": true,
                            "placeholder": "Name",
                            "inputType": "text",
                            "required": false,
                            "displayProperty": "Editable",
                            "visible": true,
                            "renderingHints": {
                                "semanticColumnWidth": "twelve"
                            },
                            "index": 1
                        },
                        {
                            "code": "description",
                            "dataType": "text",
                            "description": "Brief description",
                            "editable": true,
                            "index": 2,
                            "inputType": "textarea",
                            "label": "Description",
                            "name": "Description",
                            "placeholder": "Brief description about the Book",
                            "renderingHints": {},
                            "required": false,
                            "visible": true
                        }
                        
                ]
            }
        }
    }
    
    
    this._httpService.createForm(tempArray1).subscribe(res=>{
    console.log("ts file");
  
    this.addOrgrPopup=false
   
   },err=>{
   console.log(err)
   })
}



publishFormResourceData(rootOrgIdCreate:any)
{


  let tempArray1 : any
  tempArray1 = 
  {
    "request": {
      "type": "content",
              "subType": "resource",
              "action": "publish",
            
              "framework": "nulp",
              "rootOrgId": rootOrgIdCreate,
        "data": {
          "templateName": "defaultTemplate",
          "action": "publish",
        "fields": [
            {
              "title": "Please confirm that ALL the following items are verified (by ticking the check-boxes) before you can publish:",
              "contents": [
                {
                  "name": "Appropriateness",
                  "checkList": [
                    "No Hate speech, Abuse, Violence, Profanity",
                    "No Sexual content, Nudity or Vulgarity",
                    "No Discrimination or Defamation",
                    "Is suitable for stakeholders"
                  ]
                },
                {
                  "name": "Content details",
                  "checkList": [
                    "Appropriate Title, Description",
                    "Correct Category, Sub-Category, Topic, Language",
                    "Appropriate tags such as Resource Type, Concepts",
                    "Relevant Keywords"
                  ]
                },
                {
                  "name": "Usability",
                  "checkList": [
                    "Content plays correctly",
                    "Can see the content clearly on Desktop and App",
                    "Audio (if any) is clear and easy to understand",
                    "No Spelling mistakes in the text",
                    "Language is simple to understand"
                  ]
                }
              ]
            }
          ]
        }
      }
  }
    
    
  this._httpService.createForm(tempArray1).subscribe(res=>{
    console.log("ts file");
  
    this.addOrgrPopup=false
   
   },err=>{
   console.log(err)
   })
}




userPrefrenceFormData(rootOrgIdCreate:any)
{


  let tempArray1 : any
  tempArray1 = 
  {
 
    "request": {
            "type": "user",
            "subType": "framework",
            "action": "update",
            "framework": "nulp",
             "rootOrgId": "*",
            "data": {
                "templateName": "defaultTemplate",
                "action": "update",
                "fields": [
                    {
                        "code": "board",
                        "dataType": "text",
                        "description": "Rank",
                        "editable": true,
                        "index": 1,
                        "inputType": "select",
                        "label": "Rank",
                        "name": "Rank",
                        "placeholder": "Select Rank",
                        "renderingHints": {},
                        "required": false,
                        "visible": true
                    },
                                        {
                        "code": "subject",
                        "dataType": "list",
                        "description": "Topic",
                        "editable": true,
                        "index": 2,
                        "inputType": "select",
                        "label": "Topic",
                        "name": "Topic",
                        "placeholder": "Select Topic",
                        "renderingHints": {},
                        "required": false,
                        "visible": true
                    },
                    {
                        "code": "medium",
                        "dataType": "list",
                        "description": "Language",
                        "editable": true,
                        "index": 3,
                        "inputType": "select",
                        "label": "Language",
                        "name": "Language",
                        "placeholder": "Select Language",
                        "renderingHints": {},
                        "required": false,
                        "visible": true
                    },
                    {
                      "code": "gradeLevel",
              "dataType": "list",
              "description": "Sub-Category",
              "editable": true,
              "index": 4,
              "inputType": "select",
              "label": "Sub-Category",
              "name": "Sub-Category",
              "placeholder": "Select Sub-Category",
              "renderingHints": {},
              "required": false,
              "visible": true
                    }
                ]
            }
            
           
        }
    }
    
    
    this._httpService.createForm(tempArray1).subscribe(res=>{
    console.log("ts file");
  
    this.addOrgrPopup=false
   
   },err=>{
   console.log(err)
   })
}



requestChangeFormResourceData(rootOrgIdCreate:any)
{


  let tempArray1 : any
  tempArray1 = 
  {
    "request": {
      "type": "content",
              "subType": "resource",
              "action": "requestforchanges",
            
              "framework": "*",
              "rootOrgId": rootOrgIdCreate,
        "data": {
          "templateName": "defaultTemplate",
          "action": "requestforchanges",
        "fields": [
            {
              "title": "Please tick the reasons for requesting changes and provide detailed comments:",
              "otherReason": "Other Issue(s) (if there are any other issues, tick this and provide details in the comments box)",
              "contents": [
                {
                  "name": "Appropriateness",
                  "checkList": [
                    "No Hate speech, Abuse, Violence, Profanity",
                    "No Sexual content, Nudity or Vulgarity",
                    "No Discrimination or Defamation",
                    "Is suitable for stakeholders"
                  ]
                },
                {
                  "name": "Content details",
                  "checkList": [
                    "Appropriate Title, Description",
                    "Correct Category, Sub-Category, Topic, Language",
                    "Appropriate tags such as Resource Type, Concepts",
                    "Relevant Keywords"
                  ]
                },
                {
                  "name": "Usability",
                  "checkList": [
                    "Content plays correctly",
                    "Can see the content clearly on Desktop and App",
                    "Audio (if any) is clear and easy to understand",
                    "No Spelling mistakes in the text",
                    "Language is simple to understand"
                  ]
                }
              ]
            }
          ]
        }
      }
  }
    
  this._httpService.createForm(tempArray1).subscribe(res=>{
    console.log("ts file");
  
    this.addOrgrPopup=false
   
   },err=>{
   console.log(err)
   })
}



resourceCreateFormData(rootOrgIdCreate:any)
{


  let tempArray1 : any
  tempArray1 = 
  {
    "request": {
                
           "type": "content",
                "subType": "resource",
                "action": "create",
                "rootOrgId": rootOrgIdCreate,
                "framework": "nulp",
                "data": {
                    "templateName": "defaultTemplate",
                    "action": "create",
                    "fields": [
                        {
                            "code": "name",
                            "dataType": "text",
                            "name": "Name",
                            "lable": "Name",
                            "label":"Name",
                            "description": "Name",
                            "editable": true,
                            "placeholder": "Name",
                            "inputType": "text",
                            "required": false,
                            "displayProperty": "Editable",
                            "visible": true,
                            "renderingHints": {
                                "semanticColumnWidth": "twelve"
                            },
                            "index": 1
                        },
                        {
                            "code": "description",
                            "dataType": "text",
                            "description": "Brief description",
                            "editable": true,
                            "index": 2,
                            "inputType": "textarea",
                            "label": "Description",
                            "name": "Description",
                            "placeholder": "Brief description about the Book",
                            "renderingHints": {},
                            "required": false,
                            "visible": true
                        }
                        
                ]
            }
        }
    }
    
    
    this._httpService.createForm(tempArray1).subscribe(res=>{
    console.log("ts file");
  
    this.addOrgrPopup=false
   
   },err=>{
   console.log(err)
   })
}



resourceSaveFormData(rootOrgIdCreate:any)
{


  let tempArray1 : any
  tempArray1 = 
  {
    "request": {
                
            "type": "content",
            "subType": "resource",
            "action": "save",
            "rootOrgId": rootOrgIdCreate,
            "framework" :"nulp",
            "data": {
                "templateName": "defaultTemplate",
                "action": "save",
                "fields": [
                           {
                            "code": "appicon",
                            "dataType": "url",
                            "description": "App Icon",
                            "editable": true,
                            "index": 1,
                            "inputType": "file",
                            "label": "App Icon",
                            "name": "App Icon",
                            "placeholder": "App Icon",
                            "renderingHints": {},
                            "required": false,
                            "visible": true
                        },
                        {
                            "code": "name",
                            "dataType": "text",
                            "description": "Title of the content",
                            "editable": true,
                            "index": 2,
                            "inputType": "text",
                            "label": "Title",
                            "name": "Title",
                            "placeholder": "Enter Title For Book",
                            "renderingHints": {},
                            "required": false,
                            "visible": true
                        },
                        {
                            "code": "description",
                            "dataType": "text",
                            "description": "Brief description",
                            "editable": true,
                            "index": 3,
                            "inputType": "textarea",
                            "label": "Description",
                            "name": "Description",
                            "placeholder": "Brief description about the Book",
                            "renderingHints": {},
                            "required": false,
                            "visible": true
                        },
                        {
                            "code": "keywords",
                            "dataType": "list",
                            "description": "Keywords for the content",
                            "editable": true,
                            "index": 4,
                            "inputType": "keywordsuggestion",
                            "label": "keywords",
                            "name": "Keywords",
                            "placeholder": "Enter Keywords",
                            "required": false,
                            "visible": true
                        },
                       {
                            "code": "board",
                            "dataType": "text",
                            "description": "Category",
                            "editable": true,
                            "index": 5,
                            "inputType": "select",
                            "label": "Category",
                            "name": "Category",
                            "placeholder": "Select Category",
                            "renderingHints": {},
                            "required": false,
                            "visible": true,
                             "depends": [
                                "gradeLevel"
                            ]
                        },
                         {
                            "code": "gradeLevel",
                            "dataType": "list",
                            "description": "Sub-Category",
                            "editable": true,
                            "index": 6,
                            "inputType": "select",
                            "label": "Sub-Category",
                            "name": "Sub-Category",
                            "placeholder": "Select Sub-Category",
                            "renderingHints": {},
                            "required": false,
                            "visible": true
                        },
                        {
                            "code": "subject",
                            "dataType": "list",
                            "description": "Topic",
                            "editable": true,
                            "index": 7,
                            "inputType": "select",
                            "label": "Topic",
                            "name": "Topic",
                            "placeholder": "Select Topic",
                            "renderingHints": {},
                            "required": false,
                            "visible": true
                        },
    
                      
                         {
                            "code": "medium",
                            "dataType": "list",
                            "description": "Language",
                            "editable": true,
                            "index": 8,
                            "inputType": "select",
                            "label": "Language",
                            "name": "Language",
                            "placeholder": "Select Language",
                            "renderingHints": {},
                            "required": false,
                            "visible": true
                        },
                                           
                        {
                            "code": "attributions",
                            "dataType": "list",
                            "description": "Attributions",
                            "editable": true,
                            "index": 9,
                            "inputType": "text",
                            "label": "Attributions",
                            "name": "attribution",
                            "placeholder": "",
                            "renderingHints": {},
                            "required": false,
                            "visible": true
                        }
                ]
            }
        }
    }
    
    
    
    this._httpService.createForm(tempArray1).subscribe(res=>{
    console.log("ts file");
  
    this.addOrgrPopup=false
   
   },err=>{
   console.log(err)
   })
}



resourceReviewFormData(rootOrgIdCreate:any)
{


  let tempArray1 : any
  tempArray1 = 
  {
    "request": {
                
            "type": "content",
            "subType": "resource",
            "action": "review",
            "rootOrgId": rootOrgIdCreate,
            "framework" :"nulp",
            "data": {
                "templateName": "defaultTemplate",
                "action": "review",
                "fields": [
                           {
                            "code": "appicon",
                            "dataType": "url",
                            "description": "App Icon",
                            "editable": true,
                            "index": 1,
                            "inputType": "file",
                            "label": "App Icon",
                            "name": "App Icon",
                            "placeholder": "App Icon",
                            "renderingHints": {},
                            "required": false,
                            "visible": true
                        },
                        {
                            "code": "name",
                            "dataType": "text",
                            "description": "Title of the content",
                            "editable": true,
                            "index": 2,
                            "inputType": "text",
                            "label": "Title",
                            "name": "Title",
                            "placeholder": "Enter Title For Book",
                            "renderingHints": {},
                            "required": false,
                            "visible": true
                        },
                        {
                            "code": "description",
                            "dataType": "text",
                            "description": "Brief description",
                            "editable": true,
                            "index": 3,
                            "inputType": "textarea",
                            "label": "Description",
                            "name": "Description",
                            "placeholder": "Brief description about the Book",
                            "renderingHints": {},
                            "required": false,
                            "visible": true
                        },
                        {
                            "code": "keywords",
                            "dataType": "list",
                            "description": "Keywords for the content",
                            "editable": true,
                            "index": 4,
                            "inputType": "keywordsuggestion",
                            "label": "keywords",
                            "name": "Keywords",
                            "placeholder": "Enter Keywords",
                            "required": false,
                            "visible": true
                        },
                       {
                            "code": "board",
                            "dataType": "text",
                            "description": "Category",
                            "editable": true,
                            "index": 5,
                            "inputType": "select",
                            "label": "Category",
                            "name": "Category",
                            "placeholder": "Select Category",
                            "renderingHints": {},
                            "required": false,
                            "visible": true,
                             "depends": [
                                "gradeLevel"
                            ]
                        },
                         {
                            "code": "gradeLevel",
                            "dataType": "list",
                            "description": "Sub-Category",
                            "editable": true,
                            "index": 6,
                            "inputType": "select",
                            "label": "Sub-Category",
                            "name": "Sub-Category",
                            "placeholder": "Select Sub-Category",
                            "renderingHints": {},
                            "required": false,
                            "visible": true
                        },
                        {
                            "code": "subject",
                            "dataType": "list",
                            "description": "Topic",
                            "editable": true,
                            "index": 7,
                            "inputType": "select",
                            "label": "Topic",
                            "name": "Topic",
                            "placeholder": "Select Topic",
                            "renderingHints": {},
                            "required": false,
                            "visible": true
                        },
    
                      
                         {
                            "code": "medium",
                            "dataType": "list",
                            "description": "Language",
                            "editable": true,
                            "index": 8,
                            "inputType": "select",
                            "label": "Language",
                            "name": "Language",
                            "placeholder": "Select Language",
                            "renderingHints": {},
                            "required": false,
                            "visible": true
                        },
                                           
                        {
                            "code": "attributions",
                            "dataType": "list",
                            "description": "Attributions",
                            "editable": true,
                            "index": 9,
                            "inputType": "text",
                            "label": "Attributions",
                            "name": "attribution",
                            "placeholder": "",
                            "renderingHints": {},
                            "required": false,
                            "visible": true
                        }
                ]
            }
        }
    }
    
    
    this._httpService.createForm(tempArray1).subscribe(res=>{
    console.log("ts file");
  
    this.addOrgrPopup=false
   
   },err=>{
   console.log(err)
   })
}


courseRejectCopyFormData(rootOrgIdCreate:any)
{


  let tempArray1 : any
  tempArray1 = 
  {
    "request": {
      "framework": "nulp",
      "rootOrgId": rootOrgIdCreate,
          "type": "content",
          "subType": "Course",
          "action": "requestforchanges",
        "data": {
          "templateName": "defaultTemplate",
          "action": "requestforchanges",
          "fields": [
            {
             
              "title": "Please tick the reasons for requesting changes and provide detailed comments:",
              "otherReason": "Other Issue(s) (if there are any other issues, tick this and provide details in the comments box)",
              "contents": [
                {
                  "name": "Appropriateness",
                  "checkList": [
                    "No Hate speech, Abuse, Violence, Profanity",
                    "No Sexual content, Nudity or Vulgarity",
                    "No Discrimination or Defamation",
                    "Is suitable for stakeholders"
                  ]
                },
                {
                  "name": "Content details",
                  "checkList": [
                    "Appropriate Title, Description",
                    "Correct Category, Sub-Category, Topic, Language",
                    "Appropriate tags such as Resource Type, Concepts",
                    "Relevant Keywords"
                  ]
                },
                {
                  "name": "Usability",
                  "checkList": [
                    "Content plays correctly",
                    "Can see the content clearly on Desktop and App",
                    "Audio (if any) is clear and easy to understand",
                    "No Spelling mistakes in the text",
                    "Language is simple to understand"
                  ]
                }
              ]
            }
          ]
        }
      }
  }
    
    
  this._httpService.createForm(tempArray1).subscribe(res=>{
    console.log("ts file");
  
    this.addOrgrPopup=false
   
   },err=>{
   console.log(err)
   })
}




publishFormCourseData(rootOrgIdCreate:any)
{


  let tempArray1 : any
  tempArray1 = 
  {
    "request": {
      "framework": "nulp",
      "rootOrgId": rootOrgIdCreate,
          "type": "content",
          "subType": "Course",
          "action": "publish",
        "data": {
          "templateName": "defaultTemplate",
          "action": "publish",
          "fields": [
            {
              "title": "Please confirm that ALL the following items are verified (by ticking the check-boxes) before you can publish:",
              "contents": [
                {
                  "name": "Appropriateness",
                  "checkList": [
                    "No Hate speech, Abuse, Violence, Profanity",
                    "No Sexual content, Nudity or Vulgarity",
                    "No Discrimination or Defamation",
                    "Is suitable for stakeholders"
                  ]
                },
                {
                  "name": "Content details",
                  "checkList": [
                    "Appropriate Title, Description",
                    "Correct Category, Sub-Category, Topic, Language",
                    "Appropriate tags such as Resource Type, Concepts",
                    "Relevant Keywords"
                  ]
                },
                {
                  "name": "Usability",
                  "checkList": [
                    "Content plays correctly",
                    "Can see the content clearly on Desktop and App",
                    "Audio (if any) is clear and easy to understand",
                    "No Spelling mistakes in the text",
                    "Language is simple to understand"
                  ]
                }
              ]
            }
          ]
        }
      }
  }
    
  this._httpService.createForm(tempArray1).subscribe(res=>{
    console.log("ts file");
  
    this.addOrgrPopup=false
   
   },err=>{
   console.log(err)
   })
}



courseCreateFormData(rootOrgIdCreate:any)
{


  let tempArray1 : any
  tempArray1 = 
  {
    "request": {
                
           "type": "content",
                "subType": "course",
                "action": "create",
                "rootOrgId": rootOrgIdCreate,
                "framework": "nulp",
                "data": {
                    "templateName": "defaultTemplate",
                    "action": "create",
                    "fields": [
                        {
                            "code": "name",
                            "dataType": "text",
                            "name": "Name",
                            "lable": "Name",
                            "label":"Name",
                            "description": "Name",
                            "editable": true,
                            "placeholder": "Name",
                            "inputType": "text",
                            "required": false,
                            "displayProperty": "Editable",
                            "visible": true,
                            "renderingHints": {
                                "semanticColumnWidth": "twelve"
                            },
                            "index": 1
                        },
                        {
                            "code": "description",
                            "dataType": "text",
                            "description": "Brief description",
                            "editable": true,
                            "index": 2,
                            "inputType": "textarea",
                            "label": "Description",
                            "name": "Description",
                            "placeholder": "Brief description about the Book",
                            "renderingHints": {},
                            "required": false,
                            "visible": true
                        }
                        
                ]
            }
        }
    }
    
    
    this._httpService.createForm(tempArray1).subscribe(res=>{
    console.log("ts file");
  
    this.addOrgrPopup=false
   
   },err=>{
   console.log(err)
   })
}



courseSaveFormData(rootOrgIdCreate:any)
{


  let tempArray1 : any
  tempArray1 = 
  {
    "request": {
                
            "type": "content",
            "subType": "course",
            "action": "save",
            "rootOrgId": rootOrgIdCreate,
            "framework" :"nulp",
    
            "data": {
                "templateName": "defaultTemplate",
                "action": "save",
                "fields": [
                {
                            "code": "appicon",
                            "dataType": "url",
                            "description": "App Icon",
                            "editable": true,
                            "index": 1,
                            "inputType": "file",
                            "label": "App Icon",
                            "name": "App Icon",
                            "placeholder": "App Icon",
                            "renderingHints": {},
                            "required": false,
                            "visible": true
                        },
                        {
                            "code": "name",
                            "dataType": "text",
                            "description": "Title of the content",
                            "editable": true,
                            "index": 2,
                            "inputType": "text",
                            "label": "Title",
                            "name": "name",
                            "placeholder": "Enter Title For Collection",
                            "renderingHints": {},
                            "required": true,
                            "visible": true
                        },
                        {
                            "code": "description",
                            "dataType": "text",
                            "description": "Brief description",
                            "editable": true,
                            "index": 3,
                            "inputType": "textarea",
                            "label": "Description",
                            "name": "Description",
                            "placeholder": "Brief description about the Collection",
                            "renderingHints": {},
                            "required": false,
                            "visible": true
                        },
                        {
                            "code": "keywords",
                            "dataType": "list",
                            "description": "Keywords for the content",
                            "editable": true,
                            "index": 4,
                            "inputType": "keywordsuggestion",
                            "label": "keywords",
                            "name": "Keywords",
                            "placeholder": "Enter Keywords",
                            "required": false,
                            "visible": true
                        },
                         {
                            "code": "board",
                            "dataType": "text",
                            "description": "Category",
                            "editable": true,
                            "index": 5,
                            "inputType": "select",
                            "label": "Category",
                            "name": "Category",
                            "placeholder": "Select Category",
                            "renderingHints": {},
                            "required": false,
                            "visible": true,
                             "depends": [
                                "gradeLevel"
                            ]
                        },
                         {
                            "code": "gradeLevel",
                            "dataType": "list",
                            "description": "Sub-Category",
                            "editable": true,
                            "index": 6,
                            "inputType": "select",
                            "label": "Sub-Category",
                            "name": "Sub-Category",
                            "placeholder": "Select Sub-Category",
                            "renderingHints": {},
                            "required": false,
                            "visible": true
                        },
                        {
                            "code": "subject",
                            "dataType": "list",
                            "description": "Topic",
                            "editable": true,
                            "index": 7,
                            "inputType": "select",
                            "label": "Topic",
                            "name": "Topic",
                            "placeholder": "Select Topic",
                            "renderingHints": {},
                            "required": false,
                            "visible": true
                        },
    
                      
                         {
                            "code": "medium",
                            "dataType": "list",
                            "description": "Language",
                            "editable": true,
                            "index": 8,
                            "inputType": "select",
                            "label": "Language",
                            "name": "Language",
                            "placeholder": "Select Language",
                            "renderingHints": {},
                            "required": false,
                            "visible": true
                        }
                        ,
                                           
                        {
                            "code": "attributions",
                            "dataType": "list",
                            "description": "Attributions",
                            "editable": true,
                            "index": 9,
                            "inputType": "text",
                            "label": "Attributions",
                            "name": "attribution",
                            "placeholder": "",
                            "renderingHints": {},
                            "required": false,
                            "visible": true
                        }
                     
                ]
            }
        }
    }
    
    
    
    this._httpService.createForm(tempArray1).subscribe(res=>{
    console.log("ts file");
  
    this.addOrgrPopup=false
   
   },err=>{
   console.log(err)
   })
}






courseUnitSaveFormData(rootOrgIdCreate:any)
{


  let tempArray1 : any
  tempArray1 = 
  {
    "request": {
                
             "type": "content",
                "subType": "courseunit",
                "action": "unitsave",
                "framework": "nulp",
                "rootOrgId": rootOrgIdCreate,
                "data": {
                    "templateName": "unitMetaTemplate",
                    "action": "unitsave",
                    "fields": [
                        {
                            "code": "name",
                            "dataType": "text",
                            "description": "Title of the content",
                            "editable": true,
                            "index": 1,
                            "inputType": "text",
                            "label": "Title",
                            "name": "Title",
                            "placeholder": "Enter the Title ",
                            "renderingHints": {},
                            "required": true,
                            "visible": true
                        },
                        {
                            "code": "description",
                            "dataType": "text",
                            "description": "Brief description",
                            "editable": true,
                            "index": 2,
                            "inputType": "textarea",
                            "label": "Description",
                            "name": "Description",
                            "placeholder": "Description",
                            "renderingHints": {},
                            "required": false,
                            "visible": true
                        },
                        {
                            "code": "keywords",
                            "dataType": "list",
                            "description": "Keywords for the content",
                            "editable": true,
                            "index": 3,
                            "inputType": "keywordsuggestion",
                            "label": "keywords",
                            "name": "Keywords",
                            "placeholder": "Enter Keywords",
                            "required": false,
                            "visible": true
                        },
                        {
    
                "code": "topic",
    
                "dataType": "list",
    
                "description": "Choose a topic",
    
                "editable": true,
    
                "index": 4,
    
                "inputType": "topicselector",
    
                "label": "Topics",
    
                "name": "Topics",
    
                "placeholder": "Choose Topics",
    
                "renderingHints": {},
    
                "required": false,
    
                "visible": true
    
              }
                    ]
                }
               
        }
    }
    
    
    
    this._httpService.createForm(tempArray1).subscribe(res=>{
    console.log("ts file");
  
    this.addOrgrPopup=false
   
   },err=>{
   console.log(err)
   })
}




courseReviewFormData(rootOrgIdCreate:any)
{


  let tempArray1 : any
  tempArray1 = 
  {
    "request": {
                
            "type": "content",
            "subType": "course",
            "action": "review",
            "rootOrgId": rootOrgIdCreate,
            "framework": "nulp",
            "data": {
                "templateName": "defaultTemplate",
                "action": "review",
                "fields": [
                {
                            "code": "appicon",
                            "dataType": "url",
                            "description": "App Icon",
                            "editable": true,
                            "index": 1,
                            "inputType": "file",
                            "label": "App Icon",
                            "name": "App Icon",
                            "placeholder": "App Icon",
                            "renderingHints": {},
                            "required": false,
                            "visible": true
                        },
                        {
                            "code": "name",
                            "dataType": "text",
                            "description": "Title of the content",
                            "editable": true,
                            "index": 2,
                            "inputType": "text",
                            "label": "Title",
                            "name": "name",
                            "placeholder": "Enter Title For Collection",
                            "renderingHints": {},
                            "required": true,
                            "visible": true
                        },
                        {
                            "code": "description",
                            "dataType": "text",
                            "description": "Brief description",
                            "editable": true,
                            "index": 3,
                            "inputType": "textarea",
                            "label": "Description",
                            "name": "Description",
                            "placeholder": "Brief description about the Collection",
                            "renderingHints": {},
                            "required": false,
                            "visible": true
                        },
                        {
                            "code": "keywords",
                            "dataType": "list",
                            "description": "Keywords for the content",
                            "editable": true,
                            "index": 4,
                            "inputType": "keywordsuggestion",
                            "label": "keywords",
                            "name": "Keywords",
                            "placeholder": "Enter Keywords",
                            "required": false,
                            "visible": true
                        },
                         {
                            "code": "board",
                            "dataType": "text",
                            "description": "Category",
                            "editable": true,
                            "index": 5,
                            "inputType": "select",
                            "label": "Category",
                            "name": "Category",
                            "placeholder": "Select Category",
                            "renderingHints": {},
                            "required": false,
                            "visible": true,
                             "depends": [
                                "gradeLevel"
                            ]
                        },
                         {
                            "code": "gradeLevel",
                            "dataType": "list",
                            "description": "Sub-Category",
                            "editable": true,
                            "index": 6,
                            "inputType": "select",
                            "label": "Sub-Category",
                            "name": "Sub-Category",
                            "placeholder": "Select Sub-Category",
                            "renderingHints": {},
                            "required": false,
                            "visible": true
                        },
                        {
                            "code": "subject",
                            "dataType": "list",
                            "description": "Topic",
                            "editable": true,
                            "index": 7,
                            "inputType": "select",
                            "label": "Topic",
                            "name": "Topic",
                            "placeholder": "Select Topic",
                            "renderingHints": {},
                            "required": false,
                            "visible": true
                        },
    
                      
                         {
                            "code": "medium",
                            "dataType": "list",
                            "description": "Language",
                            "editable": true,
                            "index": 8,
                            "inputType": "select",
                            "label": "Language",
                            "name": "Language",
                            "placeholder": "Select Language",
                            "renderingHints": {},
                            "required": false,
                            "visible": true
                        }
                        ,
                                           
                        {
                            "code": "attributions",
                            "dataType": "list",
                            "description": "Attributions",
                            "editable": true,
                            "index": 9,
                            "inputType": "text",
                            "label": "Attributions",
                            "name": "attribution",
                            "placeholder": "",
                            "renderingHints": {},
                            "required": false,
                            "visible": true
                        }
                                           
                       
                ]
            }
        }
    }
    
    
    
    this._httpService.createForm(tempArray1).subscribe(res=>{
    console.log("ts file");
  
    this.addOrgrPopup=false
   
   },err=>{
   console.log(err)
   })
}



courseResourceFilterFormData(rootOrgIdCreate:any)
{


  let tempArray1 : any
  tempArray1 = 
  {
    "request": {
                
            "type": "content",
            "subType": "course",
            "action": "resource-filters",
            "rootOrgId": rootOrgIdCreate,
            "framework": "nulp",
            "data": {
                "templateName": "defaultTemplate",
                    "action": "resource-filters",
                  "fields": [
                        {
                            "code": "board",
                            "dataType": "text",
                            "description": "Category",
                            "editable": true,
                            "index": 1,
                            "inputType": "select",
                            "label": "Category",
                            "name": "Category",
                            "placeholder": "Select Category",
                            "renderingHints": {},
                            "required": false,
                            "visible": true,
                            "depends": [
                                "gradeLevel"
                            ]
                        },
                        {
                            "code": "gradeLevel",
                            "dataType": "list",
                            "description": "Sub-Category",
                            "editable": true,
                            "index": 2,
                            "inputType": "select",
                            "label": "Sub-Category",
                            "name": "Sub-Category",
                            "placeholder": "Select Sub-Category",
                            "renderingHints": {},
                            "required": false,
                            "visible": true
                        },
                        {
                            "code": "subject",
                            "dataType": "text",
                            "description": "Topic",
                            "editable": true,
                            "index": 3,
                            "inputType": "select",
                            "label": "Topic",
                            "name": "Topic",
                            "placeholder": "Select Topic",
                            "renderingHints": {},
                            "required": false,
                            "visible": true
                        },
                        {
                            "code": "medium",
                            "dataType": "text",
                            "description": "Language",
                            "editable": true,
                            "index": 4,
                            "inputType": "select",
                            "label": "Language",
                            "name": "Language",
                            "placeholder": "Select Language",
                            "renderingHints": {},
                            "required": false,
                            "visible": true
                        }
                    ]
            }
        }
    }
    
    
    
    this._httpService.createForm(tempArray1).subscribe(res=>{
    console.log("ts file");
  
    this.addOrgrPopup=false
   
   },err=>{
   console.log(err)
   })
}



courseFilterFormData(rootOrgIdCreate:any)
{
  let tempArray1 : any
  tempArray1 = 
  {
    "request": {
                
           "type": "content",
                "subType": "courses",
                "action": "filter",
                "rootOrgId": rootOrgIdCreate,
                
                "data": {
                    "templateName": "defaultTemplate",
                    "action": "filter",
                    "fields": [
                         {
                            "code": "board",
                            "dataType": "text",
                            "description": "Category",
                            "editable": true,
                            "index": 1,
                            "inputType": "select",
                            "label": "Category",
                            "name": "Category",
                            "placeholder": "Select Category",
                            "renderingHints": {},
                            "required": false,
                            "visible": true,
                             "depends": [
                                "gradeLevel"
                            ]
                        },
                        {
                            "code": "gradeLevel",
                            "dataType": "text",
                            "description": "Sub-Category",
                            "editable": true,
                            "index": 2,
                            "inputType": "select",
                            "label": "Sub-Category",
                            "name": "Sub-Category",
                            "placeholder": "Select Sub-Category",
                            "renderingHints": {},
                            "required": false   ,
                            "visible": true
                        },
                        {
                            "code": "subject",
                            "dataType": "text",
                            "description": "Topic",
                            "editable": true,
                            "index": 3,
                            "inputType": "select",
                            "label": "Topic",
                            "name": "Topic",
                            "placeholder": "Select Topic",
                            "renderingHints": {},
                            "required": false,
                            "visible": true
                        },
    
                     
                         {
                            "code": "medium",
                            "dataType": "text",
                            "description": "Language",
                            "editable": true,
                            "index": 4,
                            "inputType": "select",
                            "label": "Language",
                            "name": "Language",
                            "placeholder": "Select Language",
                            "renderingHints": {},
                            "required": false,
                            "visible": true
                        }
                        
                ]
            }
        }
    }
    
    this._httpService.createForm(tempArray1).subscribe(res=>{
    console.log("ts file");
  
    this.addOrgrPopup=false
   
   },err=>{
   console.log(err)
   })
}



questionMetaSearchFormData(rootOrgIdCreate:any)
{


  let tempArray1 : any
  tempArray1 = 
  {
    "request": {
      "action": "question-meta-save",
      "subType": "questions",
      "framework": "nulp",
      "rootOrgId": rootOrgIdCreate,
      "type": "content",
      "data": {
        "action": "question-meta-save",
        "templateName": "questionMetaDataTemplate",
        "fields": [
          {
            "code": "name",
            "dataType": "text",
            "description": "Title of the question",
            "editable": true,
            "inputType": "text",
            "label": "Title",
            "name": "Title",
            "index": 0,
            "placeholder": "Enter the Title",
            "renderingHints": {},
            "required": true,
            "visible": true
          },
          {
            "code": "description",
            "dataType": "text",
            "description": "Brief description",
            "editable": true,
            "inputType": "textarea",
            "label": "Description",
            "name": "Description",
            "placeholder": "Enter the Description",
            "renderingHints": {},
            "required": false,
            "visible": true,
            "index": 1
          },
         
          {
            "code": "qlevel",
            "dataType": "text",
            "description": "Add Notes",
            "editable": true,
            "index": 3,
            "inputType": "select",
            "label": "Level",
            "name": "qlevel",
            "placeholder": "Select Level",
            "range": [
              "EASY",
              "MEDIUM",
              "DIFFICULT"
            ],
            "renderingHints": {},
            "required": true,
            "visible": true
          },
          {
            "code": "max_score",
            "dataType": "text",
            "description": "",
            "editable": true,
            "index": 4,
            "inputType": "number",
            "label": "Max Score",
            "name": "max_score",
            "placeholder": "Enter the Max Score",
            "renderingHints": {},
            "required": true,
            "visible": true,
            "validation": [
              {
                "type": "min",
                "value": "1",
                "message": ""
              }
            ]
          }
        ]
      }
    }
  }
    
  this._httpService.createForm(tempArray1).subscribe(res=>{
    console.log("ts file");
  
    this.addOrgrPopup=false
   
   },err=>{
   console.log(err)
   })
}



questionFilterFormData(rootOrgIdCreate:any)
{


  let tempArray1 : any
  tempArray1 = 
  {
    "request": {
      "framework": "nulp",
      "rootOrgId": rootOrgIdCreate,
          "type": "content",
          "subType": "questions",
          "action": "question-filter-view",
        "popup":false,
        "metadata":{},
        "data":{}
      }
  }
  
    
    
  this._httpService.createForm(tempArray1).subscribe(res=>{
    console.log("ts file");
  
    this.addOrgrPopup=false
   
   },err=>{
   console.log(err)
   })
}


almyContentSearchFormData(rootOrgIdCreate:any)
{


  let tempArray1 : any
  tempArray1 = 
  {
    "request": {
                
            "type": "content",
            "subType": "allmycontent",
            "action": "search",
            "rootOrgId": rootOrgIdCreate,
           
            "data": {
                "templateName": "defaultTemplate",
                "action": "search",
                "fields": [
                         
                        {
                            "code": "board",
                            "dataType": "text",
                            "description": "Category",
                            "editable": true,
                            "index": 1,
                            "inputType": "select",
                            "label": "Category",
                            "name": "Category",
                            "placeholder": "Select Category",
                            "renderingHints": {},
                            "required": false,
                            "visible": true,
                             "depends": [
                                "gradeLevel"
                            ]
                        },
    
                         {
                            "code": "gradeLevel",
                            "dataType": "list",
                            "description": "Sub-Category",
                            "editable": true,
                            "index": 2,
                            "inputType": "select",
                            "label": "Sub-Category",
                            "name": "Sub-Category",
                            "placeholder": "Select Sub-Category",
                            "renderingHints": {},
                            "required": false,
                            "visible": true
                        },
                       
                        {
                            "code": "subject",
                            "dataType": "text",
                            "description": "Topic",
                            "editable": true,
                            "index": 3,
                            "inputType": "select",
                            "label": "Topic",
                            "name": "Topic",
                            "placeholder": "Select Topic",
                            "renderingHints": {},
                            "required": false,
                            "visible": true
                        },
    
                        {
                            "code": "medium",
                            "dataType": "text",
                            "description": "Language",
                            "editable": true,
                            "index": 4,
                            "inputType": "select",
                            "label": "Language",
                            "name": "Langauge",
                            "placeholder": "Select Language",
                            "renderingHints": {},
                            "required": false,
                            "visible": true
                        }
                ]
            }
        }
    }
    
    
    this._httpService.createForm(tempArray1).subscribe(res=>{
    console.log("ts file");
  
    this.addOrgrPopup=false
   
   },err=>{
   console.log(err)
   })
}



exploreSearchFormData(rootOrgIdCreate:any)
{
  let tempArray1 : any
  tempArray1 = 
  {
    "request": {
           "type": "content",
                "subType": "explore",
                "action": "search",
                "rootOrgId": rootOrgIdCreate,
                "data": {
                    "templateName": "defaultTemplate",
                    "action": "search",
                    "fields": [
                        {
                            "code": "board",
                            "dataType": "text",
                            "description": "Category",
                            "editable": true,
                            "index": 1,
                            "inputType": "select",
                            "label": "Category",
                            "name": "Category",
                            "placeholder": "Select Category",
                            "renderingHints": {},
                            "required": false,
                            "visible": true,
                             "depends": [
                                "gradeLevel"
                            ]
                        },
                       
                       {
                            "code": "gradeLevel",
                            "dataType": "text",
                            "description": "Sub-Category",
                            "editable": true,
                            "index": 2,
                            "inputType": "select",
                            "label": "Sub-Category",
                            "name": "Sub-Category",
                            "placeholder": "Select Sub-Category",
                            "renderingHints": {},
                            "required": false   ,
                            "visible": true
                        },
                        {
                            "code": "subject",
                            "dataType": "text",
                            "description": "Topic",
                            "editable": true,
                            "index": 3,
                            "inputType": "select",
                            "label": "Topic",
                            "name": "Topic",
                            "placeholder": "Select Topic",
                            "renderingHints": {},
                            "required": false,
                            "visible": true
                        },
    
                        
                         {
                            "code": "medium",
                            "dataType": "text",
                            "description": "Language",
                            "editable": true,
                            "index": 4,
                            "inputType": "select",
                            "label": "Language",
                            "name": "Language",
                            "placeholder": "Select Language",
                            "renderingHints": {},
                            "required": false,
                            "visible": true
                        }
                        
                ]
            }
        }
    }
    
    this._httpService.createForm(tempArray1).subscribe(res=>{
    console.log("ts file");
  
    this.addOrgrPopup=false
   
   },err=>{
   console.log(err)
   })
}



exploreCourseFilterFormData(rootOrgIdCreate:any)
{


  let tempArray1 : any
  tempArray1 = 
  {
    "request": {
                
           "type": "content",
                "subType": "explore-course",
                "action": "filter",
                "rootOrgId": rootOrgIdCreate,
                
                "data": {
                    "templateName": "defaultTemplate",
                    "action": "filter",
                    "fields": [
                        {
                            "code": "board",
                            "dataType": "text",
                            "description": "Category",
                            "editable": true,
                            "index": 1,
                            "inputType": "select",
                            "label": "Category",
                            "name": "Category",
                            "placeholder": "Select Category",
                            "renderingHints": {},
                            "required": false,
                            "visible": true,
                             "depends": [
                                "gradeLevel"
                            ]
                        },
                       
                       {
                            "code": "gradeLevel",
                            "dataType": "text",
                            "description": "Sub-Category",
                            "editable": true,
                            "index": 2,
                            "inputType": "select",
                            "label": "Sub-Category",
                            "name": "Sub-Category",
                            "placeholder": "Select Sub-Category",
                            "renderingHints": {},
                            "required": false   ,
                            "visible": true
                        },
                        {
                            "code": "subject",
                            "dataType": "text",
                            "description": "Topic",
                            "editable": true,
                            "index": 3,
                            "inputType": "select",
                            "label": "Topic",
                            "name": "Topic",
                            "placeholder": "Select Topic",
                            "renderingHints": {},
                            "required": false,
                            "visible": true
                        },
    
                        
                         {
                            "code": "medium",
                            "dataType": "text",
                            "description": "Language",
                            "editable": true,
                            "index": 4,
                            "inputType": "select",
                            "label": "Language",
                            "name": "Language",
                            "placeholder": "Select Language",
                            "renderingHints": {},
                            "required": false,
                            "visible": true
                        }
                        
                ]
            }
        }
    }
    
    
    this._httpService.createForm(tempArray1).subscribe(res=>{
    console.log("ts file");
  
    this.addOrgrPopup=false
   
   },err=>{
   console.log(err)
   })
}



exploreCourseSearchFormData(rootOrgIdCreate:any)
{
  let tempArray1 : any
  tempArray1 = 
  {
    "request": {
                
           "type": "content",
                "subType": "explore",
                "action": "search",
                "rootOrgId": rootOrgIdCreate,
                
                "data": {
                    "templateName": "defaultTemplate",
                    "action": "search",
                    "fields": [
                        {
                            "code": "board",
                            "dataType": "text",
                            "description": "Category",
                            "editable": true,
                            "index": 1,
                            "inputType": "select",
                            "label": "Category",
                            "name": "Category",
                            "placeholder": "Select Category",
                            "renderingHints": {},
                            "required": false,
                            "visible": true,
                             "depends": [
                                "gradeLevel"
                            ]
                        },
                       
                       {
                            "code": "gradeLevel",
                            "dataType": "text",
                            "description": "Sub-Category",
                            "editable": true,
                            "index": 2,
                            "inputType": "select",
                            "label": "Sub-Category",
                            "name": "Sub-Category",
                            "placeholder": "Select Sub-Category",
                            "renderingHints": {},
                            "required": false   ,
                            "visible": true
                        },
                        {
                            "code": "subject",
                            "dataType": "text",
                            "description": "Topic",
                            "editable": true,
                            "index": 3,
                            "inputType": "select",
                            "label": "Topic",
                            "name": "Topic",
                            "placeholder": "Select Topic",
                            "renderingHints": {},
                            "required": false,
                            "visible": true
                        },
    
                        
                         {
                            "code": "medium",
                            "dataType": "text",
                            "description": "Language",
                            "editable": true,
                            "index": 4,
                            "inputType": "select",
                            "label": "Language",
                            "name": "Language",
                            "placeholder": "Select Language",
                            "renderingHints": {},
                            "required": false,
                            "visible": true
                        }
                        
                ]
            }
        }
    }
    
    
    this._httpService.createForm(tempArray1).subscribe(res=>{
    console.log("ts file");
  
    this.addOrgrPopup=false
   
   },err=>{
   console.log(err)
   })
}



librarySearchFormData(rootOrgIdCreate:any)
{
  let tempArray1 : any
  tempArray1 = 
  {
    "request": {
                
           "type": "content",
                "subType": "library",
                "action": "search",
                "rootOrgId": rootOrgIdCreate,
                "data": {
                    "templateName": "defaultTemplate",
                    "action": "search",
                    "fields": [
                         {
                            "code": "board",
                            "dataType": "text",
                            "description": "Category",
                            "editable": true,
                            "index": 1,
                            "inputType": "select",
                            "label": "Category",
                            "name": "Category",
                            "placeholder": "Select Category",
                            "renderingHints": {},
                            "required": false,
                            "visible": true,
                             "depends": [
                                "gradeLevel"
                            ]
                        },
                        {
                            "code": "gradeLevel",
                            "dataType": "text",
                            "description": "Sub-Category",
                            "editable": true,
                            "index": 2,
                            "inputType": "select",
                            "label": "Sub-Category",
                            "name": "Sub-Category",
                            "placeholder": "Select Sub-Category",
                            "renderingHints": {},
                            "required": false   ,
                            "visible": true
                        },
                        {
                            "code": "subject",
                            "dataType": "text",
                            "description": "Topic",
                            "editable": true,
                            "index": 3,
                            "inputType": "select",
                            "label": "Topic",
                            "name": "Topic",
                            "placeholder": "Select Topic",
                            "renderingHints": {},
                            "required": false,
                            "visible": true
                        },
    
                     
                         {
                            "code": "medium",
                            "dataType": "text",
                            "description": "Language",
                            "editable": true,
                            "index": 4,
                            "inputType": "select",
                            "label": "Language",
                            "name": "Language",
                            "placeholder": "Select Language",
                            "renderingHints": {},
                            "required": false,
                            "visible": true
                        }
                        
                ]
            }
        }
    }
    
    
    this._httpService.createForm(tempArray1).subscribe(res=>{
    console.log("ts file");
  
    this.addOrgrPopup=false
   
   },err=>{
   console.log(err)
   })
}



createOrgFormSubmit()
{  
  let tempArray1:any;
  tempArray1= {
    'request': {
    'query': '',
    'filters': {
    "orgName":this.createOrgForm.value['orgName']
    }
    }
    }
    this._httpService.orgSearch(tempArray1).subscribe(res=>{
    this.countOrgRecord = res.result.response.count;
    if(this.countOrgRecord>0)
        {
          this.checkOrgExistsPopup = true;
      
        }
      
        else if(this.countOrgRecord==0) {
          this.checkOrgExistsPopup = false; 

          this.userLoginDataChannel = sessionStorage.getItem("userLoginDataChannel")
  this.rootOrgId = sessionStorage.getItem("rootOrgId")
  this.onchangeorgName=this.createOrgForm.value['rootOrgName'].split("/");
  this.onchangeorgId = this.onchangeorgName[1]
  if(this.onchangeorgId !='')
  {
    this.onchangeorgId = this.onchangeorgId 
	 this.channel = this.onchangeorgName[3]
  }
  else
  {
    this.onchangeorgId = this.rootOrgId 
	this.channel = this.userLoginDataChannel 
  }
  
    let tempArray : any
    tempArray = 
  {
    "request":{
      "orgName": this.createOrgForm.value['orgName'],
      "description":this.createOrgForm.value['description'],
      "isRootOrg": false,
      "rootOrgId": this.onchangeorgId,
      "channel": this.userLoginDataChannel
    }

  } 
//  this.showOrgData = [];
  //this.showOrgData1 = [];
  //this.showOrgData2 = [];   
  this._httpService.createOrgDetailSave(tempArray).subscribe(res=>{
    console.log("ts file");
    this.editOrgrPopup=false 
    this.addRootOrgrPopup=false
    this.addOrgrPopup=false
    this.editOrgrStatusPopup=false
    this.sucesErrorPopup=true      
    this.popupMsg=res.result.response;
   
    this.getUserProfileOrg()
   
   },err=>{
   console.log(err)
   this.popupMsg=err.params.errmsg;
   })
        
        }
    },err=>{
    console.log(err)
    
    })
  
}

editOrgStatusFormSubmit()
{

    this.orgDataId = sessionStorage.getItem("orgDataId")
    this.userLoginDataChannel = sessionStorage.getItem("userLoginDataChannel")
   this.orgStat =  this.editStatusForm.value['orgStatus']
    let tempArray : any
    tempArray = 
    {
    "request":{
    "status": Number(this.orgStat),
    "organisationId": this.orgDataId
    }
    } 
    console.log(tempArray);

    this._httpService.updateOrgStatusDetail(tempArray).subscribe(res=>{
      console.log("ts file");
     // this.getUserOrganization() 
      this.editOrgrPopup=false 
     this.addRootOrgrPopup=false
     this.addOrgrPopup=false
    this.editOrgrStatusPopup=false
     this.sucesErrorPopup=true
     this.popupMsg=res.result.response;
    
    
    // this.popupMsg=res.result.response;
     this.editStatusForm.reset()
     
      this.getUserProfileOrg();
      //location.reload()
      
     },err=>{
      this.sucesErrorPopup=true
      this.popupMsg=err.params.errmsg;
     console.log(err)
     })
}



onFilterOrg(event, dt) {
   this.filteredValuesLength = event.filteredValue.length;
  // alert(this.filteredValuesLength)
   if( this.filteredValuesLength == this.countOrgRecord)
   {
    this.countOrgRecord = this.countOrgRecord;
   }
   else if( this.filteredValuesLength != this.countOrgRecord)
   {
    this.countOrgRecord = this.filteredValuesLength;
   }
   else
   {
    this.countOrgRecord = this.countOrgRecord;
   }
 } 

editOrgFormSubmit()
{  
 // this.showOrgData = [];
  //this.showOrgData1 = [];
  //this.showOrgData2 = [];
  this.orgDataId = sessionStorage.getItem("orgDataId")
  this.userLoginDataChannel = sessionStorage.getItem("userLoginDataChannel")
  
   let tempArray : any
    tempArray = 
  {
    "request":{
      "orgName": this.editOrgForm.value['orgName'],
      "description":this.editOrgForm.value['description'],
      "organisationId": this.orgDataId
    }

  }    
//  this.showOrgData = [];
  //this.showOrgData1 = [];
  //this.showOrgData2 = [];
  this._httpService.updateOrgDetail(tempArray).subscribe(res=>{
    console.log("ts file");
     this.editOrgrPopup=false 
    this.addRootOrgrPopup=false
    this.addOrgrPopup=false
    this.editOrgrStatusPopup=false
    this.sucesErrorPopup=true
    this.popupMsg=res.result.response;
   
    this.getUserProfileOrg();
 // location.reload()
   // this.getUserProfile();
 
   },err=>{
   console.log(err)
   this.popupMsg=err.params.errmsg;
   })
   
//  this.getUserOrganization() 
   
}


editStatusOrg(orgDataId) {
  //console.log(event); 
  this.editOrgrStatusPopup=true 
  sessionStorage.setItem("orgDataId", orgDataId);
  this.readOrgData(orgDataId)
}

editOrg(orgDataId)
{
  this.editOrgrPopup=true 
  this.addRootOrgrPopup=false
  this.addOrgrPopup=false
  this.editOrgrStatusPopup=false
 // alert(orgData);
 sessionStorage.setItem("orgDataId", orgDataId);
  this.readOrgData(orgDataId)
}

showRootOrg()
{
  this.addRootOrgrPopup=true
  this.addOrgrPopup=false
  this.editOrgrPopup=false
  this.editOrgrStatusPopup=false
}

showOrg()
{
  this.addOrgrPopup=true
  this.editOrgrPopup=false
  this.editOrgrStatusPopup=false
  this.addRootOrgrPopup=false
}
closepopupOrg()
{
  this.addOrgrPopup=false
  this.editOrgrPopup=false
  this.editOrgrStatusPopup=false
  this.addRootOrgrPopup=false
  this.sucesErrorPopup=false 
  
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

getUserProfileOrg()
{
  this.showLoader = true;
  const option = { userId: this.userId };

 // this.showOrgData = [];
 // this.showOrgData1 = [];
  //this.showOrgData2 = [];
  this.userSearchService.getUserById(option).subscribe(
    (apiResponse: ServerResponse) => {
     this.userLoginData = apiResponse.result.response;
     this.userLoginDataChannel =  apiResponse.result.response.channel;
     this.rootOrgId =  apiResponse.result.response.rootOrgId;
     this.orgData = apiResponse.result.response.organisations;
     this.orgDataLength =  this.orgData.length;
     this.mentorList = [];
     for (var i = 0; i < this.orgData.length; i++) {
      this.orgDataRole=this.orgData[0].roles
      if(this.orgData.length == 1)
      {
        this.checkRootOrg= true;
// new code start heree
        for( var k = 0; k < this.orgDataRole.length; k++ ) {
          if(this.orgDataRole[k] =="SYSTEM_ADMINISTRATION"){
            this.systemVar='present';              
          }
          else{
            this.systemVar='notpresent';
          }
        }
        if( this.systemVar=='present')
        {
          console.log('firssttt')

        this.getOrgList(this.systemVar)  
        }
        if( this.systemVar=='notpresent')
        {
         this.rootOrgIdOrg = this.orgData[0].organisationId
          this.rootOrgIdOrgName =  this.orgData[0].orgName
          //this.mentorList.push( {'id' :this.orgData[0].organisationId,'orgName': this.orgData[0].orgName}) 
        }
      }
      else if(this.orgData.length == 2)
      {
        this.subOrgName = this.orgData[1].orgName;
        sessionStorage.setItem("subOrgName", this.subOrgName);
        this.organisationId = this.orgData[1].organisationId;
        this.checkRootOrg= false;
      }
   }
     
     sessionStorage.setItem("userLoginDataChannel", this.userLoginDataChannel);
     sessionStorage.setItem("rootOrgId", this.rootOrgId);
     this.getUserOrganization(this.systemVar)      },
    err => {
      this.toasterService.error(this.resourceService.messages.emsg.m0005);
      this.showLoader = false;
      this.showError = true;
    }
  );
}


readOrgData(OrgId)
{
  let tempArray:any;
  tempArray= {
    "request": {
      "organisationId": OrgId
    }
  }
  
  this._httpService.getorgData(tempArray).subscribe(res => {
    console.log('orgData');
    console.log(res);
    console.log(res);
    this.getOrgData = res.result.response;
    this.getOrgName = this.getOrgData.orgName;
    this.getdescription = this.getOrgData.description;
    this.orgStatusVal = this.getOrgData.status;
    console.log('orgData');
    console.log(this.getOrgData);
    console.log(this.getOrgName);
    console.log(this.getdescription);
    this.getData = {'getOrgName':this.getOrgName}
    console.log('orgData');
    console.log( this.orgStatusVal);
  });
}


getUserOrganization(checkSystemAdmin:any)
{
  this.userLoginDataChannel = sessionStorage.getItem("userLoginDataChannel")
  let tempArray:any;
  if(checkSystemAdmin == 'present')
  {
  tempArray= {
    'request': {
      'query': '',
      'filters': {
      }
    }
  }
}
if(checkSystemAdmin == 'notpresent')
{
tempArray= {
  'request': {
    'query': '',
    'filters': {
      "channel": this.userLoginDataChannel
    }
  }
}
}
 // this.showOrgData = [];
  //this.showOrgData1 = [];
  //this.showOrgData2 = [];
  this._httpService.orgSearch(tempArray).subscribe(res => {
    this.orgSearchData = res.result.response.content;
    this.countOrgRecord = res.result.response.count;
 
    this.showOrgData = [];
   
    this.channelListOrgArryData= [];
    this.statuslistArryDataOrg= [];
     this.orgListDataOrg= [];
     this.orgTypeListOrgArryData = [];
   
    this.result = 0;
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
      else if( !element.isRootOrg)
      {
     // this.showOrgData2.push({"orgType":this.orgType,"id": element.id,"orgName": element.orgName,"description":element.description,"channel":element.channel,"status":this.status})
      }

      
      this.showOrgData.push({"orgType":this.orgType,"id": element.id,"orgName": element.orgName,"description":element.description,"channel":element.channel,"status":this.status})
    

     




    });



     console.log('ccccc')
     console.log(this.showOrgData)
     console.log('ccccc2222')



     this.orgTypelListOrg = this.showOrgData
     .map(item => item.orgType)
     .filter((value, index, self) => self.indexOf(value) === index)
     this.orgTypeOrgArry  = this.orgTypelListOrg.filter(f => f !== undefined && f !== null) as any;
     this.orgTypeOrgArry.forEach(element => {
     this.orgTypeListOrgArryData.push({"label": element,"value":element})
     });


     this.channelListOrg = this.showOrgData
     .map(item => item.channel)
     .filter((value, index, self) => self.indexOf(value) === index)
     this.channelListOrgArry  = this.channelListOrg.filter(f => f !== undefined && f !== null) as any;
     this.channelListOrgArry.forEach(element => {
     this.channelListOrgArryData.push({"label": element,"value":element})
     });
 

    this.statusListOrg = this.showOrgData
    .map(item => item.status)
    .filter((value, index, self) => self.indexOf(value) === index)
    this.statuslistArryOrg  = this.statusListOrg.filter(f => f !== undefined && f !== null) as any;
    this.statuslistArryOrg.forEach(element => {
    this.statuslistArryDataOrg.push({"label": element,"value":element})
    });


    this.orgListOrg = this.showOrgData
    .map(item => item.orgName)
    .filter((value, index, self) => self.indexOf(value) === index)
    this.orgListArryOrg  = this.orgListOrg.filter(f => f !== undefined && f !== null) as any;
    this.orgListArryOrg.forEach(element => {
    this.orgListDataOrg.push({"label": element,"value":element})
    });



  });
}

//user code change 22-12-2020//

getOrgDataSearch(orgId:any)
{
    let tempArray : any
    tempArray= {
      "request": {
        "organisationId": orgId
      }
    }
    this._httpService.getorgData(tempArray).subscribe(res => {
      console.log('org datat------------------------');
      if(res.result.response.orgName!=null)
      {
      this.subOrgNameOrg = res.result.response.orgName;
      }
      
     console.log(this.subOrgNameOrg);
      console.log('org datat------------------------');
    
    
   

    });

    return this.subOrgNameOrg;

    

  
}





//user code change 22-12-2020//
















///organization component code





  }
