const PostModel = require("../models/posts");

const getPosts = (req, res) => {
    const { id } = req.params;
    const { title } = req.query;
    let dtCorte = new Date(Math.trunc(Date.now()));
    dtCorte.setDate(dtCorte.getDate() - 7);
    
    if (!id) {
        if (title) {
            PostModel.find({ ["title"]: new RegExp(title, "i") }, "title content publishDate")
                     .populate("author", "firstName lastName fullName")
                     .then(posts => res.send(posts))
                     .catch(err => res.status(400).send(err.message));
        } else {
            PostModel.find({}, "title content publishDate").where("publishDate").gte(dtCorte)
                     .populate("author", "firstName lastName fullName")
                     .then(posts => res.send(posts))
                     .catch(err => res.status(400).send(err.message));
        }
    } else {
        PostModel.findById(id, "title content publishDate")
                 .populate("author", "firstName lastName fullName")
                 .then(post => res.send(post))
                 .catch(err => res.status(400).send(err.message));
    }
}

const insertPost = (req, res) => {
    const post = new PostModel(req.body);
    post.save()
        .then(() => res.send("Created!"))
        .catch(err => res.status(400).send(err.message));
}

const updatePost = (req, res) => {
    const { id } = req.params;
    if (!id) {
        return res.status(400).send("Missing post id");
    }
    
    if (req.body.author) {
        return res.status(400).send("Author cannot be modified");
    }
    
    PostModel.findOneAndUpdate({ _id: id }, req.body)
             .then(() => res.send("Updated!"))
             .catch(err => res.status(400).send(err.message));
}

const deletePost = (req, res) => {
    const { id } = req.params;
    if (!id) {
        return res.status(400).send("Missing post id");
    } 

    PostModel.findByIdAndDelete(id)
             .then(() => res.send("Deleted!"))
             .catch(err => res.status(400).send(err.message));
}

const postRoute = app => {
    app.route("/posts/:id?")
       .get(getPosts)
       .post(insertPost)
       .put(updatePost)
       .delete(deletePost);
}

module.exports = postRoute;