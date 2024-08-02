from bs4 import BeautifulSoup

def extract_text(html_content):
    if not html_content:
        return ''
    try:
        soup = BeautifulSoup(html_content, 'html.parser')
        paragraphs = soup.find_all('p')
        text = ' '.join([p.get_text() for p in paragraphs])
        print(text)
        return text
    except Exception as e:
        print(f"Error extracting text: {e}")
        return ''
