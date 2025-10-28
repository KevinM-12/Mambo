import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { UserInterface } from './UserInterface';
import { Router } from '@angular/router';
import Swal, { SweetAlertIcon } from 'sweetalert2';

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

   navigateTo(path: String){
    this.router.navigate([path]);
  }

  showAlert(status: SweetAlertIcon, message: string){
    const Toast = Swal.mixin({
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 1000,
      timerProgressBar: false,
      didOpen: (toast) => {
        toast.onmouseenter = Swal.stopTimer;
        toast.onmouseleave = Swal.resumeTimer;
      },
      didClose: () => {
        //Codigo cuando termina la alerta.
        console.log("termino");
      }
    });
    Toast.fire({
      icon: `${status}`,
      title: `${message}`
    });
  }

  addUser(){}

  getAllUsers() {
    this.http.get("http://localhost:8080/api/users").subscribe(Users => {
      this.Users = Users;
      console.log(Users);
    });
  }


  ngOnInit() {
    this.getAllUsers();
  }

}
