import { OurProductsServiceService } from '../sevices/our-products-service.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MeetTheTeamForm {
  data = {};
  constructor(
    private ourProductsServiceService: OurProductsServiceService,

  ) { }
  getForm(config?: any): any {
    return {
 
      components: [
        {
            label: 'member_name',
            tableView: true,
            key: 'member_name',
            type: 'textfield',
            input: true
        },
        {
          label: 'profile_name',
          tableView: true,
          key: 'profile_name',
          type: 'textfield',
          input: true
        },
        // {
        //     "type": "button",
        //     "label": "Submit",
        //     "key": "submit",
        //     "disableOnInvalid": true,
        //     "input": true,
        //     "tableView": false
        // }
    ]
    }
  }

  validateForm(submission: any, callback: any): void {
    // tslint:disable-next-line:no-null-keyword
    callback(null, submission);
  }

  submitForm(submission: any): void {
    console.log(submission);
    if (this.data && this.data['id']) {
      // this.ourProductsServiceService.editOurProducts(submission, this.data['id'])
      //   .subscribe(result => {
      //     console.log(result);
      //   }, err => {
      //     alert(err);
      //   });
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


