// src/pages/PrivacyPolicy.js
import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const PageContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #f0f8ff 0%, #e6f7ff 100%);
  padding: 2rem 5%;
`;

const Header = styled.header`
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(10px);
  padding: 1rem 2rem;
  border-radius: 15px;
  box-shadow: 0 2px 15px rgba(44, 62, 80, 0.1);
  margin-bottom: 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Logo = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 1.5rem;
  font-weight: 700;
  color: #2c5aa0;

  i {
    color: #4a90e2;
  }
`;

const Button = styled.button`
  padding: 0.7rem 1.5rem;
  border-radius: 30px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  border: none;
  font-size: 1rem;

  &.primary {
    background: #4a90e2;
    color: white;

    &:hover {
      background: #2c5aa0;
    }
  }
`;

const Content = styled.div`
  background: white;
  border-radius: 15px;
  box-shadow: 0 10px 30px rgba(44, 62, 80, 0.1);
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
`;

const SectionTitle = styled.h1`
  color: #2c5aa0;
  text-align: center;
  margin-bottom: 2rem;
  font-size: 2.5rem;
`;

const PolicySection = styled.section`
  margin-bottom: 2rem;
  
  h2 {
    color: #2c5aa0;
    margin-bottom: 1rem;
  }
  
  h3 {
    color: #2c5aa0;
    margin: 1.5rem 0 0.5rem;
  }
  
  p {
    color: #555;
    line-height: 1.6;
    margin-bottom: 1rem;
  }
  
  ul {
    color: #555;
    line-height: 1.6;
    margin-bottom: 1rem;
    padding-left: 1.5rem;
  }
  
  li {
    margin-bottom: 0.5rem;
  }
`;

function PrivacyPolicy() {
  return (
    <PageContainer>
      <Header>
        <Logo>
          <i className="fas fa-water"></i>
          <span>Echoes</span>
        </Logo>
        <Link to="/signup">
          <Button className="primary">Get Started</Button>
        </Link>
      </Header>
      
      <Content>
        <SectionTitle>Privacy Policy</SectionTitle>
        
        <PolicySection>
          <p><strong>Last Updated:</strong> September 1, 2025</p>
          
          <p>
            Echoes we respects your privacy and is committed to 
            protecting your personal information. This Privacy Policy explains how 
            we collect, use, disclose, and safeguard your information when you use 
            our website and services.
          </p>
        </PolicySection>
        
        <PolicySection>
          <h2>Information We Collect</h2>
          
          <h3>Personal Information</h3>
          <p>We may collect personally identifiable information, such as:</p>
          <ul>
            <li>Name</li>
            <li>Email address</li>
            <li>Password</li>
            <li>Payment information</li>
            <li>Content of messages you create</li>
            <li>Device and browsing information</li>
          </ul>
          
          <h3>Non-Personal Information</h3>
          <p>We may also collect non-personal information, such as:</p>
          <ul>
            <li>Browser type and version</li>
            <li>Operating system</li>
            <li>IP address</li>
            <li>Pages visited and time spent</li>
            <li>Geographic location (approximate)</li>
          </ul>
        </PolicySection>
        
        <PolicySection>
          <h2>How We Use Your Information</h2>
          <p>We use your information for various purposes, including:</p>
          <ul>
            <li>To provide and maintain our services</li>
            <li>To notify you about changes to our services</li>
            <li>To allow participation in interactive features</li>
            <li>To provide customer support</li>
            <li>To gather analysis or valuable information for service improvement</li>
            <li>To detect, prevent, and address technical issues</li>
          </ul>
        </PolicySection>
        
        <PolicySection>
          <h2>Data Security</h2>
          <p>
            We implement robust security measures to protect your personal information, 
            including encryption, secure servers, and regular security audits. However, 
            no method of transmission over the Internet or electronic storage is 100% 
            secure, and we cannot guarantee absolute security.
          </p>
        </PolicySection>
        
        <PolicySection>
          <h2>Data Retention</h2>
          <p>
            We retain your personal information for as long as necessary to fulfill 
            the purposes outlined in this Privacy Policy, unless a longer retention 
            period is required or permitted by law.
          </p>
        </PolicySection>
        
        <PolicySection>
          <h2>Your Rights</h2>
          <p>You have certain rights regarding your personal information:</p>
          <ul>
            <li>The right to access your personal data</li>
            <li>The right to rectify inaccurate data</li>
            <li>The right to erase your data</li>
            <li>The right to restrict processing</li>
            <li>The right to data portability</li>
            <li>The right to withdraw consent</li>
          </ul>
        </PolicySection>
        
        <PolicySection>
          <h2>Contact Us</h2>
          <p>
            If you have any questions about this Privacy Policy, please contact us at:
          </p>
          <p>Email: chikahappiness589@gmail.com</p>
          <p>Address: 123 Echo FCT, Abuja</p>
        </PolicySection>
      </Content>
    </PageContainer>
  );
}

export default PrivacyPolicy;
