import { useState, useEffect } from 'react';
import Header from '../components/Header';
import TaskCard from '../components/TaskCard';
import Footer from '../components/Footer';
import { getTasksForToday } from '../utils/taskMapping';

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);

  // Initialize tasks on mount
  useEffect(() => {
    const taskNames = getTasksForToday();
    const initialTasks = taskNames.map((name) => ({
      name,
      status: null, // 'satisfactory' | 'defect' | 'na' | null
      serialNumber: '',
      comment: '',
    }));
    setTasks(initialTasks);
  }, []);

  // Check if all tasks have a status
  const allTasksComplete = tasks.length > 0 && tasks.every((task) => {
    // Task must have a status
    if (!task.status) return false;

    // If status is 'defect', both serialNumber and comment are required
    if (task.status === 'defect') {
      return task.serialNumber.trim() !== '' && task.comment.trim() !== '';
    }

    return true;
  });

  // Handle status change for a task
  const handleStatusChange = (index, newStatus) => {
    setTasks((prevTasks) => {
      const updatedTasks = [...prevTasks];
      updatedTasks[index] = {
        ...updatedTasks[index],
        status: newStatus,
        // Clear defect data if status is not 'defect'
        serialNumber: newStatus === 'defect' ? updatedTasks[index].serialNumber : '',
        comment: newStatus === 'defect' ? updatedTasks[index].comment : '',
      };
      return updatedTasks;
    });
  };

  // Handle defect data change (serialNumber or comment)
  const handleDefectDataChange = (index, field, value) => {
    setTasks((prevTasks) => {
      const updatedTasks = [...prevTasks];
      updatedTasks[index] = {
        ...updatedTasks[index],
        [field]: value,
      };
      return updatedTasks;
    });
  };

  // Handle confirm button click
  const handleConfirm = () => {
    if (!allTasksComplete) return;

    // In production, this would:
    // 1. Send data to backend API
    // 2. Log the SIMS entry
    // 3. Generate PDF/record
    // 4. Show success message

    console.log('SIMS Data to be logged:', tasks);
    alert('SIMS data logged successfully!\n\n(In production, this would send data to the backend)');

    // Optionally reset the form or navigate away
    // For now, just showing an alert
  };

  return (
    <div className="min-h-screen bg-slate-50 pb-32">
      <Header />

      <main className="max-w-4xl mx-auto p-4">
        {/* Tasks List */}
        <div className="space-y-3">
          {tasks.map((task, index) => (
            <TaskCard
              key={task.name}
              task={task}
              onStatusChange={(newStatus) => handleStatusChange(index, newStatus)}
              onDefectDataChange={(field, value) => handleDefectDataChange(index, field, value)}
            />
          ))}
        </div>

        {/* Empty State */}
        {tasks.length === 0 && (
          <div className="text-center py-12 text-slate-500">
            <p>Loading tasks...</p>
          </div>
        )}
      </main>

      <Footer allTasksComplete={allTasksComplete} onConfirm={handleConfirm} />
    </div>
  );
};

export default Dashboard;
