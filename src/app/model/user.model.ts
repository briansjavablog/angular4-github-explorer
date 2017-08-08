
export class User {
  
  public name;
  public avatar_url: string;
  public html_url: string;
  public repos_url: string;
  public location: string;
  public email: string;
  public blog: string;
  public public_repos: number;
  public followers: number;
    
  constructor(name: string, avatarUrl: string, githubUrl: string, reposUrl: string, 
              location: string, email: string, blog: string, 
              publicRepos: number, followers: number) {
    this.name = name;
    this.avatar_url = avatarUrl;
    this.html_url = githubUrl;
    this.repos_url = reposUrl;
    this.location = location;
    this.email = email;
    this.blog = blog;
    this.public_repos = publicRepos;
    this.followers = followers;
  }
}