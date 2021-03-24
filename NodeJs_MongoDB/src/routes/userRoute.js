const UserModel = require("../models/users");

const userRoute = app => {
    app.route("users/:id?")
        .get((req, res) => {
            const users = UserModel.find();
        })
        .post()
        .put()
        .delete();
}