import React from 'react';
import { LinearProgress } from '@material-ui/core';
import uuid from 'uuid';
import * as S from './ListAreaStyled';
import FlightItem from './FlightItem';
import A11yTitle from '../../Common/A11yTitle';
import InfiniteScroller from 'react-infinite-scroller';

const ListArea = ({
  datas,
  progress,
  setFilterModalVisible,
  getLiveSearch,
  pageIndex,
}) => {
  const openFilterArea = () => {
    setFilterModalVisible(true);
  };

  return (
    <S.ListLayout>
      <A11yTitle>항공권 검색 결과</A11yTitle>
      <LinearProgress variant="determinate" value={progress} />
      <S.FilterButton onClick={openFilterArea}>필터(조건)</S.FilterButton>
      <S.CategoryTab>
        <li>
          <button>최저가</button>
        </li>
        <li>
          <button>최단여행시간</button>
        </li>
        <li>
          <button>추천순</button>
        </li>
      </S.CategoryTab>
      <S.FlightList>
        <InfiniteScroller
          loadMore={() => getLiveSearch()}
          hasMore={!!pageIndex}
          loader={<div key={uuid.v4()}> loading....</div>}
        >
          {datas && datas.map(data => <FlightItem key={uuid.v4()} {...data} />)}
          {!datas && '해당하는 결과가 없습니다.'}
        </InfiniteScroller>
      </S.FlightList>
    </S.ListLayout>
  );
};

export default ListArea;
