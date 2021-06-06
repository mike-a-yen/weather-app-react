import styled from 'styled-components';
import device from '../responsive/Device';

const UpdatedAt = styled.h4`
  color: ${({ color }) => color || '#FFFFFF'};
  display: block;
  font-weight: ${({ weight }) => weight || '400'};
  font-size: ${({ fontSize }) => fontSize || '10px'};
  text-align: ${({ align }) => align || 'right'};
  padding: 5px 0;
  float: right;
  ${({ firstToUpperCase }) =>
    firstToUpperCase &&
    `
  &:first-letter {
    text-transform: uppercase;
  }
  `}
  @media ${device.tablet} {
    font-size: ${({ fontSize }) => fontSize || '8px'};
  }
  @media ${device.laptop} {
    font-size: ${({ fontSize }) => fontSize || '12px'};
  } 
  @media ${device.laptopL} {
    font-size: ${({ fontSize }) => fontSize || '16px'};
  }
`;

export default UpdatedAt;
