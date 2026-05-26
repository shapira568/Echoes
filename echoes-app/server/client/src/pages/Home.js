import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

// Styled Components
const HomeContainer = styled.div`
  min-height: 100vh;
  // background: linear-gradient(135deg, #f0f8ff 0%, #e6f7ff 100%);
  color: #2c3e50;
  overflow-x: hidden;
  position: relative;
`;
// RIVER CONTAINER
const RiverContainer = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  z-index: -1;
  overflow: hidden;
`;

const River = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 30%;
  background: linear-gradient(to top, #4a90e2, #a3d5ff);
  border-radius: 50% 50% 0 0;
  opacity: 0.7;
  animation: flow 20s infinite linear;

  @keyframes flow {
    0% { transform: translateX(0); }
    50% { transform: translateX(-50px); }
    100% { transform: translateX(0); }
  }
`;

const Ripple = styled.div`
  position: absolute;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.2);
  animation: ripple 4s infinite ease-in-out;

  @keyframes ripple {
    0% { transform: scale(1); opacity: 0.5; }
    50% { transform: scale(1.5); opacity: 0.2; }
    100% { transform: scale(1); opacity: 0.5; }
  }

  &:nth-child(1) {
    width: 20px;
    height: 20px;
    top: 70%;
    left: 10%;
    animation-delay: 0s;
  }

  &:nth-child(2) {
    width: 30px;
    height: 30px;
    top: 65%;
    left: 25%;
    animation-delay: 1s;
  }

  &:nth-child(3) {
    width: 15px;
    height: 15px;
    top: 75%;
    left: 40%;
    animation-delay: 2s;
  }

  &:nth-child(4) {
    width: 25px;
    height: 25px;
    top: 68%;
    left: 60%;
    animation-delay: 0.5s;
  }

  &:nth-child(5) {
    width: 20px;
    height: 20px;
    top: 72%;
    left: 80%;
    animation-delay: 1.5s;
  }
`;

const Header = styled.header`
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(10px);
  padding: 1rem 5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 2px 15px rgba(44, 62, 80, 0.1);
  position: fixed;
  width: 100%;
  top: 0;
  z-index: 100;
`;

const Logo = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 1.8rem;
  font-weight: 700;
  color: #2c5aa0;

  i {
    color: #4a90e2;
    animation: float 3s ease-in-out infinite;

    @keyframes float {
      0% { transform: translateY(0px); }
      50% { transform: translateY(-10px); }
      100% { transform: translateY(0px); }
    }
  }
`;

const Nav = styled.nav`
  ul {
    display: flex;
    list-style: none;
    gap: 2rem;
  }

  a {
    text-decoration: none;
    color: #2c3e50;
    font-weight: 500;
    transition: all 0.3s ease;
    padding: 0.5rem 1rem;
    border-radius: 30px;

    &:hover, &.active {
      background: #a3d5ff;
      color: #2c5aa0;
    }
  }
`;

const AuthButtons = styled.div`
  display: flex;
  gap: 1rem;
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
      transform: translateY(-2px);
      box-shadow: 0 5px 15px rgba(74, 144, 226, 0.3);
    }
  }

  &.outline {
    background: transparent;
    border: 2px solid #4a90e2;
    color: #4a90e2;

    &:hover {
      background: #4a90e2;
      color: white;
    }
  }
`;

const Hero = styled.section`
  padding: 5rem 5%;
  display: flex;
  align-items: center;
  min-height: 80vh;

  @media (max-width: 992px) {
    flex-direction: column;
    text-align: center;
  }
