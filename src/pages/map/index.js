import React, { useEffect } from 'react';
import './index.scss';
import Data from '../../data/tourism/index';
import FoodData from '../../data/tourism/food';

const comData = [...Data, ...FoodData];

function Index(props) {
  let map = null;

  useEffect(() => {
    setTimeout(() => {
      initMap();
    }, 1000);
  }, []);

  function initMap() {
    map || (map = new window.BMap.Map('mapPage'));
    const fixLng = 108.95335744033585;
    const fixLat = 34.25460971650902
    const point = new window.BMap.Point(fixLng, fixLat);
    map.addControl(new window.BMap.NavigationControl());
    map.addControl(new window.BMap.GeolocationControl());

    const marker = new window.BMap.Marker(point); // 创建标注    
    map.addOverlay(marker);

    map.centerAndZoom(point, 15);

    for (let i = 0; i < comData.length; i++) {
      addMarker(comData[i]);
    }
  }

  // 添加多个点
  function addMarker(item) {
    const options = {
      onSearchComplete: (results) => {
        if (item.type === 'food') {
          const point = results.Sq[0].point;
          const marker = new window.BMap.Marker(point); // 创建标注    
          map.addOverlay(marker);
        }
      },
      renderOptions: {
        map: map,
      },
      pageCapacity: 1
    };
    const local = new window.BMap.LocalSearch('西安市', options);      
    local.search(item.name);
  }

  return (
    <div className="full-page map-page">
      <div id="mapPage" className="map"></div>
    </div>
  );
}

export default Index;