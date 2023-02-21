import styled from "styled-components";

export const Modal = styled.div`
  display: none;
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 10;

  &.show {
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

export const Form = styled.form`
  background-color: #fff;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
`;

export const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-top: 5px;

  label {
    text-align: left;
    margin-right: 10px;
    margin-top: 2px; /* Agregar un poco de margin-top */
  }

  input[type="text"],
  textarea {
    width: 100%;
    padding: 10px;
    font-size: 16px;
    border-radius: 5px;
    border: 1px solid #ccc;
    margin-top: 10px;
  }

  input[type="text"]:nth-of-type(2) {
    height: 80px;
  }

  textarea {
    height: 80px;
  }

  input[type="text"][name="expiration-date"],
  input[type="text"][name="assigned-to"],
  .modal input[type="text"][name="description"] {
    width: 100%;
    padding: 10px;
    margin-bottom: 20px;
    border: 1px solid #ccc;
    border-radius: 10px;
    font-size: 16px;
    margin-top: 10px;
  }

  .modal input[type="text"] {
    width: 100%;
    padding: 10px;
    margin-bottom: 20px;
    border: 1px solid #ccc;
    border-radius: 10px;
    font-size: 16px;
  }

  .modal input[type="text"][name="description"] {
    height: 150px;
  }
`;

export const Buttons = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 20px;

  button {
    padding: 10px 20px;
    border-radius: 10px;
    background-color: #fff;
    border: 1px solid #ccc;
    cursor: pointer;
  }

  button + button {
    margin-left: 10px;
  }
`;