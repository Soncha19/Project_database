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
# @app.route('/propertySet/', methods=['DELETE'])
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
def find_feedback():
	args = request.args
	feedback_id = args.get('feedback_id')
	feedbacks = session.query(Feedback).filter(Feedback.id == feedback_id).first()
	feedback_schema = FeedbackSchema()
	return feedback_schema.dump(feedbacks)


@app.route('/feedback/', methods=['DELETE'])
def delete_feedback():
	args = request.args
	feedback_id = args.get('feedback_id')
	session.query(Answer).filter(Answer.feedback_id == feedback_id).delete()
	session.query(Feedback).filter(Feedback.id == feedback_id).delete()
	session.commit()
	return "Feedback deleted"


@app.route('/feedback/findByEmployee', methods=['GET'])
def find_feedback_by_employee():
	args = request.args
	employee_id = args.get('employee_id')
	feedbacks = session.query(Feedback).filter(Feedback.employee_id == employee_id)
	feedback_schema = FeedbackSchema()
	return json.dumps([feedback_schema.dump(i) for i in feedbacks])


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
	employee = session.query(Employee).filter(Employee.id == employee_id).first()
	employee_schema = EmployeeSchema()
	return employee_schema.dump(employee)


@app.route('/employee/findByCompany', methods=['GET'])
def find_employee_by_company():
	args = request.args
	company_id = args.get('company_id')
	employees = session.query(Employee).filter(Employee.company_id == company_id)
	employee_schema = EmployeeSchema()
	return json.dumps([employee_schema.dump(i) for i in employees])


@app.route('/employee/findByTeam', methods=['GET'])
def find_employee_by_team():
	args = request.args
	team_id = args.get('team_id')
	employees = session.query(Employee).filter(Employee.team_id == team_id)
	employee_schema = EmployeeSchema()
	return json.dumps([employee_schema.dump(i) for i in employees])


# @app.route('/user/', methods=['PUT'])
# def update_user():
# 	args = request.get_json()
# 	if args.pop('id', False):
# 		return "You can't input id", 400
# 	arg = request.args
# 	user_id = arg.get('user_id')
# 	if session.query(User).filter(User.id == user_id).count() == 0:
# 		return "User not found", 404
# 	user_schema = UserSchema()
# 	try:
# 		user = user_schema.load(args, session=session)
# 		session.query(User).filter(user.id == user_id).update(args)
# 		user = user_schema.dump(session.query(User).filter(User.id == user_id).first())
# 		session.commit()
# 		return user, 200
# 	except ValidationError as err:
# 		return str(err), 400


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


@app.route('/feedbackHistory/', methods=['POST'])
def new_feedback_history():
	args = request.get_json()
	try:
		feedbackHistory_schema = FeedbackHistorySchema()
		feedback_history = feedbackHistory_schema.load(args, session=session)
		session.add(feedback_history)
		session.commit()
		return feedbackHistory_schema.dump(feedback_history)
	except ValidationError as err:
		return str(err)


@app.route('/feedbackHistory/id', methods=['GET'])
def find_feedback_history():
	args = request.args
	feedbackHistory_id = args.get('feedbackHistory_id')
	history = session.query(FeedbackHistory).filter(FeedbackHistory.employee_id == feedbackHistory_id).first()
	feedbackHistory_schema = FeedbackHistorySchema()
	return feedbackHistory_schema.dump(history)


@app.route('/feedbackHistory/delete', methods=['DELETE'])
def delete_feedback_history():
	args = request.args
	feedbackHistory_id = args.get('feedbackHistory_id')
	# write redirect
	# session.query(Feedback).filter(Feedback.employee_id == feedbackHistory_id).delete()
	session.query(FeedbackHistory).filter(FeedbackHistory.employee_id == feedbackHistory_id).delete()
	session.commit()
	return "FeedbackHistory deleted"


@app.route('/team', methods=['POST'])
def new_team():
	args = request.get_json()
	try:
		team_schema = TeamSchema()
		team = team_schema.load(args, session=session)
		session.add(team)
		session.commit()
		return team_schema.dump(team)
	except ValidationError as err:
		return str(err)


@app.route('/team/findByCompany', methods=['GET'])
def find_team_by_company():
	args = request.args
	company_id = args.get('company_id')
	teams = session.query(Team).filter(Team.company_id == company_id)
	team_schema = TeamSchema()
	return json.dumps([team_schema.dump(i) for i in teams])


@app.route('/team/', methods=['GET'])
def find_team():
	args = request.args
	team_id = args.get('team_id')
	team = session.query(Team).filter(Team.id == team_id).first()
	company_schema = CompanySchema()
	return company_schema.dump(team)


@app.route('/team/', methods=['DELETE'])
def delete_team():
	args = request.args
	team_id = args.get('team_id')
	session.query(Team).filter(Team.id == team_id).delete()
	session.commit()
	return "Company deleted"


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


@app.route('/allFeedbackHistory/', methods=['GET'])
def page_feedback_history():
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
		'feedbacks:': [feedback_schema.dump(i) for i in feedbacks],
		'answers': [answer_schema.dump(i) for i in answers],
		'property_set': property_set_schema.dump(property_set),
		'questions': [question_schema.dump(i) for i in questions]
	}
	return res


@app.route('/profile/', methods=['GET'])
def page_profile():
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
	return res


@app.route('/allFeedback', methods=['POST'])
def page_new_feedback():
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
			session.add(i)

		session.commit()

		res = {
			'feedback': feedback_schema.dump(feedback),
			'answers': [answer_schema.dump(i) for i in answers]
		}
		return res
	except ValidationError as err:
		return str(err)
