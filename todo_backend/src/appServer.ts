import express from 'express';
import helloWorld from './route/HelloWorld';
import getToDoList from './route/getToDoList';
import addToDo from './route/addToDo';
import updateToDo from './route/updateToDo';

const app=express();

app.use(function(req,res,next){
  res.header('Access-Control-Allow-Origin','*');
  res.header('Access-Control-Allow-Headers','Origin,X-Requested-with,Content-Type,Accept');
  res.header('Access-Control-Allow-Methods','GET,PUT,POST,DELETE');
  if('OPTIONS'===req.method){
    res.sendStatus(204);
  }else{
    next();
  }
});

app.use(
  express.urlencoded({
    extended:true,
  })
);

app.use(express.json());

app.get('/getToDoList',getToDoList);
// app.get('*',...helloWorld);
app.post('/addToDo',addToDo)
//↓エラー箇所
// app.post('/updateToDo',updateToDo)

export default app;