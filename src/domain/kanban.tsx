import { SetStateAction, useState } from "react";
import CreateTaskModal from './createTaskModal';
import { Header, Boards, ButtonsContainer, AddColumnContainer, NewColumnNameInput, Board, Tasks, Task, TaskButtons, CreateButton, DeleteButton, KanbanContainer, TaskH4, TaskP, RightAlignedContainer, SearchLink, Title } from '../styles/kanban.style';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faTimes, faCheck  } from '@fortawesome/free-solid-svg-icons';
import { Button } from "@material-ui/core";

interface Task {
  id: number;
  name: string;
  description: string;
  dueDate: string;
  assignedTo: string;
}

const Kanban = () => {
  const [boards, setBoards] = useState([
    {
      name: "Pendiente",
      tasks: [
        { name: "Tarea 1", description: "Esta es la descripción de la tarea 1", checked: false, assignedTo: "Lola", dueDate: "2022-12-01", id: 1 },
        { name: "Tarea 2", description: "Esta es la descripción de la tarea 2", checked: false, assignedTo: "Carla", dueDate: "2022-11-30", id: 2},
      ],
    },
    {
      name: "En Progreso",
      tasks: [
        { name: "Tarea 3", description: "Esta es la descripción de la tarea 3", checked: false, assignedTo: "Lucas", dueDate: "2022-12-01", id: 3 },
      ],
    },
    {
      name: "Realizada",
      tasks: [
        { name: "Tarea 4", description: "Esta es la descripción de la tarea 4", checked: false, assignedTo: "Marco", dueDate: "2022-12-01", id: 4 },
        { name: "Tarea 5", description: "Esta es la descripción de la tarea 5", checked: false, assignedTo: "Nico", dueDate: "2022-12-01", id: 5 },
      ],
    },
  ]);

  const [showForm, setShowForm] = useState(false);
  const [newColumnName, setNewColumnName] = useState("");

  const addColumn = () => {
    const newColumn = {
      name: newColumnName,
      tasks: []
    };
    setBoards(boards => [...boards, newColumn]);
    setNewColumnName("");
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
    const boardIndex = boards.findIndex(board => board.tasks.some(task => task.id === id));
    if (boardIndex === -1) {
      return;
    }
    const taskIndex = boards[boardIndex].tasks.findIndex(task => task.id === id);
    setBoards(boards => {
      const updatedTasks = [...boards[boardIndex].tasks];
      updatedTasks[taskIndex] = { ...updatedTasks[taskIndex], checked: !updatedTasks[taskIndex].checked };
      return [
        ...boards.slice(0, boardIndex),
        { ...boards[boardIndex], tasks: updatedTasks },
        ...boards.slice(boardIndex + 1),
      ];
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

  const moveTask = (task: Task) => {
    setBoards(boards => {
      const inProgressIndex = boards.findIndex(board => board.name === "En Progreso");
      const doneIndex = boards.findIndex(board => board.name === "Realizada");
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
      const toDoBoardIndex = boards.findIndex(board => board.name === "Pendiente");
      if (toDoBoardIndex === -1) {
        return boards;
      }
      const inProgressBoardIndex = boards.findIndex(board => board.name === "En Progreso");
      if (inProgressBoardIndex === -1) {
        return boards;
      }
      const toDoBoard = boards[toDoBoardIndex];
      const inProgressBoard = boards[inProgressBoardIndex];
      const toDoTasks = toDoBoard.tasks.filter(task => !task.checked);
      const movedTasks = toDoBoard.tasks.filter(task => task.checked).map(task => ({...task, checked: false}));
      const updatedToDoBoard = {...toDoBoard, tasks: toDoTasks};
      const updatedInProgressBoard = {...inProgressBoard, tasks: [...inProgressBoard.tasks, ...movedTasks]};
      return [
        ...boards.slice(0, toDoBoardIndex),
        updatedToDoBoard,
        updatedInProgressBoard,
        ...boards.slice(inProgressBoardIndex + 1)
      ];
    });
  };  

  const moveTaskToPreviousColumn = (taskId: number) => {
    const boardIndex = boards.findIndex(board => board.tasks.some(task => task.id === taskId));
    const taskIndex = boards[boardIndex].tasks.findIndex(task => task.id === taskId);
    
    if (boardIndex > 0 && taskIndex >= 0) {
      const previousBoard = boards[boardIndex - 1];
      const taskToMove = boards[boardIndex].tasks[taskIndex];
      previousBoard.tasks.splice(previousBoard.tasks.length, 0, taskToMove);
      boards[boardIndex].tasks.splice(taskIndex, 1);
      setBoards([...boards]);
    }
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
            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
              <h3>{board.name}</h3>
              <button onClick={() => deleteColumn(board.name)} style={{border: 'none', backgroundColor: 'transparent', cursor: 'pointer'}}>
                <FontAwesomeIcon icon={faTimes} />
              </button>
            </div>
            <Tasks>
              {board.tasks.map((task, taskIndex) => (
                <Task key={taskIndex}>
                  <input
                    type="checkbox"
                    checked={task.checked}
                    onChange={() => toggleChecked(task.id)}
                  />
                  <TaskH4>{task.name}</TaskH4>
                  <TaskP>{task.description}</TaskP>
                  <TaskP><b>Asignado a:</b> {task.assignedTo}</TaskP>
                  <TaskP><b>Fecha de vencimiento:</b> {task.dueDate}</TaskP>
                  <TaskButtons>
                    {board.name === "Pendiente" && (
                      <button onClick={() => moveTaskToInProgress()}>En Progreso</button>
                    )}
                    {board.name === "En Progreso" && (
                      <>
                        <button onClick={() => moveTaskToPreviousColumn(task.id)}>
                          <FontAwesomeIcon icon={faChevronLeft} />
                        </button>
                        <button onClick={() => moveTask(task)}>Realizada</button>
                      </>
                    )}
                    {board.name === "Realizada" && (
                      <>
                        <button onClick={() => moveTaskToPreviousColumn(task.id)}>
                          <FontAwesomeIcon icon={faChevronLeft} />
                        </button>
                      </>
                    )}
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
          onSubmit={(name, description, dueDate, assignedTo) => addTask(name, description, dueDate, assignedTo)} tasks={[]}      />
      )}
      <ButtonsContainer>
        <CreateButton onClick={() => setShowForm(!showForm)}>Crear tarea</CreateButton>
        <DeleteButton onClick={deleteChecked}>Borrar tarea</DeleteButton>
      </ButtonsContainer>
    </KanbanContainer>
  );
}

export default Kanban;