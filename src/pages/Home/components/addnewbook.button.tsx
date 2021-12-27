import React from "react";
import styled from "styled-components";
import { COLORS } from "../../../utils/constants";

const ButtonContainer = styled.button`
  cursor: pointer;
  background-color: transparent;
  padding: 0;
  border: 0;
  width: 50px;
  height: 50px;
  & > .button:hover {
    path {
      fill: ${COLORS.LIGHT_BLUE};
      stroke: ${COLORS.GRAY1};
    }
  }
`;

function AddNewBook() {
  return (
    <ButtonContainer>
      <svg
        className="button"
        width={50}
        height={50}
        viewBox="0 0 50 50"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M0 25C0 11.1929 11.1929 0 25 0C38.8071 0 50 11.1929 50 25C50 38.8071 38.8071 50 25 50C11.1929 50 0 38.8071 0 25Z"
          fill="#E0E0E0"
        />
        <path
          d="M25 18V32"
          stroke="#00AFEF"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M18 25H32"
          stroke="#00AFEF"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </ButtonContainer>
  );
}

export default AddNewBook;
