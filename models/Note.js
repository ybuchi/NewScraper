var mongoose = require("mongoose");

var schema = mongoose.Schema;

var NoteSchema = new Schema ({
    _headlineId: {
        type: Schema.Types.ObjectId,
        ref: "Headline",
    },
    date: String,
    noteText: String

    
});

var Note = mongoose.model("Note", noteSchema);
model.exports = Note;