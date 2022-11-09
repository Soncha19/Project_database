from sqlalchemy import *
from sqlalchemy.orm import sessionmaker, relationship, declarative_base, scoped_session
from marshmallow import Schema, fields, validate, ValidationError
from marshmallow_sqlalchemy import SQLAlchemyAutoSchema

engine = create_engine('mysql+pymysql://root:feffKPklJozigUiaF4hy@containers-us-west-29.railway.app:6579/railway')
Base = declarative_base()
Base.metadata.create_all(bind=engine)
SessionFactory = sessionmaker(bind=engine)
Session = scoped_session(SessionFactory)


class Company(Base):
	__tablename__ = 'company'

	id = Column('id', Integer, primary_key=True, autoincrement=True)
	name = Column('name', String(45))


class CompanySchema(SQLAlchemyAutoSchema):
	class Meta:
		model = Company
		include_relationships = False
		load_instance = True
		include_fk = True


class Team(Base):
	__tablename__ = 'team'

	id = Column('id', Integer, primary_key=True, autoincrement=True)
	tag = Column('tag', String(45))
	name = Column('name', String(45))
	company_id = Column('company_id', Integer, ForeignKey(Company.id))
	company = relationship(Company, backref='team', lazy='joined')


class TeamSchema(SQLAlchemyAutoSchema):
	class Meta:
		model = Team
		include_relationships = False
		load_instance = True
		include_fk = True


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
	phone = Column('phone', String(13), nullable=False)
	date_of_birth = Column('date_of_birth', DATE, nullable=False)
	role = Column('role', Boolean, nullable=False)


class EmployeeSchema(SQLAlchemyAutoSchema):
	class Meta:
		model = Employee
		include_relationships = False
		load_instance = True
		include_fk = True


class PropertySet(Base):
	__tablename__ = 'property_set'

	id = Column('id', Integer, primary_key=True, autoincrement=True)
	name = Column('name', String(45))


class PropertySetSchema(SQLAlchemyAutoSchema):
	class Meta:
		model = PropertySet
		include_relationships = False
		load_instance = True
		include_fk = True


class Question(Base):
	__tablename__ = 'question'

	id = Column('id', Integer, primary_key=True, autoincrement=True)
	number = Column('number', Integer, nullable=False)
	text = Column('text', String(100), nullable=False)
	property_set_id = Column('property_set_id', Integer, ForeignKey(PropertySet.id))
	property_set = relationship(PropertySet, backref='question', lazy='joined')


class QuestionSchema(SQLAlchemyAutoSchema):
	class Meta:
		model = Question
		include_relationships = False
		load_instance = True
		include_fk = True


class FeedbackHistory(Base):
	__tablename__ = 'feedback_history'

	employee_id = Column('employee_id', Integer, ForeignKey(Employee.id), primary_key=True)
	employee = relationship(Employee, backref='feedback_history', lazy='joined')
	property_set_id = Column('property_set_id', Integer, ForeignKey(PropertySet.id))
	property_set = relationship(PropertySet, backref='feedback_history', lazy='joined')


class FeedbackHistorySchema(SQLAlchemyAutoSchema):
	class Meta:
		model = FeedbackHistory
		include_relationships = False
		load_instance = True
		include_fk = True

	employee_id = fields.Integer()
	property_set_id = fields.Integer()


class Feedback(Base):
	__tablename__ = 'feedback'

	id = Column('id', Integer, primary_key=True, autoincrement=True)
	date_of_creation = Column('date_of_creation', DATE, nullable=False)
	note = Column('note', String(500), nullable=False)
	employee_id = Column('employee_id', Integer, ForeignKey(FeedbackHistory.employee_id))
	feedbackHistory = relationship(FeedbackHistory, backref='feedback', lazy='joined')


class FeedbackSchema(SQLAlchemyAutoSchema):
	class Meta:
		model = Feedback
		include_relationships = False
		load_instance = True
		include_fk = True


class Answer(Base):
	__tablename__ = 'answer'

	id = Column('id', Integer, primary_key=True, autoincrement=True)
	number = Column('number', Integer, nullable=False)
	text = Column('text', String(100), nullable=False)
	feedback_id = Column('feedback_id', Integer, ForeignKey(Feedback.id))
	feedback = relationship(Feedback, backref='answer', lazy='joined')


class AnswerSchema(SQLAlchemyAutoSchema):
	class Meta:
		model = Answer
		include_relationships = False
		load_instance = True
		include_fk = True


Base.metadata.create_all(bind=engine)
