import styled from "styled-components";
import React from "react";

const CircleImage = styled.div`
  --size: ${(props) => props.size};
  width: var(--size);
  height: var(--size);
  border-radius: var(--size);
  background-image: url("${(props) => props.src}");
  background-size: cover;
  margin-right: 0.5em;
`;

const AspectOutter = styled.div`
  width: ${(props) => props.size};
  /* min-width: 32px; */
  margin: ${(props) => props.margin};
`;

const AspectInner = styled.div`
  position: relative;
  padding-top: 100%;
  overflow: hidden;
  background-image: url("${(props) => props.src}");
  background-size: cover;
  background-position: center;
`;

const ImageDefault = styled.div`
  --size: ${(props) => props.size};
  width: var(--size);
  height: var(--size);
  background-image: url("${(props) => props.src}");
  background-size: cover;
  background-position: center;
`;

const Image = (props) => {
  const { shape, size, src, margin } = props;
  const styles = {
    src: src,
    size: size,
    margin: margin,
  };

  if (shape === "circle") {
    return <CircleImage {...styles}></CircleImage>;
  }

  if (shape === "rectangle") {
    return (
      <AspectOutter {...styles}>
        <AspectInner {...styles} />
      </AspectOutter>
    );
  }
  return (
    <AspectOutter {...styles}>
      <AspectInner {...styles} />
    </AspectOutter>
  );
};

Image.defaultProps = {
  shape: "circle",
  size: "36px",
  src: "https://ifh.cc/g/8lDrUd.jpg",
};

export default Image;
