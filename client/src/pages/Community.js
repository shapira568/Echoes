// src/pages/Community.js
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

const CommunityGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin: 2rem 0;
`;

const CommunityCard = styled.div`
  background: #f8f9fa;
  border-radius: 10px;
  padding: 1.5rem;
  box-shadow: 0 5px 15px rgba(44, 62, 80, 0.1);
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 25px rgba(74, 144, 226, 0.2);
  }
  
  i {
    font-size: 2rem;
    color: #4a90e2;
    margin-bottom: 1rem;
  }
  
  h3 {
    color: #2c5aa0;
    margin-bottom: 1rem;
  }
  
  p {
    color: #555;
    line-height: 1.6;
  }
`;

const Testimonial = styled.div`
  background: #f8f9fa;
  border-radius: 10px;
  padding: 1.5rem;
  margin: 1.5rem 0;
  position: relative;
  
  &::before {
    content: """;
    position: absolute;
    top: 20px;
    left: 20px;
    font-size: 5rem;
    color: #a3d5ff;
    font-family: Georgia, serif;
    line-height: 1;
  }
  
  p {
    margin-top: 2rem;
    font-style: italic;
    color: #555;
    line-height: 1.6;
  }
  
  .author {
    display: flex;
    align-items: center;
    margin-top: 1rem;
    
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
      }
      
      p {
        font-style: normal;
        font-size: 0.9rem;
        margin: 0;
      }
    }
  }
`;

function Community() {
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
        <SectionTitle>Echoes Community</SectionTitle>
        
        <FeatureSection>
          <FeatureTitle>Connect With Like-Minded Individuals</FeatureTitle>
          <FeatureDescription>
            The Echoes Community is a supportive space where people share their 
            experiences with time capsule messaging, personal growth journeys, 
            and meaningful connections across time. Join thousands of members 
            who are preserving their voices for the future.
          </FeatureDescription>
        </FeatureSection>
        
        <CommunityGrid>
          <CommunityCard>
            <i className="fas fa-users"></i>
            <h3>Discussion Forums</h3>
            <p>
              Engage in thoughtful conversations about personal development, 
              legacy planning, and meaningful communication with our vibrant community.
            </p>
          </CommunityCard>
          
          <CommunityCard>
            <i className="fas fa-calendar-alt"></i>
            <h3>Virtual Events</h3>
            <p>
              Participate in monthly webinars, workshops, and guided reflection sessions 
              led by therapists, life coaches, and community members.
            </p>
          </CommunityCard>
          
          <CommunityCard>
            <i className="fas fa-book-reader"></i>
            <h3>Resource Library</h3>
            <p>
              Access exclusive articles, guides, and templates to enhance your 
              Echoes experience and deepen your self-reflection practice.
            </p>
          </CommunityCard>
        </CommunityGrid>
        
        <FeatureSection>
          <FeatureTitle>Community Features</FeatureTitle>
          <FeatureDescription>
            Our community platform offers several ways to connect and grow:
          </FeatureDescription>
          <ul style={{ color: '#555', lineHeight: '1.6', paddingLeft: '1.5rem' }}>
            <li style={{ marginBottom: '0.5rem' }}>Private groups for specific interests (parents, professionals, creatives)</li>
            <li style={{ marginBottom: '0.5rem' }}>Mentorship programs pairing experienced users with newcomers</li>
            <li style={{ marginBottom: '0.5rem' }}>Monthly challenges to encourage consistent reflection</li>
            <li style={{ marginBottom: '0.5rem' }}>Community spotlights featuring inspiring member stories</li>
            <li style={{ marginBottom: '0.5rem' }}>Expert-led Q&A sessions on personal development topics</li>
            <li style={{ marginBottom: '0.5rem' }}>Collaborative projects for collective legacy creation</li>
          </ul>
        </FeatureSection>
        
        <FeatureSection>
          <FeatureTitle>Member Spotlights</FeatureTitle>
          
          <Testimonial>
            <p>
              Joining the Echoes Community transformed how I think about my future self. 
              The monthly challenges kept me engaged, and hearing other members' stories 
              gave me new perspectives on my own journey. The mentorship program paired 
              me with someone who had been using Echoes for three years, and their guidance 
              was invaluable.
            </p>
            <div className="author">
              <div className="avatar">EB</div>
              <div className="info">
                <h4>Ebele Ejiofor</h4>
                <p>Community Member for 2 years</p>
              </div>
            </div>
          </Testimonial>
          
          <Testimonial>
            <p>
              As a therapist, I appreciate how Echoes facilitates deeper conversations 
              between family members. The community forums have become a valuable resource 
              for exchanging therapeutic techniques and success stories. It's wonderful 
              to be part of a group that values emotional intelligence and intentional 
              communication.
            </p>
            <div className="author">
              <div className="avatar">DS</div>
              <div className="info">
                <h4>Dr. Sehetima</h4>
                <p>Licensed Therapist & Community Moderator</p>
              </div>
            </div>
          </Testimonial>
        </FeatureSection>
        
        <FeatureSection>
          <FeatureTitle>Getting Started</FeatureTitle>
          <FeatureDescription>
            Ready to join our community? Here's how to get started:
          </FeatureDescription>
          <ol style={{ color: '#555', lineHeight: '1.6', paddingLeft: '1.5rem' }}>
            <li style={{ marginBottom: '0.5rem' }}>Sign up for an Echoes account (free tier available)</li>
            <li style={{ marginBottom: '0.5rem' }}>Complete your profile with your interests and goals</li>
            <li style={{ marginBottom: '0.5rem' }}>Browse community groups and join those that interest you</li>
            <li style={{ marginBottom: '0.5rem' }}>Introduce yourself in the newcomer forum</li>
            <li style={{ marginBottom: '0.5rem' }}>Participate in weekly discussion topics</li>
            <li style={{ marginBottom: '0.5rem' }}>Attend your first virtual event or workshop</li>
          </ol>
        </FeatureSection>
      </Content>
    </PageContainer>
  );
}

export default Community;