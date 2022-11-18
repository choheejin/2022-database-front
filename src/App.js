import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navigation from "./components/Navigation";
import {PostDetailPage, PostListPage, PostWritePage} from "./pages/post-page";
import {MainPage, NotFoundPage} from "./pages";
import {LoginPage, SignupPage} from "./pages/auth-page";

function App() {
  return (
      <div className="bg-gray-50 h-full min-h-screen">
          <Navigation/>
          <Router>
              <Routes>
                  <Route path="/login" element={<LoginPage/>}></Route>
                  <Route path="/signup" element={<SignupPage/>}></Route>

                  <Route path="/posts/:key" element={<PostListPage/>}></Route>
                  <Route path="/post/detail/:key" element={<PostDetailPage/>}></Route>
                  <Route path="/posts/write" element={<PostWritePage/>}></Route>

                  <Route path="/" element={<MainPage/>}></Route>
                  <Route path="*" element={<NotFoundPage/>}></Route>
              </Routes>
          </Router>
      </div>
  );
}

export default App;
