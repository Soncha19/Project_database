from flask import current_app as application
from flask import request
from models import *
import json


@application.route('/propertySet', methods=['POST'])
def new_property_set():
	session = Session()
	args = request.get_json()
	try:
		property_set_schema = PropertySetSchema()
		property_set = property_set_schema.load(args, session=session)
		session.add(property_set)
		session.commit()
		session.close()
		return property_set_schema.dump(property_set)
	except ValidationError as err:
		return str(err)


@application.route('/propertySet/', methods=['GET'])
def find_property_set():
	session = Session()
	args = request.args
	property_set_id = args.get('property_set_id')
	property_set = session.query(PropertySet).filter(PropertySet.id == property_set_id).first()
	property_set_schema = PropertySetSchema()
	session.close()
	return property_set_schema.dump(property_set)


# Needed delete feedback_history... redirect
@application.route('/propertySet/', methods=['DELETE'])
def delete_property_set():
	session = Session()
	args = request.args
	property_set_id = args.get('property_set_id')
	session.query(Question).filter(Question.property_set_id == property_set_id).delete()
	session.query(FeedbackHistory).filter(FeedbackHistory.property_set_id == property_set_id).delete()
	session.query(PropertySet).filter(PropertySet.id == property_set_id).delete()
	session.commit()
	session.close()
	return "Feedback deleted"


@application.route('/propertySets/', methods=['GET'])
def find_all_property_set():
	session = Session()
	property_sets = session.query(PropertySet)
	property_set_schema = PropertySetSchema()
	session.close()
	return json.dumps([property_set_schema.dump(i) for i in property_sets])


@application.route('/feedback', methods=['POST'])
def new_feedback():
	session = Session()
	args = request.get_json()
	try:
		feedback_schema = FeedbackSchema()
		feedback = feedback_schema.load(args, session=session)
		session.add(feedback)
		session.commit()
		session.close()
		return feedback_schema.dump(feedback)
	except ValidationError as err:
		session.close()
		return str(err)


@application.route('/feedback/', methods=['GET'])
def find_feedback():
	session = Session()
	args = request.args
	feedback_id = args.get('feedback_id')
	feedbacks = session.query(Feedback).filter(Feedback.id == feedback_id).first()
	feedback_schema = FeedbackSchema()
	session.close()
	return feedback_schema.dump(feedbacks)


@application.route('/feedback/', methods=['DELETE'])
def delete_feedback():
	session = Session()
	args = request.args
	feedback_id = args.get('feedback_id')
	session.query(Answer).filter(Answer.feedback_id == feedback_id).delete()
	session.query(Feedback).filter(Feedback.id == feedback_id).delete()
	session.commit()
	session.close()
	return "Feedback deleted"


@application.route('/feedback/findByEmployee', methods=['GET'])
def find_feedback_by_employee():
	session = Session()
	args = request.args
	employee_id = args.get('employee_id')
	feedbacks = session.query(Feedback).filter(Feedback.employee_id == employee_id)
	feedback_schema = FeedbackSchema()
	session.close()
	return json.dumps([feedback_schema.dump(i) for i in feedbacks])


@application.route('/employee/', methods=['POST'])
def new_employee():
	session = Session()
	args = request.get_json()
	try:
		employee_schema = EmployeeSchema()
		employee = employee_schema.load(args, session=session)
		session.add(employee)
		session.commit()
		session.close()
		return employee_schema.dump(employee)
	except ValidationError as err:
		session.close()
		return str(err)


@application.route('/employee/', methods=['GET'])
def find_employee():
	session = Session()
	args = request.args
	employee_id = args.get('employee_id')
	employee = session.query(Employee).filter(Employee.id == employee_id).first()
	employee_schema = EmployeeSchema()
	session.close()
	return employee_schema.dump(employee)


@application.route('/employee/findByCompany', methods=['GET'])
def find_employee_by_company():
	session = Session()
	args = request.args
	company_id = args.get('company_id')
	employees = session.query(Employee).filter(Employee.company_id == company_id)
	employee_schema = EmployeeSchema()
	session.close()
	return json.dumps([employee_schema.dump(i) for i in employees])


@application.route('/employee/findByTeam', methods=['GET'])
def find_employee_by_team():
	session = Session()
	args = request.args
	team_id = args.get('team_id')
	employees = session.query(Employee).filter(Employee.team_id == team_id)
	employee_schema = EmployeeSchema()
	session.close()
	return json.dumps([employee_schema.dump(i) for i in employees])


