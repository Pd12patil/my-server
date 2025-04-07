import express from 'express';

const app = express();
app.use(express.json()); // using for 

const PORT = 5002;

// get is method read the resources from server
// using for read the data 
app.get("/", (req, res) => {
    res.json({
        message: "Home Page"
    });
});

app.post("/about", (req, res) => {
    res.send("About Page");
});


//this is a temporary data store
const STUDENTS = [
    {
        id: 1,
        name: "Patil",
        city: "Pune",
    },
    {
        id: 2,
        name: "AK",
        city: "Nagpur",
    },
];

app.get("/health", (req, res) =>  {
    res.json({
        success: true,
        message: "Server is running",
    });
});


// this api create a students data read 
app.get("/students",  (req, res) => {
    res.json({
        sccess: true,
        data: STUDENTS,
        message: "Students fetched Successfully"
    })
}); 


// this api create a students data create and post method has create....
app.post("/students", (req, res) => {
    // console.log(req.body);

    // const name = req.body.name;
    // const city = req.body.city;

    const {name, city, id}  = req.body;

    for(const student of STUDENTS){
        if(id===student.id){
            return res.json({
                success: false,
                message: "Student with this id already exists",
            });
        }
    }

    if (!id){
        return res.json({
            success: false,
            message: "Id is required",
        });
    }

    if (!name){
        return res.json({
            success: false,
            message: "Name is required",
        });
    }

    if (!city){
        return res.json({
            success: false,
            message: "City is required",
        });
    }

   

    const studentObj = {
        id,
        name,
        city,
    }

    STUDENTS.push(studentObj);

    res.json({
        sccess: true,
        data: studentObj,
        message: "Students fetched Successfully"
    })
})


app.delete("/students/:id", (req, res) => {


    // const { id } = req.body;
    const { id } = req.params;

    let studentIndex = -1;

    STUDENTS.forEach((stud, i) => {
        if(stud.id == id){
            studentIndex = i;
        }
    });

    if(studentIndex == -1){
        return res.json({
            success: false,
            message: `Student with id:${id} does not exits`,
        });
    }else{
        STUDENTS.splice(studentIndex, 1);
        return res.json({
            success: true,
            message: `Student with id:${id} deleted successfully`,
        })
    }
})

app.put("/students/:id", (req, res) => {
    const { id } = req.params;

    const {name, city} = req.body;

    let studentIndex = -1;

    STUDENTS.forEach((stud, i) => {
        if(stud.id == id){
            studentIndex = i;
        }
    });

    if (studentIndex  == -1){
        return res.json({
            success: false,
            message: `Student with id:${id} does not exits`,
        });
    }

    if (!name){
        return res.json({
            success: false,
            message: "Name is required",
        });
    }

    if (!city){
        return res.json({
            success: false,
            message: "City is required",
        });
    }

    STUDENTS[studentIndex] = {
        id: parseInt(id),
        name: name,
        city: city
    };

    res.json({
        success: true,
        data: STUDENTS[studentIndex],
        message: `Student with id:${id} updte successfully`,
    });

});

app.patch("/students/city/:id", (req, res) => {
    const { id } = req.params;
    const { city } = req.body;

    if (!city){
        return res.json({
            success: false,
            message: "City is required",
        });
    }

    let studentIndex = -1;

    STUDENTS.forEach((stud, i) => {
        if(stud.id == id){
            studentIndex = i;
        }
    });

    if (studentIndex  == -1){
        return res.json({
            success: false,
            message: `Student with id:${id} does not exits`,
        });
    }

    const existingStudent = STUDENTS[studentIndex];

    const  updatedStudent = {
        ...existingStudent,
        city,
    }

    STUDENTS[studentIndex] = updatedStudent;

    res.json({
        success: true,
        data: updatedStudent,
        message: `Student with id:${id} updte successfully`,
    });

})

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