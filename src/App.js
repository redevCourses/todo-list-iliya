import Todo from "./Components/Todo";
import AuthForm from './Components/AuthForm'
import RegForm from './Components/RegForm'
import HomePage from "./Components/HomePage";
import { Routes, Route } from "react-router-dom";
import { useState } from "react";
import './App.css';

function App() {

  const [showAlert, setShowAlert] = useState(false)
  const [alertProps, setAlertProps] = useState({})

  const alertWindow = () => {
    setTimeout(() => {
      setShowAlert(true)
    }, 0)
    setTimeout(() => {
      setShowAlert(false)
    }, 4000)
  }

  return (
    <Routes>
      <Route path="/home" element={<HomePage />} />
      <Route path="/login" element={
        <AuthForm
          alertWindow={alertWindow}
          showAlert={showAlert}
          alertProps={alertProps}
          setAlertProps={setAlertProps}
        />} />
      <Route path="/register" element={
        <RegForm
          alertWindow={alertWindow}
          showAlert={showAlert}
          alertProps={alertProps}
          setAlertProps={setAlertProps}
        />} />
      <Route path="/todo-list" element={
        <Todo
          alertWindow={alertWindow}
          showAlert={showAlert}
        />}
      />
    </Routes>
  )
}

export default App;
