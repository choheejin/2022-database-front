import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainPage from "./pages/MainPage";
import LoginPage from "./pages/auth-page/LoginPage";
import SignupPage from "./pages/auth-page/SignupPage";
import NotFoundPage from "./pages/NotFoundPage";
import Navigation from "./components/Navigation";
import PostDetailPage from "./pages/post-page/PostDetailPage";

function App() {
  return (
      <div className="bg-gray-50 h-full min-h-screen">
          <Navigation/>
          <Router>
              <Routes>
                  <Route path="/" element={<MainPage/>}></Route>
                  <Route path="/login" element={<LoginPage/>}></Route>
                  <Route path="/signup" element={<SignupPage/>}></Route>
                  <Route path="/post/detail/:key" element={<PostDetailPage/>}></Route>
                  <Route path="*" element={<NotFoundPage/>}></Route>

                  {/*<Route path="/posts" element={</>}></Route>*/}
              </Routes>
          </Router>
      </div>
  );
}

export default App;
