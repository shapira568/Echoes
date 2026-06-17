import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { authAPI } from '../services/api';

const Wrapper = styled.div`
  margin-top: 1rem;
`;

const Divider = styled.div`
  align-items: center;
  color: #7a8a99;
  display: flex;
  font-size: 0.9rem;
  gap: 0.75rem;
  margin: 1.2rem 0;

  &::before,
  &::after {
    background: #e1e8ed;
    content: "";
    flex: 1;
    height: 1px;
  }
`;

const GoogleMount = styled.div`
  display: flex;
  justify-content: center;
  min-height: 44px;
`;

const ConfigNotice = styled.div`
  background: #fff8e8;
  border: 1px solid #f1d089;
  border-radius: 8px;
  color: #76550f;
  font-size: 0.9rem;
  line-height: 1.4;
  padding: 0.75rem;
  text-align: center;
`;

const loadGoogleScript = () => new Promise((resolve, reject) => {
  if (window.google?.accounts?.id) {
    resolve();
    return;
  }

  const existingScript = document.querySelector('script[src="https://accounts.google.com/gsi/client"]');
  if (existingScript) {
    existingScript.addEventListener('load', resolve, { once: true });
    existingScript.addEventListener('error', reject, { once: true });
    return;
  }

  const script = document.createElement('script');
  script.src = 'https://accounts.google.com/gsi/client';
  script.async = true;
  script.defer = true;
  script.onload = resolve;
  script.onerror = reject;
  document.head.appendChild(script);
});

function GoogleAuthButton({ label = 'continue_with', onError }) {
  const buttonRef = useRef(null);
  const navigate = useNavigate();
  const [ready, setReady] = useState(false);
  const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;

  useEffect(() => {
    if (!clientId) return;

    let cancelled = false;

    loadGoogleScript()
      .then(() => {
        if (cancelled || !buttonRef.current) return;

        window.google.accounts.id.initialize({
          client_id: clientId,
          callback: async (response) => {
            try {
              const result = await authAPI.googleAuth({ credential: response.credential });
              localStorage.setItem('token', result.data.token);
              localStorage.setItem('user', JSON.stringify(result.data));
              navigate('/dashboard');
            } catch (error) {
              onError?.(error.response?.data?.message || 'Google sign-in failed. Please try again.');
            }
          }
        });

        buttonRef.current.innerHTML = '';
        window.google.accounts.id.renderButton(buttonRef.current, {
          theme: 'outline',
          size: 'large',
          width: buttonRef.current.offsetWidth || 320,
          text: label
        });
        setReady(true);
      })
      .catch(() => {
        onError?.('Unable to load Google sign-in right now.');
      });

    return () => {
      cancelled = true;
    };
  }, [clientId, label, navigate, onError]);

  return (
    <Wrapper>
      <Divider>or</Divider>
      {!clientId ? (
        <ConfigNotice>Google sign-in needs REACT_APP_GOOGLE_CLIENT_ID before it can be used.</ConfigNotice>
      ) : (
        <GoogleMount ref={buttonRef} aria-busy={!ready} />
      )}
    </Wrapper>
  );
}

export default GoogleAuthButton;
