import { SetStateAction, useState } from "react";
import CreateTaskModal from './createTaskModal';
import { Header, Boards, ButtonsContainer, AddColumnContainer, NewColumnNameInput, Board, Tasks, Task, TaskButtons, CreateButton, DeleteButton, KanbanContainer, TaskH4, TaskP, RightAlignedContainer, SearchLink, Title } from '../styles/kanban.style';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faTimes, faCheck, faChevronRight  } from '@fortawesome/free-solid-svg-icons';
import { Button } from "@material-ui/core";

interface Task {
  id: number;
  name: string;
  description: string;
  dueDate: string;
  assignedTo: string;
  checked: boolean;
}

interface Board {
  id: number;
  name: string;
  tasks: Task[];
}

const Kanban = () => {
  const [boards, setBoards] = useState<Board[]>([
    {
      id: 1,
      name: "Pendiente",
      tasks: [
        { name: "Tarea 1", description: "Esta es la descripción de la tarea 1", checked: false, assignedTo: "Lola", dueDate: "2022-12-01", id: 1 },
        { name: "Tarea 2", description: "Esta es la descripción de la tarea 2", checked: false, assignedTo: "Carla", dueDate: "2022-11-30", id: 2},
      ],
    },
    {
      id: 2,
      name: "En Progreso",
      tasks: [
        { name: "Tarea 3", description: "Esta es la descripción de la tarea 3", checked: false, assignedTo: "Lucas", dueDate: "2022-12-01", id: 3 },
      ],
    },
    {
      id: 3,
      name: "Realizada",
      tasks: [
        { name: "Tarea 4", description: "Esta es la descripción de la tarea 4", checked: false, assignedTo: "Marco", dueDate: "2022-12-01", id: 4 },
        { name: "Tarea 5", description: "Esta es la descripción de la tarea 5", checked: false, assignedTo: "Nico", dueDate: "2022-12-01", id: 5 },
      ],
    },
  ]);

  const [showForm, setShowForm] = useState(false);
  const [newColumnName, setNewColumnName] = useState("");

  
  const newId = Math.max(...boards.map(board => board.id)) + 1;
  const addColumn = () => {
    const newColumn = {
      id: newId,
      name: newColumnName,
      tasks: []
    };
    setNewColumnName("");
    setBoards(boards => [...boards, newColumn]);
  };

  const handleNewColumnNameChange = (event: { target: { value: SetStateAction<string>; }; }) => {
    setNewColumnName(event.target.value);
  };

  const deleteColumn = (columnName: string) => {
    setBoards((boards) => {
      const index = boards.findIndex((board) => board.name === columnName);
      if (index === -1) {
        return boards;
      }
      return [...boards.slice(0, index), ...boards.slice(index + 1)];
    });
  };

  const moveColumn = (direction: "left" | "right", columnName: string) => {
    setBoards((prevBoards) => {
      const index = prevBoards.findIndex((board) => board.name === columnName);
      if (index === -1) {
        // Columna no encontrada
        return prevBoards;
      }

      if (direction === "left" && index > 0) {
        const newBoards = [...prevBoards];
        const column = newBoards.splice(index, 1)[0];
        newBoards.splice(index - 1, 0, column);
        return newBoards;
      }

      if (direction === "right" && index < prevBoards.length - 1) {
        const newBoards = [...prevBoards];
        const column = newBoards.splice(index, 1)[0];
        newBoards.splice(index + 1, 0, column);
        return newBoards;
      }

      return prevBoards;
    });
  };

  const getLastId = () => {
    let lastId = 0;
    boards.forEach(board => {
      board.tasks.forEach(task => {
        if (task.id > lastId) {
          lastId = task.id;
        }
      });
    });
    return lastId;
  };

  const addTask = (name: string, description: string, dueDate: string, assignedTo: string) => {
    const lastId = getLastId();
    const newTask = {
      name: `Tarea ${lastId + 1}`,
      description,
      checked: false,
      assignedTo: "Nadie",
      dueDate: "Ninguna",
      id: lastId + 1,
    };
    setBoards((boards) => {
      return [
        {
          ...boards[0],
          tasks: [
            ...boards[0].tasks,
            {
              id: newTask.id,
              name: newTask.name,
              description: newTask.description, // Coma en lugar de puntos suspensivos
              checked: newTask.checked,
              assignedTo: newTask.assignedTo,
              dueDate: newTask.dueDate,
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
    setBoards((prevBoards) => {
      const boardIndex = prevBoards.findIndex((board) =>
        board.tasks.findIndex((task) => task.id === id) !== -1
      );
      if (boardIndex === -1) {
        return prevBoards;
      }
      const taskIndex = prevBoards[boardIndex].tasks.findIndex(
        (task) => task.id === id
      );
      const newBoards = [...prevBoards];
      newBoards[boardIndex] = {
        ...newBoards[boardIndex],
        tasks: [
          ...newBoards[boardIndex].tasks.slice(0, taskIndex),
          {
            ...newBoards[boardIndex].tasks[taskIndex],
            checked: !newBoards[boardIndex].tasks[taskIndex].checked,
          },
          ...newBoards[boardIndex].tasks.slice(taskIndex + 1),
        ],
      };
      return newBoards;
    });
  };  
  
  const deleteChecked = () => {
    setBoards((boards) =>
      boards.map((board) => {
        const tasks = board.tasks.filter((task) => !task.checked);
        return { ...board, tasks };
      })
    );
  };

  const moveTask = (direction: "left" | "right", task: Task, destinationTaskIndex: number): void => {
    setBoards((boards: Board[]): Board[] => {
      const currentColumnIndex: number = boards.findIndex((board: Board) => board.tasks.includes(task));
    
      if (currentColumnIndex === -1) {
        return boards;
      }
    
      const targetColumnIndex: number = direction === "left" ? currentColumnIndex - 1 : currentColumnIndex + 1;
    
      if (targetColumnIndex < 0 || targetColumnIndex >= boards.length) {
        return boards;
      }
    
      const currentColumnTasks: Task[] = [...boards[currentColumnIndex].tasks];
      const taskIndex: number = currentColumnTasks.findIndex((bTask: Task) => isEqual(bTask, task));
    
      if (taskIndex === -1) {
        return boards;
      }
    
      const targetColumnTasks: Task[] = [...boards[targetColumnIndex].tasks];
      targetColumnTasks.splice(destinationTaskIndex, 0, {...task, checked: false});
    
      currentColumnTasks.splice(taskIndex, 1);
    
      const newBoards: Board[] = [...boards];
      newBoards[currentColumnIndex] = {...boards[currentColumnIndex], tasks: currentColumnTasks};
      newBoards[targetColumnIndex] = {...boards[targetColumnIndex], tasks: targetColumnTasks};
    
      return newBoards;
    });
  };

return (
  <KanbanContainer>
    <Header>
      <Title>TABLERO KANBAN</Title>
      <RightAlignedContainer>
        <SearchLink to="/">Volver</SearchLink>
      </RightAlignedContainer>
    </Header>
    <AddColumnContainer>
      <NewColumnNameInput
        type="text"
        placeholder=" Ingresa una nueva columna"
        value={newColumnName}
        onChange={handleNewColumnNameChange}
      />
      <Button onClick={addColumn}>
        <FontAwesomeIcon icon={faCheck} />
      </Button>
    </AddColumnContainer>
    <Boards>
      {boards.map((board, index) => (
        <Board key={index}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <h3>{board.name}</h3>
            <div>
              {index > 0 && (
                <button
                  onClick={() => moveColumn("left", board.name)}
                  style={{
                    border: "none",
                    backgroundColor: "transparent",
                    cursor: "pointer",
                  }}
                >
                  <FontAwesomeIcon icon={faChevronLeft} />
                </button>
              )}
              {index < boards.length - 1 && (
                <button
                  onClick={() => moveColumn("right", board.name)}
                  style={{
                    border: "none",
                    backgroundColor: "transparent",
                    cursor: "pointer",
                  }}
                >
                  <FontAwesomeIcon icon={faChevronRight} />
                </button>
              )}
              <button
                onClick={() => deleteColumn(board.name)}
                style={{
                  border: "none",
                  backgroundColor: "transparent",
                  cursor: "pointer",
                }}
              >
                <FontAwesomeIcon icon={faTimes} />
              </button>
            </div>
          </div>
          <Tasks>
            {board.tasks.map((task, taskIndex) => (
          <Task key={task.id}>
          <input
            type="checkbox"
            checked={task.checked}
            onChange={() => toggleChecked(task.id)}
          />
          <TaskH4>{task.name}</TaskH4>
          <TaskP>{task.description}</TaskP>
          <TaskP>
            <b>Asignado a:</b> {task.assignedTo}
          </TaskP>
          <TaskP>
            <b>Fecha de vencimiento:</b> {task.dueDate}
          </TaskP>
          <TaskButtons
            style={{
            display: "flex",
            justifyContent: "flex-start",
            }}
          >
            <button onClick={() => moveTask("left", task, taskIndex - 1)}>
              <FontAwesomeIcon icon={faChevronLeft} />
            </button>
            <button onClick={() => moveTask("right", task, taskIndex - 1)}>
              <FontAwesomeIcon icon={faChevronRight} />
            </button>
          </TaskButtons>
        </Task>
        ))}
        </Tasks>
        </Board>
        ))}
        </Boards>
          {showForm && (
          <CreateTaskModal
            show={showForm}
            onClose={() => setShowForm(false)}
            onSubmit={(name, description, dueDate, assignedTo) =>
            addTask(name, description, dueDate, assignedTo)
            }
            tasks={[]}
          />
          )}
      <ButtonsContainer>
        <CreateButton onClick={() => setShowForm(!showForm)}>Crear tarea</CreateButton>
        <DeleteButton onClick={deleteChecked}>Borrar tarea</DeleteButton>
      </ButtonsContainer>
    </KanbanContainer>
  );
}

export default Kanban;