`;

const HeroContent = styled.div`
  flex: 1;
  max-width: 600px;

  h1 {
    font-size: 3.5rem;
    line-height: 1.2;
    margin-bottom: 1.5rem;
    color: #2c5aa0;

    span {
      color: #4a90e2;
      position: relative;

      &::after {
        content: "";
        position: absolute;
        bottom: 5px;
        left: 0;
        width: 100%;
        height: 10px;
        background: rgba(74, 144, 226, 0.2);
        z-index: -1;
      }
    }
  }

  p {
    font-size: 1.2rem;
    margin-bottom: 2rem;
    color: #555;
    line-height: 1.6;
  }

  @media (max-width: 768px) {
    h1 {
      font-size: 2.8rem;
    }
  }

  @media (max-width: 576px) {
    h1 {
      font-size: 2.3rem;
    }
  }
`;

const HeroButtons = styled.div`
  display: flex;
  gap: 1rem;

  @media (max-width: 576px) {
    flex-direction: column;
  }
`;

const HeroImage = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  position: relative;
`;

const MessageBottle = styled.div`
  width: 300px;
  height: 300px;
  background: linear-gradient(135deg, #a3d5ff 0%, #4a90e2 100%);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 20px 40px rgba(74, 144, 226, 0.3);
  animation: float 4s ease-in-out infinite;
  position: relative;
  overflow: hidden;

  @keyframes float {
    0% { transform: translateY(0px); }
    50% { transform: translateY(-10px); }
    100% { transform: translateY(0px); }
  }

  &::before {
    content: "";
    position: absolute;
    width: 100%;
    height: 20px;
    background: rgba(255, 255, 255, 0.3);
    top: 30%;
    transform: rotate(-10deg);
  }

  i {
    font-size: 8rem;
    color: white;
    text-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
  }

  @media (max-width: 768px) {
    width: 250px;
    height: 250px;
  }
`;

// Updated to use different component names for each section
const FeaturesSection = styled.section`
  padding: 5rem 5%;
  background: white;
`;

const HowItWorksSection = styled.section`
  padding: 5rem 5%;
  background: white;
`;

const TestimonialsSection = styled.section`
  padding: 5rem 5%;
  background: white;
`;

const PricingSection = styled.section`
  padding: 5rem 5%;
  background: white;
`;

const SectionTitle = styled.div`
  text-align: center;
  margin-bottom: 3rem;

  h2 {
    font-size: 2.5rem;
    color: #2c5aa0;
    margin-bottom: 1rem;
  }

  p {
    font-size: 1.2rem;
    color: #666;
    max-width: 700px;
    margin: 0 auto;
  }
`;

const FeaturesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
`;

// Updated FeatureCard to be a Link component for navigation
const FeatureCard = styled(Link)`
  background: white;
  border-radius: 15px;
  padding: 2rem;
  box-shadow: 0 10px 30px rgba(44, 62, 80, 0.1);
  transition: all 0.3s ease;
  text-align: center;
  text-decoration: none;
  display: block;

  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 15px 40px rgba(74, 144, 226, 0.2);
  }

  h3 {
    font-size: 1.5rem;
    margin-bottom: 1rem;
    color: #2c5aa0;
  }

  p {
    color: #666;
    line-height: 1.6;
  }
`;

const FeatureIcon = styled.div`
  width: 80px;
  height: 80px;
  background: #a3d5ff;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1.5rem;
  font-size: 2rem;
  color: #4a90e2;
`;

const TestimonialGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
`;

const TestimonialCard = styled.div`
  background: white;
  border-radius: 15px;
  padding: 2rem;
  box-shadow: 0 10px 30px rgba(44, 62, 80, 0.1);
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
`;

const TestimonialContent = styled.div`
  margin-top: 2rem;
  font-style: italic;
  color: #555;
  line-height: 1.6;
`;

const TestimonialAuthor = styled.div`
  display: flex;
  align-items: center;
  margin-top: 1.5rem;
`;

const AuthorAvatar = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: #a3d5ff;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 1rem;
  font-weight: bold;
  color: #4a90e2;
`;

const AuthorInfo = styled.div`
  h4 {
    color: #2c5aa0;
  }

  p {
    color: #777;
    font-size: 0.9rem;
  }
