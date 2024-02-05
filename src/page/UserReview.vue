<template>
      <section id="container" data-custno="9150592">
        <div class="sub_title_wrap">
          <h2 class="sub_title">my page</h2>
          <ol id="breadcrumb">
            <li><a href="/">home</a></li>
            <li><a href="MyPage.html">my page</a></li>
            <li><a href="ProductQ&amp;A.html">문의내역</a></li>
            <li>상품리뷰</li>
          </ol>
        </div>
  
        <div id="snb" class="item6 mypage_snb">
          <div class="snb_header">
            <ul>
              <li class="">
                <a href="/MyPage/MyHeart">MY ♥ </a>
              </li>
              <li class=""><a href="/MyPage/MyOrderList">주문관리</a></li>
              <li class=""><a href="/MyPage/MyItemSkuRequest">쿠폰관리</a></li>
              <li class=""><a href="/BenefitInfo">쇼핑혜택</a></li>
              <li class=""><a href="/MyPage/MemberInfo">정보관리</a></li>
              <li class="active"><a href="ProductQ&amp;A.html">문의내역</a></li>
            </ul>
          </div>
          <div class="snb_sub">
            <div class="inner">
              <ul>
                <li class="">
                  <a href="/MyPage/MyHeart">MY ♥ ITEM</a>
                </li>
              </ul>
              <ul>
                <li class=""><a href="/MyPage/MyOrderList">주문/배송조회</a></li>
                <li class="">
                  <a href="/MyPage/OrderCancelMasterList">주문취소내역 조회</a>
                </li>
              </ul>
              <ul>
                <li class="">
                  <a href="/MyPage/MyCoupon">받은 쿠폰</a>
                </li>
              </ul>
              <ul>
                <li class=""><a href="/MyPage/MyDeposit">마일리지</a></li>
              </ul>
              <ul>
                <li class=""><a href="/MyPage/MemberInfo">회원정보 수정</a></li>
                <li class=""><a href="/MyPage/Secession">회원탈퇴</a></li>
              </ul>
              <ul>
                <li class="">
                  <a href="ProductQ&amp;A.html">상품 Q&amp;A</a>
                </li>
                <li class="">
                  <a
                    href="Review.html"
                    onclick="javascript:AMPLITUDE.LogClickDefault('click_mypage_review','mypage_review');"
                    >리뷰</a
                  >
                </li>
              </ul>
            </div>
          </div>
          <div class="snb_close_wrap">
            <button type="button" name="button" class="snb_close"></button>
          </div>
        </div>
  
        <div class="mypage">
          <div class="table_title contents">
            <h3>리뷰</h3>
          </div>
        </div>
        <!-- tab -->
  
        <div id="divList" style="display: block"></div>
      </section>
  
      <table class="tbl_review cols">
        <colgroup>
          <col style="width: 300px" />
          <col style="width: 80%" />
        </colgroup>
        <thead>
          <tr>
            <th>상품정보</th>
            <th>내용</th>
            <th>평점</th>
          </tr>
        </thead>
        <tbody>
      <tr class="empty">
        <td colspan="2" class="no_data">
          <div class="review-list">
            <li
              class="review-list-item"
              v-for="(review, reviewIdx) in reviewList"
              :key="reviewIdx"
            >
              <div class="review-list-item-wrapper">
                <div class="review-Photo">
                  <img :src="review.reviewPhoto" />
                </div>
                <div class="review-content">{{ review.reviewContent }}</div>
                <div class="evaluation">{{ review.evaluation }}</div>
              </div>
            </li>
          </div>
        </td>
      </tr>
    </tbody>
      </table>
  
  </template>
  
  <script>
  import axios from "axios";
  
  export default {
    data() {
      return { reviewList: [] };
    },
    mounted() {
      this.loadReviews();
    },
    methods: {
      async writeReview(reviewIdx, storedToken) {
        try {
          let response = await axios.get(
            `http://localhost:8080/review/read/${reviewIdx}`,
            {
              headers: {
                Authorization: `Bearer ${storedToken}`,
              },
            }
          );
          return response.data.result;
        } catch (error) {
          console.error("리뷰를 가져오는 중 에러:", error);
          throw error; // 에러 전파
        }
      },
      async userWriteReview(reviewIdx, storedToken) {
        try {
          let response = await this.writeReview(reviewIdx, storedToken);
          console.log(response);
  
          this.reviewList = [...this.reviewList, response]; // 배열에 추가
          return "success";
        } catch (error) {
          console.error("리뷰 작성 중 에러:", error);
          return "error";
        }
      },
      async loadReviews() {
        try {
          const storedToken = sessionStorage.getItem("token");
          const reviewIndices = [1];
  
          if (storedToken) {
            for (const idx of reviewIndices) {
              await this.userWriteReview(idx, storedToken);
            }
          } else {
            console.log("토큰이 없습니다.");
          }
        } catch (error) {
          console.error("리뷰 불러오기 중 에러:", error);
        }
      },
    },
  };
  </script>
  
  <style scoped>

#container .sub_title_wrap {
  padding-top: 55px;
  padding-bottom: 36px;
  position: relative;
  min-width: 1240px;
}

