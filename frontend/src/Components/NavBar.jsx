import { Link } from 'react-router-dom';
import '../index.css';

const NavBar = () => {
    return (
        <nav>
            <ul>
                <li>
                    <Link to='/Signup'>Sign Up</Link>
                </li>
                <li>
                    <Link to='/todoList/Popup'>Pop Up</Link>
                </li>
                <li>
                    <Link to='/todoList/main_body'>Main Page</Link>
                </li>
            </ul>
        </nav>
    );
};

export default NavBar;