import React, { useState } from 'react';
import axios from 'axios';
import '../src/App.css'
import logo from '../src/logo.jpg'
import ClockLoader from "react-spinners/ClockLoader";
function App() {
  const [query, setQuery] = useState('');
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get('http://127.0.0.1:5000/api/interviewexperience', {
        params: { query },
      });
      console.log(response.data.questions);
      setData(response.data.questions);
    } catch (err) {
      setError('Error fetching data. Please try again.');
    }
    setLoading(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchData();
  };

  return (
    <div className="App">
      <div className='heading'>
        <img src={logo} style={{borderRadius:'100px',height:'70px',marginRight:'20px'}}/>
        <h1>Interview Insights Using ML</h1>
      </div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          className='input'
          style={{color:'white'}}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Enter job role or interview query"
        />
        <button className='submitBtn' type="submit">Search</button>
      </form>

      {loading && 
      <div className='loader'><ClockLoader
        color='white'
        loading={loading}
        size={300}
        aria-label="Loading Spinner"
        data-testid="loader"
      /></div>}
      {error && <p>{error}</p>}
      <h2 style={{color:'white',margin:'20px'}}>Role :{query}</h2>
      <div className='line'></div>
      <div className='container'>
        {data.length > 0 && (
          <ul>
            {data.map((item, index) => (
              <li key={index}>
                <div className='link'>
                  <h4>Information scrapped from </h4>
                  <a style={{color:'whitesmoke'}} href={item.url} target="_blank" rel="noopener noreferrer">
                    {item.url}
                  </a>
                  
                </div>
                <div className='line'></div>
                  
                <ul>
                  {item.questions.flatMap((question, qIndex) =>
                    question.split('$$').map((q, lineIndex) => {
                      const trimmedQuestion = q.trim();
                      return trimmedQuestion ? (
                        <li key={`${qIndex}-${lineIndex}`}>
                          {trimmedQuestion}
                        </li>
                      ) : null;
                    })
                  )}
                </ul>
                <div className='line'></div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default App;
