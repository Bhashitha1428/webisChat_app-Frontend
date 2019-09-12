import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-contentprovider',
  templateUrl: './contentprovider.component.html',
  styleUrls: ['./contentprovider.component.css']
})
export class ContentproviderComponent implements OnInit {

  constructor() { }
  courses = [1, 2, 3, 4, 5];
  ngOnInit() {
  }

}
