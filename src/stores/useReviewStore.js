import { defineStore } from "pinia";
import axios from "axios";
const backend = 'https://www.kty4563434.kro.kr/api';
// const backend = "https://www.lonuashop.kro.kr/api";
// const backend = "http://localhost:8080";
const storedToken = sessionStorage.getItem("token");

export const useReviewStore = defineStore("review", {
  state: () => ({ reviews: [], productIdx: 0, isReviewExist: true, isSuccess: false }),
  actions: {
    async getReviewList() {
      try {
        let response = await axios.get(backend + "/review/list", {
          headers: {
            Authorization: `Bearer ${storedToken}`,
          },
        });
        this.reviews = response.data.result;
        if (response.data.result.length !== 0) {
          this.isReviewExist = false;
        }
      } catch (e) {
        console.log(e);
      }
    },
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
          backend + "/review/register",
          formData,
          {
            headers: {
              Authorization: `Bearer ${storedToken}`,
              "Content-Type": "multipart/form-data",
            },
          }
        );
        console.log(response);
        if(response.data.isSuccess === true) {
          console.log(response.data.isSuccess)
          alert("리뷰가 작성되었습니다.")
          window.location.href = "/UserReview";
        }
      } catch (error) {
        this.isSuccess = false;
        console.error("Error submitting review:", error);
      }
    },
    async deleteReview(reviewIdx) {
      try {
        const response = await axios.delete(
          backend + "/review/delete/" + reviewIdx,
          {
            headers: {
              Authorization: `Bearer ${storedToken}`,
            },
          }
        );
        if (response.data.isSuccess === true) {
          alert("리뷰가 삭제되었습니다.");
          window.location.href = "/UserReview";
        } else {
          alert("리뷰를 삭제할 수 없습니다.");
        }
      } catch (e) {
        console.error(e);
      }
    },
  },
});
