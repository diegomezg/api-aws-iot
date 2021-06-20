const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const knex = require("knex");


const data = require("./controllers/data");

const app = express();

app.use(cors());
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
app.use(express.json());


const db = knex({
    client: "mysql",
    connection: {
        host: "amazonaws.com host",
        user: "user",
        password: "password",
        database: "name",
    },
});

//* --------- Controllers -----------

app.post("/", data.handleRegisterData(db));


const PORT = process.env.PORT || 3000
app.listen( PORT, () => {
    console.log("Corriendo en el puerto " + PORT);
});

