import { getImageUrl } from './common/aws-s3.js';
import * as Api from './common/api.js';
import {
  checkLogin,
  doLogout,
  getUrlParams,
  numberWithCommas,
} from './common/useful-functions.js';
import { addToDb, putToDb } from './common/indexed-db.js';

// 요소(element), input 혹은 상수
const logoutTag = document.querySelector('#logoutTag');
const productImageTag = document.querySelector('#productImageTag');
const manufacturerTag = document.querySelector('#manufacturerTag');
const titleTag = document.querySelector('#titleTag');
const detailDescriptionTag = document.querySelector('#detailDescriptionTag');
const addToCartButton = document.querySelector('#addToCartButton');
const purchaseButton = document.querySelector('#purchaseButton');

checkLogin();
addAllElements();
addAllEvents();

// html에 요소를 추가하는 함수들을 묶어주어서 코드를 깔끔하게 하는 역할임.
function addAllElements() {
  insertProductData();
}

// addEventListener들을 묶어주어서 코드를 깔끔하게 하는 역할임.
function addAllEvents() {
  logoutTag.addEventListener('click', doLogout);
}

async function insertProductData() {
  const { id } = getUrlParams();
  const product = await Api.get(`/api/products/${id}`);

  // 객체 destructuring
  const {
    title,
    detailDescription,
    manufacturer,
    imageKey,
    isRecommended,
    price,
  } = product;
  const imageUrl = await getImageUrl(imageKey);

  productImageTag.src = imageUrl;
  titleTag.innerText = title;
  detailDescriptionTag.innerText = detailDescription;
  manufacturerTag.innerText = manufacturer;
  priceTag.innerText = `${numberWithCommas(price)}원`;

  if (isRecommended) {
    titleTag.insertAdjacentHTML(
      'beforeend',
      '<span class="tag is-success is-rounded">추천</span>'
    );
  }

  addToCartButton.addEventListener('click', async () => {
    try {
      // 장바구니 추가 시, indexedDB에 제품 데이터 및
      // 주문수량 (기본값 1)을 저장함.
      await addToDb('cart', { ...product, quantity: 1 }, id);

      // 장바구니 요약(=전체 총합)을 업데이트함.
      await putToDb('order', 'summary', (data) => {
        // 기존 데이터를 가져옴
        const count = data.productsCount;
        const total = data.productsTotal;
        const ids = data.ids;
        const selectedIds = data.selectedIds;

        // 기존 데이터가 있다면 1을 추가하고, 없다면 초기값 1을 줌
        data.productsCount = count ? count + 1 : 1;

        // 기존 데이터가 있다면 가격만큼 추가하고, 없다면 초기값으로 해당 가격을 줌
        data.productsTotal = total ? total + price : price;

        // 기존 데이터(배열)가 있다면 id만 추가하고, 없다면 배열 새로 만듦
        data.ids = ids ? [...ids, id] : [id];

        // 위와 마찬가지 방식
        data.selectedIds = selectedIds ? [...selectedIds, id] : [id];
      });

      alert('장바구니에 추가되었습니다.');
    } catch (err) {
      // Key already exists 에러면 아래와 같이 alert함
      if (err.message.includes('Key')) {
        alert('이미 장바구니에 추가되어 있습니다.');
      }

      console.log(err);
    }
  });
}
