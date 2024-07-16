import express from "express";
import bodyParser from "body-parser";
import { dirname } from "path";
import { fileURLToPath } from "url";




const app = express();
const port = 3000;

let posts = [];
let images = [];

let favPosts = [];
let favImages = [];

let otherPosts = [];
let otherImages = [];

app.use(express.static("public"));

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.render("index.ejs")
});

app.get("/blog", (req, res) => {
    let title = "";
    
    if (posts.length != 0 && images.length != 0) {
        title = "All Posts";
    }
    res.render("blog.ejs", {
        blogPosts: posts,
        imagePosts: images,
        header: title,
    })
});

app.get("/gallery", (req, res) => {
    res.render("gallery.ejs", {
        imagePosts: images,
    })
});

// app.get("/about", (req, res) => {
//     res.render("about.ejs")
// });


app.get("/favorites", (req, res) => {
    let title = ""

    if (favPosts.length != 0 && favImages.length != 0) {
        title = "Favorites"
    }
    res.render("favorites.ejs", {
        blogPosts: favPosts,
        imagePosts: favImages,
        header: title,
    })
});

app.post("/favorites", (req, res) => {
    favImages.push(images[req.body.postID]);
    favPosts.push(posts[req.body.postID]);
    

    res.render("favorites.ejs", {
        blogPosts: favPosts,
        imagePosts: favImages,
        header: "Favorites"
    })
});


app.get("/other-travels", (req, res) => {
    let title = ""

    if (otherPosts.length != 0 && otherImages.length != 0) {
        title = "Other Travels"
    }

    res.render("other-travels.ejs", {
        blogPosts: otherPosts,
        imagePosts: otherImages,
        header: title,
    })
});

app.post("/other-travels", (req, res) => {
    otherPosts.push(posts[req.body.postID]);
    otherImages.push(images[req.body.postID]);

    res.render("other-travels.ejs", {
        blogPosts: otherPosts,
        imagePosts: otherImages,
        header: "Other Travels"
    })
})

app.post("/submit", (req, res) => {
    posts.push(req.body.text);
    images.push(req.body.imageUpload)
    res.render("blog.ejs", {
        blogPosts: posts,
        imagePosts: images,
        header: "All Posts",
    
    })
    
});

app.get("/edit", (req, res) => {
    res.render("edit.ejs", {
        index: req.query.postID,
        blogPosts: posts,
    })
})

app.post("/update", (req, res) => {

    posts[req.body.postID] = req.body.text;
    res.render("blog.ejs", {
        blogPosts: posts,
        imagePosts: images,
    })
});


app.post("/delete", (req, res) => {
    posts.splice(req.body.postID, 1);
    images.splice(req.body.postID, 1);
    favImages.splice(req.body.postID, 1);
    favPosts.splice(req.body.postID, 1);
    otherImages.splice(req.body.postID, 1);
    otherPosts.splice(req.body.postID, 1);
    //this is where i can ask the user if they are sure if they want to delete the post
    //i can use res.send
    

    res.render("blog.ejs")

   
})

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
  });


  

