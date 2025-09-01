import { useState } from "react";
import { saveAs } from "file-saver";
import "../App.css";



function TimeSheetTable({ entries, role, onDeleteEntry, onEditEntry, onApproveEntry, onRejectEntry }) {
  const [view, setView] = useState("weekly"); 

    const [editIndex, setEditIndex] = useState(null);
  const [editData, setEditData] = useState({});

  const startEdit = (index) => {
    setEditIndex(index);
    setEditData(entries[index]);
  };

  const saveEdit = () => {
    onEditEntry(editIndex, editData);
    setEditIndex(null);
    setEditData({});
  };

  // CSV download
  const handleExportCSV = () => {

    if (entries.length === 0) {
    return (
      <div className="report-dashboard">
        <h3>Report Dashboard</h3>
        <p>No entries yet—start logging!</p>
      </div>
    );
  } 

    const csvRows = [];
    const headers = ['Project', 'Task', 'Start Time', 'End Time', 'Break Time', 'Overtime', 'Notes'];
    csvRows.push(headers.join(','));

    entries.forEach((entry) => {
      const row = [
        entry.project,
        entry.task,
        entry.startTime,
        entry.endTime,
        entry.breakTime,
        entry.overtime,
        entry.notes,
      ];
      csvRows.push(row.join(','));
    });

    const csvString = csvRows.join('\n');
    const blob = new Blob([csvString], { type: 'text/csv' });
    saveAs(blob, 'timesheet.csv');
  };

  // Function to filter daily entries (today)
  const getDailyEntries = () => {
    const today = new Date().toISOString().split("T")[0]; 
    return entries.filter(entry => entry.date === today);
  };

  // Function to filter monthly entries (current month)
  const getMonthlyEntries = () => {
    const today = new Date();
    const currentMonth = today.getMonth(); 
    const currentYear = today.getFullYear();
    return entries.filter(entry => {
      const entryDate = new Date(entry.date);
      return entryDate.getMonth() === currentMonth && entryDate.getFullYear() === currentYear;
    });
  };

  // Render table based on view
  const renderTimesheetTable = () => {
  let displayEntries = [];
  if (view === "daily") displayEntries = getDailyEntries();
  else if (view === "weekly") displayEntries = entries; 
  else if (view === "monthly") displayEntries = getMonthlyEntries();

  if (displayEntries.length === 0) {
    return (
      <div className="card mt-4 shadow-sm text-center p-4">
        <h5>No entries found</h5>
        <p className="text-muted">There is no entry now — log your work to see it here.</p>
      </div>
    );
  }

  const handleDelete = (index) => {
  onDeleteEntry(index);
};



    return (
      <div className="table-responsive mt-4">
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Project</th>
              <th>Task</th>
              <th>Start Time</th>
              <th>End Time</th>
              <th>Break Time</th>
              <th>Overtime</th>
              <th>Notes</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody  className="scrollable-tbody">
            {displayEntries.map((entry, index) => (
              <tr key={index}> 
  {editIndex === index ? (
                <>
                  <td><input value={editData.project} onChange={e => setEditData({ ...editData, project: e.target.value })} /></td>
                  <td><input value={editData.task} onChange={e => setEditData({ ...editData, task: e.target.value })} /></td>
                  <td><input value={editData.startTime} onChange={e => setEditData({ ...editData, startTime: e.target.value })} /></td>
                  <td><input value={editData.endTime} onChange={e => setEditData({ ...editData, endTime: e.target.value })} /></td>
                  <td><input value={editData.breakTime} onChange={e => setEditData({ ...editData, breakTime: e.target.value })} /></td>
                  <td><input value={editData.overtime} onChange={e => setEditData({ ...editData, overtime: e.target.value })} /></td>
                  <td><input value={editData.notes} onChange={e => setEditData({ ...editData, notes: e.target.value })} /></td>
                  <td>
                    <button className="btn btn-sm btn-success" onClick={saveEdit}>Save</button>
                    <button className="btn btn-sm btn-secondary" onClick={() => setEditIndex(null)}>Cancel</button>
                  </td>
                </>
              ) : (
                <>
                <td>{entry.project}</td>
                <td>{entry.task}</td>
                <td>{entry.startTime}</td>
                <td>{entry.endTime}</td>
                <td>{entry.breakTime}</td>
                <td>{entry.overtime}</td>
                <td>{entry.notes}</td>
                <td>
                  {role === "manager" && (
                    <>
                      <button onClick={() => onApproveEntry(index)} className="btn btn-sm btn-success-outline"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-bookmark-check-fill" viewBox="0 0 16 16">
                        <path fillRule="evenodd" d="M2 15.5V2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v13.5a.5.5 0 0 1-.74.439L8 13.069l-5.26 2.87A.5.5 0 0 1 2 15.5m8.854-9.646a.5.5 0 0 0-.708-.708L7.5 7.793 6.354 6.646a.5.5 0 1 0-.708.708l1.5 1.5a.5.5 0 0 0 .708 0z"/>
                        </svg></button> 
                        {/* approve */}
                      <button onClick={() => onRejectEntry(index)} className="btn btn-sm btn-danger-outline"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-bookmark-x-fill" viewBox="0 0 16 16">
                        <path fillRule="evenodd" d="M2 15.5V2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v13.5a.5.5 0 0 1-.74.439L8 13.069l-5.26 2.87A.5.5 0 0 1 2 15.5M6.854 5.146a.5.5 0 1 0-.708.708L7.293 7 6.146 8.146a.5.5 0 1 0 .708.708L8 7.707l1.146 1.147a.5.5 0 1 0 .708-.708L8.707 7l1.147-1.146a.5.5 0 0 0-.708-.708L8 6.293z"/>
                        </svg></button>
                        {/* reject */}
                    </>
                  )}
                  <button onClick={() => startEdit(index)} className="btn btn-warning-outline btn-sm"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil" viewBox="0 0 16 16">
                  <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325"/>
                  </svg></button> 
                  {/* edit btn */}
                  <button title="Delete"
                   onClick={() => handleDelete(index)} className="btn btn-danger-outline btn-sm"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash" viewBox="0 0 16 16">
                  <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"/>
                  <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"/>
                  </svg></button>
                  {/* dlt btn */}
                </td>
                 </>
              )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  return (
    <div>
      {/* Toggle Buttons */}
      <div className="radio-inputs">
        <label className="radio">
          <input type="radio" name="view" checked={view === "daily"} onChange={() => setView("daily")} />
          <span className="name">Daily</span>
        </label>
        <label className="radio">
          <input type="radio" name="view" checked={view === "weekly"} onChange={() => setView("weekly")} />
          <span className="name">Weekly</span>
        </label>
        <label className="radio">
          <input type="radio" name="view" checked={view === "monthly"} onChange={() => setView("monthly")} />
          <span className="name">Monthly</span>
        </label>
      </div>

      {/* Render Table */}
      {renderTimesheetTable()}

      {/* CSV Download Button */}
      <div className="mt-3">
        <button className="button2" onClick={handleExportCSV}>Export to CSV</button>
      </div>

    </div>
    
  );
}

export default TimeSheetTable;


