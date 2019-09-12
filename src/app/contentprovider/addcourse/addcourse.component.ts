import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { course } from './addcourse.model';
import { SubcatergoryService } from 'src/app/services/subcatergory.service';
import { CatergoryService } from 'src/app/services/catergory.service';
import { CourseService } from 'src/app/services/course.service';



@Component({
  selector: 'app-addcourse',
  templateUrl: './addcourse.component.html',
  styleUrls: ['./addcourse.component.css']
})
export class AddcourseComponent implements OnInit {
 loadedCatergory: any;
 loadedSubcatergory: any;
 catergory: any;
//  course = new course();
//    dataArray =[];

   contentForm: FormGroup;


  constructor(private fb: FormBuilder, private subCatergoryService: SubcatergoryService, private catergoryService: CatergoryService, private courseService: CourseService) { }

  ngOnInit() {
    this.subCatergoryService.getSubcatergory().subscribe(res =>{
      this.loadedSubcatergory = res;
      console.log(res);

    });

    this.catergoryService.getCatergory().subscribe(res =>{
      this.loadedCatergory = res;
      console.log(res);
    });

    this.contentForm = this.fb.group({
      name: ['',Validators.required],
      description: ['',Validators.required],
      catergory: ['',Validators.required],
      subCatergory: ['',Validators.required],
      type: ['',Validators.required],
      skillLevel: ['',Validators.required],
      topic: new FormArray([]),
      file : new FormArray([])
    });


    // this.userForm = new FormGroup({
    //   subTopic: new FormArray([])
    // });


  // set contactlist to the form control containing contacts

  //   this.course = new course();
  //  this.dataArray.push(this.course);
  }

  whenClicked = []
  whenText = []
  k:number = -1;

text: string = 'upload';
 upClick(){
  if(this.text === 'upload') {
    this.text = 'uploaded'
  }
 }
  onDelete(i: number) {
    (this.contentForm.get('topic') as FormArray).removeAt(i);
    (this.contentForm.get('file') as FormArray).removeAt(i);
  }
  onAdd() {

    const control = new FormControl(null, Validators.required);
   // const control2 = new FormControl(null, Validators.required);
    (this.contentForm.get('topic') as FormArray).push(control);
    //(this.contentForm.get('file') as FormArray).push(control2);
    this.k++;
  }

  upload(){
    const control2 = new FormControl('id', Validators.required);
    (this.contentForm.get('file') as FormArray).push(control2);
  }




  // addCouse(subTopic: HTMLInputElement){
  //   (<FormArray>this.userForm.get('subTopic')).push(new FormControl(subTopic.value));

  // }
  // deleteCouse(index){
  //   (<FormArray>this.userForm.get('subTopic')).removeAt(index);
  // }

//  editCourse(input1){
//   // this.editTopic=this.userForm.get('subTopic').value[index];
//   // console.log(this.userForm.get('subTopic').value[index])
//   console.log(this.editTopic)
//  }
  // add a contact form group


// remove contact from group






// addForm(){
//   this.course = new course();
//    console.log(this.course)
//    console.log(this.dataArray)
//   this.dataArray.push({name: 'name',
//                        video: 'file',
//                        file:'video'});
// }
// removeForm(index){

// console.log(index)
// //delete this.dataArray[]
// this.dataArray.splice(index,1);
// // for(this.i=0; this.i<index; this.i++){
// //   this.dataArray.push(this.course);
// // }




// }

onSubmit(){
  //console.log(this.userForm.get('subTopic').value)
console.log(this.contentForm.get('topic').value);
console.log(this.contentForm.get('file').value)
console.log(this.contentForm.get('type').value)
console.log("course")
console.log(this.contentForm.value);
this.courseService.Addcourse(this.contentForm.value).subscribe(res => {
  if(res.state){
    console.log('add ok')
    console.log(res);
  }else{
    console.log('add failed')
  }
  });

}

}
