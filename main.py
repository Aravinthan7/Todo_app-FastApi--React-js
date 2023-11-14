from fastapi import FastAPI,Path,Body
from fastapi.middleware.cors import CORSMiddleware
from typing import Union
from DB import db
from Models import models
import json
#Declaring  a Object 
app=FastAPI()

origins = [
    "http://localhost:3000",
    "localhost:3000"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)
config=db.Mysqlconfig
resp_model=models.TodolistModel
@app.get('/checkservice')
async def root() -> dict:
    return {"message":"Checkservice"}

@app.get('/gettodolist')
async def getlist() -> dict:
    config.cursor.execute('Select * from TodoApp')
    new_json=[]
    data=config.cursor.fetchall()
    for x in data:
        new_object={} 
        for i,col in enumerate(config.cursor.description):
            new_object[col[0]]=x[i]
        new_json.append(new_object)    
    return{"data":new_json} 

@app.post('/newtodo')
async def newtodo(res:resp_model=Body(...))->dict:
    insert_query='INSERT INTO todoapp(createdate,processtype,Detail,updatedate) VALUES(%s,%s,%s,%s)'
    val=(res.createdate,res.processtype,res.Detail,res.updatedate)
    config.cursor.execute(insert_query,val)
    config.conn.commit()
    return {"data":f"{config.cursor.rowcount} record inserted."}
 
@app.put('/updatetodo')
async def updatelist(id:int,processtype: str,Detail:str,updatedate:str) ->dict :
    update_query='UPDATE todoapp SET processtype =%s,updatedate=%s WHERE id ='+str(id)
    val=(processtype,updatedate)
    config.cursor.execute(update_query,val) 
    config.conn.commit()
    return {"data":"data updated"} 

@app.delete('/deletetodo')
async def deletelist(id:int) ->dict:
    delete_query='Delete From todoapp where id='+str(id)
    config.cursor.execute(delete_query)
    config.conn.commit()
    return {"data":"deleted id"+str(id)}