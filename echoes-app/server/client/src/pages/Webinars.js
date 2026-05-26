// src/pages/Webinars.js
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

const WebinarGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin: 2rem 0;
`;

const WebinarCard = styled.div`
  background: #f8f9fa;
  border-radius: 10px;
  padding: 1.5rem;
  box-shadow: 0 5px 15px rgba(44, 62, 80, 0.1);
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 25px rgba(74, 144, 226, 0.2);
  }
  
  .date-badge {
    position: absolute;
    top: 15px;
    right: 15px;
    background: #4a90e2;
    color: white;
    padding: 0.3rem 0.7rem;
    border-radius: 20px;
    font-size: 0.8rem;
    font-weight: bold;
  }
  
  h3 {
    color: #2c5aa0;
    margin-bottom: 1rem;
    margin-top: 1rem;
  }
  
  p {
    color: #555;
    line-height: 1.6;
    margin-bottom: 1rem;
  }
  
  .speaker {
    display: flex;
    align-items: center;
    margin-top: 1rem;
    padding-top: 1rem;
    border-top: 1px solid #eee;
    
    .avatar {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      background: #a3d5ff;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-right: 1rem;
      font-weight: bold;
      color: #4a90e2;
    }
    
    .info {
      h4 {
        color: #2c5aa0;
        margin-bottom: 0.2rem;
      }
      
      p {
        color: #777;
        font-size: 0.9rem;
        margin: 0;
      }
    }
  }
  
  .register-button {
    width: 100%;
    padding: 0.7rem;
    background: #4a90e2;
    color: white;
    border: none;
    border-radius: 30px;
    font-weight: 600;
    cursor: pointer;
    margin-top: 1rem;
    transition: all 0.3s ease;
    
    &:hover {
      background: #2c5aa0;
    }
  }
`;

const UpcomingSection = styled.div`
  background: #f8f9fa;
  border-radius: 10px;
  padding: 2rem;
  margin: 2rem 0;
  
  h2 {
    color: #2c5aa0;
    margin-bottom: 1.5rem;
    text-align: center;
  }
`;

function Webinars() {
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
        <SectionTitle>Echoes Webinars</SectionTitle>
        
        <FeatureSection>
          <FeatureTitle>Expand Your Horizons</FeatureTitle>
          <FeatureDescription>
            Join our expert-led webinars to deepen your understanding of personal 
            growth, legacy planning, and meaningful communication. Our webinars 
            feature renowned psychologists, life coaches, authors, and community 
            members who share practical insights and transformative techniques.
          </FeatureDescription>
        </FeatureSection>
        
        <UpcomingSection>
          <h2>Upcoming Webinars</h2>
          
          <WebinarGrid>
            <WebinarCard>
              <div className="date-badge">Sep 15, 2025</div>
              <h3>Writing Letters to Your Future Self</h3>
              <p>
                Learn the art and science of crafting meaningful messages that 
                will resonate with your future self. Expert tips on emotional 
                authenticity and long-term relevance.
              </p>
              <div className="speaker">
                <div className="avatar">FO</div>
                <div className="info">
                  <h4>Dr. Favour Okafor</h4>
                  <p>Psychologist & Author</p>
                </div>
              </div>
              <button className="register-button">Register Now</button>
            </WebinarCard>
            
            <WebinarCard>
              <div className="date-badge">Sep 22, 2025</div>
              <h3>Preserving Family Stories for Generations</h3>
              <p>
                Discover effective techniques for collecting, curating, and 
                preserving family narratives that connect generations and 
                strengthen family bonds.
              </p>
              <div className="speaker">
                <div className="avatar">SA</div>
                <div className="info">
                  <h4>Sanayah Amadubello</h4>
                  <p>Genealogist & Storyteller</p>
                </div>
              </div>
              <button className="register-button">Register Now</button>
            </WebinarCard>
            
            <WebinarCard>
              <div className="date-badge">Sep 29, 2025</div>
              <h3>Mindfulness and Emotional Intelligence</h3>
              <p>
                Develop greater self-awareness and emotional regulation skills 
                to enhance your Echoes messages and daily relationships.
              </p>
              <div className="speaker">
                <div className="avatar">MT</div>
                <div className="info">
                  <h4>Miracl Timothy</h4>
                  <p>Mindfulness Instructor</p>
                </div>
              </div>
              <button className="register-button">Register Now</button>
            </WebinarCard>
          </WebinarGrid>
        </UpcomingSection>
        
        <FeatureSection>
          <FeatureTitle>Past Webinar Recordings</FeatureTitle>
          <FeatureDescription>
            Miss a live webinar? Access recordings of our most popular sessions:
          </FeatureDescription>
          
          <WebinarGrid>
            <WebinarCard>
              <h3>The Psychology of Time Perception</h3>
              <p>
                Understanding how we perceive time and why future messages 
                have such powerful psychological effects.
              </p>
              <div className="speaker">
                <div className="avatar">PD</div>
                <div className="info">
                  <h4>Prof. Peter David</h4>
                  <p>Cognitive Psychologist</p>
                </div>
              </div>
              <button className="register-button">Watch Recording</button>
            </WebinarCard>
            
            <WebinarCard>
              <h3>Digital Legacy Planning Essentials</h3>
              <p>
                Practical steps for ensuring your digital presence benefits 
                loved ones after you're gone.
              </p>
              <div className="speaker">
                <div className="avatar">EC</div>
                <div className="info">
                  <h4>Emma Chima</h4>
                  <p>Estate Planning Attorney</p>
                </div>
              </div>
              <button className="register-button">Watch Recording</button>
            </WebinarCard>
            
            <WebinarCard>
              <h3>AI Ethics in Personal Messaging</h3>
              <p>
                How Echoes balances technological innovation with privacy 
              </p>
              <div className="speaker">
                <div className="avatar">AJ</div>
                <div className="info">
                  <h4>Alex Johnson</h4>
                  <p>AI Ethics Researcher</p>
                </div>
              </div>
              <button className="register-button">Watch Recording</button>
            </WebinarCard>
          </WebinarGrid>
        </FeatureSection>
        
        <FeatureSection>
          <FeatureTitle>Webinar Series</FeatureTitle>
          <FeatureDescription>
            Our comprehensive webinar series designed to take you from beginner 
            to expert in personal legacy creation:
          </FeatureDescription>
          <ol style={{ color: '#555', lineHeight: '1.6', paddingLeft: '1.5rem' }}>
            <li style={{ marginBottom: '0.5rem' }}>Foundation Series: Getting Started with Echoes (4 sessions)</li>
            <li style={{ marginBottom: '0.5rem' }}>Advanced Techniques: Crafting Meaningful Messages (6 sessions)</li>
            <li style={{ marginBottom: '0.5rem' }}>Special Applications: Family Legacy & Professional Development (4 sessions)</li>
            <li style={{ marginBottom: '0.5rem' }}>Master Class: Becoming a Legacy Planning Expert (8 sessions)</li>
          </ol>
          <p style={{ color: '#555', lineHeight: '1.6', marginTop: '1rem' }}>
            <strong>Special Offer:</strong> Subscribe to our webinar series and save 30% on individual session prices.
          </p>
        </FeatureSection>
      </Content>
    </PageContainer>
  );
}

export default Webinars;