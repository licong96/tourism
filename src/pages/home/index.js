import React, { useState, useEffect } from 'react';
import { Switch, Route } from "react-router-dom";
import './index.scss';
import data from '../../data/tourism';
import { Button, Modal, Placeholder, IconButton } from 'rsuite';
import Detail from '../detail';
import FullImage from '../FullImage';
import FullMap from '../map';

const { Graph, Paragraph } = Placeholder;

function Index(props) {
  const [ showMap, setShowMap ] = useState(false);
  const [ isLoading, setIsLoading ] = useState(true);
  let map = null;

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, []);

  const handlerOpenSubPage = (name, index = 1) => {
    props.history.push({
      pathname: `/home/${name}`,
      search: `?index=${index}`
    })
  }

  const handlerShowMap = (index) => {
    setShowMap(true);
    setTimeout(() => {
      initMap(data[index].name);
    }, 0);
  }

  const handlerHideMap = () => {
    setShowMap(false);
  }
  
  function initMap(search) {
    map || (map = new window.BMap.Map('map'));
    const fixLng = 108.95335744033585;
    const fixLat = 34.25460971650902
    const point = new window.BMap.Point(fixLng, fixLat);
    map.addControl(new window.BMap.NavigationControl());
    map.addControl(new window.BMap.GeolocationControl());

    const marker = new window.BMap.Marker(point); // 创建标注    
    map.addOverlay(marker);

    map.centerAndZoom(point, 15);

      const options = {      
        onSearchComplete: function(results){
          const { lng, lat} = results.Sq[0].point;
          mapPolyline(fixLng, fixLat, lng, lat);
        },
        renderOptions: {
          map: map,
        },
        pageCapacity: 1
    };
    const local = new window.BMap.LocalSearch('西安市', options);      
    local.search(search);
  }

  // 地图划线
  function mapPolyline(fixLng, fixLat, lng, lat) {
    const polyline = new window.BMap.Polyline([
      new window.BMap.Point(fixLng, fixLat),
      new window.BMap.Point(lng, lat)
    ],
    {
      strokeColor: "red", 
      strokeWeight: 6, 
      strokeOpacity: 0.5
    });
    map.addOverlay(polyline);
  }

  return (
    <div className="home">
      {
        isLoading 
        ? <div className="placeholder-load">
            <Graph active />
            <Paragraph active />
            <br />
            <Graph active />
            <Paragraph active />
          </div>
        : null
      }
      <ul>
        {
          data.map((item, index) => {
            if (!item.cover) {
              return null;
            }
            return (
              <li className="list" key={index}>
                <img className="list__cover" src={item.cover} alt="" />
                <div className="list__main">
                  <p className="list__name">{item.name}</p>
                  <div className="list__operation">
                    <Button onClick={() => handlerShowMap(index)}>地图位置</Button>
                    <Button onClick={() => handlerOpenSubPage('fullImage', index)}>图片介绍</Button>
                    <Button onClick={() => handlerOpenSubPage('detail', index)}>查看详情</Button>
                  </div>
                </div>
              </li>
            )
          })
        }
      </ul>
      <div className="fixed-map" onClick={() => handlerOpenSubPage('FullMap')}>
        <IconButton icon={ <i className="iconfont icon-ditu" /> } color="red" circle  />
      </div>
      <Modal full dialogClassName="map-modal" show={showMap} onHide={handlerHideMap}>
        <Modal.Header>
            <Modal.Title>地图位置</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div id="map" className="map"></div>
          </Modal.Body>
          <Modal.Footer>
          </Modal.Footer>
      </Modal>
      {/* sub-page */}
      <Switch>
        <Route exact path='/home/detail' component={Detail} />
        <Route exact path='/home/fullImage' component={FullImage} />
        <Route exact path='/home/fullMap' component={FullMap} />
      </Switch>
    </div>
  );
}

export default Index;