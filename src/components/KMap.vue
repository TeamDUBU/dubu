/* KMap.vue */

<template>
  <div>
    <div id="map"></div>
  </div>
</template>

<script>
export default {
  name: "KakaoMap",
  data() {
    return {
      map: null,
      markers: [],
    };
  },
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
        "//dapi.kakao.com/v2/maps/sdk.js?appkey=51c8deb15f0bd6288cc9e5cf4fe0ce2d&autoload=false";
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
    loadMarker() {
      const markerData = [
        {
          position: new window.kakao.maps.LatLng(
            37.49510050970545,
            126.9552358189143
          ),
          address: "서울특별시 동작구 상도동 500-1",
          info: "A 빌라",
        },
        {
          position: new window.kakao.maps.LatLng(
            37.4953116518421,
            126.95565723681904
          ),
          address: "서울특별시 동작구 상도동 502-8",
          info: "A 원룸",
        },
        {
          position: new window.kakao.maps.LatLng(
            37.49430461998719,
            126.95874342129322
          ),
          address: "서울특별시 동작구 상도동 507-4",
          info: "A 오피스텔",
        },
        {
          position: new window.kakao.maps.LatLng(
            37.493936539631065,
            126.95940251494538
          ),
          address: "서울특별시 동작구 상도동 412-0",
          info: "A 아파트",
        },
        {
          position: new window.kakao.maps.LatLng(
            37.49511484557149,
            126.95690171968508
          ),
          address: "서울특별시 동작구 상도동 505-5",
          info: "A 빌딩",
        },
        {
          position: new window.kakao.maps.LatLng(
            37.49502441963266,
            126.95530256733295
          ),
          adress: "서울특별시 동작구 상도동 500-2",
          info: "B 빌라",
        },
        // 추가로 필요한 위치와 제목을 여기에 추가
      ];

      // const imgSrc = "./assets/pick.png";
      // const imgSize = new window.kakao.maps.Size(64, 69);
      // const markerImage = new window.kakao.maps.MarkerImage(imgSrc, imgSize);

      markerData.forEach((data) => {
        const infowindow = new window.kakao.maps.InfoWindow({
          removable: true,
          content: data.address,
        });
        const marker = new window.kakao.maps.Marker({
          position: data.position,
          address: data.address,
          info: data.info,
          // image: markerImage,
        });
        marker.setMap(this.map);
        window.kakao.maps.event.addListener(marker, "click", () => {
          infowindow.open(this.map, marker);
          // 클릭한 마커의 위치를 가져옴
          const moveLatLon = marker.getPosition();
          this.map.setCenter(moveLatLon);
          this.map.setLevel(2);
        });
        window.kakao.maps.event.addListener(marker, "mouseover", () => {
          infowindow.open(this.map, marker);
        });
        window.kakao.maps.event.addListener(marker, "mouseout", () => {
          infowindow.close(this.map, marker);
        });
        this.markers.push(marker);
      });
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
