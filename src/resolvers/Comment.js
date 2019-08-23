
const Comment = {
    author : (parent, args, {db}, info) => {
        const user =  db.users.find((user) => {
            return user.id === parent.author
        })
        
        return user
        
    },
    post : (parent, args, {db}, info) => {
        const post = db.posts.find((post) => {
            return post.id === parent.author
        })
        return post;
    }
}

export {Comment as default}