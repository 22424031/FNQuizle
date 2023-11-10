import { Component, OnInit } from '@angular/core';
import { FormControl,Validators , FormGroup ,FormBuilder} from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Alert, AlertOptions, AlertType } from 'src/app/models/alert';
import { AccountService } from 'src/app/services/account.service'; 
import { AlertService } from 'src/app/services/alert.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
   validateForm: FormGroup;
   alertMSG:string;
  submitForm() {
    console.log('submit begin+' );

    if (this.validateForm.valid) {

      console.log('submit ');
      this.account.login(this.validateForm.value["userName"], this.validateForm.value["passWord"]).subscribe(spUser =>{
        if(spUser){
          if(spUser.status === 200){
            ("login ok");
            this.alertMSG = ''
            
            setTimeout(() => {
              window.location.reload();
              
            }, 500);
            this.router.navigateByUrl("studysetlist");
          
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

  constructor( private account:AccountService, private alert:AlertService, private router:Router, private formBuilder: FormBuilder) {}
  ngOnInit(): void {
    this.validateForm = this.formBuilder.group({
      userName: new FormControl('', [Validators.required]),
      passWord: new FormControl('', [Validators.required]),
    });
   // throw new Error('Method not implemented.');
  
  }
}
