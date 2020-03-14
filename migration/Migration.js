var db = require('../db/databaseConnection');

exports.table = function(tableName) {
	if (!db) {
		console.log("Database Connection Error!");
        return null;
    }

    //Create table - teachers START
    db.query('show tables like "teachers"', function(err, result) {
      if (err) throw err;
      if(result.length == 0){
      	db.query('CREATE TABLE `teachers` (`id` INT NOT NULL AUTO_INCREMENT,`email` VARCHAR(255) NOT NULL,PRIMARY KEY (`id`), INDEX name (`id`, `email`))', function(err, result) {});
      }
    });
    //Create table - teachers END

    //Create table - students START
    db.query('show tables like "students"', function(err, result) {
      if (err) throw err;
      if(result.length == 0){
      	db.query('CREATE TABLE `students` (`id` INT NOT NULL AUTO_INCREMENT,`email` VARCHAR(255) NOT NULL, `is_suspended` TINYINT(1) NOT NULL DEFAULT 0,PRIMARY KEY (`id`), INDEX name (`id`, `email`))', function(err, result) {});
      }
    });
    //Create table - students END

    //Create table - teacher_students START
    db.query('show tables like "teacher_students"', function(err, result) {
      if (err) throw err;
      if(result.length == 0){
      	db.query('CREATE TABLE `teacher_students` (`id` INT NOT NULL AUTO_INCREMENT,`t_id` INT NOT NULL,`s_id` INT NOT NULL,PRIMARY KEY (`id`), INDEX name (`id`, `t_id`,`s_id`))', function(err, result) {});
      }
    });
    //Create table - teacher_students END

    return null;
};