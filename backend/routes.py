from flask import request, Flask
from models import *
import json

app = Flask(__name__)


@app.route('/propertySet', methods=['POST'])
def new_property_set():
	args = request.get_json()
	try:
		property_set_schema = PropertySetSchema()
		property_set = property_set_schema.load(args, session=session)
		session.add(property_set)
		session.commit()
		return property_set_schema.dump(property_set)
	except ValidationError as err:
		return str(err)


@app.route('/propertySet/', methods=['GET'])
def find_property_set():
	args = request.args
	property_set_id = args.get('property_set_id')
	property_set = session.query(PropertySet).filter(PropertySet.id == property_set_id).first()
	property_set_schema = PropertySetSchema()
	return property_set_schema.dump(property_set)

# Needed delete feedback_history... redirect
#@app.route('/propertySet/', methods=['DELETE'])
def delete_property_set():
	args = request.args
	property_set_id = args.get('property_set_id')
	session.query(Question).filter(Question.property_set_id == property_set_id).delete()
	session.query(FeedbackHistory).filter(FeedbackHistory.property_set_id == property_set_id).delete()
	session.query(PropertySet).filter(PropertySet.id == property_set_id).delete()
	session.commit()
	return "Feedback deleted"


@app.route('/propertySets/', methods=['GET'])
def find_all_property_set():
	property_sets = session.query(PropertySet)
	property_set_schema = PropertySetSchema()
	return json.dumps([property_set_schema.dump(i) for i in property_sets])


@app.route('/feedback', methods=['POST'])
def new_feedback():
	args = request.get_json()
	try:
		feedback_schema = FeedbackSchema()
		feedback = feedback_schema.load(args, session=session)
		session.add(feedback)
		session.commit()
		return feedback_schema.dump(feedback)
	except ValidationError as err:
		return str(err)


@app.route('/feedback/', methods=['GET'])
def find_feedback_by_employee_id():
	args = request.args
	employee_id = args.get('employee_id')
	feedbacks = session.query(Feedback).filter(Feedback.employee_id == employee_id)
	feedback_schema = FeedbackSchema()
	return json.dumps([feedback_schema.dump(i) for i in feedbacks])


@app.route('/feedback/', methods=['DELETE'])
def delete_feedback():
	args = request.args
	feedback_id = args.get('feedback_id')
	session.query(Answer).filter(Answer.feedback_id == feedback_id).delete()
	session.query(Feedback).filter(Feedback.id == feedback_id).delete()
	session.commit()
	return "Feedback deleted"


@app.route('/feedbacks/', methods=['GET'])
def find_feedback():
	args = request.args
	feedback_id = args.get('feedback_id')
	feedback = session.query(Feedback).filter(Feedback.id == feedback_id).first()
	feedback_schema = FeedbackSchema()
	return feedback_schema.dump(feedback)


@app.route('/employee/', methods=['POST'])
def new_employee():
	args = request.get_json()
	try:
		employee_schema = EmployeeSchema()
		employee = employee_schema.load(args, session=session)
		session.add(employee)
		session.commit()
		return employee_schema.dump(employee)
	except ValidationError as err:
		return str(err)


@app.route('/employee/', methods=['GET'])
def find_employee():
	args = request.args
	employee_id = args.get('employee_id')
	employee = Session.query(Employee).filter(Employee.id == employee_id)
	return json.dumps([i.to_dict() for i in employee])


@app.route('/employee/findByCompany', methods=['GET'])
def find_employee_by_company():
	args = request.args
	company_id = args.get('company_id')
	employees = Session.query(Employee).filter(Employee.company_id == company_id)
	return json.dumps([i.to_dict() for i in employees])


@app.route('/employee/findByTeam', methods=['GET'])
def find_employee_by_team():
	args = request.args
	team_id = args.get('team_id')
	employees = Session.query(Employee).filter(Employee.team_id == team_id)
	return json.dumps([i.to_dict() for i in employees])

@app.route('/company/', methods=['POST'])
def new_company():
	args = request.get_json()
	try:
		company_schema = CompanySchema()
		company = company_schema.load(args, session=session)
		session.add(company)
		session.commit()
		return company_schema.dump(company)
	except ValidationError as err:
		return str(err)


@app.route('/company/', methods=['GET'])
def find_company():
	args = request.args
	company_id = args.get('company_id')
	company = session.query(Company).filter(Company.id == company_id).first()
	company_schema = CompanySchema()
	return company_schema.dump(company)


@app.route('/company/', methods=['DELETE'])
def delete_company():
	args = request.args
	company_id = args.get('company_id')

	"""redirect to employee, feedback history, feedback, answer needed"""

	session.query(Company).filter(Company.id == company_id).delete()
	session.commit()
	return "Company deleted"


@app.route('/team/findByCompany', methods=['GET'])
def find_team_by_company():
	args = request.args
	company_id = args.get('company_id')
	teams = Session.query(Team).filter(Team.company_id == company_id)
	return json.dumps([i.to_dict() for i in teams])


@app.route('/answer', methods=['POST'])
def new_answer():
	args = request.get_json()
	try:
		answer_schema = AnswerSchema()
		answer = answer_schema.load(args, session=session)
		session.add(answer)
		session.commit()
		return answer_schema.dump(answer)
	except ValidationError as err:
		return str(err)


@app.route('/answer/', methods=['GET'])
def find_answer_by_feedback_id():
	args = request.args
	feedback_id = args.get('feedback_id')
	answers = session.query(Answer).filter(Answer.feedback_id == feedback_id)
	answer_schema = AnswerSchema()
	return json.dumps([answer_schema.dump(i) for i in answers])


@app.route('/question', methods=['POST'])
def new_question():
	args = request.get_json()
	try:
		question_schema = QuestionSchema()
		question = question_schema.load(args, session=session)
		session.add(question)
		session.commit()
		return question_schema.dump(question)
	except ValidationError as err:
		return str(err)


@app.route('/question/', methods=['GET'])
def find_question_by_property_set_id():
	args = request.args
	property_set_id = args.get('property_set_id')
	questions = session.query(Question).filter(Question.property_set_id == property_set_id)
	question_schema = AnswerSchema()
	return json.dumps([question_schema.dump(i) for i in questions])

