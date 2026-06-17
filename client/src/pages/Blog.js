// src/pages/Blog.js
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

const BlogGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
`;

const BlogCard = styled.div`
  background: #f8f9fa;
  border-radius: 10px;
  padding: 1.5rem;
  box-shadow: 0 5px 15px rgba(44, 62, 80, 0.1);
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 25px rgba(74, 144, 226, 0.2);
  }
  
  h3 {
    color: #2c5aa0;
    margin-bottom: 1rem;
  }
  
  p {
    color: #555;
    line-height: 1.6;
    margin-bottom: 1rem;
  }
  
  .meta {
    color: #777;
    font-size: 0.9rem;
  }
`;

function Blog() {
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
        <SectionTitle>Blog</SectionTitle>
        
        <BlogGrid>
          <BlogCard>
            <h3>The Power of Future Self Messages</h3>
            <p>
              Research shows that writing letters to your future self can significantly 
              improve mental health and goal achievement. Discover how Echoes leverages 
              this psychological phenomenon.
            </p>
            <div className="meta">June 15, 2025 • 5 min read</div>
          </BlogCard>
          
          <BlogCard>
            <h3>Preserving Family Stories for Generations</h3>
            <p>
              Learn how families are using Echoes to create digital time capsules that 
              preserve memories, wisdom, and love for future generations.
            </p>
            <div className="meta">May 28, 2025 • 7 min read</div>
          </BlogCard>
          
          <BlogCard>
            <h3>AI Ethics in Personal Messaging</h3>
            <p>
              Our commitment to privacy and ethical AI usage in personal communications. 
              How we protect your most intimate thoughts and feelings.
            </p>
            <div className="meta">April 12, 2025 • 6 min read</div>
          </BlogCard>
          
          <BlogCard>
            <h3>Suhaib Yola's Time Travel Letters</h3>
            <p>
              Historical figures who understood the power of messages across time. 
              What we can learn from Suhaib Yola's approach to legacy.
            </p>
            <div className="meta">March 3, 2025 • 4 min read</div>
          </BlogCard>
          
          <BlogCard>
            <h3>The Science of Nostalgia</h3>
            <p>
              How receiving messages from your past self can boost happiness and 
              strengthen your sense of identity and purpose.
            </p>
            <div className="meta">February 18, 2025 • 6 min read</div>
          </BlogCard>
          
          <BlogCard>
            <h3>Digital Legacy Planning</h3>
            <p>
              Essential steps for ensuring your digital presence continues to benefit 
              loved ones after you're gone, using Echoes Legacy Vault.
            </p>
            <div className="meta">January 5, 2025 • 8 min read</div>
          </BlogCard>
        </BlogGrid>
      </Content>
    </PageContainer>
  );
}

export default Blog;
