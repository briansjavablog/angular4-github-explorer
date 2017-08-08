
export class RepositoryResult {

  private repositoriesPage: any;
  private nextLink: string;
  private previousLink: string; 

  constructor(repositoriesPage: any, 
  			  nextLink: string, previousLink: string){

  	this.repositoriesPage = repositoriesPage;
  	this.nextLink = nextLink;
  	this.previousLink = previousLink;
  }
}