import os
from groq import Groq

# Initialize the Groq client with your API key
client = Groq(api_key="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")

# Define the paragraph you want to generate questions from
paragraph = """
In recent years, there has been a significant advancement in natural language processing, with large language models such as GPT-3 and BERT becoming more prevalent. These models have revolutionized the way we interact with machines, enabling more natural and human-like communication. They are used in various applications, including chatbots, translation services, and content generation, making them a cornerstone of modern AI technology.
"""

# Create a prompt to generate questions from the given paragraph
prompt = f"Generate questions from the following paragraph:\n\n{paragraph}"

# Use the Groq API to generate questions
chat_completion = client.chat.completions.create(
    messages=[
        {
            "role": "user",
            "content": prompt,
        }
    ],
    model="llama3-8b-8192",  # Ensure this model supports the task or use the correct one
)

# Print the generated questions
print("Generated Questions:")
for choice in chat_completion.choices:
    print(choice.message.content)
