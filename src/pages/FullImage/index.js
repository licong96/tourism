import React, { } from 'react';
import './index.scss';
import Deckimage from '../../components/DeckImage';
import IconButton from 'rsuite/lib/IconButton';
import data from '../../data/tourism';
import qs from 'qs';

function Index(props) {
  const search = qs.parse(props.location.search, { ignoreQueryPrefix: true });
  const { index } = search;

  const handlerBack = () => {
    props.history.goBack();
  }

  return (
    <div className="full-page full-image">
        <div className="back" onClick={handlerBack}>
          <IconButton icon={ <i className="iconfont icon-jiantouarrowhead7"></i> } circle  />
        </div>
        <Deckimage fullImage={data[index].fullImage} />
    </div>
  );
}

export default Index;