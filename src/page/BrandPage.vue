<template>
  <!-- brand content -->
  <div v-for="(brand, idx) in brandPage" :key="brand.brandIdx" class="brand">
    <div class="brand-info">
      <a href="#">{{ brand.brandName }}</a>
    </div>
    <div class="brand-itemContainer">
      <Splide
        :options="{
          type: 'loop',
          width: '100%',
          // autoHeight: boolean = true,
          gap: '20px',
          perPage: 3,
        }"
        aria-label="My Favorite Images"
      >
        <!-- <SplideSlide v-for="res in result" :key="res.productIdx">
                    <ProductCardComponent v-bind:Product="res" v-bind:like="likesStore.indexList.includes(res.productIdx)"/>
                </SplideSlide> -->
        <SplideSlide
          v-for="product in productPage[idx]"
          :key="product.productIdx"
        >
          <ProductCardComponent
            v-bind:Product="product"
            v-bind:like="likesStore.indexList.includes(product.productIdx)"
          />
        </SplideSlide>
      </Splide>
    </div>
  </div>
</template>

<script>
import { Splide, SplideSlide } from "@splidejs/vue-splide";
import "@splidejs/vue-splide/css";
import axios from "axios";
import { mapStores } from "pinia";
import { useLikesStore } from "../stores/useLikesStore.js";
// import '@splidejs/vue-splide/css/core';
import ProductCardComponent from "../components/ProductCardComponent.vue";

export default {
  name: "BrandPage",
  components: {
    Splide,
    SplideSlide,
    ProductCardComponent,
  },
  data() {
    return {
      msg: "BrandPage",
      result: [
        {
          productIdx: "1",
          productImage: require("../assets/logo.png"),
          brandName: "brand",
          productName: "product1",
          priceBefore: "2012300",
          priceAfter: "1000",
          discount: "100%",
          likeState: false,
        },
        {
          productIdx: "2",
          productImage: require("../assets/logo.png"),
          brandName: "brand",
          productName: "product2",
          priceBefore: "2012300",
          priceAfter: "1000",
          discount: "100%",
          likeState: false,
        },
        {
          productIdx: "3",
          productImage: require("../assets/logo.png"),
          brandName: "brand",
          productName: "product3",
          priceBefore: "2012300",
          priceAfter: "1000",
          discount: "100%",
          likeState: false,
        },
        {
          productIdx: "4",
          productImage: require("../assets/logo.png"),
          brandName: "brand",
          productName: "product4",
          priceBefore: "2012340",
          priceAfter: "1400",
          discount: "100%",
          likeState: false,
        },
      ],
      brandPage: [],
      productPage: [],
    };
  },
  methods: {
    async getBrnadPage(page, size) {
      // const backend = 'https://www.lonuashop.kro.kr/api';
      let backend = "http://localhost:8080";
      await axios
        .get(backend + "/brand/list/" + page + "/" + size)
        .then((res) => {
          console.log(res);
          this.brandPage = res.data.result;
        })
        .catch((res) => {
          console.log("망했다! : " + res);
        });
    },

    async getProductPageByBrandIdx(brandIdx, page, size) {
      console.log(brandIdx);
      await axios
        .get(
          "http://localhost:8080/product/brand/" +
            brandIdx +
            "/" +
            page +
            "/" +
            size
        )
        .then((res) => {
          console.log("getProductPageByBrandIdx 성공!");
          console.log(res);
          this.productPage.push(res.data.result);
        })
        .catch((res) => {
          console.log("getProductPageByBrandIdx 망했다! : ");
          console.log(res);
          this.productPage.push(this.result);
        });
    },
    async init() {
      await this.getBrnadPage(1, 10);
      this.brandPage.map(async (brand) => {
        await this.getProductPageByBrandIdx(brand.brandIdx, 1, 15);
        console.log(this.likesStore.indexList);
        console.log(this.likesStore.indexList.includes(3));
      });
    },
  },
  mounted() {
    console.log("mounted");
    this.init();
    this.likesStore.getLikeList();
    // this.brandPage = this.brandPage.data.result;
    // console.log(result);
  },
  computed: {
    // 배열을 전달하지 않고, 스토어를 하나씩 전달합니다.
    // 각 스토어는 ID 뒤에 'Store'를 붙여서 액세스할 수 있습니다.
    // this.counterStore
    ...mapStores(useLikesStore),
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.brand-info {
  content: "max-content";
  font-size: large;
  font-weight: 900;
  border-top: 1px gray solid;
  margin: 0px 20px;
  /* height: 330px;
    display: flex;
    flex-direction: row; 
    background-color: blueviolet; */
}

.brand-itemContainer {
  width: 80%;
}

.brand {
  display: flex;
  flex-direction: row;
  max-height: 400px;
  min-height: 330px;
  margin: 60px auto;
  width: 100%;
  box-sizing: border-box;
}
</style>
