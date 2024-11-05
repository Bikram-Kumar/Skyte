import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Messages from "./components/Messages";
import Communities from "./components/Communities";
import ContactList from "./components/ContactList";
import Layout from "./components/Layout";
import "./App.css";
export default function App()
{
  return <>
 <BrowserRouter>
 <Layout>

 </Layout>
 <Routes>
  
  <Route path ='/' element = {<Messages></Messages>}></Route>
  <Route path = "Communities" element ={<Communities></Communities>}></Route>
  <Route path ="ContactList" element ={<ContactList></ContactList>}></Route>
  
 </Routes>
 </BrowserRouter>

</>
}