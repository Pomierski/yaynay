import styled from "styled-components";

interface PropTypes {
  progress: number;
  max: number;
  positive?: boolean;
}

const Wrapper = styled.div<{ positive?: boolean }>`
  width: 100%;
  height: 1.3rem;
  border: 1px solid
    ${(props) =>
      props.positive
        ? props.theme.colors.darkGreen
        : props.theme.colors.darkRed};
  border-radius: 999px;
  overflow: hidden;
  position: relative;
`;

const Bar = styled.div<{ progress: number; positive?: boolean }>`
  height: 100%;
  width: 100%;
  background: ${(props) =>
    props.positive ? props.theme.colors.green : props.theme.colors.red};
  background: linear-gradient(
    90deg,
    ${(props) =>
        props.positive ? props.theme.colors.green : props.theme.colors.red}
      0%,
    ${(props) =>
        props.positive
          ? props.theme.colors.darkGreen
          : props.theme.colors.darkRed}
      100%
  );
  transform: scaleX(${(props) => props.progress || 0});
  transform-origin: left;
  transition: transform 0.5s;
`;

const Value = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  top: 50%;
  margin: 0 auto;
  transform: translateY(-50%);
  color: #fff;
  font-size: 0.8rem;
  font-weight: bold;
  width: fit-content;
  z-index: 2;
`;

const ProgressBar = ({ progress, max, positive }: PropTypes): JSX.Element => (
  <Wrapper positive={positive}>
    <Value>{max > 0 ? ((progress / max) * 100).toFixed(2) : 0}%</Value>
    <Bar progress={max > 0 ? progress / max : 0} positive={positive} />
  </Wrapper>
);

export default ProgressBar;
