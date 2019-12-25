const mongoose = require('mongoose');
const moment = require('moment');

const url = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}/${process.env.COLLECTION}?retryWrites=true&w=majority`;

const options = {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
};

mongoose
    .connect(url, options)
    .then(db => console.log(`conncted to: ${db.connection.name}`))
    .catch(err => console.log(`connection error:`, err))

let scheme = new mongoose.Schema({
    uniqId: {
        type: String,
        required: true,
        index: true,
        unique: true
    },
    names_getting_married: {
        type: String,
        required: true,
    },
    date: {
        type: String,
        required: true,
        default: moment().format("DD-MM-YYYY")
    },
    name: {
        type: String,
        required: true,
    },
    attendence: {
        type: Number,
        default: 1
    }
}, {
    timestamps: true,
});

scheme.virtual('id', function () {
    return this._id;
});


scheme.static('getInvitation', async function (id) {
    return await this.findById(id, (err, res) => {
        if (err) throw err;
    });
});

scheme.static('getInvitations', async function () {
    return await this.find({}, (err, res) => {
        if (err) throw err;
    });
});

scheme.static('updateInvitation', async function (obj) {
    return await this.updateOne({ _id: obj._id }, obj);
});

scheme.static('deleteInvitation', async function(id){
    return await this.deleteOne({_id:id},(err)=>{
        if(err) throw err;
    });
});

scheme.method('exists', async function () {
    return await this.model('Invitations').findById(this.id,(err, res)=>{
        if(err) throw err;
    })
});

let Invitations = mongoose.model('Invitations', scheme);

module.exports = Invitations;