import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AccountService } from 'src/app/services/account.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],

})
export class SignUpComponent implements OnInit {
  validateForm: FormGroup;
  alertMSG:string;
  submitForm() {
    console.log('submit begin+' );

    if (this.validateForm.valid) {
      console.log('submit ' + this.validateForm.value["date_of_birth"]);
      let userRegister = {"username":this.validateForm.value["username"]
      , "password":this.validateForm.value["password"]
      , "description":''
      ,"email":this.validateForm.value["email"]
      ,"full_name":this.validateForm.value["full_name"]
      ,"date_of_birth":this.validateForm.value["date_of_birth"]
      
    }
     
      this.account.register(userRegister).subscribe(spUser =>{
        if(spUser){
          if(spUser.status === 200){
            ("login ok");
            this.alertMSG = ''
            this.router.navigateByUrl("/");
          }
          else{
            this.alertMSG = spUser.errorMessage;

          }
        }
        
      });
    } else {
      Object.values(this.validateForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }

  constructor( private account:AccountService,  private router:Router, private formBuilder: FormBuilder) {}
  ngOnInit(): void {
    this.validateForm = this.formBuilder.group({
      username: new FormControl('', [Validators.required,Validators.minLength(8)]),
      full_name: new FormControl('', [Validators.required,Validators.minLength(6)]),
      password: new FormControl('', [Validators.required,Validators.minLength(8)]),
      confirmpassword: new FormControl('', [Validators.required,Validators.minLength(8)]),
      date_of_birth: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required,Validators.email]),
    });
   // throw new Error('Method not implemented.');
  
  }
}
