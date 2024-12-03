// import logo from './logo.svg';
import './../styles/App.scss';
import React from 'react';
import AppRouter from './../router';
import Header from './Header';
// import Mycomponent from './examples/Mycomponent';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           HELLO WORLD
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//         <Mycomponent></Mycomponent>
//       </header>
//     </div>
//   );
// }


function App() {
  return (
    <>
      <Header />
      <AppRouter />
    </>
  );
}


export default App;
