import React from "react";
import "./modal.css";

interface Task {
  id: number;
  name: string;
  description: string;
  dueDate: string;
  assignedTo: string;
}

interface Props {
  show: boolean;
  onClose: () => void;
  onSubmit: (
    name: string,
    description: string,
    dueDate: string,
    assignedTo: string
  ) => void;
  tasks: Task[];
}

const CreateTaskModal: React.FC<Props> = ({ show, onClose, onSubmit, tasks }) => {
  //const [ setName] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [dueDate, setDueDate] = React.useState("");
  const [assignedTo, setAssignedTo] = React.useState("");
  const taskId = tasks.length + 1;

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const taskName = `Tarea ${taskId}`;
    onSubmit(taskName, description, dueDate, assignedTo);
    onClose();
    //setName("");
  };

  return (
    <div className={`modal ${show ? "show" : ""}`}>
      <form onSubmit={handleSubmit}>
        <div className="input-container">
          <label>ID:</label>
          <input type="text" readOnly value="" />
        </div>
        <div className="input-container">
          <label>Descripción:</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={10}
          />
        </div>
        <div className="input-container">
          <label>Asignado a:</label>
          <input
            type="text"
            value={assignedTo}
            onChange={(e) => setAssignedTo(e.target.value)}
          />
        </div>
        <div className="input-container">
          <label>Fecha de Vencimiento:</label>
          <input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
          />
        </div>
        <div className="buttons">
          <button onClick={onClose}>Cancelar</button>
          <button type="submit">Agregar tarea</button>
        </div>
      </form>
    </div>
  );
};

export default CreateTaskModal;
