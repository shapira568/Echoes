// src/pages/TextMessages.js
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

const FeatureSection = styled.section`
  margin-bottom: 3rem;
`;

const FeatureTitle = styled.h2`
  color: #2c5aa0;
  margin-bottom: 1rem;
`;

const FeatureDescription = styled.p`
  color: #555;
  line-height: 1.6;
  margin-bottom: 1.5rem;
`;

const FeatureList = styled.ul`
  list-style-type: none;
  padding: 0;
  
  li {
    padding: 0.5rem 0;
    border-bottom: 1px solid #eee;
    
    &:before {
      content: "✓";
      color: #4a90e2;
      font-weight: bold;
      margin-right: 10px;
    }
  }
`;

function TextMessages() {
  return (
    <PageContainer>
      <Header>
        <Logo>
          <i className="fas fa-water"></i>
          <span>Echoes</span>
        </Logo>
        <Link to="/dashboard">
          <Button className="primary">Go to Dashboard</Button>
        </Link>
      </Header>
      
      <Content>
        <SectionTitle>Text Messages</SectionTitle>
        
        <FeatureSection>
          <FeatureTitle>Capture Your Thoughts</FeatureTitle>
          <FeatureDescription>
            Text messages allow you to express your deepest thoughts and feelings in writing. 
            Whether it's advice for your future self, a letter to a loved one, or a reflection 
            on your current life stage, our text messaging feature provides a timeless way 
            to preserve your voice.
          </FeatureDescription>
        </FeatureSection>
        
        <FeatureSection>
          <FeatureTitle>Rich Text Editing</FeatureTitle>
          <FeatureDescription>
            Our rich text editor allows you to format your messages with:
          </FeatureDescription>
          <FeatureList>
            <li>Bold, italic, and underline formatting</li>
            <li>Bullet points and numbered lists</li>
            <li>Headings and subheadings for organization</li>
            <li>Hyperlinks to external resources</li>
            <li>Special characters and emojis</li>
          </FeatureList>
        </FeatureSection>
        
        <FeatureSection>
          <FeatureTitle>AI Enhancement</FeatureTitle>
          <FeatureDescription>
            Transform your raw thoughts into poetic reflections with our AI enhancement feature. 
            Our compassionate AI analyzes your message and refines it to preserve your authentic 
            voice while adding emotional depth and resonance.
          </FeatureDescription>
        </FeatureSection>
        
        <FeatureSection>
          <FeatureTitle>Delivery Options</FeatureTitle>
          <FeatureDescription>
            Schedule your text messages to arrive exactly when they're needed:
          </FeatureDescription>
          <FeatureList>
            <li>Specific dates (anniversaries, birthdays, milestones)</li>
            <li>Life events (graduations, weddings, new jobs)</li>
            <li>Emotional triggers (based on your mood or circumstances)</li>
            <li>Random delivery within a timeframe</li>
          </FeatureList>
        </FeatureSection>
      </Content>
    </PageContainer>
  );
}

export default TextMessages;