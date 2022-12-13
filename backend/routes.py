
from flask import current_app as application, make_response, jsonify
from flask import request
from models import *
from flask_httpauth import HTTPBasicAuth
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
from werkzeug.security import generate_password_hash, check_password_hash
import json


auth = HTTPBasicAuth()



@application.route('/propertySet', methods=['POST'])
@jwt_required()
def new_property_set():
	session = Session()

	if not check_admin(session, get_jwt_identity()):
		return "Access denied", 403

	args = request.get_json()
	try:
		property_set_schema = PropertySetSchema()
		property_set = property_set_schema.load(args, session=session)
		session.add(property_set)
		session.commit()
		res = property_set_schema.dump(property_set)
		session.close()
		return res, 200
	except ValidationError as err:
		session.close()
		return str(err), 400


@application.route('/propertySet/', methods=['GET'])
@jwt_required()
def find_property_set():
	session = Session()

	if not check_admin(session, get_jwt_identity()):
		return "Access denied", 403

	args = request.args
	property_set_id = args.get('property_set_id')
	property_set = session.query(PropertySet).filter(PropertySet.id == property_set_id).first()
	property_set_schema = PropertySetSchema()
	res = property_set_schema.dump(property_set)
	session.close()
	return res, 200


@application.route('/propertySets/', methods=['GET'])
@jwt_required()
def find_property_set_by_company():
	session = Session()

	if not check_admin(session, get_jwt_identity()):
		return "Access denied", 403


	args = request.args
	company_id = args.get('company_id')
	property_sets = session.query(PropertySet).filter(
		or_(PropertySet.company_id == company_id, PropertySet.id == 1)).filter(PropertySet.is_used == 1)
	property_set_schema = PropertySetSchema()
	res = json.dumps([property_set_schema.dump(i) for i in property_sets])
	session.close()
	return res, 200


@application.route('/feedback', methods=['POST'])
@jwt_required()
def new_feedback():
	session = Session()

	if not check_admin(session, get_jwt_identity()):
		return "Access denied", 403

	args = request.get_json()
	try:
		feedback_schema = FeedbackSchema()
		feedback = feedback_schema.load(args, session=session)
		session.add(feedback)
		session.commit()
		res = feedback_schema.dump(feedback)
		session.close()
		return res, 200
	except ValidationError as err:
		session.close()
		return str(err), 400


@application.route('/feedback/', methods=['GET'])
@jwt_required()
def find_feedback():
	session = Session()

	if not check_access(session, get_jwt_identity()):
		return "Access denied", 403

	args = request.args
	feedback_id = args.get('feedback_id')
	feedbacks = session.query(Feedback).filter(Feedback.id == feedback_id).first()
	feedback_schema = FeedbackSchema()
	res = feedback_schema.dump(feedbacks)
	return res, 200


@application.route('/feedback/', methods=['DELETE'])
@jwt_required()
def delete_feedback():
	session = Session()

	if not check_admin(session, get_jwt_identity()):
		return "Access denied", 403

	args = request.args
	feedback_id = args.get('feedback_id')
	if session.query(Answer).filter(Answer.feedback_id == feedback_id).count() == 0:
		session.close()
		return "Such feedback doesn't exist", 404
	feedback = session.query(Answer).filter(Answer.feedback_id == feedback_id)
	session.query(Answer).filter(Answer.feedback_id == feedback_id).delete()
	session.query(Feedback).filter(Feedback.id == feedback_id).delete()
	session.commit()
	session.close()
	return feedback, 200


@application.route('/feedback/findByEmployee', methods=['GET'])
@jwt_required()
def find_feedback_by_employee():
	session = Session()
	args = request.args
	employee_id = args.get('employee_id')

	if not(check_admin(session, get_jwt_identity()) or check_personal(session, get_jwt_identity()) == employee_id):
		return "Access denied", 403

	feedbacks = session.query(Feedback).filter(Feedback.employee_id == employee_id)
	feedback_schema = FeedbackSchema()
	res = json.dumps([feedback_schema.dump(i) for i in feedbacks])
	session.close()
	return res, 200