@application.route('/user/', methods=['PUT'])
def update_user():
	session = Session()
	args = request.get_json()
	arg = request.args
	employee_id = arg.get('employee_id')
	user_schema = EmployeeSchema()
	try:
		user = user_schema.load(args, session=session)
		session.query(Employee).filter(user.id == employee_id).update(args)
		user = user_schema.dump(session.query(Employee).filter(Employee.id == employee_id).first())
		session.commit()
		return user, 200
		session.close()
	except ValidationError as err:
		session.close()
		return str(err), 400


@application.route('/company/', methods=['POST'])
def new_company():
	session = Session()
	args = request.get_json()
	try:
		company_schema = CompanySchema()
		company = company_schema.load(args, session=session)
		session.add(company)
		session.commit()
		session.close()
		return company_schema.dump(company)
	except ValidationError as err:
		session.close()
		return str(err)


@application.route('/company/', methods=['GET'])
def find_company():
	session = Session()
	args = request.args
	company_id = args.get('company_id')
	company = session.query(Company).filter(Company.id == company_id).first()
	company_schema = CompanySchema()
	session.close()
	return company_schema.dump(company)


@application.route('/company/', methods=['DELETE'])
def delete_company():
	session = Session()
	args = request.args
	company_id = args.get('company_id')

	"""redirect to employee, feedback history, feedback, answer needed"""

	session.query(Company).filter(Company.id == company_id).delete()
	session.commit()
	session.close()
	return "Company deleted"


@application.route('/feedbackHistory/', methods=['POST'])
def new_feedback_history():
	session = Session()
	args = request.get_json()
	try:
		feedbackHistory_schema = FeedbackHistorySchema()
		feedback_history = feedbackHistory_schema.load(args, session=session)
		session.add(feedback_history)
		session.commit()
		session.close()
		return feedbackHistory_schema.dump(feedback_history)
	except ValidationError as err:
		session.close()
		return str(err)


@application.route('/feedbackHistory/id', methods=['GET'])
def find_feedback_history():
	session = Session()
	args = request.args
	feedbackHistory_id = args.get('feedbackHistory_id')
	history = session.query(FeedbackHistory).filter(FeedbackHistory.employee_id == feedbackHistory_id).first()
	feedbackHistory_schema = FeedbackHistorySchema()
	session.close()
	return feedbackHistory_schema.dump(history)


@application.route('/feedbackHistory/delete', methods=['DELETE'])
def delete_feedback_history():
	session = Session()
	args = request.args
	feedbackHistory_id = args.get('feedbackHistory_id')
	# write redirect
	# session.query(Feedback).filter(Feedback.employee_id == feedbackHistory_id).delete()
	session.query(FeedbackHistory).filter(FeedbackHistory.employee_id == feedbackHistory_id).delete()
	session.commit()
	session.close()
	return "FeedbackHistory deleted"


@application.route('/team', methods=['POST'])
def new_team():
	session = Session()
	args = request.get_json()
	try:
		team_schema = TeamSchema()
		team = team_schema.load(args, session=session)
		session.add(team)
		session.commit()
		session.close()
		return team_schema.dump(team)
	except ValidationError as err:
		session.close()
		return str(err)


@application.route('/team/findByCompany', methods=['GET'])
def find_team_by_company():
	session = Session()
	args = request.args
	company_id = args.get('company_id')
	teams = session.query(Team).filter(Team.company_id == company_id)
	team_schema = TeamSchema()
	session.close()
	return json.dumps([team_schema.dump(i) for i in teams])


@application.route('/team/', methods=['GET'])
def find_team():
	session = Session()
	args = request.args
	team_id = args.get('team_id')
	team = session.query(Team).filter(Team.id == team_id).first()
	company_schema = CompanySchema()
	session.close()
	return company_schema.dump(team)


@application.route('/team/', methods=['DELETE'])
def delete_team():
	session = Session()
	args = request.args
	team_id = args.get('team_id')
	session.query(Team).filter(Team.id == team_id).delete()
	session.commit()
	session.close()
	return "Company deleted"


@application.route('/answer', methods=['POST'])
def new_answer():
	session = Session()
	args = request.get_json()
	try:
		answer_schema = AnswerSchema()
		answer = answer_schema.load(args, session=session)
		session.add(answer)
		session.commit()
		session.close()
		return answer_schema.dump(answer)
	except ValidationError as err:
		session.close()
		return str(err)


@application.route('/answer/', methods=['GET'])
def find_answer_by_feedback_id():
	session = Session()
	args = request.args
	feedback_id = args.get('feedback_id')
	answers = session.query(Answer).filter(Answer.feedback_id == feedback_id)
	answer_schema = AnswerSchema()
	session.close()
	return json.dumps([answer_schema.dump(i) for i in answers])


