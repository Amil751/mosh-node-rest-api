const express = require("express");
const app = express();

const courses = [
  { id: 1, name: "javascript" },
  { id: 2, name: "react js" },
];

app.get("/", (req, res) => {
  res.send("hello world");
});

app.get("/api/courses", (req, res) => {
  res.send(courses);
});

app.get("/api/courses/:ID", (req, res) => {
  let amil = req.params.ID;
  const course=courses.find(item=>parseInt(item.id)===parseInt(amil));
  if(!course) res.status(404).send('course not found') 
  res.send(course);
});

app.post('/api/courses',(req,res)=>{
    const course={
         id:3,
         name:'flutter' 
    }
    courses.push(course)
    res.send(course);
})

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`listening on port ${port}`));

//node index.js  -commandi ile run edilir
//nodemon package is installing for keep program interactive with changes
