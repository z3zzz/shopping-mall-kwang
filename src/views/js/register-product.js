import { addImageToS3 } from './common/aws-s3.js';
import * as Api from './common/api.js';

// 요소(element)들과 상수들
const titleInput = document.querySelector('#titleInput');
const categorySelectBox = document.querySelector('#categorySelectBox');
const manufacturerInput = document.querySelector('#manufacturerInput');
const shortDescriptionInput = document.querySelector('#shortDescriptionInput');
const detailDescriptionInput = document.querySelector(
  '#detailDescriptionInput'
);
const imageInput = document.querySelector('#imageInput');
const inventoryInput = document.querySelector('#inventoryInput');
const priceInput = document.querySelector('#priceInput');
const searchKeywordInput = document.querySelector('#searchKeywordInput');
const addKeywordButton = document.querySelector('#addKeywordButton');
const keywordsContainer = document.querySelector('#keywordContainer');
const submitButton = document.querySelector('#submitButton');
const registerProductForm = document.querySelector('#registerProductForm');

addAllElements();
addAllEvents();

// html에 요소를 추가하는 함수들을 묶어주어서 코드를 깔끔하게 하는 역할임.
function addAllElements() {
  addOptionsToSelectBox();
}

// addEventListener들을 묶어주어서 코드를 깔끔하게 하는 역할임.
function addAllEvents() {
  imageInput.addEventListener('change', handleImageUpload);
  submitButton.addEventListener('click', handleSubmit);
  categorySelectBox.addEventListener('change', handleCategoryChange);
  addKeywordButton.addEventListener('click', handleKeywordAdd);
}

// 제품 추가 - 사진은 AWS S3에 저장, 이후 제품 정보를 백엔드 db에 저장.
async function handleSubmit(e) {
  e.preventDefault();

  const title = titleInput.value;
  const categoryId = categorySelectBox.value;
  const manufacturer = manufacturerInput.value;
  const shortDescription = shortDescriptionInput.value;
  const detailDescription = detailDescriptionInput.value;
  const image = imageInput.files[0];
  const inventory = parseInt(inventoryInput.value);
  const price = parseInt(priceInput.value);

  // 입력 칸이 비어 있으면 진행 불가
  if (
    !title ||
    !categoryId ||
    !manufacturer ||
    !shortDescription ||
    !detailDescription ||
    !inventory ||
    !price
  ) {
    return alert('빈 칸 및 0이 없어야 합니다.');
  }

  if (image.size > 3e6) {
    return alert('사진은 최대 2.5MB 크기까지 가능합니다.');
  }

  // S3 에 이미지가 속할 폴더 이름은 카테고리명으로 함.
  const index = categorySelectBox.selectedIndex;
  const categoryName = categorySelectBox[index].text;

  try {
    const imageKey = await addImageToS3(imageInput, categoryName);
    const data = {
      title,
      categoryId,
      manufacturer,
      shortDescription,
      detailDescription,
      imageKey,
      inventory,
      price,
      searchKeywords,
    };

    await Api.post('/api/product', data);

    alert(`정상적으로 ${title} 제품이 등록되었습니다.`);

    // 폼 초기화
    registerProductForm.reset();
    fileNameSpan.innerText = '';
    keywordsContainer.innerHTML = '';
  } catch (err) {
    console.log(err.stack);

    alert(`문제가 발생하였습니다. 확인 후 다시 시도해 주세요: ${err.message}`);
  }
}

// 사용자가 사진을 업로드했을 때, 파일 이름이 화면에 나타나도록 함.
function handleImageUpload() {
  const file = imageInput.files[0];
  if (file) {
    fileNameSpan.innerText = file.name;
  } else {
    fileNameSpan.innerText = '';
  }
}

// 선택할 수 있는 카테고리 종류를 api로 가져와서, 옵션 태그를 만들어 삽입함.
async function addOptionsToSelectBox() {
  const categorys = await Api.get('/api/categorylist');
  categorys.forEach((category) => {
    // 객체 destructuring
    const { _id, title, themeClass } = category;

    categorySelectBox.innerHTML += `
      <option value=${_id} class="notification ${themeClass}"> ${title} </option>`;
  });
}

// 카테고리 선택 시, 선택박스에 해당 카테고리 테마가 반영되게 함.
function handleCategoryChange() {
  const index = categorySelectBox.selectedIndex;

  categorySelectBox.className = categorySelectBox[index].className;
}

// 아래 함수는, 검색 키워드 추가 시, 해당 키워드로 만든 태그가 화면에 추가되도록 함.
// 아래 배열은, 나중에 api 요청 시 사용함.
let searchKeywords = [];
function handleKeywordAdd(e) {
  e.preventDefault();

  const newKeyword = searchKeywordInput.value;

  if (!newKeyword) {
    return;
  }

  if (searchKeywords.includes(newKeyword)) {
    return alert('이미 추가한 검색어입니다.');
  }

  searchKeywords.push(newKeyword);

  keywordsContainer.insertAdjacentHTML(
    'beforeend',
    `
    <div class="control" id="a${newKeyword}">
      <div class="tags has-addons">
        <span class="tag is-link is-light">${newKeyword}</span>
        <a class="tag is-link is-light is-delete"></a>
      </div>
    </div>
  `
  );

  // 위 html 주입에 약간 시간이 걸리므로, 딜레이를 준 후 이벤트 추가함.
  keywordsContainer
    .querySelector(`#a${newKeyword} .is-delete`)
    .addEventListener('click', handleKeywordDelete);

  // 초기화 및 사용성 향상
  searchKeywordInput.value = '';
  searchKeywordInput.focus();
}

function handleKeywordDelete(e) {
  // a 태그 클릭 -> 옆의 span 태그의 inenerText가 키워드임.
  const keywordToDelete = e.target.previousElementSibling.innerText;

  // 배열에서 삭제
  const index = searchKeywords.indexOf(keywordToDelete);
  searchKeywords.splice(index, 1);

  // 요소 삭제
  keywordsContainer.querySelector(`#a${keywordToDelete}`).remove();
}
