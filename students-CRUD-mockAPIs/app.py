from flask import Flask, request, jsonify
from flask_cors import CORS
from connect import connect_cosmos
from azure.cosmos import exceptions
import uuid

app = Flask(__name__)
CORS(app)

# Initialize Cosmos DB connection
container = connect_cosmos()


@app.route('/', methods=['GET'])
def home():
    """Home endpoint - health check"""
    return jsonify({
        'message': 'Student Mock API Service',
        'status': 'running',
        'endpoints': {
            'GET /students': 'Get all students',
            'GET /students/<id>': 'Get student by id',
            'POST /students': 'Create new student',
            'PUT /students/<id>': 'Update student',
            'DELETE /students/<id>': 'Delete student'
        }
    })


@app.route('/students', methods=['GET'])
def get_students():
    """Get all students from Cosmos DB"""
    try:
        # Query all students
        query = "SELECT * FROM c"
        items = list(container.query_items(
            query=query,
            enable_cross_partition_query=True
        ))
        
        return jsonify({
            'success': True,
            'count': len(items),
            'students': items
        }), 200
    
    except exceptions.CosmosHttpResponseError as e:
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500


@app.route('/students/<student_id>', methods=['GET'])
def get_student(student_id):
    """Get a specific student by ID"""
    try:
        # Query for specific student
        query = f"SELECT * FROM c WHERE c.id = @id"
        parameters = [{"name": "@id", "value": student_id}]
        
        items = list(container.query_items(
            query=query,
            parameters=parameters,
            enable_cross_partition_query=True
        ))
        
        if not items:
            return jsonify({
                'success': False,
                'error': 'Student not found'
            }), 404
        
        return jsonify({
            'success': True,
            'student': items[0]
        }), 200
    
    except exceptions.CosmosHttpResponseError as e:
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500


@app.route('/students', methods=['POST'])
def create_student():
    """Create a new student"""
    try:
        data = request.get_json()
        
        # Validate required fields
        if not data:
            return jsonify({
                'success': False,
                'error': 'No data provided'
            }), 400
        
        required_fields = ['name', 'branch']
        for field in required_fields:
            if field not in data:
                return jsonify({
                    'success': False,
                    'error': f'Missing required field: {field}'
                }), 400
        
        # Generate unique ID if not provided
        if 'id' not in data:
            data['id'] = str(uuid.uuid4())
        
        # Create student in Cosmos DB
        created_item = container.create_item(body=data)
        
        return jsonify({
            'success': True,
            'message': 'Student created successfully',
            'student': created_item
        }), 201
    
    except exceptions.CosmosResourceExistsError:
        return jsonify({
            'success': False,
            'error': 'Student with this ID already exists'
        }), 409
    
    except exceptions.CosmosHttpResponseError as e:
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500


@app.route('/students/<student_id>', methods=['PUT'])
def update_student(student_id):
    """Update an existing student"""
    try:
        data = request.get_json()
        
        if not data:
            return jsonify({
                'success': False,
                'error': 'No data provided'
            }), 400
        
        # Get existing student first
        query = f"SELECT * FROM c WHERE c.id = @id"
        parameters = [{"name": "@id", "value": student_id}]
        
        items = list(container.query_items(
            query=query,
            parameters=parameters,
            enable_cross_partition_query=True
        ))
        
        if not items:
            return jsonify({
                'success': False,
                'error': 'Student not found'
            }), 404
        
        existing_student = items[0]
        
        # Update fields
        for key, value in data.items():
            if key != 'id':  # Don't allow ID updates
                existing_student[key] = value
        
        # Replace item in Cosmos DB
        updated_item = container.replace_item(
            item=existing_student['id'],
            body=existing_student
        )
        
        return jsonify({
            'success': True,
            'message': 'Student updated successfully',
            'student': updated_item
        }), 200
    
    except exceptions.CosmosHttpResponseError as e:
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500


@app.route('/students/<student_id>', methods=['DELETE'])
def delete_student(student_id):
    """Delete a student"""
    try:
        # Get student first to get partition key
        query = f"SELECT * FROM c WHERE c.id = @id"
        parameters = [{"name": "@id", "value": student_id}]
        
        items = list(container.query_items(
            query=query,
            parameters=parameters,
            enable_cross_partition_query=True
        ))
        
        if not items:
            return jsonify({
                'success': False,
                'error': 'Student not found'
            }), 404
        
        student = items[0]
        
        # Delete the student
        container.delete_item(
            item=student_id,
            partition_key=student['branch']
        )
        
        return jsonify({
            'success': True,
            'message': 'Student deleted successfully'
        }), 200
    
    except exceptions.CosmosHttpResponseError as e:
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500


if __name__ == '__main__':
    # Run on port 8000 for local testing
    # Azure App Service will use the port from environment variable
    import os
    port = int(os.environ.get('PORT', 8000))
    app.run(host='0.0.0.0', port=port, debug=True)
