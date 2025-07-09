from fastapi import APIRouter
from database import professional_collection
from models import Professional
from fastapi.encoders import jsonable_encoder

router = APIRouter()

@router.post("/professional", summary="Submit professional info")
async def add_professional(data: Professional):
    doc = jsonable_encoder(data)
    res = await professional_collection.insert_one(doc)
    return {"inserted_id": str(res.inserted_id)}
