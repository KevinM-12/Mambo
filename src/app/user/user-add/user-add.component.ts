import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { UserInterface } from '../user-list/UserInterface';

@Component({
  selector: 'app-user-add',
  standalone: true,
  imports: [ ReactiveFormsModule ],
  templateUrl: './user-add.component.html',
  styleUrl: './user-add.component.css'
})
export class UserAddComponent {
  formulario = new FormGroup({

    id: new FormControl(''),
    name: new FormControl(''),
    lastname: new FormControl('')
  });

  newUser: UserInterface = {
    id: 0,
    name: "",
    lastname: ""
  }
  
  private http = inject(HttpClient);
  private router = inject(Router)

  addNewUser() {

    this.newUser.id = Number(this.formulario.controls.id.value);
    this.newUser.name = String(this.formulario.controls.name.value);
    this.newUser.lastname = String(this.formulario.controls.lastname.value);

    this.http.post("http://localhost:8080/api/users", this.newUser).subscribe(resultado => {
      console.log(resultado);
    });

    this.router.navigate(["/"]);
    
  }
}
