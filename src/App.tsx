import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./views/login";
import UserInfo from "./views/user-info";

function App() {
    return (
        <BrowserRouter>
            <div className="App">
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/user-info" element={<UserInfo />} />
                </Routes>
            </div>
        </BrowserRouter>
    );
}

export default App;
