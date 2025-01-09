import React, { useState, useEffect } from "react";
import axios from "axios";
//import './Header.js'; //not part of this file, just for reference how to import other files from the same directory for the current code execution

const apiEndpoint = 'https://api.api-ninjas.com/v1/animals';
const apiKey = 'Your Api key'; //get your free api key from https://api-ninjas.com/api/animals
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
