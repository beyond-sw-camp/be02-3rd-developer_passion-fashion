import { defineStore } from "pinia";
import axios from "axios";

// const backend = "https://www.lonuashop.kro.kr/api";
const backend = "http://localhost:8080";
const storedToken = sessionStorage.getItem("token");

export const useReviewStore = defineStore("review", {
  state: () => ({ reviews: [], productIdx: 0 }),
  actions: {
    async getReview(idx) {
      try {
        let response = await axios.get(backend + "/review/list/" + idx, {
          headers: {
            Authorization: `Bearer ${storedToken}`,
          },
        });
        // console.log(response.data.result)
        this.reviews = response.data.result;
      } catch (error) {
        console.error("에러 발생:", error);
        return error;
        // 에러 처리 로직 추가
      }
    },
    async submitReview(review, reviewPhoto) {
      try {
        console.log("Current productIdx:", this.productIdx);
        let formData = new FormData();
        formData.append("productIdx", this.productIdx);
        formData.append("reviewContent", review.reviewContent);
        formData.append("evaluation", review.evaluation);

        let data = {
          productIdx: this.productIdx,
          reviewContent: review.reviewContent,
          evaluation: review.evaluation,
        };
        let json = JSON.stringify(data);

        formData.append(
          "review",
          new Blob([json], { type: "application/json" })
        );

        formData.append("reviewPhoto", reviewPhoto);

        const response = await axios.post(
          "http://localhost:8080/review/register",
          formData,
          {
            headers: {
              Authorization: `Bearer ${storedToken}`,
              "Content-Type": "multipart/form-data",
            },
          }
        );

        console.log("Review submitted successfully:", response.data);
      } catch (error) {
        console.error("Error submitting review:", error);
      }
    },
  },
});
