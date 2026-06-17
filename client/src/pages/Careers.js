// src/pages/Careers.js
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

const IntroSection = styled.section`
  text-align: center;
  margin-bottom: 3rem;
  
  p {
    color: #555;
    font-size: 1.2rem;
    line-height: 1.6;
    max-width: 800px;
    margin: 0 auto 1.5rem;
  }
`;

const CultureSection = styled.section`
  margin-bottom: 3rem;
`;

const CultureTitle = styled.h2`
  color: #2c5aa0;
  text-align: center;
  margin-bottom: 2rem;
`;

const CultureGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
`;

const CultureCard = styled.div`
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

const PositionsSection = styled.section`
  margin-bottom: 3rem;
`;

const PositionsTitle = styled.h2`
  color: #2c5aa0;
  text-align: center;
  margin-bottom: 2rem;
`;

const PositionList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
`;

const PositionCard = styled.div`
  background: #f8f9fa;
  border-radius: 10px;
  padding: 1.5rem;
  border-left: 4px solid #4a90e2;
  
  h3 {
    color: #2c5aa0;
    margin-bottom: 0.5rem;
  }
  
  .department {
    color: #777;
    font-weight: 600;
    margin-bottom: 1rem;
    display: block;
  }
  
  p {
    color: #555;
    line-height: 1.6;
    margin-bottom: 1rem;
  }
  
  .location {
    color: #4a90e2;
    font-weight: 600;
  }
`;

const BenefitsSection = styled.section`
  margin-bottom: 3rem;
`;

const BenefitsTitle = styled.h2`
  color: #2c5aa0;
  text-align: center;
  margin-bottom: 2rem;
`;

const BenefitsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
`;

const BenefitCard = styled.div`
  background: #f8f9fa;
  border-radius: 10px;
  padding: 1.5rem;
  text-align: center;
  
  i {
    font-size: 2rem;
    color: #4a90e2;
    margin-bottom: 1rem;
  }
  
  h3 {
    color: #2c5aa0;
    margin-bottom: 0.5rem;
  }
  
  p {
    color: #555;
    font-size: 0.9rem;
  }
`;

function Careers() {
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
        <SectionTitle>Join Our Team</SectionTitle>
        
        <IntroSection>
          <p>
            At Echoes, we're building technology that connects people across time. 
            We're looking for passionate individuals who care about preserving human 
            connection and creating meaningful experiences.
          </p>
          <p>
            Join us in our mission to help people send messages that matter to the 
            people who matter most - whether that's their future self or loved ones.
          </p>
        </IntroSection>
        
        <CultureSection>
          <CultureTitle>Our Culture</CultureTitle>
          <CultureGrid>
            <CultureCard>
              <i className="fas fa-users"></i>
              <h3>Collaborative</h3>
              <p>
                We believe the best ideas emerge when diverse perspectives come together. 
                Every voice matters in our collaborative environment.
              </p>
            </CultureCard>
            
            <CultureCard>
              <i className="fas fa-rocket"></i>
              <h3>Innovative</h3>
              <p>
                We encourage experimentation and creative thinking. Failure is 
                viewed as a learning opportunity, not a setback.
              </p>
            </CultureCard>
            
            <CultureCard>
              <i className="fas fa-balance-scale"></i>
              <h3>Ethical</h3>
              <p>
                We prioritize user privacy and wellbeing above all else. 
                Our technology serves humanity, not the other way around.
              </p>
            </CultureCard>
          </CultureGrid>
        </CultureSection>
        
        <PositionsSection>
          <PositionsTitle>Open Positions</PositionsTitle>
          <PositionList>
            <PositionCard>
              <h3>Senior Frontend Engineer</h3>
              <span className="department">Engineering</span>
              <p>
                Help us build beautiful, emotionally intelligent interfaces that 
                make it easy for people to create meaningful messages.
              </p>
              <span className="location">Remote</span>
            </PositionCard>
            
            <PositionCard>
              <h3>AI Research Scientist</h3>
              <span className="department">AI/ML</span>
              <p>
                Develop cutting-edge natural language processing models that 
                enhance human communication across time.
              </p>
              <span className="location">English Language, EN</span>
            </PositionCard>
            
            <PositionCard>
              <h3>Product Designer</h3>
              <span className="department">Design</span>
              <p>
              </p>
            </PositionCard>
          </PositionList>
        </PositionsSection>
        
        <BenefitsSection>
          <BenefitsTitle>Benefits & Perks</BenefitsTitle>
          <BenefitsGrid>
            <BenefitCard>
              <i className="fas fa-heartbeat"></i>
              <h3>Health Insurance</h3>
              <p>Comprehensive medical, dental, and vision coverage</p>
            </BenefitCard>
            
            <BenefitCard>
              <i className="fas fa-umbrella-beach"></i>
              <h3>Time Off</h3>
              <p>Unlimited PTO and 12 paid holidays</p>
            </BenefitCard>
            
            <BenefitCard>
              <i className="fas fa-laptop-house"></i>
              <h3>Remote Work</h3>
              <p>Flexible work arrangements with home office stipend</p>
            </BenefitCard>
            
            <BenefitCard>
              <i className="fas fa-graduation-cap"></i>
              <h3>Learning</h3>
              <p>$2,000 annual education stipend</p>
            </BenefitCard>
          </BenefitsGrid>
        </BenefitsSection>
      </Content>
    </PageContainer>
  );
}

export default Careers;