@application.route('/employee/', methods=['POST'])
def new_employee():
	session = Session()
	args = request.get_json()
	try:
		employee_schema = EmployeeSchema()
		employee = employee_schema.load(args, session=session)
		employee.password = generate_password_hash(employee.password)
		session.add(employee)
		session.commit()
		access_token = create_access_token(identity=employee.email)
		session.close()
		return json.dumps({'token': access_token}), 200
	except ValidationError as err:
		session.close()
		return str(err), 400


@application.route('/employee/', methods=['GET'])
@jwt_required()
def find_employee():
	session = Session()

	if not check_access(session, get_jwt_identity()):
		return "Access denied", 403

	args = request.args
	employee_id = args.get('employee_id')
	employee = session.query(Employee).filter(Employee.id == employee_id).first()
	employee_schema = EmployeeSchema()
	res = employee_schema.dump(employee)
	session.close()
	return res, 200


@application.route('/employee/findByCompany', methods=['GET'])
@jwt_required()
def find_employee_by_company():
	session = Session()

	if not check_access(session, get_jwt_identity()):
		return "Access denied", 403

	args = request.args
	company_id = args.get('company_id')
	employees = session.query(Employee).filter(Employee.company_id == company_id)
	employee_schema = EmployeeSchema()
	res = json.dumps([employee_schema.dump(i) for i in employees])
	session.close()
	return res, 200


@application.route('/employee/findByCompany/noTeam', methods=['GET'])
@jwt_required()
def find_employee_by_company_no_team():
	session = Session()

	if not check_access(session, get_jwt_identity()):
		return "Access denied", 403

	args = request.args
	company_id = args.get('company_id')
	employees = session.query(Employee).filter(Employee.company_id == company_id).filter(Employee.team_id == 1)
	employee_schema = EmployeeSchema()
	res = json.dumps([employee_schema.dump(i) for i in employees])
	session.close()
	return res, 200


@application.route('/employee/findByTeam', methods=['GET'])
@jwt_required()
def find_employee_by_team():
	session = Session()

	if not check_access(session, get_jwt_identity()):
		return "Access denied", 403

	args = request.args
	team_id = args.get('team_id')
	employees = session.query(Employee).filter(Employee.team_id == team_id)
	employee_schema = EmployeeSchema()
	res = json.dumps([employee_schema.dump(i) for i in employees])
	session.close()
	return res, 200


@application.route('/employee/', methods=['PUT'])
@jwt_required()
def update_employee():
	session = Session()
	args = request.get_json()
	arg = request.args
	employee_id = arg.get('employee_id')

	if not (check_personal(session, get_jwt_identity()) == int(employee_id)):
		return "Access denied", 403

	employee_schema = EmployeeSchema()
	try:
		employee = employee_schema.load(args, session=session)
		if 'password' in args.keys():
			args['password'] = generate_password_hash(employee.password)
		session.query(Employee).filter(Employee.id == employee_id).update(args)
		employee = employee_schema.dump(session.query(Employee).filter(Employee.id == employee_id).first())
		session.commit()
		session.close()
		return employee, 200
	except ValidationError as err:
		session.close()
		return str(err), 400


@application.route('/company/', methods=['POST'])
@jwt_required()
def new_company():
	session = Session()

	if not check_access(session, get_jwt_identity()):
		return "Access denied", 403

	args = request.get_json()
	try:
		company_schema = CompanySchema()
		company = company_schema.load(args, session=session)
		session.add(company)
		session.commit()
		owner_email = get_jwt_identity()
		session.query(Employee).filter(Employee.email == owner_email).update({'is_owner': True, 'company_id': company.id})
		session.commit()
		res = company_schema.dump(company)
		session.close()
		return res, 200
	except ValidationError as err:
		session.close()
		return str(err), 400