#container .sub_title_wrap .sub_title {
  color: #000;
}

#container .sub_title {
  font-family: "ProximaNova-Thin", "Noto Sans KR";
  font-size: 44px;
  line-height: 44px;
  color: #333;
  text-align: center;
  text-transform: uppercase;
}

h2,
h3,
h4 {
  margin: 0;
  font-weight: normal;
}

#breadcrumb {
  width: 100%;
  text-align: center;
  margin-top: 16px;
}

#breadcrumb li {
  display: inline-block;
  font-family: "ProximaNova-Regular", "Noto Sans KR";
  font-size: 11px;
  text-transform: uppercase;
  vertical-align: middle;
  color: #000;
}

#breadcrumb li a {
  text-transform: uppercase;
  color: #676767;
  vertical-align: top;
}

#breadcrumb li:not(:last-child):after {
  content: "";
  display: inline-block;
  width: 3px;
  height: 5px;
  vertical-align: top;
  margin: 5px 6px 0 10px;
  font-size: 0;
  background: url(//static.wconcept.co.kr/web/images/common/spr-common.png) -60px -60px
    no-repeat;
}

#snb {
  width: 100%;
  min-width: 1240px;
  border-bottom: 1px solid #e6e6e6;
  background-color: #fff;
  margin-bottom: 60px;
}

#snb .snb_header {
  width: 100%;
  min-width: 1240px;
  background-color: #f3f3f3;
  border-top: 1px solid #e6e6e6;
}

#snb .snb_header ul {
  width: 1240px;
  margin: 0 auto;
}

#snb.item6 .snb_header ul li:first-child {
  width: 210px;
}

#snb .snb_header ul li {
  text-align: center;
  float: left;
  position: relative;
  line-height: 41px;
}

#snb .snb_header ul li a {
  font-size: 14px;
  color: #333;
}

#snb .snb_header ul:first-child:before {
  content: none; /* 또는 content: ''; */
}

#snb .snb_header ul li:before {
  content: "";
  width: 1px;
  height: 25px;
  background-color: #e5e5e5;
  display: block;
  position: absolute;
  top: 12px;
  left: 0;
}

#snb.item6 .snb_header ul li {
  width: 206px;
}

#snb .snb_header ul:after {
  display: block;
  clear: both;
  content: "";
}

#snb .snb_sub {
  width: 100%;
  border-top: 1px solid #e6e6e6;
}

#snb .snb_sub .inner {
  width: 1240px;
  margin: 0 auto;
  padding: 9px 0;
  display: table;
}

#snb.item6 .snb_sub ul:first-child {
  width: 210px;
}

#snb .snb_sub .inner ul {
  display: table-cell;
  position: relative;
}

#snb .snb_sub .inner ul li {
  text-align: center;
  line-height: 25px;
  vertical-align: top;
}

#snb .snb_sub .inner ul li a {
  font-size: 12px;
  color: #4c4c4c;
}

#snb .snb_sub .inner ul:first-child:before {
  content: none; /* 또는 content: ''; */
}

#snb .snb_sub .inner ul:before {
  content: "";
  width: 1px;
  height: 120%;
  background-color: #e5e5e5;
  display: block;
  position: absolute;
  top: 0;
  left: 0;
}

#snb.item6 .snb_sub ul {
  width: 206px;
}

#snb .snb_close_wrap {
  position: relative;
  width: 1240px;
  margin: 0 auto;
}

.mypage {
  font-family: "ProximaNova-Regular", "Apple SD Gothic Neo", "Noto Sans KR",
    "Malgun Gothic", "맑은 고딕", sans-serif;
}

.mypage {
  width: 1240px;
  margin: 0 auto;
}

table {
  border-top: 2px solid #171717;
  border-bottom: 1px solid #171717;
  table-layout: fixed;
  margin-bottom: 60px;
}

table {
  width: 100%;
  border-collapse: separate;
}

table {
  border-spacing: 0;
}

table.cols thead th {
  height: 68px;
  font-family: "NotoSansKR-Medium";
  font-size: 14px;
  padding: 0 14px;
  color: #000;
  text-align: center;
  vertical-align: middle;
  border-bottom: 1px solid #b5b5b5;
}

table.cols tbody tr td.no_data {
  height: 150px;
  color: #333;
  font-size: 14px;
}

table.cols tbody tr td {
  height: 68px;
  font-family: "ProximaNova-Regular", "Noto Sans KR";
  text-align: center;
  vertical-align: middle;
  padding: 14px 0;
}

table tbody tr:first-child th,
table tbody tr:first-child td {
  border-color: transparent;
  border: none;
}

.mypage .notice_info_list.mt55 {
  margin-top: 55px;
}

.mypage .notice_info_list h3 {
  line-height: 15px;
  vertical-align: middle;
  margin-bottom: 8px;
  font-size: 16px;
}

h1,
h2,
h3,
h4,
h5,
h6 {
  margin: 0;
  font-weight: normal;
  font-family: "ProximaNova-Thin", "Noto Sans KR";
}

  </style>
  