import styled from 'styled-components';
import React from 'react';

const TemplateBlock = styled.div`
  min-width: 920px;
  width: 1240px;
  background: white;
  margin: 0 auto;
  @media screen and (max-width: 1239px) {
    width: 1080px;
  }
  @media screen and (max-width: 1079px) {
    width: 960px;
  }
`;

const Template = ({ children }) => {
    return <TemplateBlock>{children}</TemplateBlock>;
};

export default Template;
