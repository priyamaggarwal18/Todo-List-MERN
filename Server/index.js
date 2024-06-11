const express = require("express");
const {connectMongoDb}=require("./connection");
const {logReqRes}=require("./middlewares/user");
const userRouter=require("./routes/user");
const userTaskRouter=require("./routes/task");
const cors=require('cors');
const PORT = 8000;
const app = express();
// Define CORS options
const corsOptions = {
  origin: 'http://localhost:3000', // Allow only this origin
  methods: ['GET', 'POST', 'PATCH', 'DELETE'], // Allow specific HTTP methods
  allowedHeaders: ['Content-Type', 'Authorization'], // Allow specific headers
  credentials: true, // Enable credentials (cookies, authorization headers, etc.)
  optionsSuccessStatus: 200 // Some legacy browsers (IE11, various SmartTVs) choke on 204
};

//connection of mongoose remember this is a  promise function so it will return a then and error
connectMongoDb('mongodb://localhost:27017/notesapp')
.then(()=>{
  console.log("connected to database");
})
.catch((error)=>{
  console.error("error connecting to database",error);
})

//middleware
app.use(express.json());
app.use(logReqRes('log.txt'));
app.use(cors(corsOptions));


//routes
app.use('/api', userRouter);
app.use('/api/users/:username/tasks', userTaskRouter);

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
