import { UserService } from './../../services/user.service';

import { ChatService } from './../../services/chat.service';
import { Component, OnInit } from '@angular/core';
import { StarRatingComponent } from 'ng-starrating';
import { CourseService } from '../../services/course.service';
import { ActivatedRoute, Params } from '@angular/router';




@Component({
  selector: 'app-enrolled-course',
  templateUrl: './enrolled-course.component.html',
  styleUrls: ['./enrolled-course.component.css']
})
export class EnrolledCourseComponent implements OnInit {
  courseId: {id: string};
  constructor(private courseService: CourseService,
               private chatService:ChatService,
               private userService: UserService,
               private activatedRoute:ActivatedRoute ) { 

                //chat
                this.chatService.newUserJoined()
                  .subscribe(data=>this.messageArray.push(data));

                this.chatService.userleft()
                  .subscribe(data=>this.messageArray.push(data));  

                 this.chatService.newMessageRecived()
                   .subscribe(data=>this.messageArray.push(data)) ;


                 this.chatService.pastMessageRecived()
                    .subscribe(data=>this.messageArray.push(data)) ; 
               }
//chat start


userId: any;
courseId2: string;

messageArray:Array<{user:String,message}>=[];
messageText:String;


join(){
  const data={
    courseId:this.courseId2,
    userId:this.userId.id
  }
  
  this.chatService.joinChatRoom(data);
  console.log("Array")
  console.log(this.messageArray);
}

leave(){
  const data={
    courseId:this.courseId2,
    userId:this.userId.id
  }

  this.chatService.leaveChatRoom(data);
}

sendMessage(){
  const data={
    courseId:this.courseId2,
    userId:this.userId.id,
    message:this.messageText
  }
this.chatService.sendMessage(data);
}



//end chat






  ngOnInit() {

    this.userId = this.userService.loadToken()

    this.courseService.rating.subscribe((res: string) =>{
      this.courseId.id = res;
      console.log('coursedi')
      console.log(res)
    })

    this.courseId2 = this.activatedRoute.snapshot.paramMap.get('id')
    this.activatedRoute.params.subscribe(
      (params: Params) => {
        this.courseId2 = params['id'];
      }
    );

    console.log(this.userId.id)
    console.log(this.courseId2)
  }

  onRate($event:{oldValue:number, newValue:number, starRating:StarRatingComponent}) {
    // alert(`Old Value:${$event.oldValue},
    //   New Value: ${$event.newValue},
    //   Checked Color: ${$event.starRating.checkedcolor},
    //   Unchecked Color: ${$event.starRating.uncheckedcolor}`);

      const rate = {
        star: $event.newValue
      }

      this.courseService.giveRate(this.courseId.id, rate).subscribe(res =>{
        if(res.state){
          console.log('rate ok');
        }else{
          console.log('rate failed');
        }
      });
      console.log(this.courseId.id);




  }
}


