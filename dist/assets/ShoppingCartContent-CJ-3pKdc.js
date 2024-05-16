import{r as d,j as e,C as y,a as S,D as B,R as h,c as p,b as D,s as w,d as g,f as L,e as P,p as i,g as I,o as E,h as x}from"./index-BTyLJ673.js";const M=t=>d.createElement("svg",{width:14,height:3,viewBox:"0 0 14 3",fill:"none",xmlns:"http://www.w3.org/2000/svg",...t},d.createElement("path",{d:"M1.11572 1.5C5.80201 1.5 8.42943 1.5 13.1157 1.5",stroke:"#363636",strokeWidth:1.5,strokeLinecap:"round",strokeLinejoin:"round"})),N=t=>d.createElement("svg",{width:14,height:15,viewBox:"0 0 14 15",fill:"none",xmlns:"http://www.w3.org/2000/svg",...t},d.createElement("path",{d:"M1.11572 7.50004H13.1157M7.11572 13.5V1.50004",stroke:"#363636",strokeWidth:1.5,strokeLinecap:"round",strokeLinejoin:"round"})),R=t=>d.createElement("svg",{width:14,height:14,viewBox:"0 0 14 14",fill:"none",xmlns:"http://www.w3.org/2000/svg",...t},d.createElement("path",{d:"M6.33331 3.66666H7.66665V4.99999H6.33331V3.66666ZM6.33331 6.33333H7.66665V10.3333H6.33331V6.33333ZM6.99998 0.333328C3.31998 0.333328 0.333313 3.31999 0.333313 6.99999C0.333313 10.68 3.31998 13.6667 6.99998 13.6667C10.68 13.6667 13.6666 10.68 13.6666 6.99999C13.6666 3.31999 10.68 0.333328 6.99998 0.333328ZM6.99998 12.3333C4.05998 12.3333 1.66665 9.93999 1.66665 6.99999C1.66665 4.05999 4.05998 1.66666 6.99998 1.66666C9.93998 1.66666 12.3333 4.05999 12.3333 6.99999C12.3333 9.93999 9.93998 12.3333 6.99998 12.3333Z",fill:"black"})),k=({checked:t,...n})=>e.jsx(y,{type:"checkbox",checked:t,...n}),z={minus:e.jsx(M,{}),plus:e.jsx(N,{})},j=({sign:t,...n})=>e.jsx(S,{...n,children:z[t]}),A=({children:t,...n})=>e.jsx(B,{...n,children:t}),v=()=>{const t=h(p),[n,o]=D(w),r=s=>n.some(a=>a===s),l=n.length===t.length;return{isChecked:r,isAllChecked:l,onCheckCartItem:(s,a)=>{const C=s?[...n,a]:n.filter(b=>b!==a);o(C)},onCheckAllCartItems:s=>{const a=s?t.map(C=>C.id):[];o(a)}}},U=t=>{const n=g(p),o=g(w),r=()=>{n(c=>c.filter(s=>s.id!==t))},l=()=>{o(c=>c.filter(s=>s!==t))};return{updateCartItems:r,updateSelectedCartItemIds:l,onDeleteItem:async()=>{await L(t),r(),l()}}},_=({id:t,quantity:n})=>{const o=g(p),r=c=>{const s=n+(c==="minus"&&n?-1:1);return s===0?(alert("상품의 최소 주문 수량은 1개입니다. 상품을 삭제하시려면 삭제 버튼을 이용해 주세요."),n):s===101?(alert("상품의 최대 주문 수량은 100개입니다. 100개 이하로 주문해 주세요."),n):s},l=c=>{o(s=>s.map(a=>a.id===t?{...a,quantity:c}:{...a}))};return{updateCartItems:l,getNewQuantity:r,onUpdateCartItemCount:async c=>{const s=r(c);await P(t,s),l(s)}}},$=i.div`
  width: 100%;
`,f=i.div`
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
`,G=()=>{const{orderPrice:t,shippingPrice:n,totalPrice:o}=h(E);return e.jsxs($,{children:[e.jsxs(f,{children:[e.jsxs(m,{children:[e.jsx("span",{children:"주문 금액"}),e.jsx("span",{children:x(t)})]}),e.jsxs(m,{children:[e.jsx("span",{children:"배송비"}),e.jsx("span",{children:x(n)})]})]}),e.jsx(f,{children:e.jsxs(m,{children:[e.jsx("span",{children:"총 결제 금액"}),e.jsx("span",{children:x(o)})]})})]})},H=i.div`
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
`,V=({count:t})=>e.jsx(H,{children:e.jsxs("p",{className:"label",children:["현재 ",t,"종류의 상품이 담겨 있습니다."]})}),O=i.div`
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
`,Z=i.div`
  margin-top: 16px;
  display: flex;
  align-items: center;
  gap: 12px;
`,Q=({cartItem:t})=>{const{product:n,quantity:o}=t,{onUpdateCartItemCount:r}=_(t);return e.jsxs(O,{children:[e.jsx("span",{className:"label",children:n.name}),e.jsx("span",{className:"productPrice",children:x(n.price)}),e.jsxs(Z,{children:[e.jsx(j,{onClick:()=>r("minus"),sign:"minus"}),e.jsx("span",{children:o}),e.jsx(j,{onClick:()=>r("plus"),sign:"plus"})]})]})};i.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;const F=i.div`
  margin-top: 36px;
  display: flex;
  align-items: center;
  gap: 4px;
`,W=i.section`
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
`;const K=()=>{const{isAllChecked:t,onCheckAllCartItems:n}=v(),o=h(p);return e.jsxs("div",{children:[e.jsxs(F,{children:[e.jsx(k,{checked:t,onChange:r=>n(r.target.checked)}),e.jsx("span",{className:"label",children:"전체 선택"})]}),e.jsx(W,{children:o.map(r=>e.jsx(q,{cartItem:r},r.id))})]})},J=i.li`
  border-top: 1px solid ${I.borderColor};
  padding-top: 12px;
  margin-top: 12px;
`,T=i.img`
  width: 112px;
  height: 112px;
  border-radius: 8px;
`,X=i.div`
  display: flex;
  gap: 24px;
  margin-top: 12px;
`,Y=i.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`,q=({cartItem:t})=>{const{onDeleteItem:n}=U(t.id),{isChecked:o,onCheckCartItem:r}=v();return e.jsxs(J,{children:[e.jsxs(Y,{children:[e.jsx(k,{checked:o(t.id),onChange:l=>r(l.target.checked,t.id)}),e.jsx(A,{onClick:n,children:"삭제"})]}),e.jsxs(X,{children:[e.jsx(T,{src:t.product.imageUrl}),e.jsx(Q,{cartItem:t})]})]})},ee=i.section`
  margin-top: 20px;
  width: 100%;
`,te=i.p`
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
`,se=()=>{const t=h(p);return e.jsx(e.Fragment,{children:t.length===0?e.jsx("div",{className:"fallback",children:"장바구니에 담은 상품이 없습니다."}):e.jsxs(e.Fragment,{children:[e.jsx(V,{count:t.length}),e.jsx("div",{children:e.jsx(ee,{children:e.jsx(K,{cartItems:t})})}),e.jsxs(te,{children:[e.jsx(R,{}),e.jsx("span",{className:"label",children:"총 주문 금액이 100,000원 이상일 경우 무료 배송됩니다."})]}),e.jsx(G,{})]})})};export{se as default};
