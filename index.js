import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { typeDefs } from "./schema.js";
import data from "./_db.js"


const resolvers = {
    Query:{
        games:function(){
            return data.games
        },
        game:function(parent,args,context){
            return data.games.find(game => game.id == args.id)
        },
        reviews:function(){
            console.log(data.reviews)
            return data.reviews
        },
        review:function(parent,args,context){
            return data.reviews.find(review=> review.id == args.id)
        },
        authors:function(){
            return data.authors
        },
        author:function(parent,args,context){
            return data.authors.find(author => author.id == args.id)
        },
    },
    Game:{
        reviews:function(parent){
            return data.reviews.filter(review => review.game_id == parent.id)
        }
    },
    Author:{
        reviews:function(parent){
            return data.reviews.filter(review => review.author_id == parent.id)
        }
    },
    Review:{
        author:function(parent){
            return data.authors.find(author => author.id == parent.author_id)
        },
        game:function(parent){
            return data.games.find(game => game.id === parent.game_id)
        }
    }
}

//server setup

const graphQlServer = new ApolloServer({
    //typeDefs
    typeDefs,
    //resolvers function
    resolvers
})

//starting server for listening
const {url} = await startStandaloneServer(graphQlServer,{
    listen:{
        port:5001
    }
})

console.log("graphl server started",url)