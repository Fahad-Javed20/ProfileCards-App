import express from "express";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

app.get('/', (req,res)=>{
    res.json({message:"Hello World"})
})

app.listen(PORT, () => {
    console.log(`server is listining at port ${PORT}`)});
