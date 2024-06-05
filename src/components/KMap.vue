/* KMap.vue */

<template>
  <div>
    <div id="map" class=""></div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "KakaoMap",
  data() {
    return {
      map: null,
      markers: [],
      kmap: [],
    };
  },
  computed: {},
  setup() {},
  created() {},
  mounted() {
    if (window.kakao && window.kakao.maps) {
      this.loadMap();
    } else {
      this.loadScript();
    }
  },
  unmounted() {},
  methods: {
    loadScript() {
      const script = document.createElement("script");
      script.src =
        "//dapi.kakao.com/v2/maps/sdk.js?appkey=51c8deb15f0bd6288cc9e5cf4fe0ce2d&autoload=false&libraries=services";
      script.onload = () => window.kakao.maps.load(this.loadMap);

      document.head.appendChild(script);
    },
    loadMap() {
      const container = document.getElementById("map");
      const options = {
        center: new window.kakao.maps.LatLng(
          37.49430461998719,
          126.95874342129322
        ),
        level: 4,
      };
      this.map = new window.kakao.maps.Map(container, options);
      this.loadMarker();
    },
    async loadMarker() {
      try {
        const response = await axios.get(`http://localhost:3000/main/kmap`);
        const markerData = response.data;
        const geocoder = new window.kakao.maps.services.Geocoder();
        const processedAddresses = new Set(); // 중복 주소를 추적하기 위한 Set

        // 모든 주소 검색을 Promise로 처리하여 비동기 문제 해결
        const addressPromises = markerData.map((datas) => {
          return new Promise((resolve, reject) => {
            if (processedAddresses.has(datas.addr)) {
              // 중복된 주소는 무시
              resolve(null);
            } else {
              geocoder.addressSearch(datas.addr, (result, status) => {
                if (status === window.kakao.maps.services.Status.OK) {
                  processedAddresses.add(datas.addr); // 처리된 주소를 Set에 추가
                  resolve({
                    address: datas.addr,
                    note: datas.note,
                    price: datas.price,
                    hosu: datas.hosu,
                    position: [result[0].y, result[0].x],
                  });
                } else {
                  reject(`Geocode error: ${status}`);
                }
              });
            }
          });
        });

        // 모든 주소 검색이 완료될 때까지 기다림
        let mD = await Promise.all(addressPromises);
        // null 값을 필터링하여 유효한 데이터만 남김
        mD = mD.filter((item) => item !== null);

        var imageSrc =
            "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_red.png", // 마커이미지의 주소입니다
          imageSize = new window.kakao.maps.Size(64, 69), // 마커이미지의 크기입니다
          imageOption = { offset: new window.kakao.maps.Point(27, 69) }; // 마커이미지의 옵션입니다. 마커의 좌표와 일치시킬 이미지 안에서의 좌표를 설정합니다.

        var markerImage = new window.kakao.maps.MarkerImage(
          imageSrc,
          imageSize,
          imageOption
        );

        // mD 배열을 순회하며 마커 생성
        mD.forEach((datas) => {
          const latLng = new window.kakao.maps.LatLng(
            datas.position[0],
            datas.position[1]
          );

          const infowindowContent = `
      <div style="font-size:14px; width:220px; height:100px; text-align:left;">
        <div>주소 : ${datas.address}</div>
        <div>건물명 : ${datas.note}</div>
        <div>가격 : ${datas.price}</div>
      </div>`;
          const infowindow = new window.kakao.maps.InfoWindow({
            content: infowindowContent,
            removable: false, // 끄는 버튼을 없앱니다
          });

          const marker = new window.kakao.maps.Marker({
            position: latLng,
            address: datas.address,
            note: datas.note,
            price: datas.price,
            hosu: datas.hosu,
            image: markerImage,
          });
          marker.setMap(this.map);

          window.kakao.maps.event.addListener(marker, "click", () => {
            // 기존 infowindow를 모두 닫음
            this.markers.forEach((m) => {
              if (m.infowindow) {
                m.infowindow.close();
              }
            });

            // 새로운 infowindow 생성 및 표시
            const newInfowindowContent = `
        <div style="font-size:14px; width:220px; height:100px; text-align:left;">
          <div>등록된 호수 : ${datas.hosu}</div>
        </div>`;
            const newInfowindow = new window.kakao.maps.InfoWindow({
              content: newInfowindowContent,
              removable: true,
            });
            newInfowindow.open(this.map, marker);
            marker.infowindow = newInfowindow; // 마커에 새로운 infowindow를 저장

            const moveLatLon = marker.getPosition();
            this.map.setCenter(moveLatLon);
            this.map.setLevel(2);
          });

          window.kakao.maps.event.addListener(marker, "mouseover", () => {
            infowindow.open(this.map, marker);
          });

          window.kakao.maps.event.addListener(marker, "mouseout", () => {
            infowindow.close();
          });

          this.markers.push(marker);
        });
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>

<style scoped>
#map {
  width: 100%;
  height: 100%;
}
</style>
