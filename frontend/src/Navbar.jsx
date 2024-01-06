import PropTypes from "prop-types";

function Navbar({ name }) {
  return (
    <div className="navbar">
      <h1 className="navbar-text">
        {name == "" ? "Your" : name + "'s"} Todo List
      </h1>
    </div>
  );
}

export default Navbar;

Navbar.propTypes = {
  name: PropTypes.string,
};
