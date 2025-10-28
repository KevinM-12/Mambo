import { Routes } from '@angular/router';
import { UserAddComponent } from './user/user-add/user-add.component';
import { UserComponent } from './user/user.component';
import { UserUpdateComponent } from './user/user-update/user-update.component';

export const routes: Routes = [
    {path: 'user', component: UserComponent},
    {path: 'user/add', component: UserAddComponent},
    {path: 'user/update/:id', component: UserUpdateComponent},
    {path:'', component: UserComponent}
];
