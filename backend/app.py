from flask import Flask, jsonify, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Linked List implementation
class Node:
    def __init__(self, data):
        self.data = data
        self.next = None

    def to_dict(self):
        return {
            "data": self.data,
            "next": self.next.data if self.next else None
        }

class LinkedList:
    def __init__(self):
        self.head = None
        
    def insert_at_end(self, data):
        new_node = Node(data)
        if not self.head:
            self.head = new_node
            return
        
        current = self.head
        while current.next:
            current = current.next
        current.next = new_node
    
    def insert_at_start(self, data):
        new_node = Node(data)
        new_node.next = self.head
        self.head = new_node
    
    def delete_node(self, data):
        if not self.head:
            return False
            
        if self.head.data == data:
            self.head = self.head.next
            return True
            
        current = self.head
        while current.next:
            if current.next.data == data:
                current.next = current.next.next
                return True
            current = current.next
        return False
    
    def to_list(self):
        nodes = []
        current = self.head
        while current:
            nodes.append(current.to_dict())
            current = current.next
        return nodes

# Initialize a global linked list
linked_list = LinkedList()
# Add some initial data
linked_list.insert_at_end(1)
linked_list.insert_at_end(2)
linked_list.insert_at_end(3)

@app.route('/api/linkedlist', methods=['GET'])
def get_linked_list():
    """Return the current state of the linked list"""
    return jsonify({
        "status": "success",
        "data": linked_list.to_list()
    })

@app.route('/api/linkedlist/insert', methods=['POST'])
def insert_node():
    """Insert a new node into the linked list"""
    data = request.json
    if not data or 'value' not in data:
        return jsonify({"status": "error", "message": "No value provided"}), 400
        
    position = data.get('position', 'end')  # 'start' or 'end'
    if position == 'start':
        linked_list.insert_at_start(data['value'])
    else:
        linked_list.insert_at_end(data['value'])
        
    return jsonify({
        "status": "success",
        "data": linked_list.to_list()
    })

@app.route('/api/linkedlist/delete', methods=['DELETE'])
def delete_node():
    """Delete a node from the linked list"""
    data = request.json
    if not data or 'value' not in data:
        return jsonify({"status": "error", "message": "No value provided"}), 400
        
    success = linked_list.delete_node(data['value'])
    if not success:
        return jsonify({"status": "error", "message": "Value not found"}), 404
        
    return jsonify({
        "status": "success",
        "data": linked_list.to_list()
    })

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)