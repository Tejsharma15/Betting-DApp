import React from "react";
import { useMoralis} from "react-moralis";
import {abi} from '../abi/betting_abi'
const Test = () => {
  const {Moralis} = useMoralis()
  
  const ABI = abi ; // Add ABI of 0xdAC17F958D2ee523a2206206994597C13D831ec7
  const readOptions = {
    contractAddress: "0x9A138407F2caF6B23056371DE5C000CD488aE826",
    functionName: "getCurrentGame",
    abi: ABI,
  };
  const transfer = async() => {
    const ethers = Moralis.web3Library;
    const web3Provider = await Moralis.enableWeb3();
    const signer = web3Provider.getSigner();
    // const contract = new ethers.Contract('0x9A138407F2caF6B23056371DE5C000CD488aE826', ABI, signer);
    const message = await Moralis.executeFunction(readOptions);
    console.log(message);
  }
  return (
    // Use your custom error component to show errors
    <div style={{ height: "100vh", overflow: "auto" }}>
      <div>
        <button onClick={transfer}>
          Hello
        </button>
      </div>
    </div>
  );
};

export default Test