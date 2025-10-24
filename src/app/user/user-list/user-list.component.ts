import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { UserInterface } from './UserInterface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css'
})
export class UserListComponent {
  private http = inject(HttpClient);
  private router = inject(Router);

  Users: any;
  newUser: UserInterface = {
    id: 0,
    name: "",
    lastname: ""
  };

  getAllUsers() {
    this.http.get("http://localhost:8080/api/users").subscribe(Users => {
      this.Users = Users;
      console.log(Users);
    });
  }

  addUser() {
    this.newUser.id = 4;
    this.newUser.name = "Mambo";
    this.newUser.lastname = "Hachimi"

    this.http.post("http://localhost:8080/api/users", this.newUser).subscribe(resultado => {
        console.log(resultado)
      });
    }
  ngOnInit() {
    this.getAllUsers();
  }
}
