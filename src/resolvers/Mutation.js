import uuidv4 from 'uuid/v4';
import {POST} from './constant'

const Mutation = {
    createUser : (parent ,args, {db}, info) => {

        const {name,email,age} = args.data;
        const isEmailTaken = db.users.some((user) => {
            return user.email === email;
        })
        if(isEmailTaken) {
            throw new Error("Email Already Taken")
        }

        const user = {
            id : uuidv4(),
            ...args.data
        }

        db.users.push(user);
        return user;
    },
    deleteUser : (parent, args, {db}, info) => {
        const {id} = args;

        const index = db.users.findIndex((user) => {
            return user.id === id
        })

        if(index === -1) {
            throw new Error("User not exist")
        }

        const deletedUser = db.users.splice(index,1);            

        db.posts = db.posts.filter((post) => {
            const match = post.author === id

            if(match) {
                db.comments = db.comments.filter((comment) => {
                    return comment.post !== post.id
                })
            }
            return ! match;
        })

        db.comments = db.comments.filter((comment) => comment.author !== id )

        return deletedUser[0];

    },
    updateUser : (parent, args, {db}, info) => {
        const {id,data} = args;
        

        const user = db.users.find((user) => { return user.id === id })
        if(!user) {
            throw new Error("User not exist")
        }

        if(typeof data.email == "string" ) {
            const isEmailExist = db.users.some((user) => {
                return (user.email === data.email) && user.id !== id;
            })
            if(isEmailExist){
                throw new Error("Email Already taken")
            }

            user.email = data.email
        }

        if(typeof data.name == "string") {
            user.name = data.name
        }

        if(typeof data.age != undefined) {
            user.age = data.age
        }
        
        return user;
    },
    createPost : (parent,args,{db,pubSub},info) => {
        const {author} =  args.data;
        const isUserExist = db.users.some((user) => {
            return user.id === author
        })
        if(!isUserExist) {
            throw new Error("User not exist")
        }

        const post = {
            id:uuidv4(),
            ...args.data
        }
        db.posts.push(post);
        if(post.published) {
            pubSub.publish(POST,{
                post : {
                    Mutation: "CREATED",
                    data: post
                }
                
            })
        }
        return post
    },
    deletePost : (parent, args, {db}, info) => {

        const {id} = args;
        const postIndex = db.posts.findIndex((post) => post.id === id);
        if(postIndex === -1) {
            throw new Error("Post not exist")
        }
        const deletedPost = db.posts.splice(postIndex,1);

        comments = db.comments.filter((comment) => comment.post !== id)

        return deletedPost[0];
    },
    updatePost :(parent, args, {db,pubSub}, info) => {
        const {id,data} = args;
        const post = db.posts.find((post) => post.id === id)
        const originalPost = {...post}

        if(!post) {
            throw new Error("User Not find")
        }

        if(typeof data.title == "string") {
            post.title = data.title
        }

        if(typeof data.body == "string") {
            post.body = data.body
        }
        console.log(typeof data.published);
        if(typeof data.published == "boolean") {
            
            post.published = data.published
            if(originalPost.published && !post.published) {
                pubSub.publish(POST,{
                    post:{
                        Mutation: "DELETED",
                        data: originalPost
                    }
                    

                })
            }else if(!originalPost.published && post.published) {
                pubSub.publish(POST,{
                    post:{
                        Mutation: "CREATED",
                        data: post
                    }
                    

                })
            }
        }else if(post.published) {
            pubSub.publish(POST,{
                post:{
                    Mutation:"UPDATED",
                    data:post
                }
            })
        }


        return post;
    },

    createComment : (parent,args,{db,pubSub},info) => {
        
        const {author} = args.data;
        const isUserExist = db.users.some((user) => {
            return user.id === author 
        })

        if(! isUserExist) {
            throw new Error("User Not exist")
        }
        const isPostExist = db.posts.some((post) => {
            return post.id === args.data.post
        })

        if(! isPostExist) {
            throw new Error("Post not exist")
        }

        const comment = {
            id: uuidv4(),
            ...args.data
        }
        db.comments.push(comment);
        pubSub.publish(`comment ${comment.post}`,{
            comment : {
                Mutation:"CREATED",
                data:comment
            }
        })
        return comment;

    },
    deleteComment : (parent,args,{db,pubSub},info) => {
        const {id} = args;

        const commentIndex = db.comments.findIndex((comment) => comment.id === id );

        if(commentIndex === -1) {
            throw new Error("Comment not exist")
        }

        const [deletedComment] = db.comments.splice(commentIndex,1);
        pubSub.publish(`comment ${deletedComment.post}`,{
            comment : {
                Mutation:"DELETED",
                data:deletedComment
            }
        })

        return deletedComment;
    },
    updateComment: (parent, args, {db,pubSub}, info) => {

        const {id,data} = args;
        const comment = db.comments.find((comment) => comment.id === id)

        if(!comment) {
            throw new Error("Comment not exist");
            
        }
        if(typeof data.text == "string") {
            console.log("test");
            comment.text = data.text;
        }

        pubSub.publish(`comment ${comment.post}`,{
            comment : {
                Mutation:"UPDATED",
                data: comment
            }
        })
        
        return comment;
    }
}


export {Mutation as default}