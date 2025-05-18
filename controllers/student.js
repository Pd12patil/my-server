//this is a temporary data store
const STUDENTS = [
    {
        id: 111,
        name: "Patil",
        city: "Pune",
    },
    {
        id: 222,
        name: "AK",
        city: "Nagpur",
    },
];


const getHealth =  (req, res) =>  {
    res.json({
        success: true,
        message: "Server is running",
    });
};

const getStudents = (req, res) => {
    res.json({
        sccess: true,
        data: STUDENTS,
        message: "Students fetched Successfully"
    })
}; 

const postStudents =  (req, res) => {
    // console.log(req.body);

    // const name = req.body.name;
    // const city = req.body.city;

    const {name, city, id}  = req.body;

    for(const student of STUDENTS){
        if(id===student.id){
            return res.status(400).json({
                success: false,
                message: "Student with this id already exists",
            });
        }
    }

    if (!id){
        return res.status(400).json({
            success: false,
            message: "Id is required",
        });
    }

    if (!name){
        return res.status(400).json({
            success: false,
            message: "Name is required",
        });
    }

    if (!city){
        return res.status(400).json({
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

    res.status(201).json({
        success: true,
        data: studentObj,
        message: "Students fetched Successfully"
    })
};

const deleteStudents =  (req, res) => {


    // const { id } = req.body;
    const { id } = req.params;

    let studentIndex = -1;

    STUDENTS.forEach((stud, i) => {
        if(stud.id == id){
            studentIndex = i;
        }
    });

    if(studentIndex == -1){
        return res.status(404).json({
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
};

const putStudents = (req, res) => {
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

};

const patchStudents = (req, res) => {
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

};

const getStudentsById = (req, res) => {
    const { id } = req.params;

    let studentIndex = -1;

    STUDENTS.forEach((stud, i) => {
        if(stud.id == id){
            studentIndex = i;
        }
    });

    if (studentIndex  == -1){
        return res.status(404).json({
            success: false,
            message: `Student with id:${id} does not exits`,
        });
    }
    else{
        return res.status(200).json({
            success: true,
            data: STUDENTS[studentIndex],
            message: `Student with id:${id} fetched successfully`,
        });
    }

};


export{
    getHealth,
    getStudents,
    postStudents,
    deleteStudents,
    putStudents,
    patchStudents,
    getStudentsById
}
