//Defaults
const express = require("express");
const router = express.Router();

//General
const memberController = require("../controllers/memberController");

/*
 * STATUS (in use, deprecated): IN USE
 * Method: Post
 * Description: I want to register one or more students to a specified teacher
 * Developer: Naisarg(2020-03-14)
 * Last Upated Date: 2020-03-14
 */
router.post("/register", function(req, res, next) {
    memberController
        .register(req)
        .then(data => {
            if (data.success) {
                res.status(204).json();
            } else {
                res.status(data.code).json({message: data.message});
            }
        })
        .catch(err => {
            res.status(500).json({message: "Failure"});
        });
});

/*
 * STATUS (in use, deprecated): IN USE
 * Method: Get
 * Description: I want to retrieve a list of students common to a given list of teachers (i.e. retrieve students who are registered to ALL of the given teachers)
 * Developer: Naisarg(2020-03-14)
 * Last Upated Date: 2020-03-14
 */
router.get("/commonstudents", function(req, res, next) {
  memberController
        .commonstudents(req)
        .then(data => {
            if (data.success) {
                res.status(200).json(data.data);
            } else {
                res.status(data.code).json({message: data.message});
            }
        })
        .catch(err => {
            res.status(500).json({message: "Failure"});
        });
});

/*
 * STATUS (in use, deprecated): IN USE
 * Method: Post
 * Description: I want to suspend a specified student.
 * Developer: Naisarg(2020-03-14)
 * Last Upated Date: 2020-03-14
 */
router.post("/suspend", function(req, res, next) {
    memberController
        .suspend(req)
        .then(data => {
            if (data.success) {
                res.status(204).json();
            } else {
                res.status(data.code).json({message: data.message});
            }
        })
        .catch(err => {
            res.status(500).json({message: "Failure"});
        });
});

/*
 * STATUS (in use, deprecated): IN USE
 * Method: Post
 * Description: I want to retrieve a list of students who can receive a given notification.
 * Developer: Naisarg(2020-03-14)
 * Last Upated Date: 2020-03-14
 */
router.post("/retrievefornotifications", function(req, res, next) {
    memberController
        .retrievefornotifications(req)
        .then(data => {
            if (data.success) {
                res.status(200).json(data.data);
            } else {
                res.status(data.code).json({message: data.message});
            }
        })
        .catch(err => {
            res.status(500).json({message: "Failure"});
        });
});


module.exports = router;