@application.route('/question', methods=['POST'])
def new_question():
	session = Session()
	args = request.get_json()
	try:
		question_schema = QuestionSchema()
		question = question_schema.load(args, session=session)
		session.add(question)
		session.commit()
		session.close()
		return question_schema.dump(question)
	except ValidationError as err:
		session.close()
		return str(err)


@application.route('/question/', methods=['GET'])
def find_question_by_property_set_id():
	session = Session()
	args = request.args
	property_set_id = args.get('property_set_id')
	questions = session.query(Question).filter(Question.property_set_id == property_set_id)
	question_schema = AnswerSchema()
	session.close()
	return json.dumps([question_schema.dump(i) for i in questions])


@application.route('/allFeedbackHistory/', methods=['GET'])
def page_feedback_history():
	session = Session()

	args = request.args
	employee_id = args.get('employee_id')

	feedback_history = session.query(FeedbackHistory).filter(FeedbackHistory.employee_id == employee_id).first()
	feedbackHistory_schema = FeedbackHistorySchema()

	employee = session.query(Employee).filter(Employee.id == employee_id).first()
	employee_schema = EmployeeSchema()

	feedbacks = session.query(Feedback).filter(Feedback.employee_id == employee_id)
	feedback_schema = FeedbackSchema()

	answers = []
	for i in feedbacks:
		[answers.append(j) for j in session.query(Answer).filter(Answer.feedback_id == i.id)]
	answer_schema = AnswerSchema()

	property_set = session.query(PropertySet).filter(PropertySet.id == feedback_history.property_set_id).first()
	property_set_schema = PropertySetSchema()

	questions = session.query(Question).filter(Question.property_set_id == feedback_history.property_set_id)
	question_schema = AnswerSchema()

	res = {
		'feedback_history': feedbackHistory_schema.dump(feedback_history),
		'employee': employee_schema.dump(employee),
		'feedbacks': [feedback_schema.dump(i) for i in feedbacks],
		'answers': [answer_schema.dump(i) for i in answers],
		'property_set': property_set_schema.dump(property_set),
		'questions': [question_schema.dump(i) for i in questions]
	}
	session.close()
	return res


@application.route('/profile/', methods=['GET'])
def page_profile():
	session = Session()
	args = request.args
	employee_id = args.get('employee_id')
	employee = session.query(Employee).filter(Employee.id == employee_id).first()
	employee_schema = EmployeeSchema()

	company = session.query(Company).filter(Company.id == employee.company_id).first()
	company_schema = CompanySchema()

	res = {
		'employee': employee_schema.dump(employee),
		'company': company_schema.dump(company)
	}
	session.close()
	return res


@application.route('/allFeedback', methods=['POST'])
def page_new_feedback():
	session = Session()
	args = request.get_json()
	try:
		feedback_schema = FeedbackSchema()
		feedback = feedback_schema.load(args['feedback'], session=session)
		session.add(feedback)

		answer_schema = AnswerSchema()
		answers = []
		for i in args['answers']:
			answers.append(answer_schema.load(i, session=session))
		for i in answers:
			i.feedback = feedback
			session.add(i)

		session.commit()

		res = {
			'feedback': feedback_schema.dump(feedback),
			'answers': [answer_schema.dump(i) for i in answers]
		}
		session.close()
		return res
	except ValidationError as err:
		session.close()
		return str(err)


@application.route('/allPropertySet', methods=['POST'])
def page_new_property_set():
	session = Session()
	args = request.get_json()
	try:
		property_set_schema = PropertySetSchema()
		property_set = property_set_schema.load(args['property_set'], session=session)
		session.add(property_set)

		question_schema = QuestionSchema()
		questions = []
		for i in args['questions']:
			questions.append(question_schema.load(i, session=session))
		for i in questions:
			i.property_set = property_set
			session.add(i)

		session.commit()

		res = {
			'property_set': property_set_schema.dump(property_set),
			'questions': [question_schema.dump(i) for i in questions]
		}
		session.close()
		return res
	except ValidationError as err:
		session.close()
		return str(err)


@application.route('/allPropertySet/', methods=['GET'])
def page_find_property_set():
	session = Session()
	args = request.args
	company_id = args.get('company_id')
	employees = session.query(Employee).filter(Employee.company_id == company_id)
	employee_schema = EmployeeSchema()

	property_sets = session.query(PropertySet)
	property_set_schema = PropertySetSchema()

	res = {
		'employees': [employee_schema.dump(i) for i in employees],
		'property_sets': [property_set_schema.dump(i) for i in property_sets]
	}
	session.close()
	return res
