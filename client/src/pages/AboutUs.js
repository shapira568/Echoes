// src/pages/AboutUs.js
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

const MissionSection = styled.section`
  margin-bottom: 3rem;
  text-align: center;
  
  p {
    color: #555;
    font-size: 1.2rem;
    line-height: 1.6;
    max-width: 800px;
    margin: 0 auto;
  }
`;

const TeamSection = styled.section`
  margin-bottom: 3rem;
`;

const TeamTitle = styled.h2`
  color: #2c5aa0;
  text-align: center;
  margin-bottom: 2rem;
`;

const TeamGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
`;

const TeamMember = styled.div`
  text-align: center;
  
  .avatar {
    width: 120px;
    height: 120px;
    border-radius: 50%;
    background: #a3d5ff;
    margin: 0 auto 1rem;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 3rem;
    color: #4a90e2;
  }
  
  h3 {
    color: #2c5aa0;
    margin-bottom: 0.5rem;
  }
  
  p {
    color: #777;
    margin-bottom: 0.5rem;
  }
  
  .bio {
    color: #555;
    font-size: 0.9rem;
    line-height: 1.5;
  }
`;

const ValuesSection = styled.section`
  margin-bottom: 3rem;
`;

const ValuesTitle = styled.h2`
  color: #2c5aa0;
  text-align: center;
  margin-bottom: 2rem;
`;

const ValuesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
`;

const ValueCard = styled.div`
  background: #f8f9fa;
  border-radius: 10px;
  padding: 1.5rem;
  text-align: center;
  
  i {
    font-size: 2.5rem;
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

function AboutUs() {
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
        <SectionTitle>About Us</SectionTitle>
        
        <MissionSection>
          <p>
            Echoes was founded on the belief that our voices, thoughts, and feelings 
            have enduring value that extends beyond the present moment. We create 
            technology that bridges time, allowing people to send meaningful messages 
            to their future selves and loved ones.
          </p>
        </MissionSection>
        
        <TeamSection>
          <TeamTitle>Our Team</TeamTitle>
          <TeamGrid>
            <TeamMember>
              <div className="avatar">SH</div>
              <h3>Shapira Happiness</h3>
              <p>CEO & Founder</p>
              <div className="bio">
                Former psychologist with a passion for human connection across time. 
                Shapira founded Echoes after realizing the profound impact of temporal messaging.
              </div>
            </TeamMember>
            
            <TeamMember>
              <div className="avatar">DO</div>
              <h3>Daniel Ogbodo</h3>
              <p>CTO</p>
              <div className="bio">
                Award-winning engineer with expertise in AI and temporal databases. 
                Daniel leads our technical innovation efforts.
              </div>
            </TeamMember>
            
            <TeamMember>
              <div className="avatar">KE</div>
              <h3>Kelechi Ejiofor</h3>
              <p>Head of AI Research</p>
              <div className="bio">
                PhD in computational linguistics and emotional AI. Kelechi develops our 
                message enhancement algorithms.
              </div>
            </TeamMember>
            
            <TeamMember>
              <div className="avatar">SY</div>
              <h3>Suhaib Yola</h3>
              <p>UX Director</p>
              <div className="bio">
                Specializes in designing emotionally intelligent interfaces. Suhaib 
                ensures our platform feels human and intuitive.
              </div>
            </TeamMember>
          </TeamGrid>
        </TeamSection>
        
        <ValuesSection>
          <ValuesTitle>Our Values</ValuesTitle>
          <ValuesGrid>
            <ValueCard>
              <i className="fas fa-heart"></i>
              <h3>Compassion</h3>
              <p>
                We approach every interaction with empathy and understanding, 
                recognizing the deep emotional significance of our users' messages.
              </p>
            </ValueCard>
            
            <ValueCard>
              <i className="fas fa-shield-alt"></i>
              <h3>Privacy</h3>
              <p>
                We believe in the sanctity of personal thoughts and feelings. 
                Your messages are yours alone, protected by industry-leading security.
              </p>
            </ValueCard>
            
            <ValueCard>
              <i className="fas fa-infinity"></i>
              <h3>Longevity</h3>
              <p>
                We're committed to preserving your messages for decades to come, 
                using sustainable technology and responsible data practices.
              </p>
            </ValueCard>
          </ValuesGrid>
        </ValuesSection>
      </Content>
    </PageContainer>
  );
}

export default AboutUs;
