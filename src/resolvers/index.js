import Mutation from './Mutation';
import Query from './Query';
import Post from './Post';
import User from './User';
import Comment from './Comment';
import Subscription from './Subscription'



const resolvers = {
    Query,
    Mutation,
    Post ,
    User ,
    Comment,
    Subscription
}


export {resolvers as default}