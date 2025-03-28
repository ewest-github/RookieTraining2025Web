import express from "express";
import { PrismaClient } from "@prisma/client";

const prisma=new PrismaClient();

const updateToDo=async(req:express.Request,res:express.Response)=>{
    // 指定したIDのToDoに対して、完了状態(checked)が更新できること
    // 指定したIDのToDoに対して、削除状態(removed)が更新できること
    const {id}=req.body;
    const getIdRecord=await prisma.todo.findUnique({
      where:{
        id:id
      }
    })
    if(!getIdRecord){
      return res.send("指定したidがありません。")
    }

    const updateRecord=await prisma.todo.update({
      where:{
        id:id,
      },
      data:{
        checked:!getIdRecord.checked,
        removed:!getIdRecord.removed
      }
    })
    return res.json(updateRecord);
  }

export default updateToDo