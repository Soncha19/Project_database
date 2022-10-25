from sqlalchemy import *
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker, relationship, declarative_base, scoped_session


engine = create_engine('mysql+pymysql://root:2004@localhost:3306/procadi')
SessionFactory = sessionmaker(bind=engine)
Session = scoped_session(SessionFactory)
Base = declarative_base()


class Company(Base):
    __tablename__ = 'company'
    id = Column('id', Integer, primary_key=True, autoincrement=True)
    name = Column('name', String(45))


class Team(Base):
    __tablename__ = 'team'

    id = Column('id', Integer, primary_key=True, autoincrement=True)
    tag = Column('tag', Boolean)
    name = Column('name', String(45))
    company_id = Column(Integer, ForeignKey(Company.id))
    company = relationship(Company, backref='team', lazy='joined')


class Employee(Base):
    __tablename__ = 'employee'
    id = Column('id', Integer, primary_key=True, autoincrement=True)
    first_name = Column('first_name', String(15), nullable=False)
    last_name = Column('last_name', String(15), nullable=False)
    email = Column('email', String(30), nullable=False)

    company_id = Column('company_id', Integer, ForeignKey(Company.id))
    company = relationship(Company, backref='employee', lazy='joined')

    team_id = Column('team_id', Integer, ForeignKey(Team.id))
    team = relationship(Team, backref='employee', lazy='joined')

    is_owner = Column('is_owner', Boolean, nullable=False)
    password = Column('password', String(20), nullable=False)
    user_name = Column('user_name', String(45), nullable=False)
    phone = Column('phone', String(13), nullable=False)
    date_of_birth = Column('date_of_birth', DATE, nullable=False)
    role = Column('role', Boolean, nullable=False)


class PropertySet(Base):
    __tablename__ = 'property_set'

    id = Column('id', Integer, primary_key=True, autoincrement=True)
    name = Column('name', String(45))


class Question(Base):
    __tablename__ = 'question'
    id = Column('id', Integer, primary_key=True, autoincrement=True)
    number = Column('number', Integer, nullable=False)
    text = Column('text', String(100), nullable=False)
    property_set_id = Column('property_set_id', Integer, ForeignKey(PropertySet.id))
    property_set = relationship(PropertySet, backref='question', lazy='joined')


class FeedbackHistory(Base):
    __tablename__ = 'feedback_history'
    id = Column('id', Integer, primary_key=True, autoincrement=True)
    employee_id = Column('employee_id', Integer, ForeignKey(Employee.id))
    employee = relationship(Employee, backref='feedback_history', lazy='joined')
    property_set_id = Column('property_set_id', Integer, ForeignKey(PropertySet.id))
    property_set = relationship(PropertySet, backref='feedback_history', lazy='joined')


class Feedback(Base):
    __tablename__ = 'feedback'

    id = Column('id', Integer, primary_key=True, autoincrement=True)
    date_of_creation = Column('date_of_creation', DATE, nullable=False)
    note = Column('note', String(45), nullable=False)
    feedback_history_id = Column('feedback_history_id', Integer, ForeignKey(FeedbackHistory.id))
    feedback_history = relationship(FeedbackHistory, backref='feedback', lazy='joined')


class Answer(Base):
    __tablename__ = 'answer'
    id = Column('id', Integer, primary_key=True, autoincrement=True)
    number = Column('number', Integer, nullable=False)
    text = Column('text', String(100), nullable=False)
    feedback_id = Column('feedback_id', Integer, ForeignKey(Feedback.id))
    feedback = relationship(Feedback, backref='answer', lazy='joined')
