import { Injectable, EventEmitter } from '@angular/core';
import { Subcourses } from '../subcourse.model';
import {HttpClient,HttpClientModule,HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SubcourseService {

  constructor(private http:HttpClient) { }

    getSubcourses(catergory){

console.log(catergory);
  // const course=this.http.get("http://localhost:3000/course/display");
  const course=this.http.get('http://localhost:3000/subCatergory/display/'+catergory);

   console.log(course);
   console.log("MMMMMMMMMMMMMMM")
   return course;

 }

 courseUpdate = new EventEmitter<string>( )




}