`;

const Footer = styled.footer`
  background: #2c5aa0;
  color: white;
  padding: 3rem 5% 2rem;
`;

const FooterContent = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  margin-bottom: 2rem;
`;

const FooterColumn = styled.div`
  h3 {
    font-size: 1.3rem;
    margin-bottom: 1.5rem;
    position: relative;
    padding-bottom: 0.5rem;

    &::after {
      content: "";
      position: absolute;
      bottom: 0;
      left: 0;
      width: 50px;
      height: 3px;
      background: #4a90e2;
    }
  }

  ul {
    list-style: none;

    li {
      margin-bottom: 0.8rem;

      a {
        color: #ddd;
        text-decoration: none;
        transition: all 0.3s ease;

        &:hover {
          color: #a3d5ff;
          padding-left: 5px;
        }
      }
    }
  }
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1rem;

  a {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    background: rgba(255, 255, 255, 0.1);
    border-radius: 50%;
    color: white;
    transition: all 0.3s ease;

    &:hover {
      background: #4a90e2;
      transform: translateY(-3px);
    }
  }
`;

const Copyright = styled.div`
  text-align: center;
  padding-top: 2rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  color: #aaa;
  font-size: 0.9rem;
`;

// Main Component
function Home() {
  return (
    <HomeContainer>
      <RiverContainer>
        <River />
        <Ripple />
        <Ripple />
        <Ripple />
        <Ripple />
        <Ripple />
      </RiverContainer>

      <Header>
        <Logo>
          <i className="fas fa-water"></i>
          <span>Echoes</span>
        </Logo>
        <Nav>
          <ul>
            <li><Link to="/" className="active">Home</Link></li>
            <li><a href="#features">Features</a></li>
            <li><a href="#how-it-works">How It Works</a></li>
            <li><a href="#testimonials">Testimonials</a></li>
            <li><a href="#pricing">Pricing</a></li>
          </ul>
        </Nav>
        <AuthButtons>
          <Link to="/login">
            <Button className="outline">Log In</Button>
          </Link>
          <Link to="/signup">
            <Button className="primary">Sign Up</Button>
          </Link>
        </AuthButtons>
      </Header>

      <Hero>
        <HeroContent>
          <h1>Send Messages Down the <span>River of Time</span></h1>
          <p>Echoes lets you record heartfelt messages to your future self or loved ones. Our AI enhances your words into meaningful reflections that arrive exactly when needed.</p>
          <HeroButtons>
            <Link to="/signup">
              <Button className="primary">Create Your First Message</Button>
            </Link>
            <Button className="outline">Watch Demo</Button>
          </HeroButtons>
        </HeroContent>
        <HeroImage>
          <MessageBottle>
            <i className="fas fa-message"></i>
          </MessageBottle>
        </HeroImage>
      </Hero>

      <FeaturesSection id="features">
        <SectionTitle>
          <h2>How Echoes Works</h2>
          <p>Our unique approach combines emotional intelligence with cutting-edge technology</p>
        </SectionTitle>
        <FeaturesGrid>
          <FeatureCard to="/features/text-messages">
            <FeatureIcon>
              <i className="fas fa-pen"></i>
            </FeatureIcon>
            <h3>Record Your Message</h3>
            <p>Write or record a heartfelt message to your future self or loved ones. Capture your thoughts, feelings, and wisdom.</p>
          </FeatureCard>
          <FeatureCard to="/features/ai-enhancement">
            <FeatureIcon>
              <i className="fas fa-robot"></i>
            </FeatureIcon>
            <h3>AI Enhancement</h3>
            <p>Our compassionate AI refines your raw emotions into poetic, meaningful reflections that preserve your voice.</p>
          </FeatureCard>
          <FeatureCard to="/features/event-triggers">
            <FeatureIcon>
              <i className="fas fa-calendar-check"></i>
            </FeatureIcon>
            <h3>Set Triggers</h3>
            <p>Choose when your message arrives - on a specific date, after a life event, or when you need it most.</p>
          </FeatureCard>
        </FeaturesGrid>
      </FeaturesSection>

      <HowItWorksSection id="how-it-works">
        <SectionTitle>
          <h2>How It Works</h2>
          <p>Simple steps to preserve your voice for the future</p>
        </SectionTitle>
        <FeaturesGrid>
          <FeatureCard to="/features/text-messages">
            <FeatureIcon>
              <i className="fas fa-edit"></i>
            </FeatureIcon>
            <h3>Write Your Message</h3>
            <p>Compose a heartfelt message to your future self or loved ones using our intuitive editor.</p>
          </FeatureCard>
          <FeatureCard to="/features/ai-enhancement">
            <FeatureIcon>
              <i className="fas fa-robot"></i>
            </FeatureIcon>
            <h3>AI Enhancement</h3>
            <p>Our compassionate AI refines your words into poetic, meaningful reflections.</p>
          </FeatureCard>
          <FeatureCard to="/features/event-triggers">
            <FeatureIcon>
              <i className="fas fa-clock"></i>
            </FeatureIcon>
            <h3>Set Delivery Time</h3>
            <p>Choose when your message arrives - on a specific date or life event.</p>
          </FeatureCard>
          <FeatureCard to="/features/legacy-vault">
            <FeatureIcon>
              <i className="fas fa-envelope-open-text"></i>
            </FeatureIcon>
            <h3>Receive & Reflect</h3>
            <p>Get your message when you need it most and gain perspective on your journey.</p>
          </FeatureCard>
        </FeaturesGrid>
      </HowItWorksSection>

      <TestimonialsSection id="testimonials">
        <SectionTitle>
          <h2>Voices from the River</h2>
          <p>Hear what others have discovered through Echoes</p>
        </SectionTitle>
        <TestimonialGrid>
          <TestimonialCard>
            <TestimonialContent>
              "Five years ago, I wrote a message to myself during a difficult time. Receiving it last month helped me realize how far I've come. Echoes gave me perspective I desperately needed."
            </TestimonialContent>
            <TestimonialAuthor>
              <AuthorAvatar>SJ</AuthorAvatar>
              <AuthorInfo>
                <h4>Sarah Johnson</h4>
                <p>Verified User</p>
              </AuthorInfo>
            </TestimonialAuthor>
          </TestimonialCard>
          <TestimonialCard>
            <TestimonialContent>
              "As a therapist, I recommend Echoes to clients going through transitions. The AI enhancement feature helps people articulate feelings they struggle to express on their own."
            </TestimonialContent>
            <TestimonialAuthor>
              <AuthorAvatar>MD</AuthorAvatar>
              <AuthorInfo>
                <h4>Dr. Michael Davies</h4>
                <p>Licensed Therapist</p>
              </AuthorInfo>
            </TestimonialAuthor>
          </TestimonialCard>
          <TestimonialCard>
            <TestimonialContent>
              "I created a message for my daughter's 18th birthday when she was just born. Watching her read it brought tears to my eyes. This is truly a gift that transcends time."
            </TestimonialContent>
            <TestimonialAuthor>
              <AuthorAvatar>RP</AuthorAvatar>
              <AuthorInfo>
                <h4>Robert Peterson</h4>
                <p>Parent</p>
              </AuthorInfo>
            </TestimonialAuthor>
          </TestimonialCard>
        </TestimonialGrid>
      </TestimonialsSection>

      <PricingSection id="pricing">
        <SectionTitle>
          <h2>Pricing Plans</h2>
          <p>Choose the plan that's right for you</p>
        </SectionTitle>
        <FeaturesGrid>
          <FeatureCard to="/pricing/free">
            <h3>Free</h3>
            <p style={{ fontSize: '2rem', fontWeight: 'bold', color: '#4a90e2' }}>$0/month</p>
            <ul style={{ textAlign: 'left', marginBottom: '1rem' }}>
              <li>✓ 5 messages per month</li>
              <li>✓ Text messages only</li>
              <li>✓ Basic delivery scheduling</li>
              <li>✓ Email notifications</li>
            </ul>
            <Button className="outline">Get Started</Button>
          </FeatureCard>
          <FeatureCard to="/pricing/premium">
            <h3>Premium</h3>
            <p style={{ fontSize: '2rem', fontWeight: 'bold', color: '#4a90e2' }}>$9.99/month</p>
            <ul style={{ textAlign: 'left', marginBottom: '1rem' }}>
              <li>✓ Unlimited messages</li>
              <li>✓ Voice & text messages</li>
              <li>✓ AI enhancement</li>
              <li>✓ Advanced scheduling</li>
              <li>✓ Priority delivery</li>
            </ul>
            <Button className="primary">Try Free for 14 Days</Button>
          </FeatureCard>
          <FeatureCard to="/pricing/pro">
            <h3>Pro</h3>
            <p style={{ fontSize: '2rem', fontWeight: 'bold', color: '#4a90e2' }}>$19.99/month</p>
            <ul style={{ textAlign: 'left', marginBottom: '1rem' }}>
              <li>✓ Everything in Premium</li>
              <li>✓ Video messages</li>
              <li>✓ Advanced AI</li>
              <li>✓ Custom triggers</li>
              <li>✓ Legacy vault</li>
              <li>✓ Priority support</li>
            </ul>
            <Button className="primary">Try Free for 14 Days</Button>
          </FeatureCard>
        </FeaturesGrid>
      </PricingSection>

      <Footer>
        <FooterContent>
          <FooterColumn>
            <h3>Echoes</h3>
            <p>Preserving your voice for the future, one message at a time.</p>
            <SocialLinks>
              <a href="https://facebook.com  " target="_blank" rel="noopener noreferrer">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="https://twitter.com  " target="_blank" rel="noopener noreferrer">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="https://instagram.com  " target="_blank" rel="noopener noreferrer">
                <i className="fab fa-instagram"></i>
              </a>
              <a href="https://linkedin.com  " target="_blank" rel="noopener noreferrer">
                <i className="fab fa-linkedin-in"></i>
              </a>
            </SocialLinks>
          </FooterColumn>
          <FooterColumn>
            <h3>Features</h3>
            <ul>
              <li><Link to="/features/text-messages">Text Messages</Link></li>
              <li><Link to="/features/voice-messages">Voice Messages</Link></li>
              <li><Link to="/features/ai-enhancement">AI Enhancement</Link></li>
              <li><Link to="/features/event-triggers">Event Triggers</Link></li>
              <li><Link to="/features/legacy-vault">Legacy Vault</Link></li>
            </ul>
          </FooterColumn>
          <FooterColumn>
            <h3>Resources</h3>
            <ul>
              <li><Link to="/blog">Blog</Link></li>
              <li><Link to="/help-center">Help Center</Link></li>
              <li><Link to="/community">Community</Link></li>
              <li><Link to="/webinars">Webinars</Link></li>
              <li><Link to="/api">API</Link></li>
            </ul>
          </FooterColumn>
          <FooterColumn>
            <h3>Company</h3>
            <ul>
              <li><Link to="/about-us">About Us</Link></li>
              <li><Link to="/careers">Careers</Link></li>
              <li><Link to="/contact">Contact</Link></li>
              <li><Link to="/privacy-policy">Privacy Policy</Link></li>
              <li><Link to="/terms-of-service">Terms of Service</Link></li>
            </ul>
          </FooterColumn>
        </FooterContent>
        <Copyright>
          <p>&copy; 2025 Echoes. All rights reserved. Flowing through time, one message at a time.</p>
        </Copyright>
      </Footer>
    </HomeContainer>
  );
}

export default Home;