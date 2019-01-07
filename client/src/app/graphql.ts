import {Book} from './types';
// 1
import gql from 'graphql-tag'

// 2
export const ALL_BOOKS_QUERY = gql`
  query AllBooksQuery {
    books {
     name
     genre
     authorId
   
    }
  }
`;
export const ALL_BOOKSTOPIC_QUERY = gql`
query AllBookstopicQuery {
  books {
   name
   topics{
    topicname
  }
  }
}
`;


// 3
export interface AllBookQueryResponse {
  allBooks: Book[];
  loading: boolean;
}
export interface AllBookTopicsQueryResponse {
  topiclist: Book[];
  loading: boolean;
}
//mutation
export const CREATE_BOOK_MUTATION = gql`
  # 2
  mutation CreateBookMutation($name: String!, $genre: String!) {
    addBook(
      name: $name,
      genre: $genre,
    ) {
      id
      createdAt
      genre
      name
    }
  }
`;

//3
export interface CreateBookMutationResponse {
  createBook: Book;
  loading: boolean;
}
//mutation