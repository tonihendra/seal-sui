// Copyright (c), Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0

import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { ConnectButton, useCurrentAccount } from '@mysten/dapp-kit';
import { Box, Button, Card, Container, Flex, Grid, Text, Heading } from '@radix-ui/themes';
import { CreateAllowlist } from './CreateAllowlist';
import { Allowlist } from './Allowlist';
import WalrusUpload from './EncryptAndUpload';
import { CreateService } from './CreateSubscriptionService';
import FeedsToSubscribe from './SubscriptionView';
import { Service } from './SubscriptionService';
import { AllAllowlist } from './OwnedAllowlists';
import { AllServices } from './OwnedSubscriptionServices';
import Feeds from './AllowlistView';
//import './App.css';

function HomePage() {
  return (
    <Container>
      <Flex justify="between" align="center" py="4">
        <Heading as="h1" size="4"></Heading>
        
      </Flex>

      <Flex direction="column" align="center" my="6">
        <Heading as="h2" size="6" mb="2">Welcome to Seal Reference App</Heading>
        <Text size="3" align="center">
          This application demonstrates Seal's capabilities with two different access methods: permission lists and subscriptions.
        </Text>
      </Flex>

      <Grid columns="2" gap="4" justify="center">
        <Card p="4">
          <Flex direction="column" align="center" gap="3">
            <Heading as="h3" size="4">Permission Lists</Heading>
            <Text size="2" align="center">
              Create and manage lists of authorized addresses for content access.
            </Text>
            <Flex gap="2">
              <Link to="/allowlist-example/admin/allowlists">
                <Button color="blue">View Lists</Button>
              </Link>
              <Link to="/allowlist-example">
                <Button color="green">Create New</Button>
              </Link>
            </Flex>
          </Flex>
        </Card>

        <Card p="4">
          <Flex direction="column" align="center" gap="3">
            <Heading as="h3" size="4">Subscription Services</Heading>
            <Text size="2" align="center">
              Create and manage subscription-based access to content.
            </Text>
            <Flex gap="2">
              <Link to="/subscription-example/admin/services">
                <Button color="blue">View Services</Button>
              </Link>
              <Link to="/subscription-example">
                <Button color="green">Create New</Button>
              </Link>
            </Flex>
          </Flex>
        </Card>
      </Grid>
  
    </Container>
  );

}

function App() {
  const currentAccount = useCurrentAccount();
  const [recipientAllowlist, setRecipientAllowlist] = useState('');
  const [capId, setCapId] = useState('');

  return (
    <Container>
      <Flex
  position="sticky"
  px="4"
  py="2"
  justify="between"
  style={{
    borderBottom: '5px solid white',
    paddingBottom: '2rem',
    marginBottom: '3rem',
  }}
>
  <h1 className="text-4xl font-bold text-white">SEAL On SUI Apps</h1>
  <Box>
    <ConnectButton />
  </Box>
</Flex>

      {currentAccount ? (
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route
              path="/allowlist-example/*"
              element={
                <Routes>
                  <Route path="/" element={<CreateAllowlist />} />
                  <Route
                    path="/admin/allowlist/:id"
                    element={
                      <div>
                        <Allowlist
                          setRecipientAllowlist={setRecipientAllowlist}
                          setCapId={setCapId}
                        />
                        <WalrusUpload
                          policyObject={recipientAllowlist}
                          cap_id={capId}
                          moduleName="allowlist"
                        />
                      </div>
                    }
                  />
                  <Route path="/admin/allowlists" element={<AllAllowlist />} />
                  <Route
                    path="/view/allowlist/:id"
                    element={<Feeds suiAddress={currentAccount.address} />}
                  />
                </Routes>
              }
            />
            <Route
              path="/subscription-example/*"
              element={
                <Routes>
                  <Route path="/" element={<CreateService />} />
                  <Route
                    path="/admin/service/:id"
                    element={
                      <div>
                        <Service
                          setRecipientAllowlist={setRecipientAllowlist}
                          setCapId={setCapId}
                        />
                        <WalrusUpload
                          policyObject={recipientAllowlist}
                          cap_id={capId}
                          moduleName="subscription"
                        />
                      </div>
                    }
                  />
                  <Route path="/admin/services" element={<AllServices />} />
                  <Route
                    path="/view/service/:id"
                    element={<FeedsToSubscribe suiAddress={currentAccount.address} />}
                  />
                </Routes>
              }
            />
          </Routes>
        </BrowserRouter>
      ) : (
       <div style={{ textAlign: 'center', marginTop: '2rem' }}>
    <p>Please connect your wallet to continue</p>
  </div>
      )}
	{/* Footer sederhana */}
      <div style={{ textAlign: 'center', marginTop: '4rem', paddingBottom: '2rem' }}>
        <h5 className="text-4xl font-bold text-white">Dencuan@2025</h5>
      </div>   

 </Container>
  );
}

export default App;

