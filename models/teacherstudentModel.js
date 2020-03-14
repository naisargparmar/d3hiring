const db = require('../db/databaseConnection');

const table = "teacher_students";

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
            db.query('INSERT INTO `'+ table +'` (t_id, s_id) VALUES ("'+ data_to_save.t_id + '","' + data_to_save.s_id +'");', function(err, result){
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

exports.retrievefornotifications = async (where = "") => {
    try {
        return new Promise(function(resolve, reject) {
            let select
            select = "students.email"
            db.query('SELECT '+select+ ' FROM '+ 
                        'teacher_students join students '+
                        'on teacher_students.s_id = students.id and is_suspended=0 '+
                        where
                , function(err, result){
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
}

exports.commonStudent = async (main_query) => {
    try {
        return new Promise(function(resolve, reject) {
            db.query(main_query, function(err, result){
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
}