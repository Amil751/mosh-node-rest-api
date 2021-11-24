const express = require("express");
const Joi = require("joi");
//installed for to validation (making a schema and compare)
const app = express();

app.use(express.json());
const courses = [
  { id: 1, name: "javascript" },
  { id: 2, name: "react js" },
];0

app.get("/", (req, res) => {
  res.send("hello world");
});

app.get("/api/courses", (req, res) => {
  res.send(courses);
});

app.get("/api/courses/:ID", (req, res) => {
  let amil = req.params.ID;
  const course = courses.find((item) => parseInt(item.id) === parseInt(amil));
  if (!course) res.status(404).send("course not found");
  res.send(course);
});

app.post("/api/courses", (req, res) => {
  // const schema = {
  //   name: Joi.string().min(3).required(),
  // };
  // const result = schema.validate(req.body);
  const{error}=validationFunc(req.body) ;
  if(error){
    return res.status(404).send(error.details[0].message)
  }
  const course = {
    id: courses.length + 1,
    name: req.body.name,
  };
  courses.push(course);
  res.send(course);
});

app.put('/api/courses/:ID',(req,res)=>{
  const course = courses.find((item) => parseInt(item.id) === parseInt(req.params.ID));
  if (!course) res.status(404).send("course not found");
     
  const{error}=validationFunc(req.body) ;
  
  if(error){
    return res.status(404).send(error.details[0].message)
  }

  course.name=req.body.name
  res.send(course);
})

app.delete('/api/courses/:ID',(req,res)=>{

   const index=courses.indexOf(req.params.ID)
   if(!index) return res.send('corse not found ') ;
   const course=courses[parseInt(req.params.ID)-1];
   courses.splice(index,1)
   res.send(course)
})


const validationFunc=(reqBody)=>{
  const schema = Joi.object({ name: Joi.string() .min(3) .required() });
  return schema.validate(reqBody);
}

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`listening on port ${port}`));

//node index.js  -commandi ile run edilir
//nodemon package is installing for keep program interactive with changes
