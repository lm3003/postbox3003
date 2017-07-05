
import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {UserService} from './user.service';
import {User} from './user.model';
import {Router} from '@angular/router';
@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html'
})
export class SignupComponent implements OnInit{
    constructor(private userService: UserService, private router: Router) { }

    myForm: FormGroup;

    onSubmit() {
        console.log(this.myForm);
        const user = new User(
            this.myForm.value.email,
            this.myForm.value.password,
            this.myForm.value.firstName,
            this.myForm.value.lastName
        );
        this.userService.signupUser(user)
            .subscribe(
                result => {
                    this.router.navigate(['/auth','signin']);
                    console.log(result);
                }
            );
        this.myForm.reset();
    }

    ngOnInit() {
        this.myForm = new FormGroup({
           firstName: new FormControl(null, Validators.required),
           lastName: new FormControl(null, Validators.required),
           email: new FormControl(null, [
               Validators.required,
               Validators.email
           ]),
           password: new FormControl(null, Validators.required),
        });
    }

}