import { Header } from "./components/Header"
import { HashRouter as Router, Route, Routes } from "react-router-dom";
import { AppHome } from "./pages/AppHome";
import { LoginPage } from "./pages/LoginPage";
import { RegisterPage } from "./pages/RegisterPage";
import { ProfilePage } from "./pages/ProfilePage";
import { CreateTask } from "./pages/CreateTask";
import { EditTask } from "./pages/EditTask";
import { ToastContainer } from "react-toastify";

function App() {

  return (
    <>
      <Header />
      <main style={{'paddingTop': '80px'}}>
        <ToastContainer
          position="top-center"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
        <div className="container">
          <Routes>
            <Route path="/" Component={AppHome}/>
            <Route path="/login" Component={LoginPage}/>
            <Route path="/register" Component={RegisterPage}/>
            <Route path="/profile" Component={ProfilePage}/>
            <Route path="/createtask" Component={CreateTask}/>
            <Route path="/edittask/:taskId" Component={EditTask}/>
          </Routes>
        </div>
      </main>
    </>
  )
}

export default App
