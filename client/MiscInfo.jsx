import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const BottomRow = styled.tr`
  text-align: center;
`;

const Td = styled.td`
  padding: 1em;
`;

const MiscInfo = ({ product }) => (
  <tbody>
    <BottomRow>
      <Td>
        {`${product.watchers} watchers`}
      </Td>
      <Td>
        {`Ships from ${product.shippingCountry}`}
      </Td>
      <Td>{product.returnsAllowed ? '30-day returns' : 'No returns'}</Td>
    </BottomRow>
  </tbody>
);

MiscInfo.propTypes = {
  product: PropTypes.object.isRequired,
};

export default MiscInfo;
