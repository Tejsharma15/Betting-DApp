import { Button, Container, Heading } from '@chakra-ui/react';
import { useMoralis } from 'react-moralis';
import React from 'react';
export function Navbar() {
    const{logout} = useMoralis();
    return(
        <Container>
            <Heading>Welcome to Fut-Fantasyy</Heading>
            <Heading>Place bets for matches</Heading>
            <Button onClick={logout}>Logout</Button>
        </Container>
    )
}