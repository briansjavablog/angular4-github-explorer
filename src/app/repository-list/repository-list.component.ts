import { Component, OnInit } from '@angular/core';
import { RepositoryService } from '../common/services/repository.service';
import { PaginationService } from '../common/services/pagination.service';
import { UserService } from '../common/services/user.service';
import { Subscription } from 'rxjs/Subscription';
import * as _ from 'underscore';

@Component({
  selector: 'app-repository-list',
  templateUrl: './repository-list.component.html',
  styleUrls: ['./repository-list.component.css']
})
export class RepositoryListComponent implements OnInit {

  //allRepositories: any;
  pager: any = {};
  pagedRepositories: any[];
  loadingRepoData: boolean;
  subscription: Subscription;
  activeClass:string = '';
  links: any;
  page: number;
  totalItems: number;

  changeStyle($event){
    this.activeClass = $event.type == 'mouseover' ? 'active' : '';
  }

  constructor(private repositoryService: RepositoryService, 
  			      private paginationService: PaginationService,
              private userService: UserService) { }

  ngOnInit() {
  	/*this.subscription = */this.repositoryService.loadRepos
      .subscribe(
        (repositoryUrl: string) => {
           this.retrieveUserRepos(repositoryUrl + '?per_page=5', 1);
           this.totalItems = this.userService.getTotalItems();
        }
      );
  }

  retrieveUserRepos(repositoriesUrl: string, page: number){
    this.loadingRepoData = true;
    this.repositoryService.retrieveUserRepositories(repositoriesUrl)
          .subscribe((links: any) => {
            this.pagedRepositories = _.sortBy(this.repositoryService.getRepos(), 
            						                'created_at').reverse();

            this.links = links;
            //this.setPage(1);
            this.setPage(page, links);

            this.loadingRepoData = false;
          });      
  }

  /*setPage(page: number) {
        if (page < 1 || page > this.pager.totalPages) {
            return;
        }        
        this.pager = this.paginationService.getPager(this.allRepositories.length, page);
        this.pagedRepositories = this.allRepositories.slice(this.pager.startIndex, this.pager.endIndex + 1);
    }
    */
   setPage(page: number, links: any) {
        if (page < 1 || page > this.pager.totalPages) {
            return;
        }        
        // this.pager = this.paginationService.getPager(links.totalPages, page);
        this.pager = this.paginationService.getPager(/*12,*/ page, links.totalPages);
        //this.pagedRepositories = this.allRepositories; //.slice(this.pager.startIndex, this.pager.endIndex + 1);
    }

    specificPage(page: number, links: any) {
      
      this.page = page;
      this.retrieveUserRepos(this.links.linkTemplate + page, page);
    }

    next(page: number){
      this.page = page;
      this.retrieveUserRepos(this.links.next, page);
    }

    previous(page: number){
      this.page = page;
      this.retrieveUserRepos(this.links.previous, page);
    }

    first(){      
      this.retrieveUserRepos(this.links.first, 1); 
    }

    last(){      
      this.retrieveUserRepos(this.links.last, parseInt(this.links.totalPages)); 
    }

    openRepo(url:string){
      window.open(url);
    }
}
