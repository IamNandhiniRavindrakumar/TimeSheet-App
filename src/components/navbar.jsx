function Navbar({handleRoleToggle, role}) {
    const toggleRole = () => {
           handleRoleToggle(role === 'employee' ? 'manager' : 'employee');
    }
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <a className="navbar-brand" href="#">Timesheets App</a>
        <button 
        className="btn btn-secondary-outline"
        onClick={toggleRole}
        aria-label="Toggle between Employee and Manager roles">
            {role === 'employee' ? 'switch to manager' : 'switch to employee'}
        </button>

      </div>
    </nav>
  );
};

export default Navbar;
