import styled from "styled-components";
import React from "react";

const InputBlock = styled.input`
  width: ${(props) => (props.width ? props.width : "")};
  font-size: ${(props) => (props.font_size ? props.font_size : "")};
  padding: ${(props) => (props.padding ? props.padding : "")};
  border: 2px solid #25ccf7;
  border-radius: 4px;
  &:focus {
    border: 2px solid rgb(27, 156, 252);
    outline: none;
  }
`;

const Input = (props) => {
  const {
    id,
    width,
    padding,
    font_size,
    type,
    placeholder,
    onChange,
    onSubmit,
    is_label,
    value,
  } = props;

  const styles = {
    width: width,
    padding: padding,
    font_size: font_size,
  };

  return (
    <>
      {is_label && <label htmlFor={id}>{is_label}</label>}
      <InputBlock
        id={id}
        {...styles}
        type={type}
        placeholder={placeholder}
        onChange={onChange}
        value={value}
        onKeyPress={(e) => {
          if (e.key === "Enter") {
            onSubmit(e);
          }
        }}
      />
    </>
  );
};

Input.defaultProps = {
  id: null,
  width: "",
  padding: false,
  font_size: false,
  type: "text",
  placeholder: false,
  onChange: () => {},
  onSubmit: () => {},
  onKeyPress: () => {},
  is_label: false,
  value: null,
};
export default Input;
