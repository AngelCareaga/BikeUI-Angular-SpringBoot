import { Component, OnInit } from '@angular/core';

import { BikeService } from '../../services/bike.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  models: string[];
  contacts: boolean[];
  bikeForm: FormGroup;
  validMessage: string;

  constructor(private bikeService: BikeService) {
    this.models = [
      'Globo MTB',
      'Globo Carbon',
      'Globo Time'
    ];
    this.contacts = [
      true,
      false
    ];
    this.validMessage = '';
  }

  ngOnInit() {
    this.bikeForm = new FormGroup({
      name: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required),
      phone: new FormControl('', Validators.required),
      model: new FormControl('', Validators.required),
      serialNumber: new FormControl('', Validators.required),
      purchasePrice: new FormControl('', Validators.required),
      purchaseDate: new FormControl('', Validators.required),
      contact: new FormControl('', Validators.required),
    });
  }

  submitRegistration() {
    if (this.bikeForm.valid) {
      this.validMessage = 'Your bike registration has been submited. Thank you!';
      this.bikeService.createBikeRegistration(this.bikeForm.value).subscribe(
        data => {
          this.bikeForm.reset();
          return true;
        },
        error => {
          return Observable.throw(error);
        }
      );
    } else {
      this.validMessage = 'Please fill out the form before submit';
    }
  }

}
