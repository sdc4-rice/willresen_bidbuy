import React from 'react';
import styled from 'styled-components';

const Td = styled.td`
  padding: 1em;
`;

const TopRow = styled.tr`
`;

const SellerNote = styled.td`
  font-style: italic;
  padding-left: 1em;
`;

const TopInfo = ({product}) => (
  <tbody>
    <TopRow>
      <Td>Condition:</Td>
      <Td><strong>{product.condition}</strong></Td>
    </TopRow>
    {product.sellerNote ? (
      <TopRow>
        <Td></Td>
        <SellerNote>"{product.sellerNote}"</SellerNote>
      </TopRow>
    ) : null}
    <TopRow>
      <Td>Time Left:</Td>
      <Td>{new Date(product.expiresAt).toLocaleDateString()}</Td>
    </TopRow>
  </tbody>
);

export default TopInfo;