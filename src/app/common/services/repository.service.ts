import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Subject } from 'rxjs/Subject';
import { RepositoryResult } from '../../model/repository-result.model';
import 'rxjs/Rx';
import { PaginationService } from './pagination.service';

@Injectable()
export class RepositoryService {
  
  loadRepos = new Subject<string>();

  constructor(private http: Http, 
              private paginationService: PaginationService) {}

  private repos: any;
 
  retrieveUserRepositories(reposUrl){
    return this.http.get(reposUrl)
        .map(
          (response: Response)=>{
               this.repos = response.json();   
               let links = this.paginationService.parseLinks(response);
               console.log(links);
               return links;
               //let repositoriesResult = new RepositoryResult('','','');                   
          }
        )           
  }

  public getRepos(){
    return this.repos;
  }
}