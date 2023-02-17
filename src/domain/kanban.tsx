import { useState } from "react";
import "./kanban.css";
import CreateTaskModal from './createTaskModal';

interface Task {
  name: string;
  description: string;
  checked: boolean;
  assignedTo: string;
  dueDate: string;
  id: number;
}

const Kanban = () => {
  const [boards, setBoards] = useState([
    {
      name: "To Do",
      tasks: [
        { name: "Tarea 1", description: "Esta es la descripción de la tarea 1", checked: false, assignedTo: "Juan", dueDate: "2022-12-01", id: 1 },
        { name: "Tarea 2", description: "Esta es la descripción de la tarea 2", checked: false, assignedTo: "Maria", dueDate: "2022-11-30", id: 2},
      ],
    },
    {
      name: "In Progress",
      tasks: [
        { name: "Tarea 3", description: "Esta es la descripción de la tarea 3", checked: false, assignedTo: "Juan", dueDate: "2022-12-01", id: 3 },
      ],
    },
    {
      name: "Done",
      tasks: [
        { name: "Tarea 4", description: "Esta es la descripción de la tarea 4", checked: false, assignedTo: "Juan", dueDate: "2022-12-01", id: 4 },
        { name: "Tarea 5", description: "Esta es la descripción de la tarea 5", checked: false, assignedTo: "Juan", dueDate: "2022-12-01", id: 5 },
      ],
    },
  ]);

  const [showForm, setShowForm] = useState(false);

  const addTask = (name: string, description: string, dueDate: string, assignedTo: string) => {
    const newTask = {
      name,
      description,
      checked: false,
      assignedTo: "Nadie",
      dueDate: "Ninguna",
      id: boards[0].tasks.length + 1
    };
    setBoards(boards => {
      return [
        {
          ...boards[0],
          tasks: [
            ...boards[0].tasks,
            {
              id: newTask.id,
              name,
              description,
              checked: false,
              dueDate,
              assignedTo,
            },
          ],
        },
        ...boards.slice(1),
      ];
    });
  };

  

  const isEqual = (a: Task, b: Task) => {
    return a.id === b.id;
  };
  
  
  const toggleChecked = (id: number) => {
    setBoards(
      boards.map(board => ({
        ...board,
        tasks: board.tasks.map(task =>
          task.id === id ? { ...task, checked: !task.checked } : task
        )
      }))
    );
  };


  const deleteChecked = () => {
    setBoards((boards) =>
      boards.map((board) => {
        const tasks = board.tasks.filter((task, taskIndex) => !task.checked);
        return { ...board, tasks };
      })
    );
  };

  const moveTask = (task: Task) => {
    setBoards(boards => {
      const inProgressIndex = boards.findIndex(board => board.name === "In Progress");
      const doneIndex = boards.findIndex(board => board.name === "Done");
      const inProgressTasks = [...boards[inProgressIndex].tasks];
      const taskIndex = inProgressTasks.findIndex(bTask => isEqual(bTask, task));
  
      if (taskIndex === -1) {
        return boards;
      }
  
      inProgressTasks.splice(taskIndex, 1);
      const doneTasks = [...boards[doneIndex].tasks, {...task, checked: false}];
      const updatedInProgress = { ...boards[inProgressIndex], tasks: inProgressTasks };
      const updatedDone = { ...boards[doneIndex], tasks: doneTasks };
  
      return boards
        .slice(0, inProgressIndex)
        .concat([updatedInProgress])
        .concat(boards.slice(inProgressIndex + 1, doneIndex))
        .concat([updatedDone])
        .concat(boards.slice(doneIndex + 1));
    });
  };

const moveTaskToInProgress = () => {
  setBoards(boards => {
    const toDoBoard = boards.find(board => board.name === "To Do");
    if (!toDoBoard) {
      return boards;
    }
    const inProgressBoard = boards.find(board => board.name === "In Progress");
    if (!inProgressBoard) {
      return boards;
    }
    const toDoTasks = toDoBoard.tasks.filter(task => !task.checked);
    const movedTasks = toDoBoard.tasks.filter(task => task.checked).map(task => ({...task, checked: false}));
    return boards.map(board => {
      if (board === toDoBoard) {
        return { ...board, tasks: toDoTasks };
      }
      if (board === inProgressBoard) {
        return { ...board, tasks: [...board.tasks, ...movedTasks] };
      }
      return board;
    });
  });
};
  
return (
  <div className="kanban-container">
    <div className="header">
      <h2>TABLERO KANBAN</h2>
    </div>
    <div className="boards">
      {boards.map((board, index) => (
        <div className="board" key={index}>
          <h3>{board.name}</h3>
          <div className="tasks">
            {board.tasks.map((task, taskIndex) => (
              <div className="task" key={taskIndex}>
              <input
                type="checkbox"
                checked={task.checked}
                onChange={() => toggleChecked(task.id)}
              />
              <h4>{task.name}</h4>
              <p>{task.description}</p>
              <p><b>Asignado a:</b> {task.assignedTo}</p>
              <p><b>Fecha de vencimiento:</b> {task.dueDate}</p>
              <div className="task-buttons">
              {board.name === "To Do" && (
                <button onClick={() => moveTaskToInProgress()}>En Progreso</button>
              )}
              {board.name === "In Progress" && (
                <button onClick={() => moveTask(task)}>Realizada</button>
              )}
            </div>
            </div>
            ))}
          </div>
        </div>
      ))}
    </div>
    {showForm && (
      <CreateTaskModal 
      show={showForm} 
      onClose={() => setShowForm(false)} 
      onSubmit={(name, description, dueDate, assignedTo) => addTask(name, description, dueDate, assignedTo)} 
      />
  )}
    <div className="buttons-container">
      <button className="create-button" onClick={() => setShowForm(!showForm)}>Crear tarea</button>
      <button className="delete-button" onClick={deleteChecked}>Borrar tarea</button>
    </div>
  </div>
);
}

export default Kanban;