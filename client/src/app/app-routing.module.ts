import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BooklistComponent } from './components/booklist/booklist.component';
import { AddbookComponent } from './components/addbook/addbook.component';

const routes: Routes = [
  { path: '', component: BooklistComponent },
 { path: 'add', component: AddbookComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }



//