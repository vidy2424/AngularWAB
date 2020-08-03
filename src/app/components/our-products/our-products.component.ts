
import * as _ from 'lodash';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Component, OnInit, ViewChild, TemplateRef, Input } from '@angular/core';
import { FormConfig } from 'src/interface/formio-config';
import { Student } from 'src/app/interface/student.interface';
import { OurProductsService } from 'src/app/formio.service.ts/our-products.service';
import { OurProductsServiceService } from 'src/app/sevices/our-products-service.service';

@Component({
  selector: 'app-our-products',
  templateUrl: './our-products.component.html',
  styleUrls: ['./our-products.component.css']
})
export class OurProductsComponent implements OnInit {

   
  @Input('config') config;
  formIo: FormConfig = {
    form: {},
    submission: { data: {} },
    onSubmit: data => {
    },
    beforeSubmit: (event, callback) => {
    }
  };

  @ViewChild('template', {static: false}) _template;
  modalRef: BsModalRef;

  url: string = 'student';
  usersList: Array<Student>;
  productInfo = [];
  configData = {};
  formName = 'Create Plan';
  constructor( 
    private ourProductsService: OurProductsService,
    private ourProductsServiceService: OurProductsServiceService,
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
    this.getOurProducts();
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
 

  openModalWithClass(template: TemplateRef<any>, item?:any) {
    this.modalRef = this.modalService.show(
      template,
      Object.assign({}, { class: 'gray modal-lg' })
    );
    this.showLoginForm(item);
  }

  deleteProduct(item: any): void {
    this.configData = item;
    this.formName = `Delete Plan: ${item.planName}`;
  }

  editOurProducts(item: any): void {
    this.configData = {
      formName: this.formName,
      selectedItem: item
    };
    this.openModalWithClass(this._template, item);
    this.formName = `Edit Plan: ${item.planName}`;
  } 

  addOurProducts(): void {
    this.configData = {
      formName: this.formName
    };
    this.openModalWithClass(this._template);
  }

  showLoginForm(item?:any): void {
    console.log(item);
    if (!_.isEmpty(item)) {
      this.ourProductsService.data = item;
      this.formIo.submission.data = item;
    }
    this.formIo.form = this.ourProductsService.getForm();
  }
 


  submitForm(event: any): void {
    console.log(event);
    this.ourProductsService.submitForm(event.data);
  }  
}
