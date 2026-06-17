// src/pages/TermsOfService.js
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

const TermsSection = styled.section`
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

function TermsOfService() {
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
        <SectionTitle>Terms of Service</SectionTitle>
        
        <TermsSection>
          <p><strong>Last Updated:</strong> September 1, 2025</p>
          
          <p>
            These Terms of Service ("Terms") govern your access to and use of the 
            Echoes website and services. By accessing or using our services, you 
            agree to be bound by these Terms and our Privacy Policy.
          </p>
        </TermsSection>
        
        <TermsSection>
          <h2>Eligibility</h2>
          <p>
            You must be at least 13 years old to use our services. By agreeing to 
            these Terms, you represent and warrant that you meet this age requirement.
          </p>
        </TermsSection>
        
        <TermsSection>
          <h2>Account Registration</h2>
          <p>
            To access certain features of our services, you may need to create an 
            account. You agree to provide accurate, current, and complete information 
            during registration and to update such information to keep it accurate, 
            current, and complete.
          </p>
        </TermsSection>
        
        <TermsSection>
          <h2>User Responsibilities</h2>
          <p>You agree not to:</p>
          <ul>
            <li>Use the services for any illegal purpose</li>
            <li>Harass, threaten, or intimidate other users</li>
            <li>Upload or transmit viruses or malicious code</li>
            <li>Attempt to gain unauthorized access to our systems</li>
            <li>Reverse engineer or attempt to extract source code</li>
            <li>Use bots or automated processes to interact with our services</li>
          </ul>
        </TermsSection>
        
        <TermsSection>
          <h2>Intellectual Property</h2>
          <p>
            The services and all materials contained therein, including but not 
            limited to software, text, graphics, logos, and images, are owned by 
            Echoes or its licensors and are protected by copyright, trademark, 
            and other intellectual property laws.
          </p>
        </TermsSection>
        
        <TermsSection>
          <h2>Message Content</h2>
          <p>
            You retain ownership of the content you create and submit to our services. 
            However, you grant Echoes a worldwide, non-exclusive, royalty-free license 
            to use, reproduce, distribute, and display your content solely for the 
            purpose of providing our services.
          </p>
        </TermsSection>
        
        <TermsSection>
          <h2>Termination</h2>
          <p>
            We may terminate or suspend your account and access to our services 
            immediately, without prior notice, for any reason whatsoever, including 
            without limitation if you breach these Terms.
          </p>
        </TermsSection>
        
        <TermsSection>
          <h2>Disclaimer of Warranties</h2>
          <p>
            Our services are provided "as is" and "as available" without warranties 
            of any kind, either express or implied. We do not warrant that our services 
            will be uninterrupted, secure, or error-free.
          </p>
        </TermsSection>
        
        <TermsSection>
          <h2>Limitation of Liability</h2>
          <p>
            In no event shall Echoes be liable for any indirect, incidental, special, 
            consequential, or punitive damages, including without limitation, loss of 
            profits, data, use, goodwill, or other intangible losses, resulting from 
            your access to or use of or inability to access or use our services.
          </p>
        </TermsSection>
        
        <TermsSection>
          <h2>Changes to Terms</h2>
          <p>
            We reserve the right to modify these Terms at any time. We will notify 
            you of any changes by posting the new Terms on our website and updating 
            the "Last Updated" date.
          </p>
        </TermsSection>
        
        <TermsSection>
          <h2>Governing Law</h2>
          <p>
            These Terms shall be governed by and construed in accordance with the 
            laws of Nigeria, china, without regard to its conflict of law 
            provisions.
          </p>
        </TermsSection>
        
        <TermsSection>
          <h2>Contact Information</h2>
          <p>
            If you have any questions about these Terms, please contact us at:
          </p>
          <p>Email: chikahappiness589@gmail.com</p>
          <p>Address: 123 Echo FCT, Abuja</p>
        </TermsSection>
      </Content>
    </PageContainer>
  );
}

export default TermsOfService;
