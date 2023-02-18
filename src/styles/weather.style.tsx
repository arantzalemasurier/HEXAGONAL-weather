import styled from "styled-components";

const Root = styled.div`
  display: flex;
  flex-grow: 1;
  margin-top: 60px;
  padding: 15px;
`;

const WeatherCard = styled.div`
  padding: 20px;
  height: 100%;
  padding-top: 5px;
  background-color: rgba(5, 4, 2, 0.1);
`;

export { Root, WeatherCard };
