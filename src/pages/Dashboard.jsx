import { useState, useEffect } from 'react';
import Header from '../components/Header';
import TaskCard from '../components/TaskCard';
import Footer from '../components/Footer';
import ContactFleetModal from '../components/ContactFleetModal';
import { getTasksForToday, isRotatingTask } from '../utils/taskMapping';

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [isContactFleetOpen, setIsContactFleetOpen] = useState(false);
  const [previousTasks, setPreviousTasks] = useState(null);

  // Initialize tasks on mount
  useEffect(() => {
    const taskNames = getTasksForToday();
    const initialTasks = taskNames.map((name) => {
      // Special initialization for SCBA task
      if (name === 'SCBA') {
        return {
          name,
          status: null,
          serialNumber: '',
          comment: '',
          scbaSets: [
            { serialNumber: '', satisfactory: false, defective: false, comment: '' },
            { serialNumber: '', satisfactory: false, defective: false, comment: '' },
            { serialNumber: '', satisfactory: false, defective: false, comment: '' },
            { serialNumber: '', satisfactory: false, defective: false, comment: '' },
          ],
        };
      }

      return {
        name,
        status: null, // 'satisfactory' | 'defect' | 'na' | null
        serialNumber: '',
        comment: '',
      };
    });
    setTasks(initialTasks);
  }, []);

  // Check if all tasks have a status
  const allTasksComplete = tasks.length > 0 && tasks.every((task) => {
    // Special validation for SCBA (doesn't need main task status)
    if (task.name === 'SCBA') {
      // All 4 SCBA sets must have a status (satisfactory or defective)
      // If defective, must have a comment
      return task.scbaSets.every(set => {
        if (set.defective) {
          return set.comment.trim() !== '';
        }
        return set.satisfactory || set.defective;
      });
    }

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

  // Handle SCBA sets change
  const handleSCBAChange = (index, updatedSets) => {
    setTasks((prevTasks) => {
      const updatedTasks = [...prevTasks];
      updatedTasks[index] = {
        ...updatedTasks[index],
        scbaSets: updatedSets,
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

  // Handle Contact Fleet button click
  const handleContactFleet = () => {
    setIsContactFleetOpen(true);
  };

  // Handle Select All Satisfactory
  const handleSelectAllSatisfactory = () => {
    // Save current state for undo
    setPreviousTasks(JSON.parse(JSON.stringify(tasks)));

    setTasks((prevTasks) =>
      prevTasks.map((task) => {
        // For SCBA, mark all sets as satisfactory
        if (task.name === 'SCBA') {
          return {
            ...task,
            status: 'satisfactory',
            scbaSets: task.scbaSets.map((set) => ({
              ...set,
              satisfactory: true,
              defective: false,
            })),
          };
        }

        // For other tasks, just set status to satisfactory
        return {
          ...task,
          status: 'satisfactory',
          serialNumber: '',
          comment: '',
        };
      })
    );
  };

  // Handle Undo
  const handleUndo = () => {
    if (previousTasks) {
      setTasks(previousTasks);
      setPreviousTasks(null);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Header />

      <main className="max-w-4xl mx-auto p-4 pb-64">
        {/* Column Header with Select All */}
        <div className="bg-white border border-slate-200 rounded-md p-3 mb-2">
          <div className="flex items-center gap-4 text-sm">
            <div className="flex items-center gap-2 flex-1">
              <span className="font-medium text-slate-700">Task</span>
              {!previousTasks ? (
                <button
                  onClick={handleSelectAllSatisfactory}
                  className="text-xs px-2 py-1 bg-green-600 text-white rounded hover:bg-green-700 transition-colors font-medium"
                >
                  Satisfactory
                </button>
              ) : (
                <button
                  onClick={handleUndo}
                  className="text-xs px-2 py-1 bg-amber-600 text-white rounded hover:bg-amber-700 transition-colors font-medium"
                >
                  ↶ Undo
                </button>
              )}
            </div>
            <div className="flex items-center gap-4">
              <span className="text-slate-500 w-24 text-center">Satisfactory</span>
              <span className="text-slate-500 w-16 text-center">Defect</span>
              <span className="text-slate-500 w-12 text-center">N/A</span>
            </div>
          </div>
        </div>

        {/* Tasks List */}
        <div className="space-y-2">
          {tasks.map((task, index) => (
            <TaskCard
              key={task.name}
              task={task}
              isRotating={isRotatingTask(task.name)}
              onStatusChange={(newStatus) => handleStatusChange(index, newStatus)}
              onDefectDataChange={(field, value) => handleDefectDataChange(index, field, value)}
              onSCBAChange={(updatedSets) => handleSCBAChange(index, updatedSets)}
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

      <Footer
        allTasksComplete={allTasksComplete}
        onConfirm={handleConfirm}
        onContactFleet={handleContactFleet}
      />

      {/* Contact Fleet Modal */}
      <ContactFleetModal
        isOpen={isContactFleetOpen}
        onClose={() => setIsContactFleetOpen(false)}
      />
    </div>
  );
};

export default Dashboard;
