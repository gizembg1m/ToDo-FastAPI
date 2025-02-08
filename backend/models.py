from database import Base
from sqlalchemy import Column, Integer, String

class Todo(Base):
    __tablename__ = "todo"

    id = Column(Integer, primary_key=True)
    title = Column(String)

