import './App.css';
import {BrowserRouter as Router, Routes, Route, Navigate} from "react-router-dom";
import Navigation from "./components/Navigation";
import {PostDetailPage, PostListPage, PostUploadPage} from "./pages/post-page";
import {MainPage, NotFoundPage} from "./pages";
import {LoginPage, MyPage, SignupPage} from "./pages/auth-page";
import {useState} from "react";


function App() {
    const [isLogin, setIsLogin] = useState(false);
    const [isVisible, setIsVisible] = useState(true);

    return (
        <div className="bg-gray-50 min-h-screen">
            {isVisible ? <Navigation isLogin={isLogin} setIsLogin={setIsLogin}/> : <></>}
            <Router>
                <Routes>
                    <Route path="/login" element={<LoginPage isLogin={setIsLogin} />}></Route>
                    <Route path="/signup" element={<SignupPage/>}></Route>
                    <Route path="/my-page" element={<MyPage/>}></Route>

                    <Route path="/posts/:key" element={<PostListPage/>}></Route>
                    <Route path="/post/detail/:key" element={<PostDetailPage/>}></Route>

                    <Route path="/post/detail/:key1/:key" element={<PostDetailPage/>}></Route>
                    <Route path="/posts/write" element={<PostUploadPage isVisible={setIsVisible}/>}></Route>

                    <Route
                        path="/"
                        element={<Navigate to="/main" />}
                    />
                    <Route path="/main" element={<MainPage isLogin={isLogin}/>}></Route>
                    <Route path="*" element={<NotFoundPage/>}></Route>
                </Routes>
            </Router>
        </div>
    );
}

export default App;
