from fastapi import APIRouter
from fastapi import Depends
from fastapi import HTTPException

from sqlalchemy.orm import Session

from app.database import SessionLocal

from app.models.user_model import User

from app.schemas.user_schema import UserUpdate

from app.utils.dependencies import (
    get_current_user,
    admin_only
)

router = APIRouter(
    prefix="/users",
    tags=["Users"]
)


def get_db():

    db = SessionLocal()

    try:
        yield db

    finally:
        db.close()


@router.get("/me")
def get_my_profile(
    current_user: User = Depends(get_current_user)
):

    return {
        "id": current_user.id,
        "username": current_user.username,
        "email": current_user.email,
        "role": current_user.role
    }


@router.get("/admin")
def admin_dashboard(
    current_user: User = Depends(admin_only)
):

    return {
        "message": "Welcome Admin",
        "admin": current_user.username
    }


@router.get("/")
def get_all_users(
    db: Session = Depends(get_db),
    current_user: User = Depends(admin_only)
):

    users = db.query(User).all()

    response = []

    for user in users:

        response.append({
            "id": user.id,
            "username": user.username,
            "first_name": user.first_name,
            "last_name": user.last_name,
            "email": user.email,
            "phone": user.phone,
            "address": user.address,
            "role": user.role,
            "is_active": user.is_active
        })

    return response


@router.put("/{user_id}")
def update_user(
    user_id: int,
    updated_user: UserUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(admin_only)
):

    user = db.query(User).filter(
        User.id == user_id
    ).first()

    if not user:

        raise HTTPException(
            status_code=404,
            detail="User not found"
        )

    user.first_name = updated_user.first_name
    user.last_name = updated_user.last_name
    user.email = updated_user.email
    user.phone = updated_user.phone
    user.address = updated_user.address
    user.role = updated_user.role
    user.is_active = updated_user.is_active

    db.commit()

    return {
        "message": "User updated successfully"
    }