import { Header } from "./components/Header"
import { HashRouter as Router, Route, Routes } from "react-router-dom";
import { AppHome } from "./pages/AppHome";
import { LoginPage } from "./pages/LoginPage";
import { RegisterPage } from "./pages/RegisterPage";
import { ProfilePage } from "./pages/ProfilePage";
import { CreateTask } from "./pages/CreateTask";

function App() {

  return (
    <>
      <Header />
        <main className="py-3"></main>
        <div className="container">
          <Routes>
            <Route path="/" Component={AppHome}/>
            <Route path="/login" Component={LoginPage}/>
            <Route path="/register" Component={RegisterPage}/>
            <Route path="/profile" Component={ProfilePage}/>
            <Route path="/createtask" Component={CreateTask}/>
          </Routes>
        </div>
    </>
  )
}

export default App
