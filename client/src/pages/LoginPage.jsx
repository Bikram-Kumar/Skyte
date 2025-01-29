import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';

function LoginPage() {
  const {
    isAuthenticated,
    loginWithRedirect,
  } = useAuth0();

  return !isAuthenticated && (
    <button onClick={loginWithRedirect}>Log in</button>
  );
}

export default LoginPage;