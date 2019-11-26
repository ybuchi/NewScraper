var Note = require("../models/Note");
var makeDate = require("../scripts/date");

module.exports = {
    //not starting with a fetch function since we are not scraping
    get: function(data, cb){
        Note.find({
            _headlineId: data_id
        }, cb);
    },
    save: function(data, cb){
        var newNote = {
            _headlineId: data_id,
            date: makeDate(),
            noteText: data.noteText
        };
        Note.create(newNote, function(err, doc){
            if(err){
                console.log(err);
            }
            else{
                console.log(doc);
                cb(doc);
            }
        });
    },
    delete: function(data, cb){
        Note.remove({
            _id: data_id
        },cb);
    }
};