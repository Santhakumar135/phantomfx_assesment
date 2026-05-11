from pydantic import BaseModel, EmailStr


class UserCreate(BaseModel):

    username: str

    password: str

    first_name: str

    last_name: str

    email: EmailStr

    phone: str

    address: str

    role: str = "USER"


class UserLogin(BaseModel):

    username: str

    password: str


class UserUpdate(BaseModel):

    first_name: str

    last_name: str

    email: EmailStr

    phone: str

    address: str

    role: str

    is_active: bool