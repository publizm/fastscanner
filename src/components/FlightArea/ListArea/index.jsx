import React, { useState, useCallback, useEffect } from 'react';
import uuid from 'uuid';
import FlightItem from './FlightItem';
import A11yTitle from '../../Common/A11yTitle';
import Loader from './Loader';
import * as S from './ListAreaStyled';
import InfiniteScroller from 'react-infinite-scroller';
import Loading from './Loading';
import CircularProgress from '@material-ui/core/CircularProgress';
import { useSelector } from 'react-redux';
import Updating from './Updating';

const loaderRender = (() => {
  const loaderGroup = [];
  for (let i = 0; i < 5; i++) {
    loaderGroup.push(<Loader key={uuid.v4()} />);
  }

  return loaderGroup;
})();

const ListArea = React.memo(
  ({
    progress,
    setFilterModalVisible,
    filterDatas,
    renderDatas,
    pageIndex,
    loading,
    setSortDatas,
    renderLiveSearch,
    filterLiveSearch,
    filterUpdate,
  }) => {
    const [isActive, setActive] = useState('price');
    const [priceAverage, setPriceAverage] = useState();
    const [durationAverage, setDurationAverage] = useState();
    const [currentDatas, setCurrentDatas] = useState();
    const originDatas = useSelector(state => state.flight.originDatas);

    const openFilterArea = useCallback(() => {
      setFilterModalVisible(true);
    }, [setFilterModalVisible]);

    const changeCategory = e => {
      e.stopPropagation();

      if (e.target.parentNode.id === 'price' || e.target.id === 'price') {
        if (filterDatas) {
          // setCurrentDatas(
          //   filterDatas.sort((pre, cur) => pre.price - cur.price),
          // );
          const _data = filterDatas.sort((pre, cur) => pre.price - cur.price);
          setSortDatas(_data);
          filterLiveSearch();
        }
      }

      if (e.target.parentNode.id === 'duration' || e.target.id === 'duration') {
        if (filterDatas) {
          // setCurrentDatas(
          //   filterDatas.sort(
          //     (pre, cur) =>
          //       pre.Outbound.Duration +
          //       (pre.Inbound ? pre.Inbound.Duration : 0) -
          //       (cur.Outbound.Duration +
          //         (cur.Inbound ? cur.Inbound.Duration : 0)),
          //   ),
          // );
          const _data = filterDatas.sort(
            (pre, cur) =>
              pre.Outbound.Duration +
              (pre.Inbound ? pre.Inbound.Duration : 0) -
              (cur.Outbound.Duration +
                (cur.Inbound ? cur.Inbound.Duration : 0)),
          );
          setSortDatas(_data);
          filterLiveSearch();
        }
      }

      if (e.target.parentNode.id === 'recommend' || e.target.id === 'recommend')
        return alert('준비중입니다.');

      setActive(e.target.parentNode.id || e.target.id);
    };

    console.log(currentDatas);

    useEffect(() => {
      if (filterDatas) setSortDatas(filterDatas);
    }, [filterDatas, setSortDatas]);

    useEffect(() => {
      const regExp = /\B(?=(\d{3})+(?!\d))/g;

      if (filterDatas) {
        const minDuration =
          filterDatas &&
          Math.min(
            ...filterDatas.map(
              filterData =>
                filterData.Outbound.Duration +
                (filterData.Inbound ? filterData.Inbound.Duration : 0),
            ),
          );

        const minDurationDatas =
          filterDatas &&
          filterDatas.filter(
            filterData =>
              filterData.Outbound.Duration +
                (filterData.Inbound ? filterData.Inbound.Duration : 0) ===
              minDuration,
          )[0];

        const minDurationAverage =
          minDurationDatas &&
          minDurationDatas.Outbound &&
          (minDurationDatas.Outbound.Duration +
            (minDurationDatas.Inbound
              ? minDurationDatas.Inbound.Duration
              : 0)) /
            2;

        setDurationAverage({
          time: `${Math.floor(minDurationAverage / 60)}시간${Math.floor(
            minDurationAverage % 60,
          )}분`,
          price:
            minDurationDatas &&
            minDurationDatas.price.toString().replace(regExp, ','),
        });

        const minPrice =
          filterDatas &&
          Math.min(...filterDatas.map(filterData => filterData.price));

        const minPriceDatas =
          filterDatas &&
          filterDatas.filter(filterData => +filterData.price === minPrice)[0];

        const minPriceDuration =
          minPriceDatas &&
          minPriceDatas.Outbound &&
          (minPriceDatas.Outbound.Duration +
            (minPriceDatas.Inbound ? minPriceDatas.Inbound.Duration : 0)) /
            2;

        setPriceAverage({
          time: `${Math.floor(minPriceDuration / 60)}시간${Math.floor(
            minPriceDuration % 60,
          )}분`,
          price: minPrice.toString().replace(regExp, ','),
        });
      }
    }, [filterDatas]);

    const filterReset = () => {
      // filterLiveSearch();
    };

    return (
      <S.ListLayout>
        <A11yTitle>항공권 검색 결과</A11yTitle>
        <S.ProgressBox loading={pageIndex}>
          <S.ProgressTextBox loading={pageIndex}>
            {progress.per === 100 ? (
              <S.ProgressResult
                onClick={filterReset}
                status={
                  originDatas &&
                  filterDatas &&
                  filterDatas.length !== originDatas.length
                }
              >
                <span>{originDatas && `총 ${originDatas.length}개 중, `}</span>
                <em>{filterDatas && filterDatas.length}개</em>
                {originDatas &&
                  filterDatas &&
                  filterDatas.length !== originDatas.length && (
                    <span> (전체보기)</span>
                  )}
              </S.ProgressResult>
            ) : (
              <>
                <CircularProgress disableShrink size={20} />
                <S.ProgressText>
                  ({progress.all}개의 항공사중 {progress.complete}개 확인)
                </S.ProgressText>
              </>
            )}
          </S.ProgressTextBox>
          <S.Progress variant="determinate" value={progress.per} />
        </S.ProgressBox>
        <S.TabArea>
          <S.FilterButton onClick={openFilterArea}>필터 (조건)</S.FilterButton>
          <S.CategoryTab onClick={changeCategory}>
            <S.TabItem
              id="price"
              onClick={changeCategory}
              isActive={isActive === 'price'}
              role="button"
              tabindex="0"
            >
              <p>최저가</p>
              <S.TabPrice isActive={isActive === 'price'}>
                {priceAverage && `₩ ${priceAverage.price}`}
                {!priceAverage && <CircularProgress disableShrink size={20} />}
              </S.TabPrice>
              <small>{priceAverage && `${priceAverage.time}`}(평균)</small>
            </S.TabItem>
            <S.TabItem
              id="duration"
              onClick={changeCategory}
              isActive={isActive === 'duration'}
              role="button"
              tabindex="0"
            >
              <p>최단 여행시간</p>
              <S.TabPrice isActive={isActive === 'duration'}>
                {durationAverage && `₩ ${durationAverage.price}`}
                {!durationAverage && (
                  <CircularProgress disableShrink size={20} />
                )}
              </S.TabPrice>
              <small>
                {durationAverage && `${durationAverage.time}`}(평균)
              </small>
            </S.TabItem>
            <S.TabItem
              id="recommend"
              onClick={changeCategory}
              isActive={isActive === 'recommend'}
              role="button"
              tabindex="0"
            >
              <p>추천순</p>
              <em>₩ 0</em>
              <small>(평균) 00시간 00분</small>
            </S.TabItem>
          </S.CategoryTab>
        </S.TabArea>
        <S.FlightList>
          {loading && !pageIndex && loaderRender}
          {filterUpdate && <Updating filterUpdate={filterUpdate} />}
          <InfiniteScroller
            loadMore={() => renderLiveSearch()}
            hasMore={!!pageIndex && pageIndex !== 'lastIndex'}
            loader={<Loading key={uuid.v4()} />}
          >
            {renderDatas &&
              renderDatas.map(data => <FlightItem key={uuid.v4()} {...data} />)}
            {renderDatas &&
              !loading &&
              !renderDatas.length &&
              '해당하는 결과가 없습니다.'}
          </InfiniteScroller>
        </S.FlightList>
      </S.ListLayout>
    );
  },
);

export default ListArea;
