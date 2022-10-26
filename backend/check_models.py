from models import *

session = Session()

# companies = [Company(name="The Boring Team")]
# session.add_all(companies)
# teams = [
# 	Team(tag="Front", name="Duo", company_id=1),
# 	Team(tag="Back", name="Trio", company_id=1)
# ]
# session.add_all(teams)
# employees = [
# 	Employee(
# 		first_name="Bohdan",
# 		last_name="Bozhyk",
# 		email="bb@gmail.com",
# 		company_id=1,
# 		team_id=1,
# 		is_owner=False,
# 		password="qwer",
# 		phone="38010101010",
# 		date_of_birth="2004-01-30",
# 		role=False
# 	),
# 	Employee(
# 		first_name="Danylo",
# 		last_name="Klym",
# 		email="dk@gmail.com",
# 		company_id=1,
# 		team_id=1,
# 		is_owner=False,
# 		password="qwer",
# 		phone="38010101010",
# 		date_of_birth="2022-26-10",
# 		role=True
# 	),
# 	Employee(
# 		first_name="Olena",
# 		last_name="Pyrih",
# 		email="op@gmail.com",
# 		company_id=1,
# 		team_id=2,
# 		is_owner=False,
# 		password="qwer",
# 		phone="38010101010",
# 		date_of_birth="2004-01-18",
# 		role=False
# 	),
# 	Employee(
# 		first_name="Sofiia",
# 		last_name="Hymon",
# 		email="sh@gmail.com",
# 		company_id=1,
# 		team_id=2,
# 		is_owner=False,
# 		password="qwer",
# 		phone="38010101010",
# 		date_of_birth="2004-01-19",
# 		role=False
# 	),
# 	Employee(
# 		first_name="Andrii",
# 		last_name="Malynovskyi",
# 		email="am@gmail.com",
# 		company_id=1,
# 		team_id=2,
# 		is_owner=True,
# 		password="qwer",
# 		phone="38010101010",
# 		date_of_birth="2003-12-29",
# 		role=False
# 	)
# ]
# session.add_all(employees)
propertySets = [
	PropertySet(
		name="Default"
	)
]
session.add_all(propertySets)
# questions = [
# 	Question(
# 		number=1,
# 		text="Do you see their professional progression in the given role over time?"
# 	),
# 	Question(
# 		number=2,
# 		text="Would you work with them in the future?"
# 	),
# 	Question(
# 		number=3,
# 		text="Would you work with them in the future?"
# 	)
# ]
# feedbackHistories = [
# 	FeedbackHistory(
# 		employee_id=1,
# 		property_set_id=1
# 	),
# 	FeedbackHistory(
# 		employee_id=2,
# 		property_set_id=1
# 	),
# 	FeedbackHistory(
# 		employee_id=3,
# 		property_set_id=1
# 	),
# 	FeedbackHistory(
# 		employee_id=4,
# 		property_set_id=1
# 	),
# 	FeedbackHistory(
# 		employee_id=5,
# 		property_set_id=1
# 	),
# ]
# feedbacks = [
# 	Feedback(
# 		date_of_creation="2022-10-26",
# 		note="Perfect Employee",
# 		employee_id=1
# 	),
# 	Feedback(
# 		date_of_creation="2022-10-26",
# 		note="Perfect Employee",
# 		employee_id=2
# 	),
# 	Feedback(
# 		date_of_creation="2022-10-26",
# 		note="Perfect Employee",
# 		employee_id=3
# 	),
# 	Feedback(
# 		date_of_creation="2022-10-26",
# 		note="Perfect Employee",
# 		employee_id=4
# 	),
# 	Feedback(
# 		date_of_creation="2022-10-26",
# 		note="Perfect Employee",
# 		employee_id=5
# 	)
# ]
# answers = [
# 	Answer(
# 		number=1,
# 		text="No noticeable progress",
# 		feedback_id=1
# 	),
# 	Answer(
# 		number=2,
# 		text="Steady progress in most areas",
# 		feedback_id=1
# 	),
# 	Answer(
# 		number=3,
# 		text="Significant progress in most areas",
# 		feedback_id=1
# 	),
# 	Answer(
# 		number=1,
# 		text="No noticeable progress",
# 		feedback_id=2
# 	),
# 	Answer(
# 		number=2,
# 		text="Steady progress in most areas",
# 		feedback_id=2
# 	),
# 	Answer(
# 		number=3,
# 		text="Significant progress in most areas",
# 		feedback_id=2
# 	),
# 	Answer(
# 		number=1,
# 		text="No noticeable progress",
# 		feedback_id=3
# 	),
# 	Answer(
# 		number=2,
# 		text="Steady progress in most areas",
# 		feedback_id=3
# 	),
# 	Answer(
# 		number=3,
# 		text="Significant progress in most areas",
# 		feedback_id=3
# 	), Answer(
# 		number=1,
# 		text="No noticeable progress",
# 		feedback_id=4
# 	),
# 	Answer(
# 		number=2,
# 		text="Steady progress in most areas",
# 		feedback_id=4
# 	),
# 	Answer(
# 		number=3,
# 		text="Significant progress in most areas",
# 		feedback_id=4
# 	),
# 	Answer(
# 		number=1,
# 		text="No noticeable progress",
# 		feedback_id=5
# 	),
# 	Answer(
# 		number=2,
# 		text="Steady progress in most areas",
# 		feedback_id=5
# 	),
# 	Answer(
# 		number=3,
# 		text="Significant progress in most areas",
# 		feedback_id=5
# 	)
# ]
# session.add_all(questions)
# session.add_all(feedbackHistories)
# session.add_all(feedbacks)
# session.add_all(answers)
session.commit()
session.close()
