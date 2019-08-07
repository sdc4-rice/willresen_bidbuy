import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const BottomRow = styled.tr`
  text-align: center;
`;

const Td = styled.td`
  padding: 1em;
  border: 1px solid #e2e2e2;
`;

const MiscInfo = ({ product }) => (
  <tbody>
    <BottomRow>
      <Td>
        {`${product.watchers} watchers`}
      </Td>
      <Td>
        {`Ships from ${product.shippingcountry}`}
      </Td>
      <Td>{product.returnsallowed ? '30-day returns' : 'No returns'}</Td>
    </BottomRow>
  </tbody>
);

MiscInfo.propTypes = {
  product: PropTypes.object.isRequired,
};

export default MiscInfo;
