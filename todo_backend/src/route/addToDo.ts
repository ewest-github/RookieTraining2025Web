import { PrismaClient } from "@prisma/client"
import express from 'express'

const prisma=new PrismaClient();

export default[
    async(req:express.Request,res:express.Response)=>{
      const {value,checked,removed}=req.body;//リクエストボディからデータを受け取る(curlコマンド)
      const addRecord=await prisma.todo.create({
        data:{
          // id:4,
          value:value,
          checked:checked,
          removed:removed
        }
      })
      res.json(addRecord)
    }
    
]