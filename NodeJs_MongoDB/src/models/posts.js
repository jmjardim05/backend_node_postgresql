const Mongoose = require("mongoose");
const UserModel = require("./users");

const postSchema = new Mongoose.Schema(
    {
        title: {
            type: String,
            required: [ true, "o campo 'title' é obrigatório" ]
        },
        content: String,
        author: {
            type: Mongoose.Schema.Types.ObjectId,
            ref: "User"
        } ,
        publishDate: {
            type: Date,
            default: Date.now
        }
    },
    {
        timestamps: { createdAt: true, updatedAt: true },
        optimisticConcurrency: true,
        toJSON: { // opções para conversao em JSON
            virtuals: true,
            transform(doc, ret) { //regras de conversão do documento para JSON
                ret.id = ret._id
                delete ret._id
            }
        }
    }   
);

postSchema.pre('findOneAndUpdate', function() {
    const update = this.getUpdate();
    if (update.__v != null) {
      delete update.__v;
    }
    const keys = ['$set', '$setOnInsert'];
    for (const key of keys) {
      if (update[key] != null && update[key].__v != null) {
        delete update[key].__v;
        if (Object.keys(update[key]).length === 0) {
          delete update[key];
        }
      }
    }
    update.$inc = update.$inc || {};
    update.$inc.__v = 1;
});

const PostModel = Mongoose.model("Post", postSchema);

module.exports = PostModel;