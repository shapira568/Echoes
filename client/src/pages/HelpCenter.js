// src/pages/HelpCenter.js
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

const FAQSection = styled.section`
  margin-bottom: 3rem;
`;

const FAQTitle = styled.h2`
  color: #2c5aa0;
  margin-bottom: 1rem;
`;

const FAQItem = styled.div`
  margin-bottom: 1.5rem;
  border-bottom: 1px solid #eee;
  padding-bottom: 1.5rem;
  
  h3 {
    color: #2c5aa0;
    margin-bottom: 0.5rem;
  }
  
  p {
    color: #555;
    line-height: 1.6;
  }
`;

const ContactSection = styled.section`
  background: #f8f9fa;
  border-radius: 10px;
  padding: 2rem;
  text-align: center;
  
  h2 {
    color: #2c5aa0;
    margin-bottom: 1rem;
  }
  
  p {
    color: #555;
    margin-bottom: 1.5rem;
  }
`;

function HelpCenter() {
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
        <SectionTitle>Help Center</SectionTitle>
        
        <FAQSection>
          <FAQTitle>Frequently Asked Questions</FAQTitle>
          
          <FAQItem>
            <h3>How do I create my first message?</h3>
            <p>
              After signing up, go to your dashboard and click "Create New Message". 
              Choose your message type (text, voice, or video), write your message, 
              set delivery options, and click "Send Message".
            </p>
          </FAQItem>
          
          <FAQItem>
            <h3>Can I edit a message after I've sent it?</h3>
            <p>
              Yes, you can edit messages that haven't been delivered yet. 
              Go to your dashboard, find the message in your list, and click the edit button. 
              Note that messages scheduled for immediate delivery cannot be edited.
            </p>
          </FAQItem>
          
          <FAQItem>
            <h3>How does AI enhancement work?</h3>
            <p>
              Our AI enhancement feature analyzes your message's emotional content and 
              linguistic patterns, then enhances it while preserving your authentic voice. 
              You can choose to enable or disable this feature for each message.
            </p>
          </FAQItem>
          
          <FAQItem>
            <h3>What happens if I forget my password?</h3>
            <p>
              Click "Forgot Password" on the login page and enter your email address. 
              We'll send you a link to reset your password. Make sure to check your spam folder 
              if you don't see the email within a few minutes.
            </p>
          </FAQItem>
          
          <FAQItem>
            <h3>Can I cancel a scheduled message?</h3>
            <p>
              Yes, you can cancel any scheduled message before its delivery date. 
              Go to your dashboard, find the message, and click the cancel button. 
              Canceled messages are moved to your archive.
            </p>
          </FAQItem>
        </FAQSection>
        
        <ContactSection>
          <h2>Need More Help?</h2>
          <p>
            Our support team is here to assist you with any questions or issues you might have.
          </p>
          <p>Email: chikahappiness589@gmail.com</p>
          <p>Hours: Monday-Friday, 9AM-5PM EST</p>
        </ContactSection>
      </Content>
    </PageContainer>
  );
}

export default HelpCenter;
