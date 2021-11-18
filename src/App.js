import { useState, useCallback } from "react";
import { Col, Container, Row } from "react-bootstrap";
import "./App.css";
import useEagerConnect from './hooks/useEagerConnect';
import { useWeb3React } from '@web3-react/core';
import useAuth from './hooks/useAuth';
import { ToastContainer, toast } from 'react-toastify';
import { useTotalSupply, useMaxSupply, usePrice, usePublicSaleState, usePresaleState } from './hooks/dataFetcher';
import { usePresaleMint, usePublicSaleMint } from './hooks/useMint';
import 'react-toastify/dist/ReactToastify.css';


function App() {
  useEagerConnect();


  const { mint } = usePresaleMint();
  const { mintPublic } = usePublicSaleMint();


  const supply = useTotalSupply();
  const supplyMax = useMaxSupply();
  const price = usePrice();
  const presale = usePresaleState();
  const publicSale = usePublicSaleState();




  const { login, logout } = useAuth();
  const { account } = useWeb3React();

  const [num, setNum] = useState(1);
  const plus = () => {
    if (num < 1) setNum(num + 1);
  };
  const minus = () => {
    if (num > 1) {
      setNum(num - 1);
    }
  };

  console.log('asassa::::' , account , presale , publicSale)

  const connectMetamask = () => {
    localStorage.setItem('connectorId', 'injected');
    if (account) {
      logout();
    } else {
      login('injected');
    }
  };


  const Disconnect = async () => {
    logout();
    localStorage.setItem('connectorId', '');
  };


  const Mint = useCallback(async (e) => {
    e.preventDefault();
    if (!account) {
      toast.error('Please Connect Your Wallet');
      return;
    }

    if (num > 1) {
      toast.error('Can Only Mint 1 in one Transaction');
      return;
    }

    if (presale) {
      try {
        await mint(num, price)
      } catch (error) {
        console.log(error)
      }
    } else if (publicSale) {
      try {
        await mintPublic(num, price)
      } catch (error) {
        console.log(error)
      }
    } else {
      toast.error('Sale Is not active');
      return;
    }


  }, [mintPublic , mint])



  return (
    <>
      <ToastContainer />

      <div className="root">
        <div className="lefttree">
          <img
            className="img-fluid leftimg"
            src={require("./assets/img/left.svg").default}
            alt=""
          />
        </div>
        <div className="righttree">
          <img
            className="img-fluid rightimg"
            src={require("./assets/img/right.png").default}
            alt=""
          />
        </div>
        {/* <div className="birdsdiv">
          <img
            className="img-fluid birdimg"
            src={require("./assets/img/bird.png").default}
            alt=""
          />
        </div> */}
        <Container>
          <div className="cus-navb mt-3 d-flex justify-content-between align-items-center">
            <div className="logo">
              {/* <img
                className="img-fluid logo-img"
                src={require("./assets/img/logo.svg").default}
                alt=""
              /> */}
            </div>
            <div className="con-btn">
              {
                !account ?
                  <button className="cusbtn" onClick={connectMetamask}>Connect Wallet</button> :
                  <button className="cusbtn" onClick={Disconnect}>Disconnect</button>
              }
            </div>
          </div>

          <Row className="mt-5 pt-5">
            <Col
              className=" d-flex justify-content-center align-items-center "
              lg="6"
            >
              <div className="">
                <div className="button-mint d-flex justify-content-center">
                  <button className="minus mr-3" onClick={minus}>
                    -
                  </button>
                  <div className="display-number d-flex justify-content-center align-items-center">
                    <span className="number">{num}</span>
                  </div>
                  <button className="plus ml-3" onClick={plus}>
                    {/* <img
                      className="img-fluid opensealogo"
                      src={require("./assets/img/plusimg.png").default}
                      alt=""
                    /> */}
                    +
                  </button>
                </div>
                <div className="mintnowdiv text-center mt-5">
                  <button className="cusbtn" onClick={Mint}>Mint Now</button>
                </div>
                <div className="text-center mt-4">
                  <h3 className="subtitle"> {supply} / {supplyMax}</h3>
                </div>
                <div className="text-center mt-4">
                  <h3 className="subtitle">{price} ETH each</h3>
                  {/* <h3 className="subtitle">
                    # max. of 10 Punkins per transaction
                  </h3>
                  <h3 className="subtitle"># ERC-721 tokens</h3>
                  <h3 className="subtitle"># minted on Ethereum Mainnet</h3>
                  <h3 className="subtitle"># metadata stored on IFPS</h3> */}
                </div>
                <div className="text-center mt-5">
                  <img
                    className="img-fluid opensealogo"
                    src={require("./assets/img/opensea.png").default}
                    alt=""
                  />
                </div>
              </div>
            </Col>
            <Col lg="6" className="mbr">
              <div className="right-img">
                {/* <img
                  className="img-fluid rightlogo"
                  src={require("./assets/img/we.jpeg").default}
                  alt="" 
                 /> */}
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
}

export default App;
