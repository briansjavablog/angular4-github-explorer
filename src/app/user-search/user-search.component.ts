import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../common/services/user.service';
import { User } from '../model/user.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-user-search',
  templateUrl: './user-search.component.html'
})
export class UserSearchComponent implements OnInit {

	userSearchForm: FormGroup;
	username: string;
	loadingUser: boolean;

    constructor(private userService: UserService, private router: Router) { }

	ngOnInit() {
		this.initForm();
  	}

  	private initForm(){
  		this.userSearchForm = new FormGroup({
		  'username': new FormControl(this.username, Validators.required)
		});	
  	}
	
    onSubmit(){
    	this.loadingUser = true;
    	let username = this.userSearchForm.controls.username.value;
	  	this.userService.getUserByUsername(username)
	  			.subscribe(() => {
	  			      this.loadingUser = false;
			          this.router.navigate(['user-repositories', username ]);
			        }
			      );
  }

}
