import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {
  selectedFile: File = null;
  userId: any;
  userImg: any;
  pass: any;

  //update name
  fname: string;
  lname: string;
  constructor(private userService: UserService) { }

  ngOnInit() {
     this.pass = this.userService.loadToken();




     this.userService. getUser(this.pass.id).subscribe(response => {
      this.userImg = response;

      console.log(response);
    });



  }
 //set imgage
  onFileSelected(event){
    this.selectedFile = <File>event.target.files[0];
  }

  uploadImage1(){
    const user ={
      fname: this.fname,
      lname: this.lname
    }

    this.userService.updataAccount(user,this.pass.id).subscribe(data =>{
      console.log('update');
      console.log(data.state);
      if(data.state){
        console.log('update success');
      }else{
        console.log('updata failed');
      }
    });
    this.userService.uploadImage(this.selectedFile,this.pass.id);


  }

  onDelete(){

  }

}
