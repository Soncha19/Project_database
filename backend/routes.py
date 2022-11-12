from flask import Flask

from flask_cors import CORS

app = Flask(__name__)
CORS(app)

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
