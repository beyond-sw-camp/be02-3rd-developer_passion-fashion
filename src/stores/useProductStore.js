import { defineStore } from "pinia";
import axios from "axios";

// const backend = 'https://www.lonuashop.kro.kr/api';
const backend = "http://localhost:8080";
export const useProductStore = defineStore("product", {
  state: () => ({ idx: 0 }),
  actions: {
    async addCartAxios() {
      let data = {
        // 변수를 어떻게 받아올것인가
        productIdx: this.idx,
      };
      // if (storedToken == null) {
      //   window.location.href = "/UserLogIn";
      // }

      let request = JSON.stringify(data);

      let token = sessionStorage.getItem("token");

      try {
        let response = await axios.post(backend + "/cart/register", request, {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
        });

        alert("장바구니에 등록 됐습니다.");
        console.log(response);
      } catch (error) {
        console.error("에러 발생:", error);
        // 에러 처리 로직 추가
      }
    },
    async getProduct(idx) {
      // itemdidx를 가져와야한다 지금은 임의적으로 1로 했다
      let response = await axios.get(backend + "/product/" + idx);

      try {
        // console.log(response.data)
        let product = response.data.result;
        // 브랜드명
        let h2Tag = document.createElement("h2");
        h2Tag.setAttribute("class", "brand");
        h2Tag.innerHTML =
          '<a href="https://spao.com/">' + product.brandName + "</a>";
        document
          .getElementsByClassName("h_group")[0]
          .insertBefore(
            h2Tag,
            document.getElementsByClassName("product_front")[0]
          );
        // 제품명
        let h3Tag = document.createElement("h3");
        h3Tag.setAttribute("class", "product cottonusa");
        h3Tag.innerText = product.productName;
        document.getElementsByClassName("product_front")[0].appendChild(h3Tag);

        let dlTag = document.createElement("dl");
        dlTag.setAttribute("class", "price item2");
        let discountrate = (1 - product.salePrice / product.price) * 100;
        dlTag.innerHTML =
          '<dt>정상가</dt><dd class="normal"><em>' +
          product.price +
          '</em> 원</dd><dt><text>&#xD560;&#xC778;&#xC801;&#xC6A9;&#xAC00;</text></dt><dd class="sale"><em>' +
          product.salePrice +
          '</em><text>원</text><span class="discount_percent">' +
          discountrate.toFixed(0) +
          "%</span></dd>";
        document.getElementsByClassName("price_wrap")[0].appendChild(dlTag);

        let imageAddr = product.productImages[0];
        document.getElementById("img_01").src = imageAddr;

        for (let i = 1; i < product.productImages.length; i++) {
          let aTag = document.createElement("a");
          aTag.setAttribute("href", "#");
          aTag.setAttribute("class", "active");
          aTag.innerHTML =
            "<img src='" +
            product.productImages[i] +
            "' width='30' height='40'>";
          document.getElementById("gallery_img").appendChild(aTag);
        }

        let imageIntro = product.productIntrodImages;
        // console.log(imageIntro)
        imageIntro.map((imgSrc) => {
          let imgTag = document.createElement("img");
          imgTag.setAttribute("src", imgSrc);
          let brTag = document.createElement("br");
          document.getElementsByClassName("marketing")[0].appendChild(imgTag);
          document.getElementsByClassName("marketing")[0].appendChild(brTag);
        });
      } catch {
        return "error!";
      }
    },
  },
});
