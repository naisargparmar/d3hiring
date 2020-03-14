const db = require('../db/databaseConnection');

const table = "teachers";

exports.getRecord = async (where = "") => {
    try {
        return new Promise(function(resolve, reject) {
            db.query('SELECT * FROM `'+ table +'` '+ where +';', function(err, result){
                if (err) throw err;
                resolve({
                    success: true,
                    data: result
                });
            })
        });
    } catch ( ex ) {
        // console.log("Error "+ table +": ", ex)
        return {
            success: false
        }
    }
};

exports.addRecord = async (data_to_save = {}) => {
    try {
        return new Promise(function(resolve, reject) {
            db.query('INSERT INTO `'+ table +'` (email) VALUES ("'+ data_to_save.email +'");', function(err, result){
                if (err) throw err;
                resolve({
                    success: true,
                    insertId: result.insertId
                });
            })
        });
    } catch ( ex ) {
        // console.log("Error "+ table +": ", ex)
        return {
            success: false
        }
    }
}