import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../src/App.css';
import logo from '../src/logo.jpg';
import www from '../src/www.jpg';
import ClockLoader from 'react-spinners/ClockLoader';

function App() {
  const [query, setQuery] = useState('');
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [counter, setCounter] = useState(1);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get('http://127.0.0.1:5000/api/interviewexperience', {
        params: { query },
      });
      console.log(response.data.questions);
      setData(response.data.questions);
      setCounter(1); // Reset counter when new data is fetched
    } catch (err) {
      setError('Error fetching data. Please try again.');
    }
    setLoading(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchData();
  };

  const goToNextCard = () => {
    if (currentIndex < data.length - 3) {
      setCurrentIndex(prevIndex => {
        const newIndex = prevIndex + 3;
        setCounter(prevCounter => prevCounter + 3);
        return newIndex;
      });
    }
  };

  const goToPreviousCard = () => {
    if (currentIndex > 0) {
      setCurrentIndex(prevIndex => {
        const newIndex = prevIndex - 3;
        setCounter(prevCounter => prevCounter - 3);
        return newIndex;
      });
    }
  };

  useEffect(() => {
    setCounter(currentIndex + 1);
  }, [currentIndex]);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} alt="Logo" className="App-logo" />
        <h1>Interview Insights Using ML</h1>
      </header>
      <form onSubmit={handleSubmit} className="App-form">
        <input
          type="text"
          className="App-input"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Enter job role or interview query"
        />
        <button className="App-submitBtn" type="submit">Search</button>
      </form>

      {loading && (
        <div className="App-loader">
          <ClockLoader
            color="black"
            loading={loading}
            size={150}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        </div>
      )}

      {error && <p className="App-error">{error}</p>}

      <h2 className="App-role">Role: {query}</h2>

      <div className="App-container">
        {data.length > 0 && (
          <div className="App-cards">
            {data.slice(currentIndex, currentIndex + 3).map((item, index) => (
              <div className="App-card" key={index}>
                <div className="App-cardHeader">
                  
                <h4>{counter + index}.</h4>
                <img src={www} alt="Logo" className="App-logo" />
                  
                  <h4 className="App-cardTitle">Information scrapped from</h4>
                </div>
                <a className="App-cardLink" href={item.url} target="_blank" rel="noopener noreferrer">
                  
                  {item.url}
                </a>
                <ul className="App-questionsList">
                  {Array.isArray(item.questions) ? (
                    item.questions.flatMap((question, qIndex) =>
                      question.split('$$').map((q, lineIndex) => {
                        const trimmedQuestion = q.trim();
                        return trimmedQuestion ? (
                          <li key={`${qIndex}-${lineIndex}`} className="App-questionItem">
                            {trimmedQuestion}
                          </li>
                        ) : null;
                      })
                    )
                  ) : (
                    <li>No questions available</li>
                  )}
                </ul>
              </div>
            ))}
            {data.length > 3 && (
              <>
                <button className="App-navButton App-navButton-left" onClick={goToPreviousCard}>
                  &lt;
                </button>
                <button className="App-navButton App-navButton-right" onClick={goToNextCard}>
                  &gt;
                </button>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
