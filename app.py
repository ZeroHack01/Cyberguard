# app.py
# This is the backend server for your website.

# Import the Flask framework
from flask import Flask, render_template

# Create an instance of the Flask class
# The __name__ variable tells Flask where to look for resources like templates and static files.
app = Flask(__name__)

# Define the main route for your homepage
@app.route('/')
def home():
    """
    This function runs when a user visits the root URL ('/').
    It finds the 'index.html' file in the 'templates' folder and displays it.
    """
    return render_template('index.html')

# This part allows you to run the app directly using "python app.py"
if __name__ == '__main__':
    # debug=True means the server will automatically reload when you save changes.
    # In a real production environment, you would turn this off.
    app.run(debug=True)
