var express = require("express");
var session = require("express-session");
const cors = require("cors");
require("./config")

//Migration
const Migration = require("./migration/Migration");
Migration.table();

//General Routes
const teacherRouter = require("./routes/teacherRouter");

const app = express();
app.use(cors());
app.use(express.json({}));
app.use(express.urlencoded({
    extended: true
}));

//Front api
app.use("/api", teacherRouter);

let PORT = process.env.BACKEND_PORT || 3003;

app.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}`);
});

module.exports = app;
