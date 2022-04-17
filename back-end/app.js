const express = require('express');
const app = express();

const mongoose = require("mongoose");
mongoose.connect("mongodb+srv://djha17:qgLLiVCxXeRcj5Iq@cluster0.3gt7f.mongodb.net/myFirstDatabase?retryWrites=true&w=majority")
.then(() => {
    console.log("Connected!");
})
.catch(() => {
    console.log("Connection failed!")
})

const Post = require("./models/post")

/*
    app.use((req,res,next) => {
        console.log("All API calls will be directed here first, since this is the first app.use so it will execute necessary operations first at all calls.");
        next();
    })

    app.use((req,res,next) => {
        res.send("Now its upon this use menthod whether it wants to direct to next use/get/post/anymethod after doing its operation. But since client will be waiting for response we should do res.send() bt its not mandatory; Other way to terminate the incoming request it res.end(//cb function do some operation before end)")
    })
*/

const bodyParser = require("body-parser");
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))

app.use((req,res,next) => {
    res.setHeader("Access-Control-Allow-Origin","*");
    res.setHeader("Access-Control-Allow-Headers","Origin, X-Requested-With, Content-Type, Accept");
    res.setHeader("Access-Control-Allow-Methods","GET, POST, PATCH, DELETE, OPTIONS");
    next();
})

app.post("/api/posts",(req,res,next) => {
    console.log(req.body)
    const post = new Post({
        title: req.body.title,
        content: req.body.content
    })
    post.save().then(createdPost => {
        console.log(post)
        res.status(201).json({
            message: "Success!",
            postId: createdPost._id
        })
    })
})

app.get('/api/posts', (req,res,next) => {
    /*
        const posts = [
            {
                id: 'f1234qwe5',
                title: "Post 1",
                content: "First Post"
            },
            {
                id: 'f1234qasdf45',
                title: "Post 2",
                content: "Second Post"
            }
        ]
        res.status(200).json({
            message: "Success",
            data: posts
        });
        Post.find((err,docs) => {})
    */
    Post.find()
    .then(documents => {
        console.log("Posts fetched successfully!",documents)
        res.status(200).json({
            message: "Success",
            data: documents.map(docs => {
                return {
                    id: docs._id,
                    title: docs.title,
                    content: docs.content
                }
            })
        });
    }).catch(err => {
        console.log("Error occurred!",err)
    })
    
})

app.delete("/api/posts/:id", (req,res,next) => {
    console.log("req.params.id -> ",req.params.id);
    Post.deleteOne({_id: req.params.id}).then(result => {
        console.log("Delete Successfully!", result);
        res.status(200).json({message: "Post Deleted!"});
    })
})

module.exports = app;