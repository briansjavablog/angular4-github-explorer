import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MomentModule } from 'angular2-moment';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserSearchComponent } from './user-search/user-search.component';
import { UserSummaryComponent } from './user-summary/user-summary.component';
import { UserService } from './common/services/user.service';
import { SpinnerComponent } from './common/spinner/spinner.component';
import { PaginationService } from './common/services/pagination.service';
import { RepositoryService } from './common/services/repository.service';
import { RepositoryListComponent } from './repository-list/repository-list.component';
import { AngularFontAwesomeModule } from 'angular-font-awesome/angular-font-awesome';

@NgModule({
  declarations: [
    AppComponent,
    UserSearchComponent,
    UserSummaryComponent,
    SpinnerComponent,
    RepositoryListComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    ReactiveFormsModule,
    MomentModule,
    AngularFontAwesomeModule
  ],
  providers: [ UserService, PaginationService, RepositoryService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
