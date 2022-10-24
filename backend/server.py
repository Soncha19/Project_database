from flask import Flask, jsonify
import datetime

x = datetime.datetime.now()

# Initializing flask app
app = Flask(__name__)


# Route for seeing a data
@app.route("/teams", methods=["GET"])
def get_teams():
    results = [
  {
    "id": 1,
    "tag": "Web",
    "name": "The Boring Team",
    "participants_id": [
      {
        "id": 5,
        "firstName": "John",
        "lastName": "James",
        "addres": {
          "street": "7 Sheptytskoho",
          "city": "Novoyavorivsk",
          "country": "Ukraine",
          "zip": "81053"
        },
        "email": "john@email.com",
        "company_id": {
          "id": 1,
          "owner_id": {
            "firstName": "John",
            "lastName": "James",
            "addres": {
              "street": "7 Sheptytskoho",
              "city": "Novoyavorivsk",
              "country": "Ukraine",
              "zip": "81053"
            },
            "email": "john@email.com",
            "company_id": "string",
            "password": "12345",
            "phone": "12345",
            "dateOfBirth": "2017-07-21",
            "role": "user"
          },
          "name": "The Boring Team"
        },
        "phone": "12345",
        "dateOfBirth": "2017-07-21",
        "role": "user"
      }
    ],
    "company_id": [
      {
        "id": 5,
        "firstName": "John",
        "lastName": "James",
        "addres": {
          "street": "7 Sheptytskoho",
          "city": "Novoyavorivsk",
          "country": "Ukraine",
          "zip": "81053"
        },
        "email": "john@email.com",
        "company_id": {
          "id": 1,
          "owner_id": {
            "firstName": "John",
            "lastName": "James",
            "addres": {
              "street": "7 Sheptytskoho",
              "city": "Novoyavorivsk",
              "country": "Ukraine",
              "zip": "81053"
            },
            "email": "john@email.com",
            "company_id": "string",
            "password": "12345",
            "phone": "12345",
            "dateOfBirth": "2017-07-21",
            "role": "user"
          },
          "name": "The Boring Team"
        },
        "phone": "12345",
        "dateOfBirth": "2017-07-21",
        "role": "user"
      }
    ]
  },
        {
            "id": 2,
            "tag": "Gamedev",
            "name": "Green",
            "participants_id": [
                {
                    "id": 5,
                    "firstName": "John",
                    "lastName": "James",
                    "addres": {
                        "street": "7 Sheptytskoho",
                        "city": "Novoyavorivsk",
                        "country": "Ukraine",
                        "zip": "81053"
                    },
                    "email": "john@email.com",
                    "company_id": {
                        "id": 1,
                        "owner_id": {
                            "firstName": "John",
                            "lastName": "James",
                            "addres": {
                                "street": "7 Sheptytskoho",
                                "city": "Novoyavorivsk",
                                "country": "Ukraine",
                                "zip": "81053"
                            },
                            "email": "john@email.com",
                            "company_id": "string",
                            "password": "12345",
                            "phone": "12345",
                            "dateOfBirth": "2017-07-21",
                            "role": "user"
                        },
                        "name": "The Boring Team"
                    },
                    "phone": "12345",
                    "dateOfBirth": "2017-07-21",
                    "role": "user"
                }
            ],
            "company_id": [
                {
                    "id": 5,
                    "firstName": "John",
                    "lastName": "James",
                    "addres": {
                        "street": "7 Sheptytskoho",
                        "city": "Novoyavorivsk",
                        "country": "Ukraine",
                        "zip": "81053"
                    },
                    "email": "john@email.com",
                    "company_id": {
                        "id": 1,
                        "owner_id": {
                            "firstName": "John",
                            "lastName": "James",
                            "addres": {
                                "street": "7 Sheptytskoho",
                                "city": "Novoyavorivsk",
                                "country": "Ukraine",
                                "zip": "81053"
                            },
                            "email": "john@email.com",
                            "company_id": "string",
                            "password": "12345",
                            "phone": "12345",
                            "dateOfBirth": "2017-07-21",
                            "role": "user"
                        },
                        "name": "The Boring Team"
                    },
                    "phone": "12345",
                    "dateOfBirth": "2017-07-21",
                    "role": "user"
                }
            ]
        },
        {
            "id": 3,
            "tag": "QA",
            "name": "Cool Team",
            "participants_id": [
                {
                    "id": 5,
                    "firstName": "John",
                    "lastName": "James",
                    "addres": {
                        "street": "7 Sheptytskoho",
                        "city": "Novoyavorivsk",
                        "country": "Ukraine",
                        "zip": "81053"
                    },
                    "email": "john@email.com",
                    "company_id": {
                        "id": 1,
                        "owner_id": {
                            "firstName": "John",
                            "lastName": "James",
                            "addres": {
                                "street": "7 Sheptytskoho",
                                "city": "Novoyavorivsk",
                                "country": "Ukraine",
                                "zip": "81053"
                            },
                            "email": "john@email.com",
                            "company_id": "string",
                            "password": "12345",
                            "phone": "12345",
                            "dateOfBirth": "2017-07-21",
                            "role": "user"
                        },
                        "name": "The Boring Team"
                    },
                    "phone": "12345",
                    "dateOfBirth": "2017-07-21",
                    "role": "user"
                }
            ],
            "company_id": [
                {
                    "id": 5,
                    "firstName": "John",
                    "lastName": "James",
                    "addres": {
                        "street": "7 Sheptytskoho",
                        "city": "Novoyavorivsk",
                        "country": "Ukraine",
                        "zip": "81053"
                    },
                    "email": "john@email.com",
                    "company_id": {
                        "id": 1,
                        "owner_id": {
                            "firstName": "John",
                            "lastName": "James",
                            "addres": {
                                "street": "7 Sheptytskoho",
                                "city": "Novoyavorivsk",
                                "country": "Ukraine",
                                "zip": "81053"
                            },
                            "email": "john@email.com",
                            "company_id": "string",
                            "password": "12345",
                            "phone": "12345",
                            "dateOfBirth": "2017-07-21",
                            "role": "user"
                        },
                        "name": "The Boring Team"
                    },
                    "phone": "12345",
                    "dateOfBirth": "2017-07-21",
                    "role": "user"
                }
            ]
        }
]

    return jsonify(results)


# Running app
if __name__ == '__main__':
    app.run(debug=True)