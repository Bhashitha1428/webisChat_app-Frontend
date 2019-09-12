import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { DisplaycoursesComponent } from './displaycourses/displaycourses.component';
import { ContentproviderComponent } from './contentprovider/contentprovider.component';
import { AddcourseComponent } from './contentprovider/addcourse/addcourse.component';
import { AccountComponent} from './user/account/account.component';
import { CourseComponent } from './course/course.component';
import { MycoursesComponent } from './user/mycourses/mycourses.component';
import { AdminComponent } from './admin/admin.component';
import { EnrolledCourseComponent } from './course/enrolled-course/enrolled-course.component';

const routes: Routes = [
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: 'home', component: HomeComponent},
  {path: 'enrolled', component:  EnrolledCourseComponent},
  {path: 'course/:id', component: CourseComponent},
  {path: 'course/:id/enrolled', component: EnrolledCourseComponent},

//{path: 'course/:id', component: CourseComponent},

  {path: 'displaycourses', component: DisplaycoursesComponent},
  {path: 'displaycourses/:catergory', component: DisplaycoursesComponent},
  {path: 'displaycourses/:catergory/:subCatergory', component: DisplaycoursesComponent},

  {path: 'contentprovider', component: ContentproviderComponent},
  {path: 'addcourse', component: AddcourseComponent},
  {path: 'account', component: AccountComponent},
  {path: 'mycourses', component: MycoursesComponent},
  {path: 'admin', component: AdminComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
