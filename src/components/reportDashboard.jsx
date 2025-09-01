function ReportDashboard({ entries }) {

    if (entries.length === 0) {
    return (
      <div className="report-dashboard">
        <h3>Report Dashboard</h3>
        <p>No entries yet—start logging!</p>
      </div>
    );
  } 

  // 1. Total hours calculation
  const calculateTotalHours = () => {
    return entries.reduce((total, entry) => {
      const start = new Date(`1970-01-01T${entry.startTime}:00`);
      const end = new Date(`1970-01-01T${entry.endTime}:00`);
      const hoursWorked = (end - start) / 3600000;
      return total + hoursWorked;
    }, 0);
  };

  const totalHours = calculateTotalHours();

  // 2. Billable vs non-billable
  const calculateBillableTime = () => {
    return entries.reduce(
      (total, entry) => {
        const start = new Date(`1970-01-01T${entry.startTime}:00`);
        const end = new Date(`1970-01-01T${entry.endTime}:00`);
        const hoursWorked = (end - start) / 3600000;

        if (entry.task.toLowerCase() === "development") {
          total.billable += hoursWorked;
        } else {
          total.nonBillable += hoursWorked;
        }
        return total;
      },
      { billable: 0, nonBillable: 0 }
    );
  };

  const { billable, nonBillable } = calculateBillableTime();


  return (
    <div className="report-dashboard">
      <h3>Report Dashboard</h3>

      <div className="card">
        <div className="card-body">
          <h5>Total Hours Worked</h5>
          <p>{totalHours.toFixed(2)}</p>
        </div>
      </div>

      <div className="card mt-3">
        <div className="card-body">
          <h5>Billable vs Non-Billable</h5>
          <p>Billable : {billable.toFixed(2)} hours</p>
          <p>Non-Billable : {nonBillable.toFixed(2)} hours</p>
        </div>
      </div>
    </div>


  );

}

export default ReportDashboard;
