import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { UserService } from '../common/services/user.service';
import { RepositoryService } from '../common/services/repository.service';
import { User } from '../model/user.model';
import * as _ from 'underscore';

@Component({
  selector: 'app-user-repositories',
  templateUrl: './user-summary.component.html'
})
export class UserSummaryComponent implements OnInit {

  user: User;
  username: string;
  allRepos: any;
  pager: any = {};
  pagedItems: any[];
  loadingUserData: boolean;
  loadingRepoData: boolean;

/*  @Output() 
  emitter = new EventEmitter<string>();*/


  constructor(private route: ActivatedRoute, 
              private userService: UserService,
              private repositoryService: RepositoryService) { }
   
  ngOnInit() {
    this.loadingUserData = true;
    this.route.params
      .subscribe(
        (params: Params) => {
          this.username = params['username'];
          this.loadingUserData = true;
          this.loadingRepoData = true;
          this.retrieveUserDetails();
        }
      );
  }

  retrieveUserDetails(){
      this.userService.getUserByUsername(this.username)
          .subscribe(() => {
              this.user = this.userService.getUser();
              setTimeout(()=>{                 
                 //this.retrieveUserRepos(this.user.repos_url);
                 this.repositoryService.loadRepos.next(this.user.repos_url);
                 this.loadingUserData = false;
              }, 1000);                            
          });
  }
}