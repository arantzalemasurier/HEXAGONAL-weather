
import styled from 'styled-components';

const Root = styled.div`
  margin-top: 20px;
  margin-bottom: 20px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
`;

const ImageList = styled.ul`
  display: flex;
  flex-wrap: wrap;
  align-content: center;
`;

const ImageListItem = styled.li`
  width: 50%;
  text-align: center;
  border: 1px groove;
  min-width: 185px;
  list-style: none;
`;

const WeatherIcon = styled.img`
  width: 62px;
  height: 62px;
  transform: translateY(0%);
`;

const Info = styled.p`
  font-size: 17px;
  font-weight: bold;
`;

const Title = styled.p`
  text-align: center;
  font-size: 17px;
  font-weight: bold;
`;

const Subtitle = styled.p`
  padding-bottom: 10px;
  font-size: 18px;
  font-weight: inherit;
`;

export { Root, ImageList, ImageListItem, WeatherIcon, Info, Title, Subtitle };
