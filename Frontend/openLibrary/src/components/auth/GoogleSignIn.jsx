import React, { useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { GOOGLE_CLIENT_ID } from '../../config/config';

const GoogleSignIn = () => {
  const { login } = useAuth();

  useEffect(() => {
    const loadGoogleScript = () => {
      const script = document.createElement('script');
      script.src = 'https://accounts.google.com/gsi/client';
      script.async = true;
      script.defer = true;
      document.body.appendChild(script);

      script.onload = () => {
        if (window.google) {
          window.google.accounts.id.initialize({
            client_id: GOOGLE_CLIENT_ID,
            callback: handleCredentialResponse,
          });

          window.google.accounts.id.renderButton(
            document.getElementById('google-signin-button'),
            {
              theme: 'outline',
              size: 'large',
              type: 'standard',
              shape: 'rectangular',
              text: 'signin_with',
              logo_alignment: 'left',
            }
          );
        }
      };
    };

    loadGoogleScript();
  }, []);

  const handleCredentialResponse = async (response) => {
    try {
      await login(response);
    } catch (error) {
      console.error('Sign-in error:', error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <h2 className="text-2xl font-serif font-medium text-gray-800">Sign in to Digital Library</h2>
      <p className="text-gray-600 mb-4">Use your Google account to continue</p>
      <div id="google-signin-button" className="mt-2"></div>
    </div>
  );
};

export default GoogleSignIn;
