import express from 'express';
import cors from "cors";

import { 
    getHealth, 
    getStudents, 
    postStudents, 
    deleteStudents, 
    putStudents, 
    patchStudents,
    getStudentsById 
} from "./controllers/student.js";

const app = express();
app.use(cors());
app.use(express.json()); // using for 

const PORT = 5002;

app.get("/health",getHealth);

// this api create a students data read 
app.get("/students",getStudents);

// this api create a students data create and post method has create....
app.post("/students",postStudents);

app.delete("/students/:id",deleteStudents);

app.put("/students/:id", putStudents);

app.patch("/students/city/:id",patchStudents);

app.get("/students/:id",getStudentsById);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});


//GET To read resource from server
//POST To create resource
//PUT To update resource
//PATCH To update resource partially
//DELETE To delete resource

//OPTINOS To check server readyness (CORS) for using automatically browser
//HEAD To fetch resource metadata