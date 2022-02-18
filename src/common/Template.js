import styled from "styled-components";
import React from "react";

const TemplateBlock = styled.div`
  min-width: 920px;
  width: 65%;
  background: white;
  margin: 0 auto;
`;

const Template = ({ children }) => {
  return <TemplateBlock>{children}</TemplateBlock>;
};

export default Template;
