import { Component, OnInit, ViewChild, TemplateRef, Input } from '@angular/core';
import { OurProductsService } from 'src/app/formio.service.ts/our-products.service';
import { OurProductsServiceService } from 'src/app/sevices/our-products-service.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { Student } from 'src/app/interface/student.interface';
import { FormConfig } from 'src/interface/formio-config';
import { HelperService } from 'src/app/Helper/helper.service';
import * as _ from 'lodash';
import { LoginService } from 'src/app/sevices/login.service';
import { Observable } from 'rxjs';
import { tokenName } from '@angular/compiler';

@Component({
  selector: 'app-our-new-produts',
  templateUrl: './our-new-produts.component.html',
  styleUrls: ['./our-new-produts.component.css']
})
export class OurNewProdutsComponent implements OnInit {
  @Input('config') config;
  @ViewChild('template', { static: false }) _template;
  formIo: FormConfig = {
    form: {},
    submission: { data: {} },
    onSubmit: data => {
    },
    beforeSubmit: (event, callback) => {
    }
  };
  modalRef: BsModalRef;
  data = {};

  url: string = 'student';
  usersList: Array<Student>;
  productInfo = [];
  configData = {};
  formName = 'Create Plan';
  isAdmin = false;
  submissionData = {};
  selectedFile: FileList;
  currentFile: File;
  progress = 0;
  message = '';
  path = '/assets/image/';
  fileInfos: Observable<any>;
  constructor(

    private ourProductsService: OurProductsService,
    private ourProductsServiceService: OurProductsServiceService,
    private modalService: BsModalService,
    private sanitizer: DomSanitizer,
    private helperService: HelperService,
    private loginService: LoginService
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
    this.getOurProducts();
    // this.isAdmin = this.userinfo['role'] === 'ADMIN' ? true : false;
    this.userinfo(tokenName);
  }

  getPath(plan): string {
    const path = this.path + `${plan.code}`;
    return path;
}

sanitizeImageUrl(imageName: string): SafeUrl {
  const imageUrl = this.path + imageName + '.jpg';
  return this.sanitizer.bypassSecurityTrustUrl(imageUrl);
}

getOurProducts(): void {
  this.ourProductsServiceService.getOurProducts()
      .subscribe(result => {
          console.log(result);
          this.productInfo = result;
      }, err => {
          alert(err);
      })
}

  addOurProducts(): void {
    this.configData = {
      formName: this.formName
    };
    this.openModalWithClass(this._template);
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

  selectFile(event) {
    this.selectedFile = event.target.files[0];
  }

 

  upload(): void {
    const data = this.formIo.submission.data;
    this.submissionData['data'] = data;
    this.submissionData['files'] = this.selectedFile;
    if (data && data['id']) {
      this.ourProductsServiceService.editOurProducts(this.submissionData['data'],this.submissionData['files'], this.submissionData['data']['id'])
        .subscribe(result => {
          console.log(result);
        }, err => {
          alert(err);
        });
    }else{
    this.ourProductsServiceService.upload(this.submissionData)
       .subscribe(event => {

      },
        err => {
          this.progress = 0;
          this.message = 'Could not upload the file!';
          this.currentFile = undefined;
        });
  }
}

  deleteOurProducts(item: any): void {
    this.ourProductsServiceService.deleteOurProducts(item.id)
      .subscribe(result => {
        console.log(result);
      }, err => {
        alert(err);
      });
  }
 

  editOurProducts(item: any): void {
    this.configData = {
        formName: this.formName,
        selectedItem: item
    };
    this.openModalWithClass(this._template, item);
    this.formName = `Edit Plan: ${item.product_info}`;
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
      this.ourProductsService.data = item;
      this.formIo.submission.data = item;
    }
    this.formIo.form = this.ourProductsService.getForm();
  }

  // submitForm(event: any): void {
  //   console.log(event);
  //   this.ourProductsService.submitForm(event.data, () => {
  //     this.modalRef.hide();
  //   });
  // }

}
