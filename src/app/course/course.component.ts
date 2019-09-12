import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { CourseService } from '../services/course.service';
import { UserService } from '../services/user.service';


import { from } from 'rxjs';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css']
})
export class CourseComponent implements OnInit {

  loadedCourse: any;
  //course: {id: string}
  pass: any;
  course: string

  courseId: any;
  userId: any;
  constructor(private activatedRoute: ActivatedRoute, private courseService: CourseService, private userService: UserService) { }

  ngOnInit() {
    // this.course = {
    // };
    this.course = this.activatedRoute.snapshot.paramMap.get('id')
    this.activatedRoute.params.subscribe(
      (params: Params) => {
        this.course = params['id'];
      }
    );

    this.pass = this.userService.loadToken();
    // this.courseService.courseDetail.subscribe(
    //   (course: string)=>{
    //   this.loadedSubCourses=course;
    //   }
    // );
    //get course details
    this.courseService.displaycourse(this.course).subscribe(response =>{
      this.loadedCourse=response;
      console.log(response)
    })

    this.courseService.rating.emit(this.course);

  }

  onRegisterCourse(){
    const course ={
      userId: this.pass.id,
      courseId: this.course
    }
    console.log('success');
    console.log(course);
    this.courseService.registerUserToCourse(course,this.course).subscribe(res =>{
     if(res.state){
       console.log('succefully register to course');
     }else{
       console.log('register faild');
     }

      // console.log(res.state)
      // if(res.state){
      //   console.log("successfully register");
      // }else{
      //   console.log('register failed');
      // }
    }
   )

  }



}
