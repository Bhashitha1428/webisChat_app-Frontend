import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { Course } from '../course.model';

import { CourseService } from '../services/course.service';
import { SubcourseService } from '../services/subcourse.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  //login
  email: string;
  password: string;

  pass: any;
  user:any;

  fullCourse: any;
  loadedCourses: any //Course[];
  loadedSubCourses: any
  loadedCourseVideo: any
// ----------------------------------------------------
  myControl = new FormControl();
  options: string[] = ['Shyamantha', 'Bhashitha', 'Hesith','Keshani','Yasara'];
   filteredOptions: Observable<string[]>;

  constructor(private activatedRoute: ActivatedRoute,
              private courseService: CourseService,
              private subCourseService: SubcourseService,
              private userService: UserService,
              private router: Router) { }

  ngOnInit() {

    this.filteredOptions = this.myControl.valueChanges
    .pipe(
      startWith(''),
      map(value => this._filter(value))
    );

    this.courseService.getFullCourse().subscribe(response =>{
      this.fullCourse=response;
      console.log(this.fullCourse.name)
    });

    console.log('auto complete')
    console.log(this.fullCourse)
    console.log('auto complete')


    this.courseService.getCourses()
    .subscribe(response => {
      this.loadedCourses=response;
    });
    // get user image

    this.userDetails();
  }
  // subcatergory update
   onSelect(courseName: string){
    this.subCourseService. getSubcourses(courseName).subscribe(response => {
      this.loadedSubCourses=response;
      this.subCourseService.courseUpdate.emit(this.loadedSubCourses);


    });
    // main catergory video update
    this.courseService.getCourseVideos(courseName).subscribe(response =>{
      this.loadedCourseVideo=response;
      this.courseService.courseVideoUpdate.emit(this.loadedCourseVideo);
      console.log(response);
    });
   }
  // clickSubCatergories(){
  //   this.loadedSubCourses = this.subCourseService. getSubcourses(this.course2.id).subscribe(response => {
  //     this.loadedCourses=response;
  //     console.log(response);

  //   });
  //}

  onLogin(){
    const user = {
      email: this.email,
      password: this.password
    }


    this.userService.authenticateUser(user).subscribe(data => {
        if (data.success) {
         // this.userService.storeUserData(data.token,data.user);
            console.log('succussful login');
            this.router.navigateByUrl('/mycourses');
            this.userService.storeUserData(data.token, data.user);
            this.userDetails();




        } else {
          console.log('error login');
        }
      });

  }
  onLogout(){
    this.userService.logout();
  }

  userDetails(){
    this.pass = this.userService.loadToken();
    this.userService.getUser(this.pass.id).subscribe(response => {
    this.user=response;
    });
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }


}
