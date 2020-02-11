import React from 'react';
import SelectWayTab from './SelectWayTab';
import SelectAirport from './SelectAirport';
import SelectDate from './SelectDate';
import SelectOption from './SelectOption';
import CheckBox from '../Common/CheckBox';
import * as S from './SearchAreaStyled';
import Button from '../Common/Button';
import SearchAreaPopup from './SearchAreaPopup';

const SearchArea = () => {
  const [way, setWay] = React.useState('왕복');
  return (
    <S.SearchWrapper>
      <S.Greeting>어디로 떠나볼까요?</S.Greeting>
      <S.SearchForm>
        <SelectWayTab way={way} setWay={setWay} />
        <S.SearchTop>
          <SelectAirport />
          <SelectDate way={way} />
          <SelectOption />
        </S.SearchTop>
        <S.SearchBottom>
          <CheckBox label="직항" id="nonstop" isDisable={false} />
          <Button text="항공권 검색" size="medium" color="blue" image="plane" />
        </S.SearchBottom>
      </S.SearchForm>
      <SearchAreaPopup />
    </S.SearchWrapper>
  );
};

export default SearchArea;
