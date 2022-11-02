from flask import request, Flask
from models import *
import json

app = Flask(__name__)





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



@app.route('/feedbackHistory/', methods=['POST'])
def new_feedbackHistory():
	args = request.get_json()
	try:
		feedbackHistory_schema = FeedbackHistorySchema()
		feedback_history= feedbackHistory_schema.load(args, session=session)
		session.add(feedback_history)
		session.commit()
		return feedbackHistory_schema.dump(feedback_history)
	except ValidationError as err:
		return str(err)
@app.route('/feedbackHistory/id', methods=['GET'])
def find_feedbackHistory_by_id():
    args = request.args
    feedbackHistory_id = args.get('feedbackHistory_id')
    history = session.query(FeedbackHistory).filter(FeedbackHistory.employee_id== feedbackHistory_id).first()
    feedbackHistory_schema = FeedbackHistorySchema()
    return feedbackHistory_schema.dump(history)
@app.route('/feedbackHistory/delete', methods=['DELETE'])
def delete_feedbackHistory():
    args = request.args
    feedbackHistory_id = args.get('feedbackHistory_id')
    # write redirect
    #session.query(Feedback).filter(Feedback.employee_id == feedbackHistory_id).delete()
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
def find_team_by_company_id():
    args = request.args
    company_id = args.get('company_id')
    teams = Session.query(Team).filter(Team.company_id == company_id)
    team_schema = TeamSchema()
    return json.dumps([team_schema.dump(i) for i in teams])

@app.route('/team/id', methods=['GET'])
def find_team_by_id():
    args = request.args
    team_id = args.get('team_id')
    teams = session.query(Team).filter(Team.id == team_id).first()
    team_schema = TeamSchema()
    return team_schema.dump(teams)
@app.route('/team/id', methods=['PUT'])
def update_team_by_id():
    args = request.args
    team_id = args.get('team_id')

    team_schema = TeamSchema()

    team1 = team_schema.load(args)
    teams=Team.query.filter_by(Team.id == team_id).first()
    session.add(team1.data)
    session.commit()
    return team_schema.dumps(teams)
@app.route('/team/delete', methods=['DELETE'])
def delete_team():
    args = request.args
    team_id = args.get('team_id')
    session.query(Team).filter(Team.id == team_id).delete()
   # session.query(Team).filter(Team.id == team_id).delete()
    session.commit()
    return "Team deleted"
# @app.route('/team/findByCompany', methods=['GET'])
# def find_team_by_company():
# 	args = request.args
# 	company_id = args.get('company_id')
# 	teams = Session.query(Team).filter(Team.company_id == company_id)
# 	return json.dumps([i.to_dict() for i in teams])