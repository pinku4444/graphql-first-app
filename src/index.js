import {ApolloServer,PubSub} from 'apollo-server';
import {importSchema} from 'graphql-import'
import cors from 'cors'
const typeDefs = importSchema('./src/schema.graphql')
import db from './db'
import resolvers from './resolvers/index'
const pubSub = new PubSub();

const server = new ApolloServer({
    typeDefs,
    resolvers,
    context : {
        db,
        pubSub
    }
});


server.listen('6002',(req,res) => {
    console.log(`Server started at 5000 port`);
})