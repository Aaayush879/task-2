const express = require('express')
const mongoose = require('mongoose')
const app = express();
const multer= require('multer');
const nudge = require('./model/nudge');
const cloudinary = require('cloudinary');
const path = require('path');
app.use(express.json())
const nodeSchedule = require('node-schedule');
//app.use(cors())
// connect to mongodb
mongoose.connect('mongodb+srv://ayush:ayush@cluster0.sggba.mongodb.net/?retryWrites=true&w=majority').then(() => console.log('db connected'));

app.get('/',(req,res)=>{
    res.send("hello");
})
const upload = multer({
    storage: multer.diskStorage({}),
    fileFilter: (req, file, cb) => {
      let ext = path.extname(file.originalname);  
      if (ext !== ".jpg" && ext !== ".jpeg" && ext !== ".png") {
        cb(new Error("File type is not supported"), false);
        return;
      }
      cb(null, true);
    },
  });
cloudinary.config({
    cloud_name:'dxsxgt40t',
    api_key:'739331922381182',
    api_secret:'4x-7kLi9k1jeHlMacu1HBO2vdc4'
});
const date= new Date('2023-06-21T13:42:00.000+5:30');

app.post('/',upload.single('image'),async(req,res)=>{
    const result = await cloudinary.uploader.upload(req.file.path);
    let user = new nudge({
        tag: req.body.tag,
        title:req.body.title,
        description:req.body.description,
        invitation:req.body.invitation,
        image: result.secure_url,
        cloudinary_id: result.public_id,
      });
      console.log(user);
      // Save user
      await user.save();
      nodeSchedule.scheduleJob(date,()=>{
        
        
        res.send(user);
      })
      
})
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`listening to port ${PORT}`))