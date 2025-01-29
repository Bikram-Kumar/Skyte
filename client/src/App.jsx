import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/homepage";
import LoginPage from "./pages/LoginPage";

export default function App()
{
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path ='/' element = {<HomePage />}></Route>
          <Route path ='/login' element = {<LoginPage />}></Route>

        </Routes>
      </BrowserRouter>
    </>
  ) 
}