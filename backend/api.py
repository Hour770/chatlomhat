from flask import Flask, request, jsonify
from flask_cors import CORS
import google.generativeai as genai
from PIL import Image
import io
import base64
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

app = Flask(__name__)

# Configure CORS properly for production
cors_origins = [
    "http://localhost:3000",  # Local development
    "http://localhost:3001",  # Alternative local port
    "https://*.vercel.app",   # Vercel deployments
    "https://vercel.app",     # Vercel domain
]

# Add custom frontend URL if specified in environment
frontend_url = os.getenv('FRONTEND_URL')
if frontend_url:
    cors_origins.append(frontend_url)

CORS(app, 
     origins=cors_origins,
     methods=['GET', 'POST', 'OPTIONS'],
     allow_headers=['Content-Type', 'Authorization'],
     supports_credentials=True)

# Configure your API key from environment variables
api_key = os.getenv('GOOGLE_AI_API_KEY')
if not api_key:
    raise ValueError("GOOGLE_AI_API_KEY environment variable is required")
    
genai.configure(api_key=api_key)

def format_solution(response_text):
    """Clean and format the AI response to be more readable for regular users"""
    if not response_text:
        return response_text
    
    # Remove any JSON formatting artifacts
    text = response_text.strip()
    
    # Remove code block markers if present
    if text.startswith('```'):
        text = text.split('```')[1] if '```' in text[3:] else text[3:]
    if text.endswith('```'):
        text = text.rsplit('```', 1)[0]
    
    # Clean up extra whitespace and formatting symbols
    lines = text.split('\n')
    cleaned_lines = []
    
    for line in lines:
        line = line.strip()
        if line:  # Skip empty lines
            # Remove stars (*) at the beginning of lines
            if line.startswith('*'):
                line = line[1:].strip()
            # Remove bullet points and other formatting
            if line.startswith('-'):
                line = line[1:].strip()
            if line.startswith('•'):
                line = line[1:].strip()
            # Add proper spacing for steps
            if line.lower().startswith(('step', 'solution', 'answer', 'ជំហាន')):
                cleaned_lines.append('\n' + line)
            else:
                cleaned_lines.append(line)
    
    # Join with proper spacing
    formatted_text = '\n\n'.join(cleaned_lines)
    
    # Ensure proper spacing between sections
    formatted_text = formatted_text.replace('\n\n', '\n')
    
    return formatted_text.strip()

def build_prompt(user_input, is_exercise=False, topic=None, difficulty=None, num_problems=None):
    """Build appropriate prompts for different types of requests in Khmer"""
    if is_exercise:
        return f"""សូមបង្កើតសំណួរគណិតវិទ្យាកម្រិត {difficulty} ចំនួន {num_problems} អំពីប្រធានបទ {topic}។ 
        សូមធ្វើការតាមរូបមន្តនេះជា JSON array ដែលមានរចនាសម្ព័ន្ធដូចនេះ:
        [{{"problem": "សំណួរនៅទីនេះ", "answer": "ចម្លើយនៅទីនេះ"}}]
        
        ត្រូវធ្វើឱ្យប្រាកដថាសំណួរទាំងនេះមានលក្ខណៈអប់រំ និងសមរម្យសម្រាប់កម្រិត {difficulty}។
        រួមបញ្ចូលការដោះស្រាយជាជំហានៗនៅក្នុងចម្លើយ។"""
    else:
        return f"""ដោះស្រាយបញ្ហាគណិតវិទ្យានេះ:

{user_input}

ផ្តល់ការដោះស្រាយជាជំហានៗច្បាស់លាស់ ពន្យល់ជំហាននីមួយៗ និងបង្ហាញចម្លើយចុងក្រោយ។ ប្រើអក្សរធម្មតាដោយមិនមានសញ្ញាពិសេស។

ឆ្លើយជាភាសាខ្មែរ។"""

