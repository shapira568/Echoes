// src/pages/Signup.js
import React, { useState } from 'react';
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import { authAPI } from '../services/api';
import GoogleAuthButton from '../components/GoogleAuthButton';

const SignupContainer = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #f0f8ff 0%, #e6f7ff 100%);
  padding: 2rem;

  @media (max-width: 520px) {
    align-items: flex-start;
    padding: 1rem;
  }
`;

const SignupForm = styled.form`
  background: white;
  padding: 2.5rem;
  border-radius: 15px;
  box-shadow: 0 10px 30px rgba(44, 62, 80, 0.1);
  width: 100%;
  max-width: 450px;

  @media (max-width: 520px) {
    border-radius: 10px;
    padding: 1.25rem;
  }
`;

const Logo = styled.div`
  text-align: center;
  margin-bottom: 2rem;

  i {
    font-size: 3rem;
    color: #4a90e2;
    margin-bottom: 1rem;
  }

  h2 {
    color: #2c5aa0;
    font-size: 2rem;
  }
`;

const FormGroup = styled.div`
  margin-bottom: 1.5rem;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 600;
  color: #2c5aa0;
`;

const Input = styled.input`
  width: 100%;
  padding: 1rem;
  border: 2px solid #e1e8ed;
  border-radius: 10px;
  font-size: 1rem;
  transition: all 0.3s ease;

  &:focus {
    border-color: #4a90e2;
    outline: none;
    box-shadow: 0 0 0 3px rgba(74, 144, 226, 0.2);
  }
`;

const Button = styled.button`
  width: 100%;
  padding: 1.2rem;
  background: #4a90e2;
  color: white;
  border: none;
  border-radius: 10px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-top: 1rem;

  &:hover {
    background: #2c5aa0;
    transform: translateY(-3px);
    box-shadow: 0 10px 20px rgba(74, 144, 226, 0.3);
  }
`;

const Links = styled.div`
  text-align: center;
  margin-top: 1.5rem;

  p {
    color: #666;
    margin-bottom: 0.5rem;
  }

  a {
    color: #4a90e2;
    text-decoration: none;
    font-weight: 600;

    &:hover {
      text-decoration: underline;
    }
  }
`;

const ErrorMessage = styled.div`
  color: #e74c3c;
  background: #fdf2f2;
  padding: 0.75rem;
  border-radius: 5px;
  margin-bottom: 1rem;
  text-align: center;
`;

function Signup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await authAPI.register({
        name,
        email,
        password
      });
      
      // Store token in localStorage
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data));
      
      // Redirect to dashboard
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <SignupContainer>
      <SignupForm onSubmit={handleSubmit}>
        <Logo>
          <i className="fas fa-water"></i>
          <h2>Echoes</h2>
        </Logo>
        
        {error && <ErrorMessage>{error}</ErrorMessage>}
        
        <FormGroup>
          <Label htmlFor="name">Full Name</Label>
          <Input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </FormGroup>
        
        <FormGroup>
          <Label htmlFor="email">Email</Label>
          <Input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </FormGroup>
        
        <FormGroup>
          <Label htmlFor="password">Password</Label>
          <Input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </FormGroup>
        
        <Button type="submit">Sign Up</Button>

        <GoogleAuthButton label="signup_with" onError={setError} />
        
        <Links>
          <p>Already have an account? <Link to="/login">Log in</Link></p>
          <p><Link to="/">Back to Home</Link></p>
        </Links>
      </SignupForm>
    </SignupContainer>
  );
}

export default Signup;
