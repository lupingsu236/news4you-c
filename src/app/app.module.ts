import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { WebcamModule } from 'ngx-webcam';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { NewsComponent } from './components/news.component';
import { NewsService } from './news.service';
import { PostComponent } from './components/post.component';
import { CameraComponent } from './components/camera.component';
import { PostService } from './post.service';
import { LoginComponent } from './components/login.component';
import { UserService } from './user.service';
import { LoginGuard } from './login.guard';


const ROUTES: Routes = [
  { path: "", component: NewsComponent }, 
  { path: "login", component: LoginComponent},
  { path: "post", component: PostComponent, canActivate: [LoginGuard] }, 
  { path: "capture", component: CameraComponent, canActivate: [LoginGuard] },
  { path: "**", redirectTo:"/", pathMatch: "full"} //only activate redirect to home if full path cannot be matched
]


@NgModule({
  declarations: [
    AppComponent,
    NewsComponent,
    PostComponent,
    CameraComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule, HttpClientModule, 
    RouterModule.forRoot(ROUTES), WebcamModule, 
    FormsModule, ReactiveFormsModule
  ],
  providers: [NewsService, PostService, UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
 