import { defineStore } from "pinia";
import axios from "axios";

// const backend = 'https://www.lonuashop.kro.kr/api';
const backend = "http://localhost:8080";
const storedToken = sessionStorage.getItem("token");

export const useQnaStore = defineStore("qna", {
  state: () => ({ qnas: [], isQuestionExist: true }),
  actions: {
    async getQna() {
      try {
        const response = await axios.get(backend + "/question/list/1/10", {
          headers: {
            Authorization: `Bearer ${storedToken}`,
          },
        });

        this.qnas = response.data.result;
        if (response.data.result.length !== 0) {
          this.isQuestionExist = false;
        }
      } catch (error) {
        console.error("에러 발생:", error);
        // 에러 처리 로직 추가
      }
    },

    async deleteQuestion(questionIdx) {
      try {
        const response = await axios.delete(
          backend + "/question/delete/" + questionIdx,
          {
            headers: {
              Authorization: `Bearer ${storedToken}`,
            },
          }
        );
        if (response.data.isSuccess === true) {
          alert("질문이 삭제되었습니다.");
          window.location.href = "/UserQuestion";
        } else {
          alert("질문을 삭제할 수 없습니다.");
        }
      } catch (e) {
        console.error(e);
      }
    },
  },
});
