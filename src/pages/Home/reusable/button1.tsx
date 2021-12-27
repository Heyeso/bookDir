import React, { ReactNode } from "react";
import styled, { css } from "styled-components";
import { COLORS } from "../../../utils/constants";

interface Props {
  children: ReactNode;
  tag: ButtonType;
}

const ButtonComponent = styled.button<Props>`
  cursor: pointer;
  position: relative;
  width: 150px;
  height: 32px;
  border-radius: 500px;
  font-family: "Noto Sans medium";
  font-size: 16px;

  ${(props) => props.tag && ButtonStyles[props.tag]}
`;

function Button1({ children, ...rest }: Props) {
  return <ButtonComponent {...rest}>{children}</ButtonComponent>;
}

export default Button1;

export enum ButtonType {
  Blue = "blue",
  Gray = "gray",
}

const ButtonStyles = {
  blue: css`
    background-color: ${COLORS.LIGHT_BLUE};
    color: ${COLORS.WHITE};
    border: none;
    &:hover {
      background-color: ${COLORS.DARK_BLUE};
    }
  `,
  gray: css`
    background-color: transparent;
    color: ${COLORS.GRAY3};
    border: 2px solid ${COLORS.GRAY3};
    &:hover {
      background-color: #e0e0e07d; /* GRAY1 */
    }
  `,
};