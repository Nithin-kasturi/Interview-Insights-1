import os
from groq import Groq

def generate_questions(paragraph):
    try:
        client = Groq(api_key="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")
        if not paragraph or not isinstance(paragraph, str):
            raise ValueError("Invalid input: The paragraph must be a non-empty string.")

        prompt = f"Generate questions related to the content in the paragraph, they should not be MCQs; they should be more specifically interview questions\n\n{paragraph}"

        chat_completion = client.chat.completions.create(
            messages=[
                {
                    "role": "user",
                    "content": prompt,
                }
            ],
            model="llama3-8b-8192",
        )

        if not chat_completion.choices:
            print("No questions were generated.")
            return []

        questions = []
        for choice in chat_completion.choices:
            if choice.message and choice.message.content:
                # Split questions by new line, assuming each question is on a new line
                split_questions = choice.message.content.split('\n')
                # Concatenate questions with the $$ operator
                formatted_questions = [f"{question}$$" for question in split_questions if question.strip()]
                questions.extend(formatted_questions)

        print(questions)
        return questions

    except Exception as e:
        print(f"An unexpected error occurred: {e}")
    return []
