import { useState } from "react";
import '../App'
import MotivationalBox from "./motivationalBox";


function TimeEntryForm({onAddEntry, entries}){
const [project, setProject] = useState('');
const [task, setTask] = useState('');
const [startTime, setStartTime] = useState('');
const [endTime, setEndTime] = useState('');
const [breakTime, setBreakTime] = useState('');
const [overtime, setOvertime] = useState('');
const [notes, setNotes] = useState('');
const [showMessage, setShowMessage] = useState(false);

// frequent projects
const frequentProjects = ["Project A", "Project B", "Project C"];

const handleFrequentProject = (projectName) => {
    setProject(projectName);
  };

const handleSubmit = (e) => {
    e.preventDefault();

     // motivational msg
    setShowMessage(true);
    setTimeout(() => setShowMessage(false), 3000);

    if(startTime >= endTime || !project || !task){
        alert("invalid entry");
        return;
    }

    const entry = {
        project,
        task,
        startTime,
        endTime,
        breakTime,
        overtime,
        notes
    }

    onAddEntry(entry)
    

    setProject('');
    setTask('');
    setStartTime('');
    setEndTime('');
    setBreakTime('');
    setOvertime('');
    setNotes('');
    
}

    return(
      <>
        <form onSubmit={handleSubmit}>
            <div className="mb-3">
                <label className="form-label">Project</label>
                <input type="text" className="form-control" value={project} onChange={(e)=>setProject(e.target.value)}/>
            </div>
            
                {/* Frequent Projects Buttons */}
                <div className="mt-2 mb-3">
                    <h6>Frequent Projects</h6>
                    <div className="btn-group">
                    {frequentProjects.map((proj) => (
                        <button
                        key={proj}
                        type="button"
                        className="btn btn-outline-info"
                        onClick={() => handleFrequentProject(proj)}
                        >
                        {proj}
                        </button>
                    ))}
                    </div>
                    {/* check this */}
                    <datalist id="projects">
                    {frequentProjects.map((proj) => (
                        <option key={proj} value={proj} />
                    ))}
                    </datalist>
                </div>
             <div className="mb-3">
                <label className="form-label">Task</label>
                <input type="text" className="form-control" value={task} onChange={(e) => setTask(e.target.value)} required />
            </div>
            <div className="mb-3">
                <label className="form-label">Start Time</label>
                <input type="time" className="form-control" value={startTime} onChange={(e) => setStartTime(e.target.value)} required />
            </div>
            <div className="mb-3">
                <label className="form-label">End Time</label>
                <input type="time" className="form-control" value={endTime} onChange={(e) => setEndTime(e.target.value)} required />
            </div>
            <div className="mb-3">
                <label className="form-label">Break Time (min)</label>
                <input type="number" className="form-control" value={breakTime} onChange={(e) => setBreakTime(e.target.value)} />
            </div>
            <div className="mb-3">
                <label className="form-label">Overtime (min)</label>
                <input type="number" className="form-control" value={overtime} onChange={(e) => setOvertime(e.target.value)} />
            </div>
            <div className="mb-3">
                <label className="form-label">Notes</label>
                <textarea className="form-control" value={notes} onChange={(e) => setNotes(e.target.value)} />
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
             {showMessage && <MotivationalBox message="Thank you for submitting your timesheet!" />}
        </form>

      </>
    )
}

export default TimeEntryForm