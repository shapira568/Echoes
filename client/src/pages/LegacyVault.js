// src/pages/LegacyVault.js
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

const VaultItem = styled.div`
  background: #f8f9fa;
  border-radius: 10px;
  padding: 1.5rem;
  margin: 1.5rem 0;
  display: flex;
  align-items: center;
  
  i {
    font-size: 2rem;
    color: #4a90e2;
    margin-right: 1rem;
  }
  
  div {
    flex: 1;
    
    h3 {
      color: #2c5aa0;
      margin-bottom: 0.5rem;
    }
    
    p {
      color: #555;
      line-height: 1.6;
    }
  }
`;

function LegacyVault() {
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
        <SectionTitle>Legacy Vault</SectionTitle>
        
        <FeatureSection>
          <FeatureTitle>Preserve Your Digital Legacy</FeatureTitle>
          <FeatureDescription>
            The Legacy Vault is Echoes' most comprehensive preservation tool, 
            designed to safeguard your digital presence and personal history for 
            future generations. Beyond simple message delivery, the Legacy Vault 
            creates a lasting digital time capsule of your life, thoughts, and values.
          </FeatureDescription>
        </FeatureSection>
        
        <FeatureSection>
          <FeatureTitle>What You Can Preserve</FeatureTitle>
          
          <VaultItem>
            <i className="fas fa-comments"></i>
            <div>
              <h3>Personal Messages</h3>
              <p>
                All text, voice, and video messages you create for yourself and loved ones, 
                organized chronologically to tell the story of your journey.
              </p>
            </div>
          </VaultItem>
          
          <VaultItem>
            <i className="fas fa-images"></i>
            <div>
              <h3>Photo Collections</h3>
              <p>
                Curated photo albums with captions explaining significant moments, people, 
                and memories that shaped your life experiences.
              </p>
            </div>
          </VaultItem>
          
          <VaultItem>
            <i className="fas fa-book"></i>
            <div>
              <h3>Life Journal</h3>
              <p>
                A comprehensive digital diary documenting your thoughts, feelings, 
                decisions, and reflections throughout different life stages.
              </p>
            </div>
          </VaultItem>
          
          <VaultItem>
            <i className="fas fa-users"></i>
            <div>
              <h3>Family Tree & Stories</h3>
              <p>
                Genealogical information, family recipes, traditions, and personal 
                stories that connect generations and preserve cultural heritage.
              </p>
            </div>
          </VaultItem>
          
          <VaultItem>
            <i className="fas fa-graduation-cap"></i>
            <div>
              <h3>Wisdom & Values</h3>
              <p>
                Carefully crafted letters containing life lessons, moral values, 
                and philosophical perspectives you want to pass down to future generations.
              </p>
            </div>
          </VaultItem>
        </FeatureSection>
        
        <FeatureSection>
          <FeatureTitle>Legacy Vault Features</FeatureTitle>
          <FeatureList>
            <li>Bank-level encryption for all preserved content</li>
            <li>Multi-generational access with inheritance planning</li>
            <li>Regular integrity checks to ensure data preservation</li>
            <li>Physical backup options (USB drives, printed books)</li>
            <li>Annual review prompts to update your legacy content</li>
            <li>Collaborative features for family members to contribute</li>
            <li>Legal document integration (wills, trusts, healthcare directives)</li>
          </FeatureList>
        </FeatureSection>
        
        <FeatureSection>
          <FeatureTitle>Access Control</FeatureTitle>
          <FeatureDescription>
            You maintain complete control over who can access your Legacy Vault and when:
          </FeatureDescription>
          <FeatureList>
            <li>Designate primary and secondary beneficiaries</li>
            <li>Set conditions for access (age milestones, life events)</li>
            <li>Create different access levels for different content types</li>
            <li>Emergency access protocols for unforeseen circumstances</li>
            <li>Revocable access that you can modify at any time</li>
          </FeatureList>
        </FeatureSection>
      </Content>
    </PageContainer>
  );
}

export default LegacyVault;
