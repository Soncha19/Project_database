from sqlalchemy import *
from sqlalchemy.orm import sessionmaker, relationship, declarative_base, scoped_session
from marshmallow import Schema, fields, validate, ValidationError, validates
from marshmallow_sqlalchemy import SQLAlchemyAutoSchema

engine = create_engine("mysql+pymysql://root:kV7vdF9d6onam64KQopq@containers-us-west-16.railway.app:7583/railway")
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
	first_name = Column('first_name', String(15))
	last_name = Column('last_name', String(15))
	email = Column('email', String(30))

	company_id = Column('company_id', Integer, ForeignKey(Company.id), default=1)
	company = relationship(Company, backref='employee', lazy='joined')

	team_id = Column('team_id', Integer, ForeignKey(Team.id), default=1)
	team = relationship(Team, backref='employee', lazy='joined')

	is_owner = Column('is_owner', Boolean, default=False)
	password = Column('password', String(150))
	phone = Column('phone', String(13))
	date_of_birth = Column('date_of_birth', DATE)
	role = Column('role', Boolean, default=False)


def validate_email(email1):
	session = Session()
	if not (session.query(Employee).filter(Employee.email == email1).count() == 0):
		raise ValidationError("Email exists")


class EmployeeSchema(SQLAlchemyAutoSchema):
	class Meta:
		model = Employee
		include_relationships = False
		load_instance = True
		include_fk = True

	email = fields.Email(validate=validate_email)


class PropertySet(Base):
	__tablename__ = 'property_set'

	id = Column('id', Integer, primary_key=True, autoincrement=True)
	name = Column('name', String(45))
	is_used = Column('is_used', Boolean, default=True)
	company_id = Column('company_id', Integer, ForeignKey(Company.id))
	company = relationship(Company, backref='property_set', lazy='joined')


class PropertySetSchema(SQLAlchemyAutoSchema):
	class Meta:
		model = PropertySet
		include_relationships = False
		load_instance = True
		include_fk = True


class Question(Base):
	__tablename__ = 'question'

	id = Column('id', Integer, primary_key=True, autoincrement=True)
	number = Column('number', Integer)
	text = Column('text', String(100))
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

	team_id = Column('team_id', Integer, ForeignKey(Team.id))
	team = relationship(Team, backref='feedback_history', lazy='joined')


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
	date_of_creation = Column('date_of_creation', DATE)
	note = Column('note', String(500))
	employee_id = Column('employee_id', Integer, ForeignKey(FeedbackHistory.employee_id))
	feedbackHistory = relationship(FeedbackHistory, backref='feedback', lazy='joined')


class FeedbackSchema(SQLAlchemyAutoSchema):
	class Meta:
		model = Feedback
		include_relationships = False
		load_instance = True
		include_fk = True


class PreAnswer(Base):
	__tablename__ = 'pre_answer'

	id = Column('id', Integer, primary_key=True, autoincrement=True)
	text = Column('text', String(100))
	numeric_value = Column('numeric_value', Integer)
	property_set_id = Column('feedback_id', Integer, ForeignKey(PropertySet.id))
	property_set = relationship(PropertySet, backref='pre_answer', lazy='joined')


class PreAnswerSchema(SQLAlchemyAutoSchema):
	class Meta:
		model = PreAnswer
		include_relationships = False
		load_instance = True
		include_fk = True


class Answer(Base):
	__tablename__ = 'answer'

	id = Column('id', Integer, primary_key=True, autoincrement=True)
	number = Column('number', Integer)

	pre_answer_id = Column('pre_answer_id', Integer, ForeignKey(PreAnswer.id))
	pre_answer = relationship(PreAnswer, backref='answer', lazy='joined')

	feedback_id = Column('feedback_id', Integer, ForeignKey(Feedback.id))
	feedback = relationship(Feedback, backref='answer', lazy='joined')


class AnswerSchema(SQLAlchemyAutoSchema):
	class Meta:
		model = Answer
		include_relationships = False
		load_instance = True
		include_fk = True


Base.metadata.create_all(bind=engine)
