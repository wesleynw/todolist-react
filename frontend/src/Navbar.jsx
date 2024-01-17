import PropTypes from "prop-types";

function Navbar({ name }) {
  return (
    <div className="navbar">
      <h1 className="navbar-text">
        {name == undefined ? "Your" : name + "'s"} To Do List
      </h1>
    </div>
  );
}

export default Navbar;

Navbar.propTypes = {
  name: PropTypes.string,
};
