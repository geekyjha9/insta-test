import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SignUp from './pages/SignUp';
import Home from './pages/Home';
import SignIn from './pages/SignIn';
import Profile from './pages/Profile';
import AppLayout from './pages/AppLayout';
import CreatePost from './components/CreatePost/CreatePost';
import { Context } from './contexts/Context';

function App() {
  const [isCreatePostOpen, setCreatePostOpen] = useState(false);
  const [isProfile, setProfile] = useState(false);
  const [isSearch, setSearch] = useState(false);
  const [isFollowing, setisFollowing] = useState(false);
  const [followers, setfollowers] = useState(false);
  
  
  

  return (
    <BrowserRouter>
      <div className="App">
      <Context.Provider value = {{isCreatePostOpen,setCreatePostOpen,isProfile,setProfile,isFollowing,isSearch,followers,setSearch,setfollowers,setisFollowing}}>
        <Routes>
          
          {/* Authentication Routes */}
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signin" element={<SignIn />} />

          {/* Layout with navigation */}
          <Route element={<AppLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/profile" element={ isProfile && <Profile />} />
            
            
            <Route
              path="/create" 
              element={isCreatePostOpen && <CreatePost />}
            />
            
            
          </Route>
          
        </Routes>
        </Context.Provider>

      </div>
    </BrowserRouter>
  );
}

export default App;
