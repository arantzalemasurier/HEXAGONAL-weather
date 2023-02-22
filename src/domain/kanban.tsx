import { Dispatch, SetStateAction, useState } from "react";
import CreateTaskModal from './createTaskModal';
import { Header, Boards, ButtonsContainer, AddColumnContainer, NewColumnNameInput, Board, Tasks, Task, TaskButtons, CreateButton, DeleteButton, KanbanContainer, TaskH4, TaskP, RightAlignedContainer, SearchLink, Title } from '../styles/kanban.style';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faTimes, faCheck, faChevronRight  } from '@fortawesome/free-solid-svg-icons';
import { Button } from "@material-ui/core";
import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd';


interface Task {
  id: number;
  name: string;
  description: string;
  dueDate: string;
  assignedTo: string;
  checked: boolean;
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

const moveTask = (direction: string, task: Task) => {
  setBoards(boards => {
    const columnIndex = boards.findIndex(board => board.tasks.includes(task));

    if (columnIndex === -1) {
      return boards;
    }

    const taskIndex = boards[columnIndex].tasks.findIndex(bTask => isEqual(bTask, task));
    const targetIndex = direction === "left" ? columnIndex - 1 : columnIndex + 1;

    if (targetIndex < 0 || targetIndex >= boards.length) {
      return boards;
    }

    const newTasks = [...boards[targetIndex].tasks, {...task, checked: false}];
    const updatedTargetColumn = {...boards[targetIndex], tasks: newTasks};
    const newColumnTasks = [...boards[columnIndex].tasks.slice(0, taskIndex), ...boards[columnIndex].tasks.slice(taskIndex + 1)];
    const updatedColumn = {...boards[columnIndex], tasks: newColumnTasks};
    const newBoards = boards.map((board, index) => {
      if (index === columnIndex) {
        return updatedColumn;
      } else if (index === targetIndex) {
        return updatedTargetColumn;
      } else {
        return board;
      }
    });

    return newBoards;
  });
};
interface Board {
  id: number;
  name: string;
  tasks: Task[];
}

const handleOnDragEnd = (result: DropResult, boards: Board[], setBoards: Dispatch<SetStateAction<Board[]>>, board: Board) => {
  const { source, destination } = result;

  // dropped outside the list
  if (!destination) {
    return;
  }

  const sourceBoardIndex = Number(source.droppableId);
  const destinationBoardIndex = Number(destination.droppableId);
  const sourceTaskIndex = source.index;
  const destinationTaskIndex = destination.index;

  // Move within the same list
  if (sourceBoardIndex === destinationBoardIndex) {
    setBoards((prevBoards) => {
      const newBoards = [...prevBoards];
      const tasks = [...newBoards[sourceBoardIndex].tasks];
      const [removed] = tasks.splice(sourceTaskIndex, 1);
      tasks.splice(destinationTaskIndex, 0, removed);
      newBoards[sourceBoardIndex].tasks = tasks;
      return newBoards;
    });
  } else {
    // Move between lists
    setBoards((prevBoards) => {
      const newBoards = [...prevBoards];
      const sourceTasks = [...newBoards[sourceBoardIndex].tasks];
      const [removed] = sourceTasks.splice(sourceTaskIndex, 1);
      const destinationTasks = [...newBoards[destinationBoardIndex].tasks];
      destinationTasks.splice(destinationTaskIndex, 0, removed);
      newBoards[sourceBoardIndex].tasks = sourceTasks;
      newBoards[destinationBoardIndex].tasks = destinationTasks;
      return newBoards;
    });

    // Add task to the destination column
    const task = boards[sourceBoardIndex].tasks[sourceTaskIndex];
    const newId = getLastId() + 1;
    setBoards((prevBoards) => {
      const newBoards = [...prevBoards];
      const destinationTasks = [...newBoards[destinationBoardIndex].tasks];
      destinationTasks.splice(destinationTaskIndex, 0, {
        ...task,
        id: newId,
      });
      newBoards[destinationBoardIndex].tasks = destinationTasks;
      return newBoards;
    });
  }
};

const handleOnDragEndWrapper = (result: DropResult, boards: Board[], setBoards: Dispatch<SetStateAction<Board[]>>, board: Board) => (event: Event) => {
  handleOnDragEnd(result, boards, setBoards, board);
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
          <DragDropContext onDragEnd={(result) => handleOnDragEndWrapper(result, boards, setBoards, board)}>
            <Droppable droppableId={board.name}>
              {(provided) => (
                <div {...provided.droppableProps} ref={provided.innerRef}>
                  {board.tasks.map((task, taskIndex) => (
                    <Draggable key={task.id} draggableId={`${task.id}`} index={taskIndex}>
                      {(provided) => (
                        <Task ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
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
                            <button onClick={() => moveTask("left", task)}>
                              <FontAwesomeIcon icon={faChevronLeft} />
                            </button>
                            <button onClick={() => moveTask("right", task)}>
                              <FontAwesomeIcon icon={faChevronRight} />
                            </button>
                          </TaskButtons>
                        </Task>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>

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