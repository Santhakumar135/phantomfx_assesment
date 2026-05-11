from sqlalchemy import Column
from sqlalchemy import Integer
from sqlalchemy import String
from sqlalchemy import ForeignKey
from sqlalchemy import DateTime

from sqlalchemy.sql import func

from sqlalchemy.orm import relationship

from app.database import Base


class Note(Base):

    __tablename__ = "notes"

    id = Column(Integer, primary_key=True, index=True)

    title = Column(String, nullable=False)

    content = Column(String)

    created_at = Column(
        DateTime(timezone=True),
        server_default=func.now()
    )

    updated_at = Column(
        DateTime(timezone=True),
        onupdate=func.now(),
        server_default=func.now()
    )

    user_id = Column(
        Integer,
        ForeignKey("users.id")
    )

    owner = relationship("User")