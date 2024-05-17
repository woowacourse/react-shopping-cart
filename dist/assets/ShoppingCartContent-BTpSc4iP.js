import{r as d,j as e,C as L,a as y,D as B,R as h,c as p,b as S,s as f,d as g,f as E,e as D,p as i,g as I,o as M,h as x}from"./index-BDnRrBJf.js";const P=t=>d.createElement("svg",{width:18,height:14,viewBox:"0 0 18 14",fill:"none",xmlns:"http://www.w3.org/2000/svg",...t},d.createElement("path",{d:"M5.88428 11.17L1.71428 7L0.294281 8.41L5.88428 14L17.8843 2L16.4743 0.589996L5.88428 11.17Z",fill:"white"})),N=t=>d.createElement("svg",{width:14,height:3,viewBox:"0 0 14 3",fill:"none",xmlns:"http://www.w3.org/2000/svg",...t},d.createElement("path",{d:"M1.11572 1.5C5.80201 1.5 8.42943 1.5 13.1157 1.5",stroke:"#363636",strokeWidth:1.5,strokeLinecap:"round",strokeLinejoin:"round"})),R=t=>d.createElement("svg",{width:18,height:14,viewBox:"0 0 18 14",fill:"none",xmlns:"http://www.w3.org/2000/svg",...t},d.createElement("path",{d:"M5.88425 11.17L1.71425 7L0.29425 8.41L5.88425 14L17.8843 2L16.4743 0.589996L5.88425 11.17Z",fill:"black",fillOpacity:.1})),$=t=>d.createElement("svg",{width:14,height:15,viewBox:"0 0 14 15",fill:"none",xmlns:"http://www.w3.org/2000/svg",...t},d.createElement("path",{d:"M1.11572 7.50004H13.1157M7.11572 13.5V1.50004",stroke:"#363636",strokeWidth:1.5,strokeLinecap:"round",strokeLinejoin:"round"})),z=t=>d.createElement("svg",{width:14,height:14,viewBox:"0 0 14 14",fill:"none",xmlns:"http://www.w3.org/2000/svg",...t},d.createElement("path",{d:"M6.33331 3.66666H7.66665V4.99999H6.33331V3.66666ZM6.33331 6.33333H7.66665V10.3333H6.33331V6.33333ZM6.99998 0.333328C3.31998 0.333328 0.333313 3.31999 0.333313 6.99999C0.333313 10.68 3.31998 13.6667 6.99998 13.6667C10.68 13.6667 13.6666 10.68 13.6666 6.99999C13.6666 3.31999 10.68 0.333328 6.99998 0.333328ZM6.99998 12.3333C4.05998 12.3333 1.66665 9.93999 1.66665 6.99999C1.66665 4.05999 4.05998 1.66666 6.99998 1.66666C9.93998 1.66666 12.3333 4.05999 12.3333 6.99999C12.3333 9.93999 9.93998 12.3333 6.99998 12.3333Z",fill:"black"})),k=({checked:t,onClick:n,...o})=>e.jsx(L,{$checked:t,onClick:n,...o,children:t?e.jsx(P,{}):e.jsx(R,{})}),A={minus:e.jsx(N,{}),plus:e.jsx($,{})},j=({sign:t,...n})=>e.jsx(y,{...n,children:A[t]}),U=({children:t,...n})=>e.jsx(B,{...n,children:t}),v=()=>{const t=h(p),[n,o]=S(f),r=s=>n.some(a=>a===s),c=n.length===t.length;return{isChecked:r,isAllChecked:c,onCheckCartItem:(s,a)=>{const C=s?[...n,a]:n.filter(b=>b!==a);o(C)},onCheckAllCartItems:s=>{const a=s?t.map(C=>C.id):[];o(a)}}},Z=t=>{const n=g(p),o=g(f),r=()=>{n(l=>l.filter(s=>s.id!==t))},c=()=>{o(l=>l.filter(s=>s!==t))};return{updateCartItems:r,updateSelectedCartItemIds:c,onDeleteItem:async()=>{await E(t),r(),c()}}},_=({id:t,quantity:n})=>{const o=g(p),r=l=>{const s=n+(l==="minus"&&n?-1:1);return s===0?(alert("상품의 최소 주문 수량은 1개입니다. 상품을 삭제하시려면 삭제 버튼을 이용해 주세요."),n):s===101?(alert("상품의 최대 주문 수량은 100개입니다. 100개 이하로 주문해 주세요."),n):s},c=l=>{o(s=>s.map(a=>a.id===t?{...a,quantity:l}:{...a}))};return{updateCartItems:c,getNewQuantity:r,onUpdateCartItemCount:async l=>{const s=r(l);await D(t,s),c(s)}}},G=i.div`
  width: 100%;
`,w=i.div`
  border-top: 1px solid ${I.borderColor};
  padding: 12px 0;
  display: flex;
  flex-direction: column;
  gap: 20px;
`,m=i.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  span {
    font-weight: 700;
  }
  span:nth-child(1) {
    font-size: 16px;
  }
  span:nth-child(2) {
    font-size: 24px;
  }
