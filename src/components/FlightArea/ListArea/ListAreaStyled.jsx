import styled, { keyframes } from 'styled-components';
import media from '../../../libs/MediaQuery';

export const ListLayout = styled.section`
  flex-basis: 80vw;
  min-height: 100vh;
  background: #fff;
  padding: 20px 4% 20px 20px;
`;

// Flight Category Tab
export const CategoryTab = styled.ul``;

export const FlightList = styled.ul``;

// Flight 리스트
export const FlightItem = styled.li`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  align-items: center;
  border: 1px solid #e5e5e5;
  border-radius: 10px;
  transition: all 0.3s;

  &:hover {
    box-shadow: 0 0 10px 5px #eee;
  }

  & + & {
    margin-top: 20px;
  }

  ${media.desktop`
    flex-direction: row;
    padding: 20px 0;
  `}
`;

export const FlightInfo = styled.div`
  width: 100%;
  padding: 30px 40px;

  ${media.desktop`
    padding: 20px 40px;
    border-right: 1px solid #ededed;
  `}
`;

export const FlightOutbound = styled.div`
  display: flex;
  flex-direction: column;

  & + & {
    margin: 30px 0 0;
    padding: 30px 0 0;
    border-top: 1px dotted #ccc;
  }

  ${media.desktop`
    flex-direction: row;
  `}
`;

export const FlightInbound = styled.div`
  display: flex;
  margin-top: 10px;
`;

export const AirlineInfo = styled.div`
  display: flex;
  align-items: center;
  flex-basis: 20%;

  ${media.desktop`
    margin: 0 40px 0 0;
  `}

  img {
    display: inline-block;
    width: auto;
    height: 30px;
    margin: 0 20px 0 0;
  }

  span {
    display: inline-block;
    font-size: 1.4rem;
  }
`;

export const FlyInfo = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin: 30px 0 0;

  ${media.desktop`
    margin: 0;
  `}
`;

export const DepartureInfo = styled.div`
  text-align: right;
`;

export const DepartureTime = styled.p`
  font-size: 1.8rem;
  font-weight: 600;
`;

export const DeparturePlace = styled.p`
  font-size: 1.5rem;
  margin: 5px 0 0;
`;

const fly = keyframes`
  to {
    transform: translateX(40px);
  }
  from {
    transform: translateX(-49px);
  }
`;

export const FlightTimeInfo = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  margin: 0 20px;
  font-size: 1.2rem;
  text-align: center;
`;

export const ImgOuter = styled.div`
  overflow: hidden;
  padding: 0 12px;

  img {
    width: auto;
    height: 32px;
    animation: ${fly} 3s infinite ease-in-out;
  }
`;

export const TimeContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  margin: 0 10px 0 0;
`;

export const StopsInfo = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  min-width: 100px;
  height: 3px;
  margin: 10px 0;
  border-radius: 5px;
  background: #68697f;

  i {
    position: relative;
    top: -1px;
    width: 5px;
    height: 5px;
    border-radius: 50%;
    margin: 0 5px;
    background: red;
    box-shadow: 0 0 0 0.3rem #fff;
  }
`;

export const ArriveInfo = styled.div`
  font-size: 1.8rem;
  text-align: left;
`;

export const ArriveTime = styled.p`
  font-weight: 600;
  font-size: 1.8rem;
`;

export const ArrivePlace = styled.p`
  margin: 5px 0 0;
  font-size: 1.5rem;
`;

export const FlightPrice = styled.div`
  width: 100%;
  padding: 20px 40px;
  border-top: 1px solid #ccc;
  text-align: center;

  p {
    margin-bottom: 10px;
    font-size: 1.4rem;
  }

  em {
    display: block;
    margin-bottom: 10px;
    font-weight: 700;
    font-size: 2.2rem;
  }

  ${media.desktop`
    width: 40%;
    border-top: none;
  `}
`;