@application.route('/company/', methods=['GET'])
@jwt_required()
def find_company():
	session = Session()

	if not check_access(session, get_jwt_identity()):
		return "Access denied", 403

	args = request.args
	company_id = args.get('company_id')
	company = session.query(Company).filter(Company.id == company_id).first()
	company_schema = CompanySchema()
	res = company_schema.dump(company)
	session.close()
	return res, 200


@application.route('/company/', methods=['PUT'])
@jwt_required()
def update_company():
	session = Session()

	if not check_admin(session, get_jwt_identity()):
		return "Access denied", 403

	args = request.get_json()
	arg = request.args
	company_id = arg.get('company_id')
	company_schema = CompanySchema()
	try:
		company_schema.load(args, session=session)
		session.query(Company).filter(Company.id == company_id).update(args)
		session.commit()
		company = company_schema.dump(session.query(Company).filter(Company.id == company_id).first())
		session.commit()
		session.close()
		return company, 200
	except ValidationError as err:
		session.close()
		return str(err), 400


@application.route('/company/', methods=['DELETE'])
@jwt_required()
def delete_company():
	session = Session()

	if not check_admin(session, get_jwt_identity()):
		return "Access denied", 403

	args = request.args
	company_id = args.get('company_id')
	if int(company_id) == 1:
		return "This company can't be deleted", 400
	if session.query(Company).filter(Company.id == company_id).count() == 0:
		session.close()
		return "Such company doesn't exist", 404

	teams = session.query(Team).filter(Team.company_id == company_id)
	for team in teams:
		session.query(Employee).filter(Employee.team_id == team.id).update({'team_id': 1})
		session.query(Team).filter(Team.id == team.id).delete()


	session.query(Employee).filter(Employee.company_id == company_id).update({'company_id': 1, 'role': False, 'is_owner': False})
	session.query(Company).filter(Company.id == company_id).delete()

	session.commit()
	session.close()
	return "Company deleted", 200


@application.route('/team/', methods=['PUT'])
@jwt_required()
def update_team():
	session = Session()

	if not check_admin(session, get_jwt_identity()):
		return "Access denied", 403

	args = request.get_json()
	arg = request.args
	team_id = arg.get('team_id')
	team_schema = TeamSchema()
	try:
		team_schema.load(args, session=session)
		session.query(Team).filter(Team.id == team_id).update(args)
		session.commit()
		team = team_schema.dump(session.query(Team).filter(Team.id == team_id).first())
		session.commit()
		session.close()
		return team, 200
	except ValidationError as err:
		session.close()
		return str(err), 400


@application.route('/team/', methods=['DELETE'])
@jwt_required()
def delete_team():
	session = Session()

	if not check_admin(session, get_jwt_identity()):
		return "Access denied", 403

	args = request.args
	team_id = args.get('team_id')
	if int(team_id) == 1:
		return "This team can't be deleted", 400
	if session.query(Team).filter(Team.id == team_id).count() == 0:
		session.close()
		return "Such team doesn't exist", 404
	session.query(Employee).filter(Employee.team_id == team_id).update({'team_id': 1})
	session.query(Team).filter(Team.id == team_id).delete()
	session.commit()
	session.close()
	return "Team deleted", 200


@application.route('/feedbackHistory/', methods=['POST'])
@jwt_required()
def new_feedback_history():
	session = Session()

	if not check_admin(session, get_jwt_identity()):
		return "Access denied", 403

	args = request.get_json()
	try:
		feedbackHistory_schema = FeedbackHistorySchema()
		feedback_history = feedbackHistory_schema.load(args, session=session)
		user = session.query(Employee).filter(Employee.id == args.get('employee_id')).first()
		feedback_history.team_id = user.team_id
		session.add(feedback_history)
		session.commit()
		res = feedbackHistory_schema.dump(feedback_history)
		session.close()
		return res, 200
	except ValidationError as err:
		session.close()
		return str(err), 400


