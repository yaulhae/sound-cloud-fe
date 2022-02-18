import styled from "styled-components";
import React from "react";

const ButtonBlock = styled.button`
  width: ${(props) => (props.width ? props.width : "")};
  margin: ${(props) => (props.margin ? props.margin : "")};
  padding: ${(props) => (props.padding ? props.padding : "0.6em")};
  background: ${(props) => (props.bg ? props.bg : "")};
  border: 0;
  border-radius: 4px;
  font-size: ${(props) => (props.font_size ? props.font_size : "")};
  color: white;
  &:disabled {
    background: #82c9fd;
  }
`;

const Button = (props) => {
  const { width, margin, padding, bg, font_size, children, disabled, onClick } =
    props;

  const styles = {
    width: width,
    margin: margin,
    padding: padding,
    bg: bg,
    font_size: font_size,
  };
  return (
    <ButtonBlock {...styles} onClick={onClick} disabled={disabled}>
      {children}
    </ButtonBlock>
  );
};

Button.defaultProps = {
  width: "",
  margin: false,
  padding: false,
  bg: false,
  font_size: false,
  children: null,
  onClick: () => {},
};

export default Button;
