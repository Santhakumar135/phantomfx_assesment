from fastapi import APIRouter
from fastapi import Depends
from fastapi import HTTPException

from sqlalchemy.orm import Session

from app.database import SessionLocal

from app.models.note_model import Note
from app.models.user_model import User

from app.schemas.note_schema import (
    NoteCreate,
    NoteUpdate
)

from app.utils.dependencies import (
    get_current_user
)

router = APIRouter(
    prefix="/notes",
    tags=["Notes"]
)


def get_db():

    db = SessionLocal()

    try:
        yield db

    finally:
        db.close()


@router.post("/")
def create_note(
    note: NoteCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):

    new_note = Note(
        title=note.title,
        content=note.content,
        user_id=current_user.id
    )

    db.add(new_note)

    db.commit()

    db.refresh(new_note)

    return {
        "message": "Note created successfully"
    }


@router.get("/")
def get_notes(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):

    notes = db.query(Note).filter(
        Note.user_id == current_user.id
    ).all()

    return notes


@router.put("/{note_id}")
def update_note(
    note_id: int,
    updated_note: NoteUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):

    note = db.query(Note).filter(
        Note.id == note_id,
        Note.user_id == current_user.id
    ).first()

    if not note:

        raise HTTPException(
            status_code=404,
            detail="Note not found"
        )

    note.title = updated_note.title
    note.content = updated_note.content

    db.commit()

    return {
        "message": "Note updated successfully"
    }


@router.delete("/{note_id}")
def delete_note(
    note_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):

    note = db.query(Note).filter(
        Note.id == note_id,
        Note.user_id == current_user.id
    ).first()

    if not note:

        raise HTTPException(
            status_code=404,
            detail="Note not found"
        )

    db.delete(note)

    db.commit()

    return {
        "message": "Note deleted successfully"
    }