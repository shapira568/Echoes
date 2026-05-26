// src/pages/EventTriggers.js
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

const TriggerExample = styled.div`
  background: #f8f9fa;
  border-radius: 10px;
  padding: 1.5rem;
  margin: 1.5rem 0;
  
  h3 {
    color: #2c5aa0;
    margin-bottom: 1rem;
  }
  
  p {
    color: #555;
    line-height: 1.6;
  }
`;

function EventTriggers() {
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
        <SectionTitle>Event Triggers</SectionTitle>
        
        <FeatureSection>
          <FeatureTitle>Send Messages When It Matters Most</FeatureTitle>
          <FeatureDescription>
            Event triggers allow you to schedule your messages to arrive exactly when they're 
            needed most. Instead of relying on arbitrary dates, our intelligent triggering 
            system delivers your messages based on life events, emotional states, or meaningful 
            milestones.
          </FeatureDescription>
        </FeatureSection>
        
        <FeatureSection>
          <FeatureTitle>Types of Event Triggers</FeatureTitle>
          <FeatureList>
            <li>Date-based triggers (birthdays, anniversaries, holidays)</li>
            <li>Life event triggers (graduations, weddings, new jobs)</li>
            <li>Emotional state triggers (detected through journaling or mood tracking)</li>
            <li>Milestone triggers (age milestones, career achievements)</li>
            <li>Random delivery within timeframes</li>
          </FeatureList>
        </FeatureSection>
        
        <FeatureSection>
          <FeatureTitle>Trigger Examples</FeatureTitle>
          
          <TriggerExample>
            <h3>Graduation Trigger</h3>
            <p>
              "Send this message to my future self on the day I graduate from college." 
              The message arrives exactly when you walk across the graduation stage, 
              providing encouragement and reflection on your academic journey.
            </p>
          </TriggerExample>
          
          <TriggerExample>
            <h3>Wedding Anniversary Trigger</h3>
            <p>
              "Deliver this message to my spouse every year on our wedding anniversary." 
              Relive special memories and reaffirm your commitment with personalized 
              messages that arrive automatically each year.
            </p>
          </TriggerExample>
          
          <TriggerExample>
            <h3>Emotional State Trigger</h3>
            <p>
              "Send this message when I indicate I'm feeling overwhelmed or stressed." 
              Receive personalized encouragement and coping strategies exactly when 
              you need them most through our mood tracking integration.
            </p>
          </TriggerExample>
        </FeatureSection>
        
        <FeatureSection>
          <FeatureTitle>Smart Detection</FeatureTitle>
          <FeatureDescription>
            Our advanced algorithms use multiple data sources to intelligently detect 
            when trigger events occur:
          </FeatureDescription>
          <FeatureList>
            <li>Calendar integration for date-based events</li>
            <li>Social media activity analysis for life milestones</li>
            <li>Mood tracking for emotional state detection</li>
            <li>Email parsing for important life announcements</li>
            <li>User-submitted event logging</li>
          </FeatureList>
        </FeatureSection>
      </Content>
    </PageContainer>
  );
}

export default EventTriggers;