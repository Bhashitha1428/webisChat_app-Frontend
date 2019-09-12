import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
   allUsers: any;
  constructor(private userService: UserService) { }

  ngOnInit() {
    this.userService.getAllUser().subscribe(res =>{
      this.allUsers = res;
      console.log(res);
    });

  }

}
