import { PrismaClient } from '@prisma/client';
import express from 'express'

const getToDoList=async(req:express.Request,res:express.Response)=>{
    const prisma=new PrismaClient();

    switch(req.query.type){
      case '1'://すべてのタスク
        const allTodos=await prisma.todo.findMany();
        res.json(allTodos);
        // res.json([
        //   {
        //     "id": 1,
        //     "value": "買い物",
        //     "checked": false,
        //     "removed":false
        //   },
        //   {
        //      "id": 2,
        //      "value": "部屋掃除",
        //      "checked": true,
        //      "removed":false
        //    }
        // ]);
        break;
      case '2'://完了したタスク
        const checkedTodos=await prisma.todo.findMany({
          where:{
            checked:true,
            removed:false
          }
        });
        res.json(checkedTodos);
        // res.json([
        //   {
        //     "id": 2,
        //     "value": "部屋掃除",
        //     "checked": true,
        //     "removed":false
        //   }
        // ]);
        break;
      case '3'://現在のタスク
      const activeTodos=await prisma.todo.findMany({
        where:{
          checked:false,
          removed:false
        }
      });
      res.json(activeTodos);
      // res.json([
        //   {
        //     "id": 1,
        //     "value": "買い物",
        //     "checked": false,
        //     "removed":false
        //   }
        // ]);
        break;
      case '4':
        const removedTodos=await prisma.todo.findMany({
          where:{
            removed:true
          }
        })
        res.json(removedTodos)
        // res.json([
        //   {
        //     "id": 3,
        //     "value": "お風呂",
        //     "checked": false,
        //     "removed":true
        //   }
        // ])
        break;
      // default:
      //   res.send("default")
    }
  }
export default getToDoList;