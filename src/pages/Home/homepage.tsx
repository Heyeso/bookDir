import React from "react";
import styled from "styled-components";
import { COLORS } from "../../utils/constants";
import AddNewBook from "./components/addnewbook.button";
import Logo from "./components/logo";

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0;
  padding: 0 10px;
`;
const LogoContainer = styled.section`
  margin: 0 auto;
  display: flex;
  align-items: center;
  margin-top: 100px;
  padding: 0;
  width: fit-content;
  height: fit-content;
`;
const LogoTitle = styled.p`
  margin: 0;
  margin-left: 15px;
  font-family: "Noto Sans semi-bold";
  font-size: 48px;
  letter-spacing: -0.05em;
  & span {
    color: ${COLORS.LIGHT_BLUE};
  }
`;
const SearchContainer = styled.section``;

function HomePage() {
  return (
    <PageContainer>
      <LogoContainer>
        <Logo />
        <LogoTitle>
          book<span>Dir</span>
        </LogoTitle>
      </LogoContainer>
      <SearchContainer>
        <AddNewBook />
      </SearchContainer>
    </PageContainer>
  );
}

export default HomePage;