@application.route('/feedbackHistory/id', methods=['GET'])
@jwt_required()
def find_feedback_history():
	session = Session()

	if not check_access(session, get_jwt_identity()):
		return "Access denied", 403

	args = request.args
	feedbackHistory_id = args.get('feedbackHistory_id')
	history = session.query(FeedbackHistory).filter(FeedbackHistory.employee_id == feedbackHistory_id).first()
	feedbackHistory_schema = FeedbackHistorySchema()
	res = feedbackHistory_schema.dump(history)
	session.close()
	return res, 200


@application.route('/team', methods=['POST'])
@jwt_required()
def new_team():
	session = Session()

	if not check_admin(session, get_jwt_identity()):
		return "Access denied", 403

	args = request.get_json()
	try:
		team_schema = TeamSchema()
		team = team_schema.load(args, session=session)
		session.add(team)
		session.commit()
		res = team_schema.dump(team)
		session.close()
		return res, 200
	except ValidationError as err:
		session.close()
		return str(err), 400


@application.route('/team/findByCompany', methods=['GET'])
@jwt_required()
def find_team_by_company():
	session = Session()

	if not check_access(session, get_jwt_identity()):
		return "Access denied", 403

	args = request.args
	company_id = args.get('company_id')
	teams = session.query(Team).filter(Team.company_id == company_id)
	team_schema = TeamSchema()
	res = json.dumps([team_schema.dump(i) for i in teams])
	session.close()
	return res, 200


@application.route('/team/', methods=['GET'])
@jwt_required()
def find_team():
	session = Session()

	if not check_access(session, get_jwt_identity()):
		return "Access denied", 403

	args = request.args
	team_id = args.get('team_id')
	team = session.query(Team).filter(Team.id == team_id).first()
	company_schema = CompanySchema()
	res = company_schema.dump(team)
	session.close()
	return res, 200


@application.route('/answer', methods=['POST'])
@jwt_required()
def new_answer():
	session = Session()
	if not check_admin(session, get_jwt_identity()):
		return "Access denied", 403

	args = request.get_json()
	try:
		answer_schema = AnswerSchema()
		answer = answer_schema.load(args, session=session)
		session.add(answer)
		session.commit()
		res = answer_schema.dump(answer)
		session.close()
		return res, 200
	except ValidationError as err:
		session.close()
		return str(err), 400


@application.route('/answer/', methods=['GET'])
@jwt_required()
def find_answer_by_feedback_id():
	session = Session()
	if not check_access(session, get_jwt_identity()):
		return "Access denied", 403

	args = request.args
	feedback_id = args.get('feedback_id')
	answers = session.query(Answer).filter(Answer.feedback_id == feedback_id)
	answer_schema = AnswerSchema()
	res = json.dumps([answer_schema.dump(i) for i in answers])
	session.close()
	return res, 200


@application.route('/preAnswer', methods=['POST'])
@jwt_required()
def new_pre_answer():
	session = Session()
	if not check_admin(session, get_jwt_identity()):
		return "Access denied", 403

	args = request.get_json()
	try:
		pre_answer_schema = PreAnswerSchema()
		pre_answer = pre_answer_schema.load(args, session=session)
		session.add(pre_answer)
		session.commit()
		res = pre_answer_schema.dump(pre_answer)
		session.close()
		return res, 200
	except ValidationError as err:
		session.close()
		return str(err), 400


@application.route('/preAnswer/', methods=['GET'])
@jwt_required()
def find_pre_answer_by_property_set_id():
	session = Session()
	if not check_access(session, get_jwt_identity()):
		return "Access denied", 403
	args = request.args
	property_set_id = args.get('property_set_id')
	pre_answers = session.query(PreAnswer).filter(PreAnswer.property_set_id == property_set_id)
	pre_answer_schema = PreAnswerSchema()
	res = json.dumps([pre_answer_schema.dump(i) for i in pre_answers])
	session.close()
	return res, 200


