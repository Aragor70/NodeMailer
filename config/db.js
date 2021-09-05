const mongoose = require('mongoose');


const db = process.env.mongoPublicURI;


const connect = async () => {
    try{
        const conn = await mongoose.connect(db, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log(`Ciao, MongoDB connected... `);
        console.log(conn.connection.host)
    }
    catch(err){
        console.error(err.message);
        process.exit(1);
    }
}
module.exports = connect;