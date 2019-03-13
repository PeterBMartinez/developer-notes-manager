import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.less']
})
export class NavigationComponent implements OnInit {

  constructor(private user: UserService) { }

  ngOnInit() {
  }

  get currentRole() {
    return this.user.role
  }

}