@application.route('/question', methods=['POST'])
@jwt_required()
def new_question():
	session = Session()
	if not check_admin(session, get_jwt_identity()):
		return "Access denied", 403
	args = request.get_json()
	try:
		question_schema = QuestionSchema()
		question = question_schema.load(args, session=session)
		session.add(question)
		session.commit()
		res = question_schema.dump(question)
		session.close()
		return res, 200
	except ValidationError as err:
		session.close()
		return str(err), 400


@application.route('/question/', methods=['GET'])
@jwt_required()
def find_question_by_property_set_id():
	session = Session()
	if not check_access(session, get_jwt_identity()):
		return "Access denied", 403
	args = request.args
	property_set_id = args.get('property_set_id')
	questions = session.query(Question).filter(Question.property_set_id == property_set_id)
	question_schema = AnswerSchema()
	res = json.dumps([question_schema.dump(i) for i in questions])
	session.close()
	return res, 200


@application.route('/allFeedbackHistory/', methods=['GET'])
@jwt_required()
def page_feedback_history():
	session = Session()
	args = request.args
	employee_id = args.get('employee_id')

	if not(check_admin(session, get_jwt_identity()) or check_personal(session, get_jwt_identity()) == employee_id):
		return "Access denied", 403

	feedback_history = session.query(FeedbackHistory).filter(FeedbackHistory.employee_id == employee_id).first()
	feedbackHistory_schema = FeedbackHistorySchema()

	employee = session.query(Employee).filter(Employee.id == employee_id).first()
	employee_schema = EmployeeSchema()

	feedbacks = session.query(Feedback).filter(Feedback.employee_id == employee_id)
	feedback_schema = FeedbackSchema()

	property_set = session.query(PropertySet).filter(PropertySet.id == feedback_history.property_set_id).first()
	property_set_schema = PropertySetSchema()

	questions = session.query(Question).filter(Question.property_set_id == feedback_history.property_set_id)
	question_schema = AnswerSchema()

	answers = []
	answer_schema = AnswerSchema()
	for i in feedbacks:
		[answers.append(i) for i in session.query(Answer).filter(Answer.feedback_id == i.id)]

	pre_answers = []
	pre_answer_schema = PreAnswerSchema()
	for i in questions:
		[pre_answers.append(i) for i in session.query(PreAnswer).filter(PreAnswer.question_id == i.id)]

	res = {
		'feedback_history': feedbackHistory_schema.dump(feedback_history),
		'employee': employee_schema.dump(employee),
		'feedbacks': [feedback_schema.dump(i) for i in feedbacks],
		'answers': [answer_schema.dump(i) for i in answers],
		'property_set': property_set_schema.dump(property_set),
		'questions': [question_schema.dump(i) for i in questions],
		'pre_answers': [pre_answer_schema.dump(i) for i in pre_answers]
	}
	session.close()
	return res, 200


@application.route('/profile/', methods=['GET'])
@jwt_required()
def page_profile():
	session = Session()
	args = request.args
	employee_id = args.get('employee_id')

	if not (check_personal(session, get_jwt_identity()) == employee_id):
		return "Access denied", 403

	employee = session.query(Employee).filter(Employee.id == employee_id).first()
	employee_schema = EmployeeSchema()

	company = session.query(Company).filter(Company.id == employee.company_id).first()
	company_schema = CompanySchema()

	res = {
		'employee': employee_schema.dump(employee),
		'company': company_schema.dump(company)
	}
	session.close()
	return res, 200


@application.route('/allFeedback', methods=['POST'])
@jwt_required()
def page_new_feedback():
	session = Session()
	args = request.get_json()
	if not check_admin(session, get_jwt_identity()):
		return "Access denied", 403
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
		return res, 200
	except ValidationError as err:
		session.close()
		return str(err), 400


