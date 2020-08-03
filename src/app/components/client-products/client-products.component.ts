import * as _ from 'lodash';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Component, OnInit, ViewChild, Input, TemplateRef } from '@angular/core';
import { FormConfig } from 'src/interface/formio-config';
import { ClientProductsService } from 'src/app/formio.service.ts/client-products.service';
import { ClientProductsServiceService } from 'src/app/sevices/client-products-service.service';
import { Student } from 'src/app/interface/student.interface';

@Component({
  selector: 'app-client-products',
  templateUrl: './client-products.component.html',
  styleUrls: ['./client-products.component.css']
})
export class ClientProductsComponent implements OnInit {

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
  productInfo = [];
  configData = {};
  formName = 'Create Plan';
  constructor(
    private clientProductsService: ClientProductsService,
    private clientProductsServiceService: ClientProductsServiceService,
    private modalService: BsModalService
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
    this.getClientProducts();
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


  openModalWithClass(template: TemplateRef<any>, item?: any) {
    this.modalRef = this.modalService.show(
      template,
      Object.assign({}, { class: 'gray modal-lg' })
    );
    this.showLoginForm(item);
  }

  deleteClientProduct(item: any): void {
    this.configData = item;
    this.formName = `Delete Plan: ${item.planName}`;
  }

  editClientProducts(item: any): void {
    this.configData = {
      formName: this.formName,
      selectedItem: item
    };
    this.openModalWithClass(this._template, item);
    this.formName = `Edit Plan: ${item.planName}`;
  }

  addClientProducts(): void {
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



  submitForm(event: any): void {
    console.log(event);
    this.clientProductsService.submitForm(event.data);
  }

}
