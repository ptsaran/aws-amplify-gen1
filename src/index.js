import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

reportWebVitals();





// import { useState, ChangeEvent } from "react";
// import type { Schema } from "../amplify/data/resource";
// import { generateClient } from "aws-amplify/data";
// import { Amplify } from 'aws-amplify';
// import outputs from '../amplify_outputs.json';
// // import React from 'react';
// import { uploadData } from 'aws-amplify/storage';

// Amplify.configure(outputs);

// const client = generateClient<Schema>();

// function App() {
//   const [file, setFile] = useState();

//   const handleChange = (event: any) => {
//     setFile(event.target.files[0]);
//   };
//   // const [todos, setTodos] = useState<Array<Schema["Todo"]["type"]>>([]);

//   // useEffect(() => {
//   //   client.models.Todo.observeQuery().subscribe({
//   //     next: (data) => setTodos([...data.items]),
//   //   });
//   // }, []);

//   // function createTodo() {
//   //   client.models.Todo.create({ content: window.prompt("Todo content") });
//   // }

//   return (
//     <main>
//       {/* <div>
//       <input type="file" onChange={handleChange} />
//         <button
//           onClick={() =>
//             uploadData({
//               path: 'picture-submissions/test.jpg',
//               data: file,
//           })
//         }
//       >
//         Upload
//       </button>
//       </div> */}
//     <div>
//       <h1>My todos</h1>
//       <button onClick={createTodo}>+ new</button>
//       <ul>
//         {todos.map((todo) => (
//           <li key={todo.id}>{todo.content}</li>
//         ))}
//       </ul>
//       <div>
//         🥳 App successfully hosted. Try creating a new todo.
//         <br />
//         <a href="https://docs.amplify.aws/react/start/quickstart/#make-frontend-updates">
//           Review next step of this tutorial.
//         </a>
//       </div>
//     </div>
//     </main>
//   );
// }

// interface S3Image {
//   key: string;
//   url: string;
// }

// const App: React.FC = () => {
//   const [file, setFile] = useState<File | null>(null);
//   const [images, setImages] = useState<S3Image[]>([]);

//   useEffect(() => {
//     fetchImages();
//   }, []);

//   const fetchImages = async () => {
//     try {
//       const result = await Storage.list('picture-submissions/');
//       const imagePromises = result.map(async ({ key }) => {
//         const url = await Storage.get(key);
//         return { key, url };
//       });
//       const images = await Promise.all(imagePromises);
//       setImages(images);
//     } catch (error) {
//       console.error('Error fetching images:', error);
//     }
//   };

//   const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
//     const selectedFile = event.target.files ? event.target.files[0] : null;
//     setFile(selectedFile);
//   };

//   const uploadFile = async () => {
//     if (file) {
//       try {
//         const result = uploadData({
//           path: `picture-submissions/${file.name}`,
//           data: file,
//       })
//         console.log('File uploaded successfully:', result);
//       } catch (error) {
//         console.log('Error uploading file:', error);
//       }
//     } else {
//       console.log('No file selected');
//     }
//   };

//   return (
//     <main>
//       <h1>Image Gallery</h1>
//       <div className="image-gallery">
//         {images.map((image) => (
//           <div key={image.key} className="image-container">
//             <img src={image.url} alt={image.key} className="image" />
//           </div>
//         ))}
//       </div>
//       <div>
//         <input type="file" onChange={handleChange} />
//         <button onClick={uploadFile}>Upload</button>
//       </div>
//     </main>
//   );
// }

// export default App;