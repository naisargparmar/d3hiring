//General
const teacherModel = require("../models/teacherModel");
const studentModel = require("../models/studentModel");
const teacherstudentModel = require("../models/teacherstudentModel");

/*
 * STATUS (in use, deprecated): IN USE
 * Method: Post
 * Description: I want to register one or more students to a specified teacher
 * Developer: Naisarg(2020-03-14)
 * Last Upated Date: 2020-03-14
 */
exports.register = async (request) => {
    let teacher = request.body.teacher ? request.body.teacher : null;
    let students = request.body.students ? request.body.students : null;
    let where = "";

    //Validation START
    if (!teacher) {
        return {
            code: 400,
            success: false,
            message:"Teacher email is required."
        }
    }
    if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(teacher)) {
        return {
            code: 400,
            success: false,
            message:"Teacher email ("+ teacher +") is invalid."
        }
    }
    
    // where = 'WHERE email="' + teacher + '"';
    // let fetch_teacher = await teacherModel.getRecord(where);
    // if (fetch_teacher.data.length > 0) {
    //     return {
    //         code: 400,
    //         success: false,
    //         message:"Teacher email ("+ teacher +") is already register."
    //     }
    // }
    
    if (!students) {
        return {
            code: 400,
            success: false,
            message:"Student email is required."
        }
    }

    if (typeof(students) != "object") {
        return {
            code: 400,
            success: false,
            message:"Student array is invalid format."
        }
    }

    for (var i = 0; i< students.length; i++) {
        if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(students[i])) {
            return {
                code: 400,
                success: false,
                message:"Student email ("+ students[i] +") is invalid."
            }
        }

        // where = 'WHERE email="' + students[i] + '"';
        // let fetch_student = await studentModel.getRecord(where);
        // if (fetch_student.data.length > 0) {
        //     return {
        //         code: 400,
        //         success: false,
        //         message:"Student email ("+ students[i] +") is already register."
        //     }
        // }
    }
    //Validation END

    try {
        let data_to_save;
        var return_flag_teacher;
        var return_flag_student;

        where = 'WHERE email="' + teacher + '"';
        let fetch_teacher = await teacherModel.getRecord(where);
        if (fetch_teacher.data.length > 0) {
            return_flag_teacher = { success: true, insertId: fetch_teacher.data[0].id}
        }
        else
        {
            data_to_save = {"email": teacher}
            return_flag_teacher = await teacherModel.addRecord(data_to_save);
        }

        if (return_flag_teacher.success) {
            for (var i = 0; i< students.length; i++) {
                where = 'WHERE email="' + students[i] + '"';
                let fetch_student = await studentModel.getRecord(where);
                if (fetch_student.data.length > 0) {
                    return_flag_student = { success: true, insertId: fetch_student.data[0].id}
                }
                else
                {
                    data_to_save = {"email":students[i]}
                    return_flag_student = await studentModel.addRecord(data_to_save);
                }
                
                where = 'WHERE t_id="' + return_flag_teacher.insertId + '" and s_id="' + return_flag_student.insertId + '"';
                let fetch_teacherstudent = await teacherstudentModel.getRecord(where);
                if (fetch_teacherstudent.data.length > 0) {
                    // return_flag_student = { success: true, insertId: fetch_teacherstudent.data[0].id}
                }
                else
                {
                    data_to_save = {"t_id":return_flag_teacher.insertId, "s_id":return_flag_student.insertId}
                    await teacherstudentModel.addRecord(data_to_save);
                }
            }
            return {
                code: 204,
                success: true,
                message:""
            }
        } else {
            throw err
        }
    }
     catch ( ex ) {
        // console.log("Error Controller: ", ex)
        return {
                code: 500,
                success: false,
                message:"Internal error."
            }
    }
};

/*
 * STATUS (in use, deprecated): IN USE
 * Method: Get
 * Description: I want to retrieve a list of students common to a given list of teachers (i.e. retrieve students who are registered to ALL of the given teachers)
 * Developer: Naisarg(2020-03-14)
 * Last Upated Date: 2020-03-14
 */
