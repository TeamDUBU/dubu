<template>
  <div class="">
    <!-- image scroll -->
    <div class="max-h-screen pt-12 m-8">
      <!-- itemNotFound -->
      <div v-if="this.lists.length == 0">
        <main
          class="grid min-h-full place-items-center bg-gray-100 py-24 px-6 sm:py-32 lg:px-8"
        >
          <div class="text-center">
            <p class="text-5xl font-semibold text-green-600">이런 !!</p>
            <h1
              class="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl"
            >
              No Item!!
            </h1>
            <p class="mt-6 text-base leading-7 text-gray-600">
              현재 등록된 아이템이 없습니다.
            </p>
            <div class="mt-10 flex items-center justify-center gap-x-6">
              <button
                @click="resetList()"
                class="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                아이템 전체보기
              </button>
              <!-- <a href="#" class="text-sm font-semibold text-gray-900">Contact support <span aria-hidden="true">&rarr;</span></a> -->
            </div>
          </div>
        </main>
      </div>
      <!-- item lists -->
      <carousel
        :perPageCustom="this.option.perPageCustom"
        :loop="this.option.loop"
        :navigationEnabled="this.option.navigationEnabled"
        :centerMode="this.option.centerMode"
        v-else
      >
        <slide
          v-for="item in this.lists.length > 0 ? this.lists : this.items"
          :key="item.tokenId + item.hosu"
          class="flex flex-col items-center p-4 bg-gray-200 rounded-lg shadow-md"
        >
          <img
            :src="item.url[0]"
            alt="House Image"
            class="w-full h-48 object-fit rounded-t-lg"
          />
          <div class="p-2 text-center">
            <div class="text-lg font-semibold">주소: {{ item.addrToji }}</div>
            <div class="text-md text-gray-600">호수: {{ item.hosu }}</div>
            <button
              @click="goNFTInfo(item)"
              class="mt-2 bg-ivory-500 rounded-md shadow-md py-1 px-3"
            >
              상세 보기
            </button>
          </div>
        </slide>
      </carousel>
    </div>
    <!-- Menu -->
    <div class="grid grid-cols-10 gap-2 font-bold">
      <div
        class="col-span-2 bg-gray-200 rounded-lg shadow-lg m-2"
        v-for="item in menu"
        :key="item.name"
      >
        <img
          :src="item.url"
          alt="House Image"
          class="w-full h-48 object-cover rounded-t-lg p-2"
        />
        <div class="p-2 text-center">
          <div class="text-lg font-semibold">{{ item.name }}</div>
          <!-- <div class="text-md text-gray-600"></div> -->
          <button
            @click="setList(item.code)"
            class="mt-2 bg-ivory-500 rounded-md shadow-md py-1 px-3 md:text-xs lg:text-lg"
          >
            상세 보기
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import { Carousel, Slide } from "@jambonn/vue-carousel";
import "@jambonn/vue-carousel/dist/index.css";

export default {
  name: "HouseList",
  components: {
    Carousel,
    Slide,
  },
  data() {
    return {
      option: {
        perPageCustom: [
          [480, 1],
          [800, 2],
          [1024, 3],
        ],
        navigationEnabled: true,
        loop: true,
        centerMode: true,
        spacePadding: 4,
      },
      group: {},
      menu: {
        0: {
          name: "아파트",
          code: 0,
          url: "https://www.dabangapp.com/static/media/apt.84a44890.png",
        },
        1: {
          name: "오피스텔",
          code: 1,
          url: "https://www.dabangapp.com/static/media/normal.972f731e.png",
        },
        2: {
          name: "투룸/빌라",
          code: 2,
          url: "https://www.dabangapp.com/static/media/normal.972f731e.png",
        },
        3: {
          name: "원룸",
          code: 3,
          url: "https://www.dabangapp.com/static/media/normal.972f731e.png",
        },
        4: {
          name: "상가",
          code: 4,
          url: "https://www.dabangapp.com/static/media/sale-in-lots.db9152e6.png",
        },
      },
      lists: [],
    };
  },
  computed: {
    ...mapState("dbInfo", ["items"]),
  },
  created() {
    this.fetchItems().then(() => {
      this.groupByCode();
      this.resetList();
    });
  },
  methods: {
    ...mapActions("dbInfo", ["fetchItems"]),
    setList(code) {
      if (this.group[`${code}`] === undefined) this.lists = [];
      else this.lists = this.group[`${code}`];
    },
    resetList() {
      this.lists = this.items;
    },
    groupByCode() {
      this.group = this.items.reduce((acc, item) => {
        const { code } = item;
        if (!acc[code]) {
          acc[code] = [];
        }
        acc[code].push(item);
        return acc;
      }, {});
    },
    goNFTInfo(item) {
      this.$router.push({
        name: "House-Detail",
        params: {
          TokenId: item.tokenId,
          Hosu: item.hosu,
        },
      });
    },
  },
};
</script>

<style></style>