`,H=()=>{const{orderPrice:t,shippingPrice:n,totalPrice:o}=h(M);return e.jsxs(G,{children:[e.jsxs(w,{children:[e.jsxs(m,{children:[e.jsx("span",{children:"주문 금액"}),e.jsx("span",{children:x(t)})]}),e.jsxs(m,{children:[e.jsx("span",{children:"배송비"}),e.jsx("span",{children:x(n)})]})]}),e.jsx(w,{children:e.jsxs(m,{children:[e.jsx("span",{children:"총 결제 금액"}),e.jsx("span",{children:x(o)})]})})]})},O=i.div`
  display: flex;
  flex-direction: column;
  gap: 12px;

  .label {
    padding-top: 2px;
    color: rgba(10, 13, 19, 1);
    font-weight: 500;
    font-size: 12px;
    line-height: 15px;
  }
`,V=({count:t})=>e.jsx(O,{children:e.jsxs("p",{className:"label",children:["현재 ",t,"종류의 상품이 담겨 있습니다."]})}),Q=i.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 4px;

  .label {
    color: rgba(10, 13, 19, 1);
    font-weight: 500;
    font-size: 12px;
    line-height: 15px;
  }

  .productPrice {
    color: rgba(0, 0, 0, 1);
    font-weight: 700;
    font-size: 24px;
    line-height: 34px;
  }
`,F=i.div`
  margin-top: 16px;
  display: flex;
  align-items: center;
  gap: 12px;
`,W=({cartItem:t})=>{const{product:n,quantity:o}=t,{onUpdateCartItemCount:r}=_(t);return e.jsxs(Q,{children:[e.jsx("span",{className:"label",children:n.name}),e.jsx("span",{className:"productPrice",children:x(n.price)}),e.jsxs(F,{children:[e.jsx(j,{onClick:()=>r("minus"),sign:"minus"}),e.jsx("span",{children:o}),e.jsx(j,{onClick:()=>r("plus"),sign:"plus"})]})]})};i.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;const K=i.div`
  margin-top: 36px;
  display: flex;
  align-items: center;
  gap: 4px;
`,J=i.section`
  margin-top: 20px;
  width: 100%;
`;i.li`
  padding-top: 12px;
`;i.div`
  width: 112px;
  height: 112px;
  border-radius: 8px;
`;i.div`
  display: flex;
  gap: 24px;
  margin-top: 12px;
`;const T=()=>{const{isAllChecked:t,onCheckAllCartItems:n}=v(),o=h(p),r=()=>{n(!t)};return e.jsxs("div",{children:[e.jsxs(K,{children:[e.jsx(k,{checked:t,onClick:r}),e.jsx("span",{className:"label",children:"전체 선택"})]}),e.jsx(J,{children:o.map(c=>e.jsx(te,{cartItem:c},c.id))})]})},X=i.li`
  border-top: 1px solid ${I.borderColor};
  padding-top: 12px;
  margin-top: 12px;
`,Y=i.img`
  width: 112px;
  height: 112px;
  border-radius: 8px;
`,q=i.div`
  display: flex;
  gap: 24px;
  margin-top: 12px;
`,ee=i.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`,te=({cartItem:t})=>{const{onDeleteItem:n}=Z(t.id),{isChecked:o,onCheckCartItem:r}=v(),c=()=>{r(!o(t.id),t.id)};return e.jsxs(X,{children:[e.jsxs(ee,{children:[e.jsx(k,{checked:o(t.id),onClick:c}),e.jsx(U,{onClick:n,children:"삭제"})]}),e.jsxs(q,{children:[e.jsx(Y,{src:t.product.imageUrl}),e.jsx(W,{cartItem:t})]})]})},ne=i.section`
  margin-top: 20px;
  width: 100%;
`,se=i.p`
  padding: 52px 0px 12px 0px;
  display: flex;
  align-items: center;
  gap: 4px;

  .label {
    padding-top: 2px;
    color: rgba(10, 13, 19, 1);
    font-weight: 500;
    font-size: 12px;
    line-height: 15px;
  }
`,oe=()=>{const t=h(p);return e.jsx(e.Fragment,{children:t.length===0?e.jsx("div",{className:"fallback",children:"장바구니에 담은 상품이 없습니다."}):e.jsxs(e.Fragment,{children:[e.jsx(V,{count:t.length}),e.jsx("div",{children:e.jsx(ne,{children:e.jsx(T,{cartItems:t})})}),e.jsxs(se,{children:[e.jsx(z,{}),e.jsx("span",{className:"label",children:"총 주문 금액이 100,000원 이상일 경우 무료 배송됩니다."})]}),e.jsx(H,{})]})})};export{oe as default};
