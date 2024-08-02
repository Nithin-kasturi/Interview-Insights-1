
# Interview Insights ML

Certainly! Here’s a refined description based on your requirements:

---

### **Project Overview: Interview Insights**

**Objective:** Develop a web application that streamlines job interview preparation by leveraging advanced technologies to provide valuable insights based on user inputs. 

**Description:**

The Interview Insights application offers an efficient way for job seekers to gather relevant information about job interviews. Here’s how it works:

1. **User Input:** Users input a job role into the application.
2. **Google Custom Search:** The application utilizes a custom Google search engine to fetch links related to the job role from across the web.
3. **Web Scraping:** The application then performs web scraping on these fetched links to extract pertinent paragraphs and information.
4. **Question Generation:** Using the GPT-4 API integration, the application processes these web-scraped paragraphs to generate insightful and relevant interview questions tailored to the job role.

**Technical Stack:**
- **Backend:** Python, employing web scraping techniques and the GPT-4 API for question generation.
- **Frontend:** React.js, providing an interactive user interface.
- **API Integration:** GPT-4 API, used to generate and refine interview questions based on the scraped content.

**Workflow:**
1. **Input Processing:** Users enter a job role into the application.
2. **Search and Scrape:** The application uses a custom search engine to find relevant links and scrapes data from these sources.
3. **Question Creation:** The scraped information is processed with the GPT-4 API to generate pertinent interview questions.
4. **Display:** The results, including generated questions and other relevant information, are displayed to the user in an intuitive format.

**Goals:**
- Facilitate effective interview preparation by providing targeted questions and insights.
- Utilize advanced AI and web technologies to deliver up-to-date and relevant content.
- Enhance user experience through a seamless and informative application.

---

Feel free to adjust any parts of this description to better fit your project’s specifics!

## Run Locally

Clone the project

```bash
  git clone https://github.com/Nithin-kasturi/Interview-Insights-1
```

Go to the project directory

```bash
  cd my-project
```

Install dependencies

```bash
    
  pip install -r requirements.txt
  
```

Start the server

```bash
  python run.py
```

```bash
  cd frontend
```

Install dependencies

```bash
    
  npm install
  
```

Start the server

```bash
  npm start
```

