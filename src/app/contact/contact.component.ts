import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmailService } from '../services/email.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.less']
})
export class ContactComponent implements OnInit {

  contactForm: FormGroup;
  submitted: Boolean = false;
  sent: Boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private emailService: EmailService
  ) { }

  ngOnInit() {
    this.contactForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      subject: ['', Validators.required],
      body: ['', Validators.required]
    })
  }

  sendEmail () {
    this.submitted = true;
    if (this.contactForm.invalid) {
      return;
    }
    this.emailService.sendEmail(this.contactForm.value).subscribe(() => {
      this.sent = true;
      this.submitted = false;
      this.contactForm.reset();
    })
  }
}
