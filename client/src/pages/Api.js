// src/pages/Api.js
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

const CodeBlock = styled.pre`
  background: #2c3e50;
  color: #ecf0f1;
  padding: 1.5rem;
  border-radius: 10px;
  overflow-x: auto;
  margin: 1.5rem 0;
  
  code {
    font-family: 'Courier New', monospace;
    font-size: 0.9rem;
  }
`;

const EndpointCard = styled.div`
  background: #f8f9fa;
  border-radius: 10px;
  padding: 1.5rem;
  margin: 1.5rem 0;
  
  h3 {
    color: #2c5aa0;
    margin-bottom: 1rem;
    display: flex;
    align-items: center;
    
    span {
      background: #4a90e2;
      color: white;
      padding: 0.3rem 0.7rem;
      border-radius: 5px;
      font-size: 0.8rem;
      margin-right: 1rem;
      font-weight: bold;
    }
  }
  
  p {
    color: #555;
    line-height: 1.6;
    margin-bottom: 1rem;
  }
`;

function Api() {
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
        <SectionTitle>Echoes API Documentation</SectionTitle>
        
        <FeatureSection>
          <FeatureTitle>Integrate Echoes Into Your Applications</FeatureTitle>
          <FeatureDescription>
            The Echoes API allows developers to integrate our time capsule messaging 
            functionality into their own applications, services, and platforms. 
            Whether you're building a wellness app, legacy planning tool, or 
            communication platform, our API provides the building blocks to 
            incorporate meaningful future messaging.
          </FeatureDescription>
        </FeatureSection>
        
        <FeatureSection>
          <FeatureTitle>Getting Started</FeatureTitle>
          <FeatureDescription>
            To begin using the Echoes API, you'll need to:
          </FeatureDescription>
          <ol style={{ color: '#555', lineHeight: '1.6', paddingLeft: '1.5rem' }}>
            <li style={{ marginBottom: '0.5rem' }}>Sign up for an Echoes Developer Account</li>
            <li style={{ marginBottom: '0.5rem' }}>Create a new application in the Developer Dashboard</li>
            <li style={{ marginBottom: '0.5rem' }}>Obtain your API key and secret</li>
            <li style={{ marginBottom: '0.5rem' }}>Review the rate limits and terms of service</li>
            <li style={{ marginBottom: '0.5rem' }}>Start integrating with our endpoints</li>
          </ol>
          
          <h3>Base URL</h3>
          <CodeBlock>
            <code>https://api.echoes.app/v1</code>
          </CodeBlock>
          
          <h3>Authentication</h3>
          <p>All API requests must include an Authorization header with your API key:</p>
          <CodeBlock>
            <code>Authorization: Bearer YOUR_API_KEY_HERE</code>
          </CodeBlock>
          
          <h3>Rate Limits</h3>
          <p>Our API implements the following rate limits:</p>
          <ul style={{ color: '#555', lineHeight: '1.6', paddingLeft: '1.5rem' }}>
            <li style={{ marginBottom: '0.5rem' }}>Free Tier: 100 requests per hour</li>
            <li style={{ marginBottom: '0.5rem' }}>Developer Tier: 1,000 requests per hour</li>
            <li style={{ marginBottom: '0.5rem' }}>Business Tier: 10,000 requests per hour</li>
            <li style={{ marginBottom: '0.5rem' }}>Enterprise Tier: Custom limits available</li>
          </ul>
        </FeatureSection>
        
        <FeatureSection>
          <FeatureTitle>Core API Endpoints</FeatureTitle>
          
          <EndpointCard>
            <h3><span>POST</span> /messages</h3>
            <p>Create a new message in the Echoes system</p>
            <h4>Request Body</h4>
            <CodeBlock>
              <code>{`{
  "content": "Your message content here",
  "messageType": "text",
  "deliveryMethod": "date",
  "deliveryDate": "2025-12-25T00:00:00Z",
  "recipient": "user@example.com",
  "aiEnhance": true
}`}</code>
            </CodeBlock>
            <h4>Response</h4>
            <CodeBlock>
              <code>{`{
  "id": "msg_1234567890",
  "content": "Your message content here",
  "messageType": "text",
  "deliveryMethod": "date",
  "deliveryDate": "2025-12-25T00:00:00Z",
  "recipient": "user@example.com",
  "status": "pending",
  "createdAt": "2025-09-01T12:00:00Z"
}`}</code>
            </CodeBlock>
          </EndpointCard>
          
          <EndpointCard>
            <h3><span>GET</span> /messages</h3>
            <p>Retrieve a list of messages for the authenticated user</p>
            <h4>Query Parameters</h4>
            <ul style={{ color: '#555', lineHeight: '1.6', paddingLeft: '1.5rem' }}>
              <li style={{ marginBottom: '0.5rem' }}><strong>limit</strong>: Number of messages to return (default: 10)</li>
              <li style={{ marginBottom: '0.5rem' }}><strong>offset</strong>: Number of messages to skip (default: 0)</li>
              <li style={{ marginBottom: '0.5rem' }}><strong>status</strong>: Filter by message status (pending, delivered, draft)</li>
            </ul>
            <h4>Response</h4>
            <CodeBlock>
              <code>{`{
  "messages": [
    {
      "id": "msg_1234567890",
      "content": "Your message content here",
      "messageType": "text",
      "deliveryMethod": "date",
      "deliveryDate": "2025-12-25T00:00:00Z",
      "recipient": "user@example.com",
      "status": "pending",
      "createdAt": "2025-09-01T12:00:00Z"
    }
  ],
  "total": 1,
  "limit": 10,
  "offset": 0
}`}</code>
            </CodeBlock>
          </EndpointCard>
          
          <EndpointCard>
            <h3><span>GET</span> /messages/{`:id`}</h3>
            <p>Retrieve details of a specific message</p>
            <h4>Response</h4>
            <CodeBlock>
              <code>{`{
  "id": "msg_1234567890",
  "content": "Your message content here",
  "messageType": "text",
  "deliveryMethod": "date",
  "deliveryDate": "2025-12-25T00:00:00Z",
  "recipient": "user@example.com",
  "status": "pending",
  "aiEnhanced": true,
  "createdAt": "2025-09-01T12:00:00Z",
  "updatedAt": "2025-09-01T12:00:00Z"
}`}</code>
            </CodeBlock>
          </EndpointCard>
        </FeatureSection>
        
        <FeatureSection>
          <FeatureTitle>SDKs and Libraries</FeatureTitle>
          <FeatureDescription>
            We provide official SDKs for popular programming languages to simplify 
            integration with the Echoes API:
          </FeatureDescription>
          <ul style={{ color: '#555', lineHeight: '1.6', paddingLeft: '1.5rem' }}>
            <li style={{ marginBottom: '0.5rem' }}><strong>JavaScript/Node.js</strong>: <code>npm install echoes-sdk</code></li>
            <li style={{ marginBottom: '0.5rem' }}><strong>Python</strong>: <code>pip install echoes-python-sdk</code></li>
            <li style={{ marginBottom: '0.5rem' }}><strong>Java</strong>: Available through Maven Central</li>
            <li style={{ marginBottom: '0.5rem' }}><strong>PHP</strong>: <code>composer require echoes/php-sdk</code></li>
            <li style={{ marginBottom: '0.5rem' }}><strong>Ruby</strong>: <code>gem install echoes-ruby</code></li>
          </ul>
        </FeatureSection>
        
        <FeatureSection>
          <FeatureTitle>Support and Resources</FeatureTitle>
          <FeatureDescription>
            Need help with the API? We offer several resources:
          </FeatureDescription>
          <ul style={{ color: '#555', lineHeight: '1.6', paddingLeft: '1.5rem' }}>
            <li style={{ marginBottom: '0.5rem' }}><strong>API Reference Documentation</strong>: Comprehensive endpoint descriptions and examples</li>
            <li style={{ marginBottom: '0.5rem' }}><strong>Developer Forum</strong>: Community support and discussions</li>
            <li style={{ marginBottom: '0.5rem' }}><strong>Support Tickets</strong>: Direct assistance from our developer relations team</li>
            <li style={{ marginBottom: '0.5rem' }}><strong>Sample Projects</strong>: Open-source examples demonstrating common integrations</li>
            <li style={{ marginBottom: '0.5rem' }}><strong>Webhook Testing Tool</strong>: Sandbox environment for testing webhook deliveries</li>
          </ul>
          <p style={{ color: '#555', lineHeight: '1.6', marginTop: '1rem' }}>
            For enterprise partnerships and custom API requirements, please contact our 
            business development team at <strong>chikahappiness589@gmail.com</strong>.
          </p>
        </FeatureSection>
      </Content>
    </PageContainer>
  );
}

export default Api;