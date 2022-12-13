from models import *


session = Session()

companies = [
	Company(name="No Company"),
	Company(name="The Boring Team")
]
session.add_all(companies)
session.commit()
teams = [
	Team(tag="", name="No Team", company_id=1),
	Team(tag="Front", name="Duo", company_id=2),
	Team(tag="Back", name="Trio", company_id=2)
]
session.add_all(teams)
session.commit()
employees = [
	Employee(
		first_name="Bohdan",
		last_name="Bozhyk",
		email="bb@gmail.com",
		company_id=1,
		team_id=1,
		is_owner=False,
		password="qwer",
		phone="38010101010",
		date_of_birth="2004-01-30",
		role=False
	),
	Employee(
		first_name="Danylo",
		last_name="Klym",
		email="dk@gmail.com",
		company_id=1,
		team_id=1,
		is_owner=False,
		password="qwer",
		phone="38010101010",
		date_of_birth="2003-12-30",
		role=True
	),
	Employee(
		first_name="Olena",
		last_name="Pyrih",
		email="op@gmail.com",
		company_id=1,
		team_id=2,
		is_owner=False,
		password="qwer",
		phone="38010101010",
		date_of_birth="2004-01-18",
		role=False
	),
	Employee(
		first_name="Sofiia",
		last_name="Hymon",
		email="sh@gmail.com",
		company_id=1,
		team_id=2,
		is_owner=False,
		password="qwer",
		phone="38010101010",
		date_of_birth="2004-01-19",
		role=False
	),
	Employee(
		first_name="Andrii",
		last_name="Malynovskyi",
		email="am@gmail.com",
		company_id=1,
		team_id=2,
		is_owner=True,
		password="qwer",
		phone="38010101010",
		date_of_birth="2003-12-29",
		role=False
	)
]
session.add_all(employees)
session.commit()
propertySets = [
	PropertySet(
		name="Default",
		company_id=1
	)
]
session.add_all(propertySets)
session.commit()
preAnswers = [
	PreAnswer(
		text="No noticeable progress",
		numeric_value=0,
		property_set_id=1
	),
	PreAnswer(
		text="Steady progress in most areas",
		numeric_value=1,
		property_set_id=1
	),
	PreAnswer(
		text="Significant progress in most areas",
		numeric_value=2,
		property_set_id=1
	)
]
session.add_all(preAnswers)
session.commit()
questions = [
	Question(
		number=1,
		text="Do you see their professional progression in the given role over time?"
	),
	Question(
		number=2,
		text="Would you work with them in the future?"
	),
	Question(
		number=3,
		text="Would you work with them in the future?"
	)
]
session.add_all(questions)
session.commit()
feedbackHistories = [
	FeedbackHistory(
		employee_id=1,
		property_set_id=1
	),
	FeedbackHistory(
		employee_id=2,
		property_set_id=1
	),
	FeedbackHistory(
		employee_id=3,
		property_set_id=1
	),
	FeedbackHistory(
		employee_id=4,
		property_set_id=1
	),
	FeedbackHistory(
		employee_id=5,
		property_set_id=1
	),
]
session.add_all(feedbackHistories)
session.commit()
feedbacks = [
	Feedback(
		date_of_creation="2022-10-27",
		note="Bohdan is a valuable worker",
		employee_id=1
	),
	Feedback(
		date_of_creation="2022-10-27",
		note="Danylo is a valuable worker",
		employee_id=2
	),
	Feedback(
		date_of_creation="2022-10-27",
		note="Olena is a valuable worker",
		employee_id=3
	),
	Feedback(
		date_of_creation="2022-10-27",
		note="Sofiia is a valuable worker",
		employee_id=4
	),
	Feedback(
		date_of_creation="2022-10-27",
		note="Andrii is a valuable worker",
		employee_id=5
	)
]
session.add_all(feedbacks)
session.commit()
answers = [
	Answer(
		number=1,
		pre_answer_id=1,
		feedback_id=5
	),
	Answer(
		number=2,
		pre_answer_id=2,
		feedback_id=5
	),
	Answer(
		number=3,
		pre_answer_id=3,
		feedback_id=5
	),
	Answer(
		number=1,
		pre_answer_id=2,
		feedback_id=4
	),
	Answer(
		number=2,
		pre_answer_id=3,
		feedback_id=4
	),
	Answer(
		number=3,
		pre_answer_id=1,
		feedback_id=4
	),
	Answer(
		number=1,
		pre_answer_id=2,
		feedback_id=3
	),
	Answer(
		number=2,
		pre_answer_id=3,
		feedback_id=3
	),
	Answer(
		number=3,
		pre_answer_id=1,
		feedback_id=3
	),
	Answer(
		number=1,
		pre_answer_id=2,
		feedback_id=2
	),
	Answer(
		number=2,
		pre_answer_id=2,
		feedback_id=2
	),
	Answer(
		number=3,
		pre_answer_id=1,
		feedback_id=2
	),
	Answer(
		number=1,
		pre_answer_id=1,
		feedback_id=1
	),
	Answer(
		number=2,
		pre_answer_id=3,
		feedback_id=1
	),
	Answer(
		number=3,
		pre_answer_id=2,
		feedback_id=1
	)
]
session.add_all(answers)
session.commit()

session.close()
