from models import *


session = Session()
Base.metadata.create_all(bind=engine)

session.commit()
session.close()