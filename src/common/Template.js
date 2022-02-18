import styled from 'styled-components';
import React from 'react';

const TemplateBlock = styled.div`
    width: 65%;
    min-width: 920px;
    padding: 0 20px;
    background: white;
    margin: 0 auto;
`;

const Template = ({ children }) => {
    return <TemplateBlock>{children}</TemplateBlock>;
};

export default Template;
