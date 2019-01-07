const mongoose=require('mongoose');
const Schema = mongoose.Schema;

const topicSchema = new Schema({ 
    topicname:String,
    bookid:String
});


module.exports=mongoose.model('Topic',topicSchema);