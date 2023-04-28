import {useState, useEffect} from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import {UserContext} from "./userContext";
import Header from "./components/Header";
import Photos from "./components/Photos";
import Login from "./components/Login";
import Register from "./components/Register";
import Profile from "./components/Profile";
import Logout from "./components/Logout";
import AddPhoto from "./components/AddPhoto";
import Details from "./components/Details";

function App() {
    const [user, setUser] = useState(localStorage.user ? JSON.parse(localStorage.user) : null);
    const updateUserData = (userInfo) => {
        localStorage.setItem("user", JSON.stringify(userInfo));
        setUser(userInfo);
    }

    return (
        <BrowserRouter>
            <UserContext.Provider value={{
                user: user,
                setUserContext: updateUserData
            }}>
                <div className="App">
                    <Header title="Home"></Header>
                    <Routes>
                        <Route path="/" exact element={<Photos/>}></Route>
                        <Route path="/publish" element={<AddPhoto/>}></Route>
                        <Route path="/profile" element={<Profile/>}></Route>
                        <Route path="/login" exact element={<Login/>}></Route>
                        <Route path="/register" element={<Register/>}></Route>
                        <Route path="/logout" element={<Logout/>}></Route>
                        <Route path="/photos/:id" element={<Details/>}></Route>
                    </Routes>
                </div>
            </UserContext.Provider>
        </BrowserRouter>
    );
}

export default App;
