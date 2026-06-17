// src/pages/VoiceMessages.js
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

const AudioPlayer = styled.div`
  background: #f8f9fa;
  border-radius: 10px;
  padding: 1.5rem;
  margin: 1.5rem 0;
  text-align: center;
  
  .player-controls {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 1rem;
    margin-top: 1rem;
  }
  
  button {
    background: #4a90e2;
    color: white;
    border: none;
    border-radius: 50%;
    width: 50px;
    height: 50px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    
    &:hover {
      background: #2c5aa0;
    }
  }
`;

function VoiceMessages() {
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
        <SectionTitle>Voice Messages</SectionTitle>
        
        <FeatureSection>
          <FeatureTitle>Speak From the Heart</FeatureTitle>
          <FeatureDescription>
            Voice messages allow you to capture the nuances of your voice, tone, and emotion 
            that written words sometimes can't convey. Record heartfelt messages to your 
            future self or loved ones, preserving not just your words but the way you say them.
          </FeatureDescription>
        </FeatureSection>
        
        <FeatureSection>
          <FeatureTitle>Easy Recording</FeatureTitle>
          <FeatureDescription>
            Our intuitive recording interface makes it simple to capture your voice:
          </FeatureDescription>
          <FeatureList>
            <li>One-click recording start/stop</li>
            <li>Real-time recording timer and visualization</li>
            <li>Playback and review before saving</li>
            <li>Trim and edit capabilities</li>
            <li>Multiple takes with automatic saving</li>
          </FeatureList>
        </FeatureSection>
        
        <FeatureSection>
          <FeatureTitle>AI Voice Enhancement</FeatureTitle>
          <FeatureDescription>
            Our AI technology can enhance your voice messages by:
          </FeatureDescription>
          <FeatureList>
            <li>Improving audio clarity and reducing background noise</li>
            <li>Adjusting volume levels for optimal listening</li>
            <li>Adding emotional resonance while preserving authenticity</li>
            <li>Converting to text for searchable archives</li>
          </FeatureList>
        </FeatureSection>
        
        <FeatureSection>
          <FeatureTitle>Delivery Options</FeatureTitle>
          <FeatureDescription>
            Schedule your voice messages to arrive exactly when they're needed:
          </FeatureDescription>
          <FeatureList>
            <li>Specific dates (anniversaries, birthdays, milestones)</li>
            <li>Life events (graduations, weddings, new jobs)</li>
            <li>Emotional triggers (based on your mood or circumstances)</li>
            <li>Random delivery within a timeframe</li>
          </FeatureList>
        </FeatureSection>
        
        <FeatureSection>
          <FeatureTitle>Audio Player</FeatureTitle>
          <AudioPlayer>
            <p>Voice Message Preview</p>
            <div className="player-controls">
              <button><i className="fas fa-play"></i></button>
              <button><i className="fas fa-pause"></i></button>
              <button><i className="fas fa-stop"></i></button>
            </div>
            <p><small>00:00 / 02:45</small></p>
          </AudioPlayer>
          <FeatureDescription>
            Our built-in audio player provides a seamless listening experience across all devices. 
            Messages are automatically optimized for the best playback quality.
          </FeatureDescription>
        </FeatureSection>
      </Content>
    </PageContainer>
  );
}

export default VoiceMessages;
