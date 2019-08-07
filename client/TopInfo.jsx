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
    {product.sellernote ? (
      <TopRow>
        <Td />
        <SellerNote>
          &quot;
          {product.sellernote}
          &quot;
        </SellerNote>
      </TopRow>
    ) : null}
    <TopRow>
      <Td>Time Left:</Td>
      <Td>
        {moment(product.expiresat).fromNow(true)}
        <Span>{moment(product.expiresat).format('dddd, h:mmA')}</Span>
      </Td>
    </TopRow>
  </tbody>
);

TopInfo.propTypes = {
  product: PropTypes.object.isRequired,
};

export default TopInfo;
