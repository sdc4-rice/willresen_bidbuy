import React from 'react';
import styled from 'styled-components';
import moment from 'moment';
import PropTypes from 'prop-types';

const Td = styled.td`
  padding: 1em;
`;

const TopRow = styled.tr`
`;

const SellerNote = styled.td`
  font-style: italic;
  padding-left: 1em;
`;

const Span = styled.span`
  font-size: 9pt;
  padding-left: 1em;
`;

const TopInfo = ({ product }) => (
  <tbody>
    <TopRow>
      <Td>Condition:</Td>
      <Td><strong>{product.condition}</strong></Td>
    </TopRow>
    {product.sellerNote ? (
      <TopRow>
        <Td />
        <SellerNote>
          &quot;
          {product.sellerNote}
          &quot;
        </SellerNote>
      </TopRow>
    ) : null}
    <TopRow>
      <Td>Time Left:</Td>
      <Td>
        {moment(product.expiresAt).fromNow(true)}
        <Span>{moment(product.expiresAt).format('dddd, h:mmA')}</Span>
      </Td>
    </TopRow>
  </tbody>
);

TopInfo.propTypes = {
  product: PropTypes.object.isRequired,
};

export default TopInfo;
