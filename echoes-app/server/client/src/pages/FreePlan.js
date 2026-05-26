// src/pages/FreePlan.js
import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const PlanContainer = styled.div`
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

const PlanCard = styled.div`
  background: white;
  border-radius: 15px;
  padding: 2rem;
  box-shadow: 0 10px 30px rgba(44, 62, 80, 0.1);
  text-align: center;
  max-width: 600px;
  margin: 0 auto;

  h2 {
    color: #2c5aa0;
    margin-bottom: 1rem;
  }

  .price {
    font-size: 3rem;
    font-weight: bold;
    color: #4a90e2;
    margin: 1.5rem 0;
  }

  ul {
    text-align: left;
    margin: 2rem 0;
    padding: 0 2rem;

    li {
      margin-bottom: 1rem;
      color: #555;

      &:before {
        content: "✓";
        color: #4a90e2;
        font-weight: bold;
        margin-right: 10px;
      }
    }
  }
`;

function FreePlan() {
  return (
    <PlanContainer>
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
        <SectionTitle>Free Plan</SectionTitle>
        
        <PlanCard>
          <h2>Get Started with Echoes</h2>
          <div className="price">$0/month</div>
          <p>Perfect for trying out Echoes and sending your first messages</p>
          
          <ul>
            <li>5 messages per month</li>
            <li>Text messages only</li>
            <li>Basic delivery scheduling</li>
            <li>Email notifications</li>
          </ul>
          
          <Link to="/signup">
            <Button className="primary">Get Started</Button>
          </Link>
        </PlanCard>
      </Content>
    </PlanContainer>
  );
}

export default FreePlan;