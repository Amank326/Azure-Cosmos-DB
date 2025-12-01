"""
Script to populate sample student data into Cosmos DB
Run this to initialize database with test data
"""

from connect import connect_cosmos
import uuid

def insert_sample_data():
    """Insert sample student data into Cosmos DB"""
    container = connect_cosmos()
    
    sample_students = [
        {
            "id": str(uuid.uuid4()),
            "name": "Raj Kumar",
            "branch": "CSE",
            "roll_number": "2024001",
            "email": "raj.kumar@university.edu",
            "semester": 4,
            "gpa": 3.8,
            "phone": "+91-9876543210",
            "address": "New Delhi, India"
        },
        {
            "id": str(uuid.uuid4()),
            "name": "Priya Singh",
            "branch": "ECE",
            "roll_number": "2024002",
            "email": "priya.singh@university.edu",
            "semester": 3,
            "gpa": 3.9,
            "phone": "+91-9876543211",
            "address": "Mumbai, India"
        },
        {
            "id": str(uuid.uuid4()),
            "name": "Amit Patel",
            "branch": "ME",
            "roll_number": "2024003",
            "email": "amit.patel@university.edu",
            "semester": 2,
            "gpa": 3.7,
            "phone": "+91-9876543212",
            "address": "Bangalore, India"
        },
        {
            "id": str(uuid.uuid4()),
            "name": "Neha Gupta",
            "branch": "CSE",
            "roll_number": "2024004",
            "email": "neha.gupta@university.edu",
            "semester": 4,
            "gpa": 3.95,
            "phone": "+91-9876543213",
            "address": "Pune, India"
        },
        {
            "id": str(uuid.uuid4()),
            "name": "Vikram Sharma",
            "branch": "ECE",
            "roll_number": "2024005",
            "email": "vikram.sharma@university.edu",
            "semester": 3,
            "gpa": 3.6,
            "phone": "+91-9876543214",
            "address": "Hyderabad, India"
        }
    ]
    
    print("📝 Inserting sample student data...\n")
    
    for student in sample_students:
        try:
            created_item = container.create_item(body=student)
            print(f"✔ Created: {student['name']} ({student['branch']}) - ID: {student['id']}")
        except Exception as e:
            print(f"❌ Error creating {student['name']}: {str(e)}")
    
    print(f"\n✔ Successfully inserted {len(sample_students)} students!")
    
    # Display all students
    print("\n" + "="*60)
    print("All Students in Database:")
    print("="*60)
    
    query = "SELECT * FROM c"
    items = list(container.query_items(
        query=query,
        enable_cross_partition_query=True
    ))
    
    for i, student in enumerate(items, 1):
        print(f"\n{i}. {student['name']}")
        print(f"   ID: {student['id']}")
        print(f"   Branch: {student['branch']}")
        print(f"   Semester: {student['semester']}")
        print(f"   GPA: {student['gpa']}")
        print(f"   Email: {student['email']}")


if __name__ == "__main__":
    insert_sample_data()
