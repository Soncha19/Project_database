from flask import request, Flask
from models import *
from flask_cors import CORS
import json

app = Flask(__name__)
CORS(app)

@app.route('/team/findByCompany', methods=['GET'])
def find_team_by_company():
	args = request.args
	company_id = args.get('company_id')
	teams = Session.query(Team).filter(Team.company_id == company_id)
	return json.dumps([i.to_dict() for i in teams])


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


@app.route('/answer/', methods=['GET'])
def find_answer_by_feedback_id():
	args = request.args
	feedback_id = args.get('feedback_id')
	answers = Session.query(Answer).filter(Answer.feedback_id == feedback_id)
	return json.dumps([i.to_dict() for i in answers])


@app.route('/feedback/', methods=['GET'])
def find_feedback_by_employee_id():
	args = request.args
	employee_id = args.get('employee_id')
	feedbacks = Session.query(Feedback).filter(Feedback.employee_id == employee_id)
	return json.dumps([i.to_dict() for i in feedbacks])


@app.route('/question/', methods=['GET'])
def find_question_by_property_set_id():
	args = request.args
	property_set_id = args.get('property_set_id')
	questions = Session.query(Question).filter(Question.property_set_id == property_set_id)
	return json.dumps([i.to_dict() for i in questions])


@app.route('/property_set/', methods=['GET'])
def find_property_set():
	args = request.args
	property_set_id = args.get('property_set_id')
	property_sets = Session.query(PropertySet).filter(PropertySet.id == property_set_id)
	return json.dumps([i.to_dict() for i in property_sets])