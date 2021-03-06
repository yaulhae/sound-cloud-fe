import styled from "styled-components";
import React from "react";

const GridBlock = styled.div`
  position: relative;
  width: ${(props) => (props.width ? props.width : "")};
  margin: ${(props) => (props.margin ? props.margin : "")};
  padding: ${(props) => (props.padding ? props.padding : "")};
  background: ${(props) => (props.bg ? props.bg : "")};
  display: ${(props) => (props.is_flex ? props.is_flex : "")};
  flex-direction: ${(props) =>
    props.flex_direction ? props.flex_direction : ""};
  justify-content: ${(props) => (props.is_flex ? "space-between;" : "")};
  align-items: ${(props) => (props.is_flex ? "center;" : "")};
  text-align: ${(props) => (props.text_align ? props.text_align : "")};
  border-right: ${(props) => (props.border_right ? props.border_right : "")};
  border-bottom: ${(props) => (props.border_bottom ? props.border_bottom : "")};
`;

const Grid = (props) => {
  const {
    width,
    margin,
    padding,
    bg,
    is_flex,
    flex_direction,
    text_align,
    children,
    onClick,
    border_right,
    border_bottom,
  } = props;
  const styles = {
    width: width,
    margin: margin,
    padding: padding,
    bg: bg,
    is_flex: is_flex,
    flex_direction: flex_direction,
    text_align: text_align,
    border_right: border_right,
    border_bottom: border_bottom,
  };

  return (
    <GridBlock {...styles} onClick={onClick}>
      {children}
    </GridBlock>
  );
};

Grid.defaultProps = {
  width: "",
  margin: false,
  padding: false,
  bg: false,
  is_flex: false,
  flex_direction: false,
  text_align: false,
  children: null,
  onClick: () => {},
};

export default Grid;
