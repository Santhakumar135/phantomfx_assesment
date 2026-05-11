from sqlalchemy import Column, Integer, String, Boolean
from app.database import Base


class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)

    username = Column(String, unique=True, nullable=False)

    password = Column(String, nullable=False)

    first_name = Column(String)

    last_name = Column(String)

    email = Column(String, unique=True)

    phone = Column(String)

    address = Column(String)

    role = Column(String, default="USER")

    is_active = Column(Boolean, default=True)