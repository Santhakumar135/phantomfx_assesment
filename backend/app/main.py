from fastapi import FastAPI

from fastapi.middleware.cors import CORSMiddleware

from app.database import Base, engine

from app.models.user_model import User
from app.models.note_model import Note

from app.routes.auth_routes import router as auth_router
from app.routes.user_routes import router as user_router
from app.routes.note_routes import router as note_router

Base.metadata.create_all(bind=engine)

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth_router)
app.include_router(user_router)
app.include_router(note_router)


@app.get("/")
def home():
    return {"message": "Backend Running Successfully"}