from pydantic import BaseModel,Field

class TodolistModel(BaseModel):
    id:int
    createdate:str
    processtype:str
    Detail:str
    updatedate:str