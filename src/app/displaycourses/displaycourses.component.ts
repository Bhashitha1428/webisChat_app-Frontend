import { Component, OnInit, Input, Output } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Subcourses } from '../subcourse.model';
import { SubcourseService } from '../services/subcourse.service';
import { CourseService } from '../services/course.service';
import { Course } from '../course.model';
import { EventEmitter } from 'events';
import { StarRatingComponent } from 'ng-starrating';

import { MatCheckbox } from '@angular/material'
import { ViewChild } from '@angular/core';

@Component({
  selector: 'app-displaycourses',
  templateUrl: './displaycourses.component.html',
  styleUrls: ['./displaycourses.component.css']
})
export class DisplaycoursesComponent implements OnInit {



  loadedSubCourses:any // Subcourses[];
  loadedCourseVideo: any
  loadedCourseVideosub: any

  mainCourse: { id: string }
  subCourse: {id: string}

  // filter Skill level
  @ViewChild('fBeginner') private fBeginner: MatCheckbox;
  @ViewChild('fIntermediate') private fIntermediate: MatCheckbox;
  @ViewChild('fAdvance') private fAdvance: MatCheckbox;

    beginner: string;
    intermediate: string;
    advance: string;

    checkedbeginner = true;
    checkedintermediate = true;
    checkedadvance = true;

  // filter type
 @ViewChild('fPaid') private fPaid: MatCheckbox;
 @ViewChild('fFree') private fFree: MatCheckbox;

  paid: string;
  free: string;

  checkedpaid = true;
  checkedfree = true;

   // filter duration

   @ViewChild('fLessMonth') private fLessMonth: MatCheckbox;
   @ViewChild('fLess3Month') private fLess3Month: MatCheckbox;
   @ViewChild('fMore3Month') private fMore3Month: MatCheckbox;

   lessmonth: string;
   less3month: string;
   more3month: string;

   checkedlessmonth = true;
   checkedless3month = true;
   checkedmore3month = true;


  constructor(private activatedRoute: ActivatedRoute, private subCourseService: SubcourseService, private courseService: CourseService ) { }

  ngOnInit() {

    // get activated route main course

    this.mainCourse = {
      id: this.activatedRoute.snapshot.paramMap.get('catergory')
    };
    this.activatedRoute.params.subscribe(
      (params: Params) => {
        this.mainCourse.id = params['catergory'];
      }
    );

    //get activated route subcourse
    this.subCourse = {
      id: this.activatedRoute.snapshot.paramMap.get('subCatergory')
    };
    this.activatedRoute.params.subscribe(
      (params: Params) => {
        this.subCourse.id = params['subCatergory'];
      }
    );

      // display sub courses
    this.subCourseService. getSubcourses(this.mainCourse.id).subscribe(response => {
      this.loadedSubCourses=response;

      console.log(response);
    });


    this.subCourseService.courseUpdate.subscribe(
      (course: string)=>{
      this.loadedSubCourses=course;
      console.log(this.loadedSubCourses);
      }

    );
    console.log('ssssssssssssssss');
    console.log(this.loadedSubCourses);

    //display videos

    this.courseService.getCourseVideos(this.mainCourse.id).subscribe(response =>{
      this.loadedCourseVideo=response;
      console.log(response);
    });

    this.courseService.courseVideoUpdate.subscribe(
      (courseVideos: string) => {
        this.loadedCourseVideo=courseVideos;
      }
    );

    //display videos according to sub catergories

    this.courseService.getCourseVideossub(this.mainCourse.id,this.subCourse.id).subscribe(response =>{
      this.loadedCourseVideosub = response;
      console.log(response);
    });


  }

  // display videos according to sub catergories
  onSubCourse(mCourse: string, sCourse: string){
    this.courseService.getCourseVideossub(mCourse,sCourse).subscribe(response =>{
      this.loadedCourseVideosub = response;
      console.log(this.subCourse.id);
      console.log(response);
    });
  }

  onRate($event:{oldValue:number, newValue:number, starRating:StarRatingComponent}) {
    alert(`Old Value:${$event.oldValue},
      New Value: ${$event.newValue},
      Checked Color: ${$event.starRating.checkedcolor},
      Unchecked Color: ${$event.starRating.uncheckedcolor}`);

  }



// filter type
  onPaid() {
  if (this.checkedpaid) {

    this.paid = this.fPaid.value;

    //console.log(this.name);
    this.checkedpaid = false;
  } else {
    this.paid = null;
    this.checkedpaid = true;
  }
  }

   onFree() {
    if (this.checkedfree) {

      this.free = this.fFree.value;

      //console.log(this.name);
      this.checkedfree = false;
    } else {
      this.free = null;
      this.checkedfree = true;
    }
    }







    onBeginner() {
      if (this.checkedbeginner) {

        this.beginner = this.fBeginner.value;

        this.checkedbeginner = false;
      } else {
        this.beginner = null;
        this.checkedbeginner = true;
      }
      }

      onIntermediate() {
        if (this.checkedintermediate) {

          this.intermediate = this.fIntermediate.value;
          this.checkedintermediate = false;
        } else {
          this.intermediate = null;
          this.checkedintermediate = true;
        }
        }
        onAdvance() {
          if (this.checkedadvance) {

            this.advance = this.fAdvance.value;
            this.checkedadvance = false;
          } else {
            this.advance = null;
            this.checkedadvance = true;
          }
          }


          onLessMonth() {
            if (this.checkedlessmonth) {
              this.lessmonth = this.fLessMonth.value;
              this.checkedlessmonth = false;
            } else {
              this.lessmonth = null;
              this.checkedlessmonth = true;
            }
          }

            onLess3Month() {
              if (this.checkedless3month) {
                this.less3month = this.fLess3Month.value;
                this.checkedless3month = false;
              } else {
                this.less3month = null;
                this.checkedless3month = true;
              }
            }
            onMore3Month() {
              if (this.checkedmore3month) {
                this.more3month = this.fMore3Month.value;
                this.checkedmore3month = false;
              } else {
                this.more3month = null;
                this.checkedmore3month = true;
              }
              }


}

