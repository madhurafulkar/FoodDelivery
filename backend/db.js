const mongoose = require('mongoose')

const mongoURI = 'mongodb://<username>:<password>@ac-se5hkrc-shard-00-00.vpzkh8s.mongodb.net:27017,ac-se5hkrc-shard-00-01.vpzkh8s.mongodb.net:27017,ac-se5hkrc-shard-00-02.vpzkh8s.mongodb.net:27017/gofoodmern?ssl=true&replicaSet=atlas-jt2dq4-shard-0&authSource=admin&retryWrites=true&w=majority'

module.exports = function (callback) {
    mongoose.connect(mongoURI, { useNewUrlParser: true }, async (err, result) => {
        if (err) console.log("---" + err)
        else {
            console.log("connected to mongo")
            const fetched_data = await mongoose.connection.db.collection("food_items");
            fetched_data.find({}).toArray(async function (err, data) {
                const foodcategory = await mongoose.connection.db.collection("foodcategory");
                foodcategory.find({}).toArray(async function (err, Catdata) {
                    callback(err, data, Catdata);
                   
                })
            });
            
        }
    })
};
