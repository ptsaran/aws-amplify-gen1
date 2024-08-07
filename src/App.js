import React, { useState } from 'react';
import { Amplify } from 'aws-amplify';
import { uploadData } from 'aws-amplify/storage';
import { Authenticator } from '@aws-amplify/ui-react';
import awsconfig from './aws-exports'; 
import './App.css';

Amplify.configure(awsconfig);

function App() {
  const [file, setFile] = useState(null);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files ? event.target.files[0] : null;
    setFile(selectedFile);
  };

  const addEmployee = async (e) => {
    e.preventDefault();
    try {
      console.log(file.name);

      console.log(e);

      uploadData({
        path: `uploads/${file.name}`,
        data: file,
      });

      alert('File uploaded successfully!');

    } catch (error) {
      console.log('Error adding employee:', error);
    }
  };

  return (
    <Authenticator>
      {({ signOut }) => (
      <main>
        <h1>Upload File</h1>
        <div>
          Upload you'r file into the s3
          <br/><br/>
        </div>
        <form onSubmit={addEmployee}>

          <input type="file" onChange={handleFileChange} />

          <button type="submit">Upload</button>
        </form>
        <br/>
        <button onClick={signOut} >Sign Out</button>
      </main>
      )}
    </Authenticator>
  );
}

export default App;
