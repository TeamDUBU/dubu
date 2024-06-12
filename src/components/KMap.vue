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
        const response = await axios.get(`http://3.38.101.193:3000/main/kmap`);
        const markerData = response.data;
        // console.log(markerData);
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
            "https://i.postimg.cc/0j1fsBGf/Kakao-Talk-Image-2024-06-08-19-21-02.png", // 마커이미지의 주소입니다
          imageSize = new window.kakao.maps.Size(50, 50), // 마커이미지의 크기입니다
          imageOption = { offset: new window.kakao.maps.Point(25, 15) }; // 마커이미지의 옵션입니다. 마커의 좌표와 일치시킬 이미지 안에서의 좌표를 설정합니다.

        var markerImage = new window.kakao.maps.MarkerImage(
          imageSrc,
          imageSize,
          imageOption
        );

        let openInfowindow = null; // 현재 열려 있는 infowindow를 추적

        // mD 배열을 순회하며 마커 생성
        mD.forEach((datas) => {
          const latLng = new window.kakao.maps.LatLng(
            datas.position[0],
            datas.position[1]
          );

          const infowindowContent = `
      <div style="font-size:14px; width:220px; text-align:left; padding: 10px;">
        <div style="text-align:center; font-weight:bold; margin-bottom: 10px;">${
          datas.note
        }</div>
        <div style="margin-bottom: 5px;">주소 : ${datas.address}</div>
        <div style="margin-bottom: 5px;" class="text-gray-800 hover:text-blue-400">가격 : ${datas.price
          .toString()
          .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}(단위 : 원 / m2)</div>
      </div>`;
          const infowindow = new window.kakao.maps.InfoWindow({
            content: infowindowContent,
            removable: false, // 끄는 버튼을 없앱니다
          });

          const marker = new window.kakao.maps.Marker({
            position: latLng,
            tokenID: datas.tokenID,
            address: datas.address,
            note: datas.note,
            price: datas.price,
            image: markerImage,
          });
          // console.log(marker);
          marker.setMap(this.map);

          window.kakao.maps.event.addListener(marker, "click", () => {
            // 다른 infowindow가 열려 있는지 확인
            if (openInfowindow) {
              return;
            }

            // 클릭된 마커의 주소에 해당하는 모든 hosu를 찾아서 표시
            const relevantData = markerData.filter(
              (item) => item.addr === datas.address
            );
            const hosuList = relevantData
              .map(
                (item) => `
          <div style="margin-bottom:10px; display: flex; justify-content: space-between;">
            <span>호수: ${item.hosu}</span>
            <button class="rounded-md shadow-md py-1 px-2 text-gray-800 bg-gray-100 hover:text-blue-400 hover:bg-gray-300" onclick="navigateToHouseInfo('${item.tokenId}', '${item.hosu}')">보러 가기</button>
          </div>
        `
              )
              .join("");
            const numHosu = relevantData.length;
            const maxItemsVisible = 3; // 최대 표시할 항목 수
            const infowindowHeight =
              Math.min(numHosu, maxItemsVisible) * 30 + 120; // 기본 높이 + 호수 개수에 따른 높이 조정

            const newInfowindowContent = `
        <div style="font-size:14px; width:220px; height:${infowindowHeight}px; text-align:left; overflow-y:auto; padding: 10px;">
          <div style="text-align:center; font-weight:bold; margin-bottom: 10px;">${datas.note}</div>
          <div style="text-align:center; margin-bottom: 10px;">현재 등록된 호수들</div>
          <hr style="margin-bottom: 10px;">
          ${hosuList}
          <div style="text-align:center; margin-top:10px;">
            <button class="rounded-md shadow-md py-1 px-2 text-gray-800 bg-gray-100 hover:text-blue-400 hover:bg-gray-300" onclick="closeAllInfowindows()">돌아가기</button>
          </div>
        </div>`;

            const newInfowindow = new window.kakao.maps.InfoWindow({
              content: newInfowindowContent,
              removable: false,
            });
            newInfowindow.open(this.map, marker);
            marker.infowindow = newInfowindow; // 마커에 새로운 infowindow를 저장

            openInfowindow = newInfowindow; // 현재 열려 있는 infowindow로 설정

            const moveLatLon = marker.getPosition();
            this.map.setCenter(moveLatLon);
            this.map.setLevel(2);
          });

          window.kakao.maps.event.addListener(marker, "mouseover", () => {
            if (!openInfowindow) {
              infowindow.open(this.map, marker);
            }
          });

          window.kakao.maps.event.addListener(marker, "mouseout", () => {
            if (!openInfowindow) {
              infowindow.close();
            }
          });

          this.markers.push(marker);
        });

        // 모든 infowindow를 닫는 함수
        window.closeAllInfowindows = function () {
          if (openInfowindow) {
            openInfowindow.close();
            openInfowindow = null;
          }
        };

        // HouseInfo 페이지로 이동하는 함수
        window.navigateToHouseInfo = (tokenID, hosu) => {
          this.$router.push(`/main/${tokenID}/${hosu}`);
        };
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
