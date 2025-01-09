/*
Async/Await over .then(): Use async/await to write cleaner and more readable code.
Error Handling: Always use try-catch to handle errors when using async/await.
React-Specifics: Use useState for storing fetched data and useEffect for fetching data when the component mounts.
*/
/*
Real-Life Analogy:
Think of fetch as ordering food online:

Fetch (Promise): You place an order and wait (asynchronous operation).
Await: You check the delivery status periodically and pause other tasks until the food arrives.
State Management (React): Once the food arrives, you serve it to the table (update state) and enjoy it (display it).
*/

import React, { useState, useEffect } from "react";
import axios from "axios";
//import './Header.js'; //not part of this file, just for reference how to import other files from the same directory for the current code execution

const apiEndpoint = 'https://api.api-ninjas.com/v1/animals';
const apiKey = process.env.REACT_APP_API_KEY || 'Your Api key'; //get your free api key from https://api-ninjas.com/api/animals
const name = 'cheetah';

function App() {
  const [data, setData] = useState([]); // State to store data
  const [loading, setLoading] = useState(true); // State for loading status
  const [error, setError] = useState(null); // State for error

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${apiEndpoint}?name=${name}`, {
          headers: { 'X-Api-Key': apiKey },
        });
        setData(response.data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <h1>Fetched Data:</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}

export default App;
