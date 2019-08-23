
const Query = {
    me : () => {
        const user  = {
            id :"123",
            name : "pinku",
            email:"pinku@gmail.com",
            age: 24
        }

        return user;
    },
    post : () => {
        const post = {
            id : "1",
            title : "Data visualization",
            body : "This is machine learning part",
            published : false,
            author:"1"
        }
        return post;
    },
    users : (parent, args, {db}, info) => {
        const { query } = args;
        
        if(query) {
            const filterUser = db.users.filter((user) => {
                return user.name.toLowerCase().includes(query.toLowerCase())
            })

            return filterUser;

        }else {
            return db.users
        }
    },

    posts : (parent, args, {db}, info) => {
        
        const { query } = args;
        if(query) {
            return db.posts.filter((post) => {
                return post.title.toLowerCase().includes(query.toLowerCase()) || 
                       post.body.toLowerCase().includes(query.toLowerCase())
            })
        }else {
            return db.posts;
        }
    },
    comments : (parent, args, {db}, info) => {
        return db.comments;
    }
}


export {Query as default}