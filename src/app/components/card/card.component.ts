import { Component, OnInit, TemplateRef, ViewChild, Input } from '@angular/core';
import * as _ from 'lodash';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { FormConfig } from 'src/interface/formio-config';
import { Student } from 'src/app/interface/student.interface';
import { LoginService } from 'src/app/sevices/login.service';
import { WebInfoService } from 'src/app/formio.service.ts/web-info.service';
import { HelperService } from 'src/app/Helper/helper.service';
import { tokenName } from '@angular/compiler';
import { tokenize } from '@angular/compiler/src/ml_parser/lexer';
@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {

  @Input('config') config;
  formIo: FormConfig = {
    form: {},
    submission: { data: {} },
    onSubmit: data => {
    },
    beforeSubmit: (event, callback) => {
    }
  };

  @ViewChild('template', { static: false }) _template;
  modalRef: BsModalRef;

  url: string = 'student';
  usersList: Array<Student>;
  planInfo = [];
  configData = {};
  formName = 'Create Plan';
  isAdmin = false;
  constructor(
    private loginService: LoginService,
    private webInfoService: WebInfoService,
    private modalService: BsModalService,
    private helperService: HelperService,
  ) { }

  formIoOptions = {
    submitMessage: '',
    disableAlerts: true,
    noAlerts: true
  };

  onSignUpFormChange(): void {

  }

  onFormLoad(): void {

  }

  ngOnInit() {
    this.isAdmin = this.helperService.userData['role'] === 'ADMIN' ? true : false;
    // this.isAdmin = this.userinfo['role'] === 'ADMIN' ? true : false;
    this.getPlanInfo();
    this.userinfo(tokenName);
  }



  getPlanInfo(): void {
    this.loginService.getWebPlanInfo()
      .subscribe(result => {
        console.log(result);
        this.planInfo = result;
      }, err => {
        alert(err);
      });
  }
 

  userinfo(token) {
    this.loginService.getuserInfo()
      .subscribe(result => {
        this.helperService.userData = result;
        this.isAdmin = result['role'] === 'ADMIN' ? true : false;

      }, err => {
        alert(err);
      });
  }
  


  openModalWithClass(template: TemplateRef<any>, item?: any) {
    this.modalRef = this.modalService.show(
      template,
      Object.assign({}, { class: 'gray modal-lg' })
    );
    this.showLoginForm(item);
  }


  deletePlan(item: any): void {
    this.loginService.deletePlan(item.id)
      .subscribe(result => {
        console.log(result);
      }, err => {
        alert(err);
      });
  }

  editPlan(item: any): void {
    this.configData = {
      formName: this.formName,
      selectedItem: item
    };
    this.openModalWithClass(this._template, item);
    this.formName = `Edit Plan: ${item.planName}`;
  }

  addPlan(): void {
    this.configData = {
      formName: this.formName
    };
    this.openModalWithClass(this._template);
  }

  showLoginForm(item?: any): void {
    console.log(item);
    if (!_.isEmpty(item)) {
      this.webInfoService.data = item;
      this.formIo.submission.data = item;
    }
    this.formIo.form = this.webInfoService.getForm();
  }

  submitForm(event: any): void {
    console.log(event);
    this.webInfoService.submitForm(event.data, () => {
      this.modalRef.hide();
    });
  }
}
