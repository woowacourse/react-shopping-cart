import styled, { keyframes } from "styled-components";

import add_cart from "../../../public/assets/add_cart.png";

const cartAnimation = keyframes`
  from {
    background-position: -25px -34px;
    width: 75px;
    height: 81px;
  }
  4%{
    background-position: -152px -29px;
    width: 74px;
    height: 86px;
  }
  8%{
    background-position: -277px -20px;
    width: 75px;
    height: 95px;
  }
  12%{
    background-position: -403px -21px;
    width: 75px;
    height: 94px;
  }
  16%{
    background-position: -528px -28px;
    width: 76px;
    height: 87px;
  }
  20%{
    background-position: -22px -168px;
    width: 81px;
    height: 73px;
  }
  24%{
    background-position: -146px -186px;
    width: 85px;
    height: 55px;
  }
  28%{
    background-position: -267px -202px;
    width: 93px;
    height: 39px;
  }
  32%{
    background-position: -390px -210px;
    width: 102px;
    height: 31px;
  }
  36%{
    background-position: -514px -212px;
    width: 104px;
    height: 29px;
  }
  40%{
    background-position: -12px -330px;
    width: 101px;
    height: 37px;
  }
  44%{
    background-position: -142px -310px;
    width: 92px;
    height: 57px;
  }
  48%{
    background-position: -273px -287px;
    width: 83px;
    height: 80px;
  }
  52%{
    background-position: -402px -272px;
    width: 76px;
    height: 95px;
  }
  56%{
    background-position: -529px -267px;
    width: 75px;
    height: 100px
  ;}
  60%{
    background-position: -24px -393px;
    width: 77px;
    height: 89px;
  }
  64%{
    background-position: -148px -399px;
    width: 81px;
    height: 81px;
  }
  68%{
    background-position: -272px -410px;
    width: 85px;
    height: 72px;
  }
  72%{
    background-position: -396px -422px;
    width: 88px;
    height: 71px;
  }
  76%{
    background-position: -521px -427px;
    width: 90px;
    height: 66px;
  }
  80%{
    background-position: -17px -552px;
    width: 90px;
    height: 67px;
  }
  84%{
    background-position: -146px -549px;
    width: 85px;
    height: 70px;
  }
  88%{
    background-position: -274px -544px;
    width: 80px;
    height: 75px;
  }
  92%{
    background-position: -403px -540px;
    width: 75px;
    height: 79px;
  }
  96%{
  background-position: -529px -538px;
    width: 75px;
    height: 81px;
  }
`;

const Contents = styled.div`
  background: url(${add_cart}) no-repeat;
  background-position: 0px, 0px;

  animation: ${cartAnimation} 1s infinite;
  animation-timing-function: steps(1);
`;

export { Contents };
