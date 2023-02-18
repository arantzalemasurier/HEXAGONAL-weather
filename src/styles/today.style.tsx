import styled from 'styled-components';

const Main = styled.div`
  display: flex;
  padding: 5px;
`;

const Left = styled.div`
  width:50%
`;

const Right = styled.div`
  width:50%;
  text-align: right;
`;

const Bottom = styled.div`
  text-align: left;
`;

const WeatherIcon = styled.img`
  width: 90px;
  height: 90px;
`;

const UnitIcon = styled.img`
  width: 22px;
  height: 22px;
  margin: 0 4px 0 20px;
`;

const UnitIcon1 = styled(UnitIcon)`
  font-size: 15px;
`;

export { Main, Left, Right, Bottom, WeatherIcon, UnitIcon, UnitIcon1 };
