import logo from "./logo.svg";
import SignUp from "./pages/SignUp";
import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import Profile from "./pages/Profile";
import AppLayout from "./pages/AppLayout";
import { BrowserRouter, Routes, Route } from "react-router-dom"



function App() {

  return (
    <BrowserRouter>

      <div className="App">
        <Routes>

          <Route path="/" element={<AppLayout />}>
            <Route path="/" element={<Home />}></Route>
            <Route path="/profile" element={<Profile />}></Route>
          </Route>
          <Route path="/signup" element={<SignUp />}></Route>
          <Route path="/signin" element={<SignIn />}></Route>
        </Routes>

      </div>
    </BrowserRouter>


  );
}

export default App;















// import { useState } from 'react';
// import './App.css';
// import { Button, Input } from '@chakra-ui/react';

// function App() {
//     const [count, setCount] = useState(0);
//     const [isVisible, setIsVisible] = useState(true);
//     const [inputValue, setInputValue] = useState('');

//     const handleInputChange = (event) => {
//         setInputValue(event.target.value);
//     };

//     const applyInputValue = () => {
//         setCount(parseInt(inputValue, 10) || 0); // Only update if it's a valid number
//     };

//     return (
//         <>
//             <div>
//                 <Button onClick={() => setIsVisible(!isVisible)}>
//                     Toggle Counter Visibility
//                 </Button>
//                 <Input
//                     value={inputValue}
//                     onChange={handleInputChange}
//                     placeholder="Set counter value"
//                 />
//                 <Button
//                     onClick={applyInputValue}
//                     className="set-counter-button"
//                 >
//                     Set Counter
//                 </Button>
//                 <Button onClick={() => setCount(0)}>Reset Counter</Button>
//             </div>
//             <h1>Vite + React</h1>
//             <h2>Vite + h2 + React</h2>
//             {isVisible && (
//                 <div className="card">
//                     <Button
//                         onClick={() => setCount((count) => count + 1)}
//                         className="chakra-button"
//                         backgroundColor="rgb(239, 239, 239)"
//                     >
//                         count is {count}
//                     </Button>
//                 </div>
//             )}
//             <p className="read-the-docs">
//                 Click on the Vite and React logos to learn more
//             </p>
//         </>
//     );
// }

// export default App;

