@application.route('/allPropertySet', methods=['POST'])
@jwt_required()
def page_new_property_set():
	session = Session()
	args = request.get_json()
	if not check_admin(session, get_jwt_identity()):
		return "Access denied", 403
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

		pre_answer_schema = PreAnswerSchema()
		pre_answers = []
		for i in args['pre_answers']:
			pre_answers.append(pre_answer_schema.load(i, session=session))
		for i in pre_answers:
			i.property_set = property_set
			session.add(i)

		session.commit()

		res = {
			'property_set': property_set_schema.dump(property_set),
			'questions': [question_schema.dump(i) for i in questions],
			'pre_answers': [pre_answer_schema.dump(i) for i in pre_answers]
		}
		session.close()
		return res, 200
	except ValidationError as err:
		session.close()
		return str(err), 400


@application.route('/allPropertySetUnique', methods=['POST'])
@jwt_required()
def page_new_property_set_unique():
	session = Session()
	args = request.get_json()
	if not check_admin(session, get_jwt_identity()):
		return "Access denied", 403
	try:
		property_set_schema = PropertySetSchema()
		property_set = property_set_schema.load(args['property_set'], session=session)
		session.add(property_set)

		question_schema = QuestionSchema()
		questions = []

		pre_answer_schema = PreAnswerSchema()
		pre_answers = []

		for i in args['questions']:
			questions.append(question_schema.load(i['question'], session=session))
			questions[-1].property_set = property_set
			session.add(questions[-1])
			for j in i['pre_answers']:
				pre_answers.append(pre_answer_schema.load(j, session=session))
				pre_answers[-1].question = questions[-1]
				session.add(pre_answers[-1])

		session.commit()

		res = {
			'property_set': property_set_schema.dump(property_set),
			'questions': [question_schema.dump(i) for i in questions],
			'pre_answers': [pre_answer_schema.dump(i) for i in pre_answers]
		}
		session.close()
		return res, 200
	except ValidationError as err:
		session.close()
		return str(err), 400


@application.route('/allPropertySet/', methods=['GET'])
@jwt_required()
def page_find_property_set():
	session = Session()
	if not check_admin(session, get_jwt_identity()):
		return "Access denied", 403
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
	return res, 200


@application.route('/employee/findByToken', methods=['GET'])
@jwt_required()
def find_employee_by_token():
	session = Session()
	if not check_admin(session, get_jwt_identity()):
		return "Access denied", 403
	employee = session.query(Employee).filter(Employee.email == get_jwt_identity()).first()
	employee_schema = EmployeeSchema()
	res = employee_schema.dump(employee)
	session.close()
	return res, 200


@application.route("/login", methods=["POST"])
def login():
	auth = request.get_json()

	try:
		email = auth['email']
		password = auth['password']
	except:
		return make_response('could not verify', 401, {'WWW.Authentication': 'Basic realm: "login required"'})

	session = Session()
	users = session.query(Employee).filter(Employee.email == email)
	if users.count() == 0:
		return jsonify({'response': 'user with such email not found'}), 404
	user = users.first()

	if check_password_hash(user.password, password):
		access_token = create_access_token(identity=email)
		return json.dumps({'token': access_token})

	return make_response('could not verify', 401, {'WWW.Authentication': 'Basic realm: "login required"'})


def check_admin(session, email):
	user = session.query(Employee).filter(Employee.email == email)
	if user.count() == 1:
		if user.first().role or user.first().is_owner:
			return True
	return False


def check_owner(session, email):
	user = session.query(Employee).filter(Employee.email == email)
	if user.count() == 1:
		if user.first().is_owner:
			return True
	return False


def check_access(session, email):
	user = session.query(Employee).filter(Employee.email == email)
	if user.count() == 1:
		return True
	return False


def check_personal(session, email):
	user = session.query(Employee).filter(Employee.email == email)
	if user.count() == 1:
		return user.first().id
	return 0

=======
from flask import current_app as application
from flask import request
from models import *
import json
    session.close()
    return res, 200


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
    return res, 200


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
        return res, 200
    except ValidationError as err:
        session.close()
        return str(err), 400


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
        return res, 200
    except ValidationError as err:
        session.close()
        return str(err), 400


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
    return res, 200

