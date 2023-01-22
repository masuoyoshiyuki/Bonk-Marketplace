import React, { useState } from 'react';
import styled from 'styled-components';
import { Drops } from '@liqnft/candy-shop';
import { ConnectButton } from '@/components/ConnectButton';
import { useUserWallet } from '@/hooks/useUserWallet';
import { useShopStore } from '@/store/useShopStore';

const Drop: React.FC = () => {
const userWallet = useUserWallet();
const candyShop = useShopStore((s) => s.candyShop);
const [prices, setPrices] = useState({
    hoodie: '24390243',
    beanie: '8130081',
    tshirt: '16129032',
    hat:    '12096774'
  });
  const [selectedPrice, setSelectedPrice] = useState({});
  return (
    <DesContainer>
      <h1 style={{ marginTop: 40, marginBottom: 15 }}>BONK MERCH DROP</h1>
      <p>
        Have the chance to own your very own custom designed Bonk Merch purchased with $BONK
      </p>
      <p style={{ marginBottom: 40 }}>
        Note: there is a 10% tax on all purchases that is burned!
      </p>
      {candyShop && (
        <Drops
          candyShop={candyShop}
          wallet={userWallet}
          walletConnectComponent={<ConnectButton />}
          filter
          search
        />
      )}
<div style={{display: 'flex', flexWrap: 'nowrap', justifyContent: 'space-between', padding: '10px'}}>
  <div style={{ width: '20%', height: 'auto', marginRight: '10px'}}>
    <img src={`${process.env.PUBLIC_URL}/hoodie.jpg`} alt="hoodie" style={{ width: '100%', height: 'auto'}} />
    <button style={{fontSize: '20px', backgroundColor: 'red'}} onClick={() => setSelectedPrice({ hoodie: prices.hoodie })}>&nbsp;{prices.hoodie} BONK&nbsp;</button>
  </div>
  <div style={{ width: '20%', height: 'auto', marginRight: '10px'}}>
    <img src={`${process.env.PUBLIC_URL}/beanie.jpg`} alt="beanie" style={{ width: '100%', height: 'auto'}} />
    <button style={{fontSize: '20px', backgroundColor: 'red'}} onClick={() => setSelectedPrice({ beanie: prices.beanie })}>&nbsp;{prices.beanie} BONK&nbsp;</button>
  </div>
  <div style={{ width: '20%', height: 'auto', marginRight: '10px'}}>
    <img src={`${process.env.PUBLIC_URL}/tshirt.jpg`} alt="tshirt" style={{ width: '100%', height: 'auto'}} />
    <button style={{fontSize: '20px', backgroundColor: 'red'}} onClick={() => setSelectedPrice({ tshirt: prices.tshirt })}>&nbsp;{prices.tshirt} BONK&nbsp;</button>
  </div>
  <div style={{ width: '20%', height: 'auto', marginRight: '10px'}}>
    <img src={`${process.env.PUBLIC_URL}/hat.jpg`} alt="hat" style={{ width: '100%', height: 'auto'}} />
    <button style={{fontSize: '20px', backgroundColor: 'red'}} onClick={() => setSelectedPrice({ hat: prices.hat })}>&nbsp;{prices.hat} BONK&nbsp;</button>
  </div>
</div>

{ selectedPrice &&

<div>
  <p>Selected Item: {Object.keys(selectedPrice)[0]}</p>
  <p>Price with burn tax: {(Number(Object.values(selectedPrice)[0]) * 1.1).toFixed(0)} BONK</p>
</div>
}
    </DesContainer>
  );
};
export default Drop;
const DesContainer = styled.div`
  width: 100%;

  p > a {
    color: #fff;
    text-decoration: underline;
  }
`;
