import React, { useState } from "react";
import styled from "styled-components";
import { Drops } from "@liqnft/candy-shop";
import { ConnectButton } from "@/components/ConnectButton";
import { useUserWallet } from "@/hooks/useUserWallet";
import { useShopStore } from "@/store/useShopStore";

const Drop: React.FC = () => {
  const userWallet = useUserWallet();
  const candyShop = useShopStore((s) => s.candyShop);
  const [prices] = useState({
    hoodie: 24390243,
    beanie: 8130081,
    tshirt: 16129032,
    hat: 12096774
  });
  const [data, setData] = useState({
    hoodie: 24390243,
    beanie: 8130081,
    tshirt: 16129032,
    hat: 12096774
  });
  const [state, setState] = useState(false);
  const getData = () => {
    fetch("https://api.mainnet.orca.so/v1/whirlpool/list")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        const value = data["whirlpools"];
        const newValue = [];
        for (const element of value) {
          if (
            element.tokenA.symbol === "BONK" &&
            element.tokenB.symbol === "USDC"
          ) {
            newValue.push(element);
          }
        }
        const { hoodie, beanie, tshirt, hat } = prices;
        console.log(typeof hoodie)
        const usdHoodie = newValue[0].price * hoodie;
        const usdBeanie = newValue[0].price * beanie;
        const usdTshirt = newValue[0].price * tshirt;
        const usdHat = newValue[0].price * hat;
        setData({
          hoodie: Number(usdHoodie.toFixed(2)),
          beanie: Number(usdBeanie.toFixed(2)),
          tshirt: Number(usdTshirt.toFixed(2)),
          hat: Number(usdHat.toFixed(2))
        });
        
      });
    setState(true);
  };
  function changeData() {
    setData({
      hoodie: 24390243,
      beanie: 8130081,
      tshirt: 16129032,
      hat: 12096774
    });
    setState(false);
  }
  const [selectedPrice, setSelectedPrice] = useState({});
  return (
    <DesContainer>
      <h1 style={{ marginTop: 40, marginBottom: 15 }}>BONK MERCH DROP</h1>
      <p>
        Have the chance to own your very own custom designed Bonk Merch
        purchased with $BONK
      </p>
      <p style={{ marginBottom: 40 }}>
        Note: there is a 1% tax on all purchases that is burned!
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
      <div
        style={{
          display: "flex",
          flexWrap: "nowrap",
          justifyContent: "space-between",
          padding: "10px"
        }}
      >
        <div style={{ width: "20%", height: "auto", marginRight: "10px" }}>
          <img
            src={`${process.env.PUBLIC_URL}/hoodie.jpg`}
            alt="hoodie"
            style={{ width: "100%", height: "auto" }}
          />
          <button
            style={{ fontSize: "18px", backgroundColor: "red" }}
            onClick={() => setSelectedPrice({ hoodie: prices.hoodie })}
          >
            &nbsp;{data.hoodie}{!state ? " BONK" : " USDC"} &nbsp;
          </button>
        </div>
        <div style={{ width: "20%", height: "auto", marginRight: "10px" }}>
          <img
            src={`${process.env.PUBLIC_URL}/beanie.jpg`}
            alt="beanie"
            style={{ width: "100%", height: "auto" }}
          />
          <button
            style={{ fontSize: "18px", backgroundColor: "red" }}
            onClick={() => setSelectedPrice({ beanie: prices.beanie })}
          >
            &nbsp;{data.beanie}{!state ? " BONK" : " USDC"} &nbsp;
          </button>
        </div>
        <div style={{ width: "20%", height: "auto", marginRight: "10px" }}>
          <img
            src={`${process.env.PUBLIC_URL}/tshirt.jpg`}
            alt="tshirt"
            style={{ width: "100%", height: "auto" }}
          />
          <button
            style={{ fontSize: "18px", backgroundColor: "red" }}
            onClick={() => setSelectedPrice({ tshirt: prices.tshirt })}
          >
            &nbsp; {data.tshirt}{!state ? " BONK" : " USDC"} &nbsp;
          </button>
        </div>
        <div style={{ width: "20%", height: "auto", marginRight: "10px" }}>
          <img
            src={`${process.env.PUBLIC_URL}/hat.jpg`}
            alt="hat"
            style={{ width: "100%", height: "auto" }}
          />
          <button
            style={{ fontSize: "18px", backgroundColor: "red" }}
            onClick={() => setSelectedPrice({ hat: prices.hat })}
          >
            &nbsp;{data.hat}{!state ? " BONK" : " USDC"} &nbsp;
          </button>
        </div>
      </div>
      <div className="usdPriceButton">
        {!state ? (
          <button
            style={{
              fontSize: "20px",
              padding: "10px",
              color: "white",
              backgroundColor: "#f59a07",
              border: "1px solid white",
              borderRadius: "10px",
              cursor: "pointer"
            }}
            onClick={getData}
          >
            Show USDC price
            <p
              style={{
                fontSize: "13px",
                lineHeight:0,
                marginTop:"6px"
              }}
            >
              Powered by Orca
            </p>
          </button>
        ) : (
          <button
            style={{
              fontSize: "20px",
              padding: "10px",
              color: "white",
              backgroundColor: "#f59a07",
              border: "1px solid white",
              borderRadius: "10px",
              cursor: "pointer"
            }}
            onClick={changeData}
          >
            Show BONK price
            <p
              style={{
                fontSize: "13px",
                lineHeight:0,
                marginTop:"6px"
              }}
            >
              Powered by Orca
            </p>
          </button>
        )}
      </div>
      {selectedPrice && (
        <div>
          <p>Selected Item: {Object.keys(selectedPrice)[0]}</p>
          <p>
            Price with burn tax:{" "}
            {(Number(Object.values(selectedPrice)[0]) * 1.01).toFixed(0)} BONK
          </p>
        </div>
      )}
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
