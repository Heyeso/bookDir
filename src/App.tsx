import React, { Suspense } from "react";
import styled from "styled-components";
import PageNotFound from "./pages/404page";
import { Route, Routes } from "react-router-dom";

const HomePage = React.lazy(() => import("./pages/Home/homepage"));

const Dev = styled.div`
  text-align: center;
  height: fit-content;
  background-color: rgb(0, 128, 0);
  color: white;
  font-family: "Noto Sans regular";
`;

function App() {
  return (
    <div className="App">
      <Dev>development</Dev>
      <Suspense fallback={<Loading/>}>
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
  return <div>Loading</div>;
}
