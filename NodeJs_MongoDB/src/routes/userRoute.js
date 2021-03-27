const UserModel = require("../models/users");

const userRoute = app => {
    app.route("/users/:id?")
        .get((req, res) => {
            const { id } = req.params;
            if (id) {
                UserModel.findById(id)
                         .then(user => res.send(user))
                         .catch(err => res.status(400).send(err));
            } else {
                UserModel.find({})
                         .then(users => res.send(users))
                         .catch(err => res.status(400).send(err));
            }
        })
        .post((req, res) => {
            const user = new UserModel(req.body);
            user.save()
                .then(() => res.send("Created!"))
                .catch(err => res.status(400).send(err));
        })
        .put((req, res) => {
            const { id } = req.params;
            if (!id) {
                return res.status(400).send("Need object id!");
            }

            UserModel.findByIdAndUpdate(id, req.body)
                     .then(() => res.send("Updated!"))
                     .catch(err => res.status(400).send(err));
        })
        .delete((req, res) => {
            const { id } = req.params;
            if (!id) {
                return res.status(400).send("Need object id!");
            }

            UserModel.findByIdAndDelete(id, req.body)
                     .then(() => res.send("Deleted!"))
                     .catch(err => res.status(400).send(err));
        });
}

module.exports = userRoute;