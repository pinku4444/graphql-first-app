const Post = {
    author : (parent, args, {db}, info) => {
        
        const user =  db.users.find((user) => {
            return user.id === parent.author
        })
        //
        return user
        
    },
    comments : (parent, args, {db}, info) => {
        
        const comment =  db.comments.filter((comment) => {
            return comment.author === parent.id
        })
        
        return comment;
    }
}

export {Post as default}