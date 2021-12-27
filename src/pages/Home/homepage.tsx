import React from "react";
import styled from "styled-components";
import { COLORS } from "../../utils/constants";
import Logo from "./components/logo";

const LogoContainer = styled.div`
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

function HomePage() {
  return (
    <>
      <LogoContainer>
        <Logo />
        <LogoTitle>
          book<span>Dir</span>
        </LogoTitle>
      </LogoContainer>
    </>
  );
}

export default HomePage;
