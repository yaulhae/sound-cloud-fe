import styled from "styled-components";
import React from "react";

const TemplateBlock = styled.div`
  width: 65%;
  height: 100vh;
  background: white;
  margin: 0 auto;
`;

const Template = ({ children }) => {
  return <TemplateBlock>{children}</TemplateBlock>;
};

export default Template;
