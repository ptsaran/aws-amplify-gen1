import React, { useEffect, useState } from 'react';
import { Amplify } from 'aws-amplify';
import { uploadData, getUrl, list } from 'aws-amplify/storage';
import { withAuthenticator } from '@aws-amplify/ui-react';
import awsconfig from './aws-exports'; // Adjust the path to where your configuration file is
import './App.css';

Amplify.configure(awsconfig);

const apiGatewayEndpoint = 'https://4i6ohgbth2.execute-api.us-east-1.amazonaws.com/dev';

function App() {
  const [employees, setEmployees] = useState([]);
  const [file, setFile] = useState(null);

  const [newEmployee, setNewEmployee] = useState({
    id: '',
    name: '',
    domain: '',
    photo: '',
    experience: '',
    joinedDate: ''
  });

  useEffect(() => {
    fetchEmployees();
  }, []);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files ? event.target.files[0] : null;
    setFile(selectedFile);
  };

  // =========================================================================================================
  const fetchEmployees = async () => {
    try {

      const result = await list({
            path: `employees/1.png`,
            data: file
            // Alternatively, path: ({identityId}) => `protected/${identityId}/photos/`
          });
      console.log(result);

      const employeeDataPromises = result.map(async ({ key }) => {
        const url = await getUrl(key);
        const response = await fetch(url);
        return await response.json();
      });
      const employeeData = await Promise.all(employeeDataPromises);
      setEmployees(employeeData);
    } catch (error) {
      console.log('Error fetching employees:', error);
    }
  };
  // =========================================================================================================

  const addEmployee = async (e) => {
    e.preventDefault();
    try {
      const { id, name, domain, photo, experience, joinedDate } = newEmployee;
      const employeeData = { id, name, domain, photo, experience, joinedDate };

      console.log(file.name);

      console.log(e);

      const result = await uploadData({
        path: `employees/${file.name}`,
        data: file,
        
      });

      alert('File uploaded successfully!');


      // const result = await uploadData({
      //   path: `employees/${id}.json`, 
      //   // Alternatively, path: ({identityId}) => `protected/${identityId}/album/2024/1.jpg`
      //   data: JSON.stringify(employeeData),
      //   // options: {
      //   //   onProgress // Optional progress callback.
      //   // }
      // }).result;
      // console.log('Succeeded: ', result);

      // Save employee data to S3
    //   await uploadData(`employees/${id}.json`, JSON.stringify(employeeData));
    //   await uploadData('apiName', `/employees/${id}`, { body: employeeData });
    //   const result = await Storage.list('employees/');
    //   console.log(result);
    //   await uploadData({
    //     key: "test",
    //     data: JSON.stringify(employeeData)
    //   });

      // Call API Gateway endpoint
      // await fetch(`${apiGatewayEndpoint}/${id}`, {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(employeeData)
      // });
      // fetchEmployees();

      // =========================================================================================================

      

    } catch (error) {
      console.log('Error adding employee:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewEmployee({ ...newEmployee, [name]: value });
  };

  // const result = await uploadData({
  //   path: `employees/${file.name}`,
  //   data: file,
    
  // });

  const uploadFile = async (e) => {
    console.log(e);
    if (file) {
      
      try {
        const result = uploadData({
          path: `employees/${file.name}`,
          data: file,
      })
        console.log('File uploaded successfully:', result);
      } catch (error) {
        console.log('Error uploading file:', error);
      }
    } else {
      console.log('No file selected');
    }
  };


  return (
    <main>
      <h1>My todos</h1>
      <div>
        App successfully hosted. Try creating a new todo.
        <br/><br/>
      </div>
      <form onSubmit={addEmployee}>

         <input type="file" onChange={handleFileChange} />

         <button type="submit">Upload</button>
       </form>
    </main>
  );
}

export default withAuthenticator(App);
