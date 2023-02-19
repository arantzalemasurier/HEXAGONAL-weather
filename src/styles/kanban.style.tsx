import styled from 'styled-components';

export const KanbanContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

export const Header = styled.div`
  background-color: rgba(128, 128, 128, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px;
  margin-top: 20px;
  margin-bottom: 20px;
`;

export const Boards = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const ButtonsContainer = styled.div`
  position: fixed;
  bottom: 20px;
  right: 20px;
  display: flex;
`;

export const Board = styled.div`
  width: 33%;
  padding: 20px;
  background-color: rgba(226, 228, 230, 0.5);
  border-radius: 10px;
`;

export const Tasks = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 20px;
`;

export const Task = styled.div`
  background-color: #fff;
  padding: 10px;
  border-radius: 10px;
  margin-bottom: 20px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
`;

export const TaskButtons = styled.div`
  margin-top: 20px;
  display: flex;
  justify-content: space-between;
`;

export const CreateTaskButton = styled.button`
  background-color: green;
  color: #fff;
  padding: 10px 20px;
  border-radius: 5px;
  border: none;
  font-size: 16px;
  font-weight: bold;
  margin-top: 20px;
`;

export const CreateButton = styled.button`
  background-color: #81C784;
  color: #FFFFFF;
  border: none;
  border-radius: 5px;
  padding: 10px 15px;
  text-align: center;
  font-size: 16px;
  cursor: pointer;
`;

export const DeleteButton = styled.button`
  background-color: #E57373;
  color: #FFFFFF;
  border: none;
  border-radius: 5px;
  padding: 10px 15px;
  text-align: center;
  font-size: 16px;
  cursor: pointer;
`;

export const TaskH4 = styled.h4`
  margin-bottom: 8px;
`;

export const TaskP = styled.p`
  margin: 0;
`;