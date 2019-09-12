import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-mycourses',
  templateUrl: './mycourses.component.html',
  styleUrls: ['./mycourses.component.css']
})
export class MycoursesComponent implements OnInit {
  pass: any;
  courses: any;
  constructor(private userService: UserService) { }

  ngOnInit() {

    this.pass = this.userService.loadToken();
    this.userService.getRegisteredCourse(this.pass.id).subscribe(res =>{
      this.courses = res;
    console.log(res);
    });
  }

}