@app.route('/solve', methods=['POST'])
def solve_math():
    """Solve math problems from text input or image"""
    try:
        # Check if image was uploaded
        if 'image' in request.files:
            image_file = request.files['image']
            prompt = request.form.get('prompt', '''សូមមើលបញ្ហាគណិតវិទ្យានៅក្នុងរូបភាពនេះ ហើយដោះស្រាយវាជាជំហានៗ។

សូមផ្តល់:
១. បញ្ហាអ្វីដែលអ្នកឃើញនៅក្នុងរូបភាព
២. ការដោះស្រាយជាជំហានៗដ៏ច្បាស់លាស់
៣. ពន្យល់នូវជំហាននីមួយៗដោយភាសាសាមញ្ញ
៤. បង្ហាញចម្លើយចុងក្រោយយ៉ាងច្បាស់

សូមប្រើអក្សរធម្មតា និងធ្វើឱ្យវាងាយយល់។ សូមឆ្លើយជាភាសាខ្មែរទាំងស្រុង។''')
            
            # Process the image
            image = Image.open(image_file)
            model = genai.GenerativeModel('gemini-2.0-flash')
            response = model.generate_content([prompt, image])
            
            formatted_solution = format_solution(response.text)
            
            return jsonify({
                'success': True,
                'solution': formatted_solution
            })
        
        # Handle text input
        elif 'prompt' in request.form or 'prompt' in request.json:
            if request.is_json:
                prompt = request.json.get('prompt')
            else:
                prompt = request.form.get('prompt')
            
            if not prompt:
                return jsonify({'success': False, 'error': 'មិនបានផ្តល់សំណួរ'}), 400
            
            # Build the full prompt
            full_prompt = build_prompt(prompt)
            
            # Get AI response
            model = genai.GenerativeModel('gemini-2.0-flash')
            response = model.generate_content(full_prompt)
            
            return jsonify({
                'success': True,
                'solution': format_solution(response.text)
            })
        
        else:
            return jsonify({'success': False, 'error': 'មិនបានផ្តល់ទិន្នន័យបញ្ចូល'}), 400
            
    except Exception as e:
        return jsonify({
            'success': False,
            'error': f'Error processing request: {str(e)}'
        }), 500

@app.route('/generate-exercises', methods=['POST'])
def generate_exercises():
    """Generate math exercise problems"""
    try:
        data = request.get_json()
        
        topic = data.get('topic', 'algebra')
        difficulty = data.get('difficulty', 'medium')
        num_problems = data.get('numProblems', 5)
        
        if not topic:
            return jsonify({'success': False, 'error': 'ត្រូវការប្រធានបទ'}), 400
        
        # Build exercise generation prompt
        prompt = build_prompt('', is_exercise=True, topic=topic, difficulty=difficulty, num_problems=num_problems)
        
        # Get AI response
        model = genai.GenerativeModel('gemini-2.0-flash')
        response = model.generate_content(prompt)
        
        # Try to parse the response as JSON
        import json
        try:
            # Clean the response text to extract JSON
            response_text = response.text.strip()
            if response_text.startswith('```json'):
                response_text = response_text.replace('```json', '').replace('```', '').strip()
            elif response_text.startswith('```'):
                response_text = response_text.replace('```', '').strip()
            
            exercises = json.loads(response_text)
            
            return jsonify({
                'success': True,
                'exercises': exercises
            })
            
        except json.JSONDecodeError:
            # If JSON parsing fails, return as plain text
            return jsonify({
                'success': True,
                'exercises': [{'problem': response.text, 'answer': 'Please solve this problem'}]
            })
            
    except Exception as e:
        return jsonify({
            'success': False,
            'error': f'Error generating exercises: {str(e)}'
        }), 500

@app.route('/health', methods=['GET'])
def health_check():
    """Health check endpoint"""
    return jsonify({
        'status': 'healthy', 
        'message': 'Math API is running',
        'cors_enabled': True,
        'environment': os.getenv('FLASK_ENV', 'development')
    })

@app.route('/', methods=['GET'])
def home():
    """Home endpoint"""
    return jsonify({
        'message': 'ChatLomhat Math API - គណិតវិទ្យាជាភាសាខ្មែរ',
        'endpoints': {
            'solve': 'POST /solve - ដោះស្រាយបញ្ហាគណិតវិទ្យា',
            'generate-exercises': 'POST /generate-exercises - បង្កើតលំហាត់សម្រាប់ការអនុវត្ត',
            'health': 'GET /health - ពិនិត្យសុខភាពប្រព័ន្ធ'
        },
        'cors_enabled': True,
        'environment': os.getenv('FLASK_ENV', 'development')
    })

if __name__ == '__main__':
    print("Starting ChatLomhat Math API - កំពុងចាប់ផ្តើម ChatLomhat គណិតវិទ្យា...")
    print("Frontend should be running on: http://localhost:3000")
    print("API will be available on: http://localhost:5002")
    print("ឥឡូវនេះ ChatLomhat អាចឆ្លើយជាភាសាខ្មែរហើយ! 🇰🇭")
    app.run(debug=True, host='0.0.0.0', port=5002)