const User = {
    post : (parent, args, {db}, info) => {
        return db.posts.filter((post) => {
            return post.author == parent.id
        })
    },
    comments : (parent, args, {db}, info) => {
        const { id } = parent;
        return db.comments.filter((comment) => {
            return comment.author === id
        })
    }
}

export {User as default}