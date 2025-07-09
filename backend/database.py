import motor.motor_asyncio

MONGO_URL = "mongodb+srv://monikashriram75:mSMRANI%401714@alumniregistration.2uzemp5.mongodb.net/?retryWrites=true&w=majority&appName=AlumniRegistration"
DATABASE_NAME = "alumni_project"

client = motor.motor_asyncio.AsyncIOMotorClient(MONGO_URL, serverSelectionTimeoutMS=5000)
db = client[DATABASE_NAME]

students_collection = db["students"]
student_profile_collection = db["student_profile"]
alumni_collection = db["alumni_register"]
alumni_event_collection = db["alumni_event"]
mentorship_offer_collection = db["alumni_mentorship_offers"]
posts_collection = db["alumni_forum_posts"]
comments_collection = db["alumni_forum_comments"]
jobs_collection = db["alumni_jobs"]
collection = db["alumni_data"]

# Admin login & registration

admin_users = db["Admin_users_Login"]
