let users = [
    {
        id :"1",
        name : "Pinku",
        email:"pinku@gmail.com",
        age: 24

    },{
        id :"2",
        name : "Ashish",
        email:"ashish@gmail.com",
        age: 24

    },{
        id :"3",
        name : "Aryan",
        email:"aryan@gmail.com",
        age: 24

    },
]

// demo post data 

let posts = [
    {
        id : "1",
        title : "Data visualization",
        body : "This is machine learning part",
        published : false,
        author: "1"
    },
    {
        id : "2",
        title : "Introduction of machine learning",
        body : "This is machine learning part",
        published : false,
        author: "2"
    },{
        id : "3",
        title : "Supervised Learning",
        body : "This is machine learning part",
        published : false,
        author: "1"
    }
]

// comments data

let comments = [{
        id: "1",
        text: "Good Blog",
        author: "1",
        post : "1"
    }, {
        id: "2",
        text: "Very informative",
        author: "2",
        post: "2"
    }, {
        id: "3",
        text: "I like it",
        author: "1",
        post: "1"  
    }, {
        id: "4",
        text: "Wow,that's great",
        author:"3",
        post: "3"
    }
]

const db = {
    users,
    posts,
    comments
}

export {db as default};