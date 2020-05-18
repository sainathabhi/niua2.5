import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormControl, AbstractControl } from '@angular/forms';
import { Subject, Subscription } from 'rxjs';
import { ResourceService, ServerResponse, ToasterService, NavigationHelperService } from '@sunbird/shared';
import { SignupService } from './../../services';
import { TenantService } from '@sunbird/core';
import { TelemetryService } from '@sunbird/telemetry';
import * as _ from 'lodash-es';
import { IStartEventInput, IImpressionEventInput, IInteractEventEdata } from '@sunbird/telemetry';
import { DeviceDetectorService } from 'ngx-device-detector';
import { ActivatedRoute } from '@angular/router';
import { CacheService } from 'ng2-cache-service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit, OnDestroy, AfterViewInit {
  public unsubscribe = new Subject<void>();
  signUpForm: FormGroup;
  sbFormBuilder: FormBuilder;
  disableSubmitBtn = false;
  showPassword = false;
  showSignUpForm = true;
  showUniqueError = '';
  tenantDataSubscription: Subscription;
  logo: string;
  tenantName: string;
  resourceDataSubscription: any;
  telemetryStart: IStartEventInput;
  telemetryImpression: IImpressionEventInput;
  submitInteractEdata: IInteractEventEdata;
  telemetryCdata: Array<{}>;
  instance: string;

  constructor(formBuilder: FormBuilder, public resourceService: ResourceService,
    public signupService: SignupService, public toasterService: ToasterService, private cacheService: CacheService,
    public tenantService: TenantService, public deviceDetectorService: DeviceDetectorService,
    public activatedRoute: ActivatedRoute, public telemetryService: TelemetryService,
    public navigationhelperService: NavigationHelperService) {
    this.sbFormBuilder = formBuilder;
  }

  ngOnInit() {
    this.instance = _.upperCase(this.resourceService.instance);
    this.tenantDataSubscription = this.tenantService.tenantData$.subscribe(
      data => {
        if (data && !data.err) {
          this.logo = data.tenantData.logo;
          this.tenantName = data.tenantData.titleName;
        }
      }
    );
    this.getCacheLanguage();
    this.initializeFormFields();
    this.setInteractEventData();
    // Telemetry Start
    this.signUpTelemetryStart();
  }

  getCacheLanguage() {
    this.resourceDataSubscription = this.resourceService.languageSelected$
      .subscribe(item => {
        this.resourceService.getResource(item.value);
      }
      );
  }

  signUpTelemetryStart() {
    const deviceInfo = this.deviceDetectorService.getDeviceInfo();
    this.telemetryStart = {
      context: {
        env: this.activatedRoute.snapshot.data.telemetry.env,
        cdata: this.telemetryCdata,
      },
      edata: {
        type: this.activatedRoute.snapshot.data.telemetry.type,
        pageid: this.activatedRoute.snapshot.data.telemetry.pageid,
        mode: this.activatedRoute.snapshot.data.telemetry.mode,
        uaspec: {
          agent: deviceInfo.browser,
          ver: deviceInfo.browser_version,
          system: deviceInfo.os_version,
          platform: deviceInfo.os,
          raw: deviceInfo.userAgent
        }
      }
    };
  }

  signUpTelemetryImpression() {
    this.telemetryImpression = {
      context: {
        env: this.activatedRoute.snapshot.data.telemetry.env,
        cdata: this.telemetryCdata,
      },
      edata: {
        type: this.activatedRoute.snapshot.data.telemetry.type,
        pageid: this.activatedRoute.snapshot.data.telemetry.pageid,
        uri: this.activatedRoute.snapshot.data.telemetry.uri,
        duration: this.navigationhelperService.getPageLoadTime()
      }
    };
  }

  initializeFormFields() {
    this.signUpForm = this.sbFormBuilder.group({
      name: new FormControl(null, [Validators.required]),
      password: new FormControl(null, [Validators.required, Validators.minLength(8)]),
      confirmPassword: new FormControl(null, [Validators.required, Validators.minLength(8)]),
      email: new FormControl(null, [Validators.required, Validators.pattern(/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[a-z]{2,4}$/)]),
      contactType: new FormControl('email'),
      // uniqueContact: new FormControl(null, [Validators.required])
    }, {
        validator: (formControl) => {
          const passCtrl = formControl.controls.password;
          const conPassCtrl = formControl.controls.confirmPassword;
          const nameCtrl = formControl.controls.name;
          if (_.trim(nameCtrl.value) === '') { nameCtrl.setErrors({ required: true }); }
          if (_.trim(passCtrl.value) === '') { passCtrl.setErrors({ required: true }); }
          if (_.trim(conPassCtrl.value) === '') { conPassCtrl.setErrors({ required: true }); }
          if (passCtrl.value !== conPassCtrl.value) {
            conPassCtrl.setErrors({ validatePasswordConfirmation: true });
          } else { conPassCtrl.setErrors(null); }
          return null;
        }
      });
  }

  onEmailChange() {
    const emailControl = this.signUpForm.get('email');
    let emailValue = '';
    emailControl.valueChanges.subscribe(
      (data: string) => {
        if (emailControl.status === 'VALID' && emailValue !== emailControl.value) {
          // this.signUpForm.controls['uniqueContact'].setValue('');
          this.vaidateUserContact();
          emailValue = emailControl.value;
        }
      });
  }

  vaidateUserContact() {
    const value = this.signUpForm.controls.email.value;
    const uri = this.signUpForm.controls.contactType.value.toString() + '/' + value;
    this.signupService.getUserByKey(uri).subscribe(
      (data: ServerResponse) => {
        this.showUniqueError = this.resourceService.frmelmnts.lbl.uniqueEmail;
      },
      (err) => {
        if (_.get(err, 'error.params.status') && err.error.params.status === 'USER_ACCOUNT_BLOCKED') {
          this.showUniqueError = this.resourceService.frmelmnts.lbl.blockedUserError;
        } else {
          // this.signUpForm.controls['uniqueContact'].setValue(true);
          this.showUniqueError = '';
        }
      }
    );
  }

  displayPassword() {
    if (this.showPassword) {
      this.showPassword = false;
    } else {
      this.showPassword = true;
    }
  }

  ngAfterViewInit () {
    setTimeout(() => {
      this.telemetryCdata = [{ 'type': 'signup', 'id': this.activatedRoute.snapshot.data.telemetry.uuid }];
      this.signUpTelemetryImpression();
    });
  }
  createUser() {
    const createRequest = {
      request: {
        firstName: _.split(_.trim(this.signUpForm.controls.name.value),' ')[0] || _.split(_.trim(this.signUpForm.controls.name.value),',')[0] || _.trim(this.signUpForm.controls.name.value),
        lastName: _.split(_.trim(this.signUpForm.controls.name.value),' ')[1] || _.split(_.trim(this.signUpForm.controls.name.value),',')[1] || '',
        password: _.trim(this.signUpForm.controls.password.value),
        email: _.trim(this.signUpForm.controls.email.value),
        phoneVerified: true,
        emailVerified: true
      }
    };
    this.signupService.createUser(createRequest).subscribe(
      (response: ServerResponse) => {
        this.initializeFormFields();
        this.toasterService.success("User successfully registered.");
    });
  }

  ngOnDestroy() {
    if (this.tenantDataSubscription) {
      this.tenantDataSubscription.unsubscribe();
    }
    this.unsubscribe.next();
    this.unsubscribe.complete();
    if (this.resourceDataSubscription) {
      this.resourceDataSubscription.unsubscribe();
    }
  }

  setInteractEventData() {
    this.submitInteractEdata = {
      id: 'submit-signup',
      type: 'click',
      pageid: 'signup',
      extra: {
        'contactType': this.signUpForm.controls.contactType.value.toString()
      }
    };
  }
}