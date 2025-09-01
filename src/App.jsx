import {useEffect, useState} from "react";
import TimeEntryForm from './components/TimeEntryForm'
import TimeSheetTable from './components/TimeSheetTable';
import Navbar from './components/navbar'; 
import './App'
import ReportDashboard from "./components/reportDashboard";



function App(){
  const [entries, setEntries] = useState([]);
  const [role, setRole] = useState("employee");

  const handleRoleToggle = (newRole) => {
    setRole(newRole)
  }

   useEffect(() => {
    const savedEntries = JSON.parse(localStorage.getItem('timesheetEntries')) || [];
    
    // If no data exists, add mock data to showcase the app
    if (savedEntries.length === 0) {
      const mockEntries = [
        { project: 'Project A', task: 'Development', startTime: '09:00', endTime: '17:00', breakTime: '30', overtime: '0', notes: 'Completed feature A.' },
        { project: 'Project B', task: 'Testing', startTime: '10:00', endTime: '18:00', breakTime: '15', overtime: '0', notes: 'Testing module B.' },
        // { project: 'Project A', task: 'Design', startTime: '08:30', endTime: '16:30', breakTime: '20', overtime: '0', notes: 'Created wireframes.' },
        // { project: 'Project C', task: 'Research', startTime: '11:00', endTime: '19:00', breakTime: '45', overtime: '0', notes: 'Market research for Project C.' },
        // { project: 'Project B', task: 'Development', startTime: '09:30', endTime: '17:30', breakTime: '30', overtime: '30', notes: 'Development for Project B.' },
        // { project: 'Project D', task: 'Meeting', startTime: '13:00', endTime: '14:00', breakTime: '0', overtime: '0', notes: 'Client meeting for Project D.' }
      ];
      localStorage.setItem('timesheetEntries', JSON.stringify(mockEntries)); // Save mock data to localStorage
      setEntries(mockEntries); // Update state with mock data
    } else {
      setEntries(savedEntries); // Use saved data from localStorage
    }
  }, []); 


  // useEffect(()=>{
  //     const savedEntries = JSON.parse(localStorage.getItem('timeSheetEntries')) || [];
  //     setEntries(savedEntries)
  // },[])

  const handleAddEntry = (entry) => {
    const newEntries = [...entries, entry]
    console.log(newEntries)
    setEntries(newEntries);
    localStorage.setItem("timeSheetEntry", JSON.stringify(newEntries))
  }

  // Delete entry
  const handleDeleteEntry = (index) => {
    const updatedEntries = [...entries];
    updatedEntries.splice(index, 1);
    setEntries(updatedEntries);
    localStorage.setItem("timesheetEntries", JSON.stringify(updatedEntries));
  };

  // Edit entry
  const handleEditEntry = (index, updatedEntry) => {
    const updatedEntries = [...entries];
    updatedEntries[index] = updatedEntry;
    setEntries(updatedEntries);
    localStorage.setItem("timesheetEntries", JSON.stringify(updatedEntries));
  };

  return(
    <div className="row g-0">
      <div className="row">
          <Navbar className="mb-5"  handleRoleToggle={handleRoleToggle} role={role} /> 
        {/* left column - time entry form */}
        <div className="col-md-5 mb-5 pt-2">
          <h2>Log Your Time</h2>
          <TimeEntryForm onAddEntry={handleAddEntry} 
         roleToggle={handleRoleToggle} role={role} entries={entries}/>
                </div>

        {/* right column - time sheet table */}
        <div className="col-md-7 pt-2">
          <h2>TimeSheet View</h2>
          <TimeSheetTable entries={entries} role={role}
           onEditEntry={handleEditEntry} onDeleteEntry={handleDeleteEntry} />
          <ReportDashboard entries={entries} role={role}/>
        </div>

      </div>
    </div>
  )
}

export default App;