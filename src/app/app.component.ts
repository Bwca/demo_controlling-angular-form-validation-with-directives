import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  personForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.personForm = this.fb.group({
      name: ['', Validators.required],
      age: [null, Validators.required],
      contact: this.fb.group({
        email: ['', Validators.required],
        phone: ['', Validators.required],
        noAddress: [false],
        address: this.fb.group({
          street: ['', Validators.required],
          city: ['', Validators.required],
          country: ['', Validators.required],
        }),
      }),
      noContact: [false],
    });
  }

  onSubmit(): void {
    console.log(this.personForm.value);
  }
}
