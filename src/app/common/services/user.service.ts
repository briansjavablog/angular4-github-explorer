import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { User } from '../../model/user.model';
import 'rxjs/Rx';

@Injectable()
export class UserService {
  
  constructor(private http: Http) {}

  private user :User;
  private username:string;

  getUserByUsername(username: string) {
    this.username = username;
    let url = 'https://api.github.com/users/'.concat(username);
    return this.http.get(url)
      .map(
        (response: Response) => {
          const user: User = response.json();
          this.user  = response.json();                    
        }
      )
  }

  public getUser(){
    return this.user;
  }

  public getUsername(){
    return this.username;
  }

  public getTotalItems(){
    return this.user.public_repos;
  }
}