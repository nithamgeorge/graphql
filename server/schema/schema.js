const graphql =require('graphql');
const _=require("lodash");
const Book = require('../models/book');
const Author = require('../models/author');
const Topic = require('../models/topic');


const{
    GraphQLObjectType,
    GraphQLString,
    GraphQLSchema,
    GraphQLID,
    GraphQLInt,
    GraphQLList
}=graphql;

const BookType = new GraphQLObjectType({
    name:'Book',
    fields:()=>({
        id:{type:GraphQLString},
        name:{type:GraphQLString},
        genre:{type:GraphQLString},
        authorId:{type:GraphQLID},
        // author:{
        //     type:AuthorType,
        //     resolve(parent,args){
        //         console.log(parent);
        //         //return _.find(authors,{id:parent.authorId})
        //       return Author.findById(parent.authorId);
        //     }
        // },
        topics:{
            type:new GraphQLList(TopicType),
            resolve(parent,args){
               // return _.filter(books,{authorId:parent.id})
            return Topic.find({bookid:parent.id})
            }
        }
    })
});

const AuthorType = new GraphQLObjectType({
    name:'Author',
    fields:()=>({
        id:{type:GraphQLString},
        name:{type:GraphQLString},
        age:{type:GraphQLInt},
        books:{
            type:new GraphQLList(BookType),
            resolve(parent,args){
               // return _.filter(books,{authorId:parent.id})
            return Book.find({authorId:parent.id})
            }
        }
    })
});

const TopicType = new GraphQLObjectType({
    name:'Topic',
    fields:()=>({
        id:{type:GraphQLString},
        topicname:{type:GraphQLString},
        bookid:{type:GraphQLString},
    })
});

const RootQuery = new GraphQLObjectType({
    name:'RootQueryType',
    fields:{
        book:{
            type:BookType,
            args:{id:{type:GraphQLString}},
            resolve(parent,args){
    // return _.find(books,{id:args.id});
           return Book.findById(args.id)
            }
        },
        author:{
            type:AuthorType,
            args:{id:{type:GraphQLID}},
            resolve(parent,args){
               // return _.find(authors,{id:args.id});
               return Author.findById(args.id);
            }
        },
         topic: {
            type: TopicType,
            args: { id: { type: GraphQLID } },
            resolve(args) {
                // return _.find(authors,{id:args.id});
                return Topic.findById(args.id);
            }
        },
        books:{
            type:new GraphQLList(BookType),
            resolve(parent,args){ 
               // return books;
               return Book.find({});
            }
        },
        authors:{
            type:new GraphQLList(AuthorType),
            resolve(parent,args){
               // return authors;
               return Author.find({});
            }
        },
        topics:{
            type:new GraphQLList(TopicType),
            resolve(parent,args){
               // return authors;
               return Topic.find({});
            }
        }
       
}});

const Mutation = new GraphQLObjectType({
    name:'Mutation',
    fields:{
        addAuthor:{
            type:AuthorType,
            args:{
                name:{type:GraphQLString},
                age:{type:GraphQLInt}
            },
            resolve(parent,args){
                let author =new Author({
                    name:args.name,
                    age:args.age
                });
                return author.save();
            }
        },
        addBook:{
            type:BookType,
            args:{
                name:{type:GraphQLString},
                genre:{type:GraphQLString},
                authorId:{type:GraphQLID}
            },
            resolve(parent,args){
                  let book = new Book({
                     name:args.name,
                     genre:args.genre,
                     authorId:args.authorId
                  });
                  return book.save();
            }
            
        },
        addTopic: {
            type: TopicType,
            args: {
                topicname: { type: GraphQLString },
                bookid: { type: GraphQLString },
            },
            resolve(parent, args) {
                let topic = new Topic({
                    topicname: args.topicname,
                    bookid: args.bookid
                });
                return topic.save();
            }

        }
    }
})

module.exports =new GraphQLSchema({
    query:RootQuery,
    mutation:Mutation
})

