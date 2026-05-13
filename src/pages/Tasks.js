import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import "../styles/tasks.css";

function Tasks() {

  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem("tasks");
    return saved ? JSON.parse(saved) : [];
  });

  const [showModal, setShowModal] = useState(false);

  const [desc, setDesc] = useState("");
  const [date, setDate] = useState("");
  const [status, setStatus] = useState("Pending");

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  // Format date to DD-MM-YYYY
  const formatDate = (date) => {
    return new Date(date)
      .toLocaleDateString("en-GB" ,{
    day: "2-digit",
    month: "short",
    year: "numeric"
    });
  };

  const addTask = () => {

    if (!desc || !date) {
      alert("Fill all fields");
      return;
    }

    const newTask = {
      id: Date.now(),
      desc,
      date,
      status
    };

    setTasks([newTask, ...tasks]);

    setDesc("");
    setDate("");
    setStatus("Pending");

    setShowModal(false);
  };

  const toggleStatus = (id) => {

    const updated = tasks.map(task => {

      if (task.id === id) {
        return {
          ...task,
          status: task.status === "Pending" ? "Completed" : "Pending"
        };
      }

      return task;
    });

    setTasks(updated);
  };

  const deleteTask = (id) => {

    if (!window.confirm("Are you sure you want to delete this task?")) return;

    const updated = tasks.filter(task => task.id !== id);

    setTasks(updated);
  };

  const total = tasks.length;
  const completed = tasks.filter(t => t.status === "Completed").length;
  const pending = tasks.filter(t => t.status === "Pending").length;

  return (

    <div className="layout">

      <Sidebar />

      <main className="task-main">

        <header className="task-topbar">

          <h2>Tasks</h2>

          <button
            className="task-add-btn"
            onClick={() => setShowModal(true)}
          >
            Add Task
          </button>

        </header>

        {/* Stats */}

        <section className="task-stats">

          <div className="task-stat">
            <h3>{total}</h3>
            <p>Total Tasks</p>
          </div>

          <div className="task-stat">
            <h3>{completed}</h3>
            <p>Completed</p>
          </div>

          <div className="task-stat">
            <h3>{pending}</h3>
            <p>Pending</p>
          </div>

        </section>

        {/* Table */}

        <section className="task-table-box">

          <table>

            <thead>
              <tr>
                <th>Description</th>
                <th>Due Date</th>
                <th>Status</th>
                <th>Delete</th>
              </tr>
            </thead>

            <tbody>

              {tasks.length === 0 ? (

                <tr>
                  <td colSpan="4" style={{ textAlign: "center" }}>
                    No Tasks
                  </td>
                </tr>

              ) : (

                tasks.map(task => (

                  <tr key={task.id}>

                    <td>{task.desc}</td>

                    <td>Due: {formatDate(task.date)}</td>

                    <td>

                      <button
                        className={
                          task.status === "Completed"
                            ? "task-status-completed"
                            : "task-status"
                        }
                        onClick={() => toggleStatus(task.id)}
                      >
                        {task.status}
                      </button>

                    </td>

                    <td>

                      <button
                        className="task-delete-btn"
                        onClick={() => deleteTask(task.id)}
                      >
                        <i className="fa-regular fa-trash-can"></i>
                      </button>

                    </td>

                  </tr>

                ))

              )}

            </tbody>

          </table>

        </section>

      </main>

      {/* Modal */}

      {showModal && (

        <div className="task-modal">

          <div className="task-modal-box">

            <h3>Add Task</h3>

            <input
              type="text"
              placeholder="Description"
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
            />

            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />

            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value="Completed">Completed</option>
              <option value="Pending">Pending</option>
            </select>

            <div className="task-modal-actions">

              <button className="task-save" onClick={addTask}>
                Save
              </button>

              <button
                className="task-cancel"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>

            </div>

          </div>

        </div>

      )}

    </div>
  );
}

export default Tasks;