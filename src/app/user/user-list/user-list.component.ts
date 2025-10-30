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


  getAllUsers() {
    this.http.get("http://localhost:8080/api/users").subscribe(Users => {
      this.Users = Users;
      console.log(Users);
    });
  }

  deleteUser(userId: String) {
    Swal.fire({
      title: "¿Estas seguro de eliminar?",
      text: `Si estás seguro eliminar el registo ${userId}, Acepta`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, eliminar"
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Eliminado",
          text: "El registro fue eliminado",
          icon: "success"
        });

        this.router.navigate(["/"]);
      }
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

  deleteUserById(){
    this.http.delete(`http://localhost:8080/api/users`).subscribe(resultado => {
      //console.log(resultado);
      this.showAlert("success", "Se elimino correctamente");

      console.log(resultado);
    });
  }

  ngOnInit() {
    this.getAllUsers();
  }

  }

