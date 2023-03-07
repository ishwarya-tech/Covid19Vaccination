import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Register } from 'src/app/interfaces';
import { AlertService } from 'src/app/services/alert.service';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  editFlag:boolean = false;
  register: Register;

  constructor(
    private alert: AlertService,
    private auth: AuthService,
    private router: Router
  ) { 
    this.register = {}
  }

  ngOnInit() { 
    if(this.router.url.includes('register')){
      sessionStorage.removeItem('editUser')
    }else{
      this.editFlag = true;
      this.register = JSON.parse(sessionStorage.getItem('editUser') || '{}');
      this.register['adrNumber'] = JSON.parse(sessionStorage.getItem('editUser') || '{}').aadharcard.aadharNo;
    }
  }

  onSubmit(ngForm: NgForm) {

    if (ngForm.form.invalid) {
      this.alert.error("Please fill required elements");
      return;
    }

    if(!this.editFlag){      
      this.auth.registerUser(ngForm.form.value);
    }else{
      this.auth.editRegisterUser(this.register);
    }

  }

}
