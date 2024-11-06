import { Outlet, Link } from "react-router-dom";
import Logo from "./Logo";

const Layout = () => {
  return (
    <>
      
        <ul>
          <li>
            <Logo></Logo>
          </li>
          <li>
            <Link to="/">Messages</Link>
          </li>
          <li>
            <Link to="/ContactList">ContactList</Link>
          </li>
        
          <li>
            <Link to ="/Communities">Communities</Link>
          </li>
        </ul>
       

      <Outlet />
    </>
  )
};

export default Layout;