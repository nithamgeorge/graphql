import { Component, OnInit } from '@angular/core';
import {Apollo} from 'apollo-angular';
import {CREATE_BOOK_MUTATION, CreateBookMutationResponse} from '../../graphql';

@Component({
  selector: 'app-addbook',
  templateUrl: './addbook.component.html',
  styleUrls: ['./addbook.component.css']
})
export class AddbookComponent implements OnInit {
  name: string = '';
  genre: string = '';

  constructor(public apollo: Apollo) {
  }

  ngOnInit() {
  }

  addBook() {
    alert(this.name);
    alert(this.genre);
    this.apollo.mutate({
      mutation: CREATE_BOOK_MUTATION,
      variables: {
        name: this.name,
        genre: this.genre
      }
    }).subscribe((response) => {

    });
}
}