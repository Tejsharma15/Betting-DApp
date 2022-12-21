import logo from './logo.svg';
import './App.css';
import {useMoralis, Moralis} from 'react-moralis'
import {Button, Container, Heading} from '@chakra-ui/react'
import {Navbar} from './components/Navbar'
import { useEffect } from 'react';
import MainContent from './components/MainContent';
import {abi} from './abi/betting_abi'
import Test from './components/Test'

function App() {
  const{authenticate, isAuthenticated, Moralis, web3, isWeb3Enabled} = useMoralis()
  console.log(isAuthenticated)
  const ABI = abi
  const auth = async () => {
    let user = Moralis.User.current();
    if(!user){
    try{
      authenticate()
      let user = await Moralis.authenticate({signingMessage: "Authenticate"})
      await Moralis.enableWeb3()
      console.log(user)
    }catch(err){
      console.log(err)
    }
  }
  }

  const func = async() => {
    const web3 = await Moralis.enableWeb3();
    const sendOptions = {
      contractAddress: "0x9A138407F2caF6B23056371DE5C000CD488aE826",
      functionName: "getCurrentGame",
      abi: ABI,
    }
    const transaction = await Moralis.executeFunction(sendOptions);
    console.log(transaction)
  } 

  if(isAuthenticated){
    return (
      <Container>
        <Navbar />
        <Button onClick={func}>Click</Button>
       {/* //<MainContent /> */}
      </Container>
    )
  }
  return(
    <Container>
      Login to continue
      <Button onClick={auth}>Authenticate</Button>
    </Container>
  )
}

export default App;
