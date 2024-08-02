from flask import Blueprint, request, jsonify, current_app
import requests
from app.utils.fetch import fetch_webpage
from app.utils.extract import extract_text
from app.utils.generate_questions import generate_questions
main_bp = Blueprint('main', __name__)

@main_bp.route('/interviewexperience', methods=['GET'])
def get_interview_experience():
    query = request.args.get('query')
    if not query:
        return jsonify({'error': 'Query parameter is required'}), 400

    api_key = current_app.config['GOOGLE_API_KEY']
    search_engine_id = current_app.config['GOOGLE_SEARCH_ENGINE_ID']

    search_url = f'https://www.googleapis.com/customsearch/v1?q={query}&key={api_key}&cx={search_engine_id}'
    response = requests.get(search_url)
    results = response.json()

    links = [item['link'] for item in results.get('items', [])]

    questions = []
    for link in links:
        html_content = fetch_webpage(link)
        if html_content:
            text = extract_text(html_content)
            if text:
                generated_questions=generate_questions(text)
                # summary_sentences = summarize_text(text)
                questions.append({'url': link, 'questions': generated_questions})
            print(questions)
    return jsonify({'query': query, 'questions': questions})

