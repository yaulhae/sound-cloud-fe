import styled from "styled-components";
import React from "react";

const TextBlock = styled.p`
  font-size: ${(props) => (props.size ? props.size : "")};
  font-weight: ${(props) => (props.bold ? props.bold : "")};
  color: ${(props) => (props.color ? props.color : "")};
  margin: ${(props) => (props.margin ? props.margin : "")};
  text-align: ${(props) => (props.text_align ? props.text_align : "")};
  line-height: ${(props) => (props.line_height ? props.line_height : "")};
`;

const Text = (props) => {
  const { size, bold, color, margin, text_align, line_height, children } =
    props;
  const styles = {
    bold: bold,
    size: size,
    color: color,
    margin: margin,
    text_align: text_align,
    line_height: line_height,
  };
  return <TextBlock {...styles}>{children}</TextBlock>;
};

Text.defaultProps = {
  children: null,
  text_align: false,
  bold: false,
  size: "",
  color: "",
  margin: "",
};

export default Text;
