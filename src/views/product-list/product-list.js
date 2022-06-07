import * as Api from "/api.js";

const productSection = document.querySelector(".section");
//localhost:5000/products/?category="slfjsalkfjalsfjl"
const URLSearch = new URLSearchParams(location.search);
//(?id=여기부분)
// GET /api/product/slfjsalkfjalsfjl
const id = URLSearch.get("category");

// mock data 생성하여(./product.json) 가져온 데이터를 화면에 뿌려준다.
// const url = "./products.json";
//특정 카테고리에 어떤 상품 리스트들이있는지 이걸 배열으로 받아와서 뿌려줘야겠죠?
const data = await Api.get("/api/product");

// GET /api/product/:id
// const response = await fetch(url);
// const data = await response.json();
console.log(data);

const productsObj = data.products;
console.log(productsObj);

// 상품 목록에 넣을 데이터 변수
let productInnerData = "";

// get API로 데이터 불러옴
// const data = {_id, name }

// '/product-detail/:_id'
// /<a href="/product-detail/${_id}">
// 상세페이지
// const id = _id
// Api.get('/Api/product-detail/', id)

/* 
1. 각자 목록에 아이디  설정
2. a href=''

const data = await Api.get(`/api/email/${sessionStorage.getItem('email')}`);
*/

function getProductsListData(e) {
  productInnerData += `
    <div class="card product-item" id="productNum${e.id}">
    <a href="/product?id=${e._id}">
        <div class="card-image">
            <figure class="image is-square">
                <img src="${e.imgSrc}" alt="Placeholder image">
            </figure> 
        </div>
        <div class="card-content">
            <div class="media">
                <div class="media-content">
                    <p class="title is-5">${e.name}</p>
                    <p class="subtitle is-7">${e.content}</p>
                    <p class="title is-6">${e.price}</p>
                </div>
            </div>
        </div>
    </a>
    </div>
    `;
}

data.map((e) => getProductsListData(e));

productSection.innerHTML = productInnerData;
