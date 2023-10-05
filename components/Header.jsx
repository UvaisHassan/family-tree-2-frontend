import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header>
      <div className="header-container">
        <h1>Vadakkayil Family</h1>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/addmember">Add Member</Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
