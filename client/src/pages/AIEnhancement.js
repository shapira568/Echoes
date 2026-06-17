// src/pages/AIEnhancement.js
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

const AIExample = styled.div`
  background: #f8f9fa;
  border-radius: 10px;
  padding: 1.5rem;
  margin: 1.5rem 0;
  
  .example-title {
    font-weight: bold;
    color: #2c5aa0;
    margin-bottom: 1rem;
  }
  
  .example-content {
    background: white;
    border-radius: 8px;
    padding: 1rem;
    margin: 0.5rem 0;
  }
`;

function AIEnhancement() {
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
        <SectionTitle>AI Enhancement</SectionTitle>
        
        <FeatureSection>
          <FeatureTitle>Transform Raw Emotions Into Meaningful Reflections</FeatureTitle>
          <FeatureDescription>
            Our compassionate AI enhancement feature helps you refine your messages into poetic, 
            emotionally resonant reflections that preserve your authentic voice while adding 
            depth and meaning. The AI analyzes your raw emotions and enhances them without 
            losing your personal touch.
          </FeatureDescription>
        </FeatureSection>
        
        <FeatureSection>
          <FeatureTitle>How AI Enhancement Works</FeatureTitle>
          <FeatureDescription>
            Our AI enhancement process involves several sophisticated steps:
          </FeatureDescription>
          <FeatureList>
            <li>Analysis of your message's emotional tone and key themes</li>
            <li>Identification of personal stories and significant moments</li>
            <li>Enhancement of language while preserving your unique voice</li>
            <li>Addition of poetic elements and emotional depth</li>
            <li>Contextual understanding based on your message history</li>
          </FeatureList>
        </FeatureSection>
        
        <FeatureSection>
          <FeatureTitle>AI Enhancement Examples</FeatureTitle>
          
          <AIExample>
            <div className="example-title">Original Message:</div>
            <div className="example-content">
              "I'm feeling really stressed about work right now. Things are tough but I know I can get through this. Just wanted to remind myself that this is temporary."
            </div>
            
            <div className="example-title">AI Enhanced Message:</div>
            <div className="example-content">
              "In this moment of challenge, know that your resilience flows like a river—sometimes calm, sometimes turbulent, but always moving forward. The weight you carry today is not forever; it is a season that will pass. Trust in your strength, for you have weathered storms before and emerged stronger. This temporary trial is shaping the wisdom you'll need for tomorrow's victories."
            </div>
          </AIExample>
        </FeatureSection>
        
        <FeatureSection>
          <FeatureTitle>Personalization Through Context</FeatureTitle>
          <FeatureDescription>
            Our AI doesn't work in isolation—it learns from your message history to create 
            personalized enhancements:
          </FeatureDescription>
          <FeatureList>
            <li>Analyzes patterns in your previous messages</li>
            <li>Recognizes recurring themes and concerns</li>
            <li>References personal milestones and experiences</li>
            <li>Maintains consistency with your communication style</li>
            <li>Builds upon your growth journey over time</li>
          </FeatureList>
        </FeatureSection>
        
        <FeatureSection>
          <FeatureTitle>Privacy and Control</FeatureTitle>
          <FeatureDescription>
            Your privacy is paramount. Our AI enhancement feature:
          </FeatureDescription>
          <FeatureList>
            <li>Processes messages locally whenever possible</li>
            <li>Never shares your content without explicit permission</li>
            <li>Allows you to review and edit AI suggestions</li>
            <li>Gives you complete control to accept or reject enhancements</li>
            <li>Respects your choice to use AI enhancement selectively</li>
          </FeatureList>
        </FeatureSection>
      </Content>
    </PageContainer>
  );
}

export default AIEnhancement;
