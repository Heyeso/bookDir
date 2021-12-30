import React, { Suspense } from "react";
import styled from "styled-components";
import PageNotFound from "./pages/404page";
import { Route, Routes } from "react-router-dom";
import { COLORS } from "./utils/constants";

const HomePage = React.lazy(() => import("./pages/Home/homepage"));

const LoadingContainer = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  background-color: ${COLORS.WHITE};
  display: flex;
  align-items: center;
  justify-content: center;
  .lds-ellipsis {
    display: inline-block;
    position: relative;
    width: 80px;
    height: 80px;
    ::before {
      position: relative;
      display: block;
      content: "LOADING...";
      text-align: center;
      font-family: "Noto Sans medium";
      font-size: 16px;
      color: ${COLORS.LIGHT_BLUE};
    }
  }
  .lds-ellipsis div {
    position: absolute;
    top: 33px;
    width: 13px;
    height: 13px;
    border-radius: 50%;
    background: ${COLORS.LIGHT_BLUE};
    animation-timing-function: cubic-bezier(0, 1, 1, 0);
  }
  .lds-ellipsis div:nth-child(1) {
    left: 8px;
    animation: lds-ellipsis1 0.6s infinite;
  }
  .lds-ellipsis div:nth-child(2) {
    left: 8px;
    animation: lds-ellipsis2 0.6s infinite;
  }
  .lds-ellipsis div:nth-child(3) {
    left: 32px;
    animation: lds-ellipsis2 0.6s infinite;
  }
  .lds-ellipsis div:nth-child(4) {
    left: 56px;
    animation: lds-ellipsis3 0.6s infinite;
  }
  @keyframes lds-ellipsis1 {
    0% {
      transform: scale(0);
    }
    100% {
      transform: scale(1);
    }
  }
  @keyframes lds-ellipsis3 {
    0% {
      transform: scale(1);
    }
    100% {
      transform: scale(0);
    }
  }
  @keyframes lds-ellipsis2 {
    0% {
      transform: translate(0, 0);
    }
    100% {
      transform: translate(24px, 0);
    }
  }
`;

function App() {
  return (
    <div className="App">
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/*" element={<PageNotFound />} />
        </Routes>
      </Suspense>
    </div>
  );
}

export default App;

function Loading() {
  return (
    <LoadingContainer>
      <div className="lds-ellipsis">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </LoadingContainer>
  );
}
