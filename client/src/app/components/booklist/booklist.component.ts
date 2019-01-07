import { Component, OnInit } from '@angular/core';
import { Book } from '../../types';
import { AllBookQueryResponse, ALL_BOOKS_QUERY, ALL_BOOKSTOPIC_QUERY,AllBookTopicsQueryResponse } from '../../graphql';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Apollo } from 'apollo-angular';


@Component({
  selector: 'app-booklist',
  templateUrl: './booklist.component.html',
  styleUrls: ['./booklist.component.css']
})
export class BooklistComponent implements OnInit {
  allBooks: Book[] = [];
  topiclist: Book[] = [];

  loading: boolean = true;
  showtopic: any = false;
  constructor(private apollo: Apollo) { }

  ngOnInit() {
    this.apollo.watchQuery({
      query: ALL_BOOKS_QUERY
    }).valueChanges.subscribe((response: any) => {
      // 5
      // console.log(response.data.books);

      this.allBooks = response.data.books;
      this.loading = response.data.loading;
    });
  }
  ///////////////////////////



  public listtopic(index) {
    this.showtopic = true;

    // this.topiclist = this.allBooks.topics;
    // console.log(this.topiclist);
  this.apollo.watchQuery({
      query: ALL_BOOKSTOPIC_QUERY
    }).valueChanges.subscribe((response: any) => {
      console.log(response.data.books);

      // 5
      // for (let i = 0; i < response.data.books.length; i++) {
      //   console.log(response.data.books[i]);
      // }
      this.topiclist = response.data.books[index].topics;
      console.log(response.data.books[index].topics);

      // this.topiclist = response.data.books.

      // this.loading = response.data.loading;
    });
  }





}
