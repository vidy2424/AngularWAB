import { OurProductsServiceService } from './../sevices/our-products-service.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OurProductsService {
  data = {};
  constructor(
    private ourProductsServiceService: OurProductsServiceService,

  ) { }
  getForm(config?: any): any {
    return {
      components: [
        {
          autofocus: false,
          input: true,
          tableView: true,
          label: "File",
          key: "File",
          image: false,
          imageSize: "200",
          placeholder: "",
          multiple: false,
          defaultValue: "",
          protected: false,
          persistent: true,
          hidden: false,
          clearOnHide: true,
          filePattern: "*",
          fileMinSize: "0KB",
          fileMaxSize: "1GB",
          type: "file",
          $$hashKey: "object:302",
          labelPosition: "top",
          tags: [
          ],
          conditional: {
            show: "",
            when: null,
            eq: ""
          },
          properties: {
          },
          storage: "base64",
          validate: {
            required: true
          },
          lockKey: true
        },
        {
          type: "button",
          theme: "primary",
          disableOnInvalid: true,
          action: "submit",
          block: false,
          rightIcon: "",
          leftIcon: "",
          size: "md",
          key: "submit",
          tableView: false,
          label: "Submit",
          input: true,
          $$hashKey: "object:22",
          autofocus: false
        }
      ],
    }
  }

  validateForm(submission: any, callback: any): void {
    // tslint:disable-next-line:no-null-keyword
    callback(null, submission);
  }

  submitForm(submission: any): void {
    console.log(submission);
    if (this.data && this.data['id']) {
      this.ourProductsServiceService.editOurProducts(submission, this.data['id'])
        .subscribe(result => {
          console.log(result);
        }, err => {
          alert(err);
        });
    } else {
      this.ourProductsServiceService.OurProducts(submission)
        .subscribe(result => {
          console.log(result);
        }, err => {
          alert(err);
        });
    }
  }

  cleanup(): void {
    throw new Error('Method not implemented.');
  }



}