exports.commonstudents = async (request) => {
    let teacher = request.query.teacher ? request.query.teacher : null;
    
    //Validation START
    if (!teacher) {
        return {
            code: 400,
            success: false,
            message:"Teacher email is required."
        }
    }
    if (typeof(teacher) == "string") {
        if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(teacher)) {
            return {
                code: 400,
                success: false,
                message:"Teacher email ("+ teacher +") is invalid."
            }
        }
    }
    if (typeof(teacher) == "object") {
        for (var i = 0; i< teacher.length; i++) {
            if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(teacher[i])) {
                return {
                    code: 400,
                    success: false,
                    message:"Teacher email ("+ teacher[i] +") is invalid."
                }
            }
        }
    }
    //Validation END

    var temp_teacher_id = [];
    if (typeof(teacher) == "string") {
        where = 'WHERE email="' + teacher + '"';
        let fetch_teacher = await teacherModel.getRecord(where);
        if (fetch_teacher.success) {
            for (var i = 0; i < fetch_teacher.data.length; i++) {
                temp_teacher_id.push(fetch_teacher.data[i].id)
            }
        }
    }
    if (typeof(teacher) == "object") {
        for (var i = 0; i< teacher.length; i++) {
            where = 'WHERE email="' + teacher[i] + '"';
            let fetch_teacher = await teacherModel.getRecord(where);
            if (fetch_teacher.success) {
                for (var j = 0; j < fetch_teacher.data.length; j++) {
                    temp_teacher_id.push(fetch_teacher.data[j].id)
                }
            }
        }
    }

    var sub_query = [];
    var sub_where = [];
    for(var k=0; k < temp_teacher_id.length; k++)
    {
        sub_query.push('(SELECT s_id, students.email FROM teacher_students INNER JOIN students on teacher_students.s_id = students.id where t_id IN ("'+ temp_teacher_id[k] +'")) as a_'+ k)
        if (temp_teacher_id.length > 1) {
            if ((k+1) != temp_teacher_id.length ) {
                sub_where.push("a_" + k + ".s_id=a_" + (k+1) + ".s_id")
            }
        }
    }

    var main_query = 'SELECT * FROM '
    var sub_query_str = sub_query.join(', ')
    var sub_where_str = sub_where.join(' and ')
    sub_where_str = sub_where_str != "" ? " WHERE " + sub_where_str: '';
    main_query = main_query + sub_query_str + sub_where_str
    let fetch_teacherstudent = await teacherstudentModel.commonStudent(main_query);
    
    let temp_rec = []
    if (fetch_teacherstudent.success) {
        if (fetch_teacherstudent.data.length > 0) {
            for (var i = 0; i < fetch_teacherstudent.data.length; i++) {
                temp_rec.push(fetch_teacherstudent.data[i].email)
            }
        }
        return {
                code: 200,
                success: true,
                data: {
                  "students": temp_rec
                }
            }
    }
    else 
    {
        return {
                code: 500,
                success: false,
                message:"Internal error."
            }
    }
};

/*
 * STATUS (in use, deprecated): IN USE
 * Method: Post
 * Description: I want to suspend a specified student.
 * Developer: Naisarg(2020-03-14)
 * Last Upated Date: 2020-03-14
 */
exports.suspend = async (request) => {
    let student = request.body.student ? request.body.student : null;

    //Validation START
    if (!student) {
        return {
            code: 400,
            success: false,
            message:"Student email is required."
        }
    }
    if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(student)) {
        return {
            code: 400,
            success: false,
            message:"Student email ("+ student +") is invalid."
        }
    }
    //Validation END

    try {
        let where = "";
        where = 'WHERE email="' + student + '"';
        await studentModel.suspend(where);
        return {
                code: 204,
                success: true,
                message:""
            }
    }
    catch ( ex ) {
        // console.log("Error Controller: ", ex)
        return {
                code: 500,
                success: false,
                message:"Internal error."
            }
    }
};

/*
 * STATUS (in use, deprecated): IN USE
 * Method: Post
 * Description: I want to retrieve a list of students who can receive a given notification.
 * Developer: Naisarg(2020-03-14)
 * Last Upated Date: 2020-03-14
 */
exports.retrievefornotifications = async (request) => {
    let teacher = request.body.teacher ? request.body.teacher : null;
    let notification = request.body.notification ? request.body.notification : null;
    
    //Validation START
    if (!teacher) {
        return {
            code: 400,
            success: false,
            message:"Teacher email is required."
        }
    }
    if (typeof(teacher) == "string") {
        if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(teacher)) {
            return {
                code: 400,
                success: false,
                message:"Teacher email ("+ teacher +") is invalid."
            }
        }
    }
    if (!notification) {
        return {
            code: 400,
            success: false,
            message:"Notification text is required."
        }
    }

    let where = '';
    let fetch_teacher = await teacherModel.getRecord('WHERE email="' + teacher + '"');
    if (fetch_teacher.data.length > 0) {
        where = 'where t_id = ' + fetch_teacher.data[0].id;
    }
    else
    {
        return {
                code: 404,
                success: false,
                message:"Teacher email ("+ teacher +") not found."
            }
    }

    let email = '';
    let emailArray = notification.match(/([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9._-]+)/gi)
    if (emailArray != null) {
        email = emailArray.join('", "')
        email = '"' + email+ '"';
    }
    
    if (email != "") {
        where = where + ' or email IN ('+ email +')';
    }
    
    let fetch_teacherstudent = await teacherstudentModel.retrievefornotifications(where);
    let temp_rec = []
    if (fetch_teacherstudent.success) {
        if (fetch_teacherstudent.data.length > 0) {
            for (var i = 0; i < fetch_teacherstudent.data.length; i++) {
                temp_rec.push(fetch_teacherstudent.data[i].email)
            }
        }
        return {
                code: 200,
                success: true,
                data: {
                  "recipients": temp_rec
                }
            }
    }
    else 
    {
        return {
                code: 500,
                success: false,
                message:"Internal error."
            }
    }
};

