import React from 'react';
import { Auth0Provider } from '@auth0/auth0-react';

const Auth0ProviderWithHistory = ({ children }) => {
  const domain = import.meta.env.VITE_AUTH0_DOMAIN;
  const clientId = import.meta.env.VITE_AUTH0_CLIENT_ID;
  
  // Determinar la URL de callback según el entorno
  const isProduction = window.location.hostname === 'lilianadam1.github.io';
  const redirectUri = isProduction 
    ? 'https://lilianadam1.github.io/callback'
    : window.location.origin + '/callback';

  return (
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      authorizationParams={{
        redirect_uri: redirectUri,
        audience: 'https://lilianadam1.github.io',
      }}
    >
      {children}
    </Auth0Provider>
  );
};

export default Auth0ProviderWithHistory;
