import * as _ from 'lodash';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Component, OnInit, ViewChild, Input, TemplateRef } from '@angular/core';
import { FormConfig } from 'src/interface/formio-config';
import { ClientProductsService } from 'src/app/formio.service.ts/client-products.service';
import { ClientProductsServiceService } from 'src/app/sevices/client-products-service.service';
import { Student } from 'src/app/interface/student.interface';
import { Observable } from 'rxjs';
import { OurProductsService } from 'src/app/formio.service.ts/our-products.service';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { HelperService } from 'src/app/Helper/helper.service';
import { LoginService } from 'src/app/sevices/login.service';
import { tokenName } from '@angular/compiler';

@Component({
  selector: 'app-client-products',
  templateUrl: './client-products.component.html',
  styleUrls: ['./client-products.component.css']
})
export class ClientProductsComponent implements OnInit {

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

    private clientProductsService: ClientProductsService,
    private clientProductsServiceService: ClientProductsServiceService,
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
    this.getClientProducts();
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

getClientProducts(): void {
  this.clientProductsServiceService.getClientProducts()
      .subscribe(result => {
          console.log(result);
          this.productInfo = result;
      }, err => {
          alert(err);
      })
}

  addClientProducts(): void {
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
        // alert(err);
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
      this.clientProductsServiceService.editClientProducts(this.submissionData['data'],this.submissionData['files'], this.submissionData['data']['id'])
        .subscribe(result => {
          console.log(result);
        }, err => {
          alert(err);
        });
    }else{
    this.clientProductsServiceService.upload(this.submissionData)
       .subscribe(event => {

      },
        err => {
          this.progress = 0;
          this.message = 'Could not upload the file!';
          this.currentFile = undefined;
        });
  }
}

deleteClientProducts(item: any): void {
    this.clientProductsServiceService.deleteClientProducts(item.id)
      .subscribe(result => {
        console.log(result);
      }, err => {
        alert(err);
      });
  }
 

  editClientProducts(item: any): void {
    this.configData = {
        formName: this.formName,
        selectedItem: item
    };
    this.openModalWithClass(this._template, item);
    this.formName = `Edit Plan: ${item.client_product_name}`;
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
      this.clientProductsService.data = item;
      this.formIo.submission.data = item;
    }
    this.formIo.form = this.clientProductsService.getForm();
  }

  // submitForm(event: any): void {
  //   console.log(event);
  //   this.ourProductsService.submitForm(event.data, () => {
  //     this.modalRef.hide();
  //   });
  // }

}
