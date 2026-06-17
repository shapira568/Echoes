// src/pages/Contact.js
import React, { useState } from 'react';
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

const ContactGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin: 2rem 0;
`;

const ContactCard = styled.div`
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
  
  a {
    color: #4a90e2;
    text-decoration: none;
    font-weight: 600;
    
    &:hover {
      text-decoration: underline;
    }
  }
`;

const ContactForm = styled.form`
  background: #f8f9fa;
  border-radius: 10px;
  padding: 2rem;
  margin: 2rem 0;
  
  h2 {
    color: #2c5aa0;
    margin-bottom: 1.5rem;
    text-align: center;
  }
  
  .form-group {
    margin-bottom: 1.5rem;
  }
  
  label {
    display: block;
    margin-bottom: 0.5rem;
    font-weight: 600;
    color: #2c5aa0;
  }
  
  input, textarea, select {
    width: 100%;
    padding: 1rem;
    border: 2px solid #e1e8ed;
    border-radius: 10px;
    font-size: 1rem;
    transition: all 0.3s ease;
    
    &:focus {
      border-color: #4a90e2;
      outline: none;
      box-shadow: 0 0 0 3px rgba(74, 144, 226, 0.2);
    }
  }
  
  textarea {
    min-height: 150px;
    resize: vertical;
  }
  
  .submit-button {
    width: 100%;
    padding: 1.2rem;
    background: #4a90e2;
    color: white;
    border: none;
    border-radius: 10px;
    font-size: 1.1rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
    margin-top: 1rem;
    
    &:hover {
      background: #2c5aa0;
      transform: translateY(-3px);
      box-shadow: 0 10px 20px rgba(74, 144, 226, 0.3);
    }
  }
`;

const MapContainer = styled.div`
  background: #e1e8ed;
  border-radius: 10px;
  height: 300px;
  margin: 2rem 0;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #2c5aa0;
  font-weight: 600;
`;

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    category: 'general'
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real app, you would send this data to your backend
    alert('Thank you for your message! We will get back to you soon.');
    setFormData({
      name: '',
      email: '',
      subject: '',
      message: '',
      category: 'general'
    });
  };

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
        <SectionTitle>Contact Us</SectionTitle>
        
        <ContactGrid>
          <ContactCard>
            <i className="fas fa-envelope"></i>
            <h3>Email Us</h3>
            <p>General inquiries and support</p>
            <p><a href="mailto:support@echoes.app">support@echoes.app</a></p>
            <p><a href="mailto:hello@echoes.app">hello@echoes.app</a></p>
          </ContactCard>
          
          <ContactCard>
            <i className="fas fa-headset"></i>
            <h3>Customer Support</h3>
            <p>Technical assistance and account help</p>
            <p>Monday-Friday: 9AM-5PM EST</p>
            <p><a href="tel:+234 708 572 6309">1-800-ECHOES-1</a></p>
          </ContactCard>
          
          <ContactCard>
            <i className="fas fa-briefcase"></i>
            <h3>Business Inquiries</h3>
            <p>Partnerships and enterprise solutions</p>
            <p><a href="mailto:partnerships@echoes.app">partnerships@echoes.app</a></p>
            <p><a href="mailto:jobs@echoes.app">jobs@echoes.app</a></p>
          </ContactCard>
        </ContactGrid>
        
        <ContactForm onSubmit={handleSubmit}>
          <h2>Send Us a Message</h2>
          <div className="form-group">
            <label htmlFor="name">Full Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="category">Category</label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
            >
              <option value="general">General Inquiry</option>
              <option value="support">Technical Support</option>
              <option value="billing">Billing Question</option>
              <option value="feedback">Product Feedback</option>
              <option value="partnership">Partnership Opportunity</option>
              <option value="press">Press Inquiry</option>
            </select>
          </div>
          
          <div className="form-group">
            <label htmlFor="subject">Subject</label>
            <input
              type="text"
              id="subject"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="message">Message</label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
            ></textarea>
          </div>
          
          <button type="submit" className="submit-button">
            Send Message
          </button>
        </ContactForm>
        
        <MapContainer>
          <p>Our Headquarters<br />123 Echo FCT, Abuja</p>
        </MapContainer>
        
        <div style={{ textAlign: 'center', marginTop: '2rem' }}>
          <h2>Follow Us</h2>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginTop: '1rem' }}>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" style={{ fontSize: '2rem', color: '#4a90e2' }}>
              <i className="fab fa-facebook"></i>
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" style={{ fontSize: '2rem', color: '#4a90e2' }}>
              <i className="fab fa-twitter"></i>
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" style={{ fontSize: '2rem', color: '#4a90e2' }}>
              <i className="fab fa-instagram"></i>
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" style={{ fontSize: '2rem', color: '#4a90e2' }}>
              <i className="fab fa-linkedin"></i>
            </a>
          </div>
        </div>
      </Content>
    </PageContainer>
  );
}

export default Contact;
