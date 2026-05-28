// client/src/Dashboard.js
import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { messageAPI, uploadAPI, paymentAPI } from '../services/api';

const DashboardContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #f0f8ff 0%, #e6f7ff 100%);
  padding: 2rem;
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

const UserInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const Avatar = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: #4a90e2;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: bold;
`;

const Button = styled.button`
  padding: 0.5rem 1rem;
  border-radius: 30px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  border: none;
  font-size: 0.9rem;

  &.primary {
    background: #4a90e2;
    color: white;

    &:hover {
      background: #2c5aa0;
    }
  }
  
  &.secondary {
    background: #6c757d;
    color: white;
    
    &:hover {
      background: #5a6268;
    }
  }
`;
 // ---  DeleteButton styled  ---
const DeleteButton = styled(Button)`
  background-color: rgba(255, 255, 255, 0.9); 
  border-color: #5a6268;

  &:hover {
    background-color: #2c5aa0;
    border-color: #4a90e2;
    transform: translateY(-2px);
  }
`;

const Content = styled.div`
  display: grid;
  grid-template-columns: 1fr 350px;
  gap: 2rem;

  @media (max-width: 992px) {
    grid-template-columns: 1fr;
  }
`;

const MainContent = styled.div`
  background: white;
  border-radius: 15px;
  box-shadow: 0 10px 30px rgba(44, 62, 80, 0.1);
  padding: 2rem;
`;

const Sidebar = styled.div`
  background: white;
  border-radius: 15px;
  box-shadow: 0 10px 30px rgba(44, 62, 80, 0.1);
  padding: 2rem;
  height: fit-content;
`;

const SectionTitle = styled.h2`
  color: #2c5aa0;
  margin-bottom: 1.5rem;
  padding-bottom: 0.5rem;
  border-bottom: 2px solid #e1e8ed;
`;

const MessageForm = styled.form`
  margin-bottom: 2rem;
`;

const FormGroup = styled.div`
  margin-bottom: 1.5rem;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 600;
  color: #2c5aa0;
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 1rem;
  border: 2px solid #e1e8ed;
  border-radius: 10px;
  font-size: 1rem;
  transition: all 0.3s ease;
  min-height: 150px;
  resize: vertical;

  &:focus {
    border-color: #4a90e2;
    outline: none;
    box-shadow: 0 0 0 3px rgba(74, 144, 226, 0.2);
  }
`;

const Select = styled.select`
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
`;

const Input = styled.input`
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
`;

const SubmitButton = styled.button`
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

  &:hover {
    background: #2c5aa0;
    transform: translateY(-3px);
    box-shadow: 0 10px 20px rgba(74, 144, 226, 0.3);
  }
`;

const MediaUpload = styled.div`
  margin-bottom: 1.5rem;
  
  input[type="file"] {
    display: none;
  }
  
  label {
    display: inline-block;
    padding: 0.75rem 1.5rem;
    background: #f0f8ff;
    border: 2px dashed #4a90e2;
    border-radius: 10px;
    cursor: pointer;
    transition: all 0.3s ease;
    text-align: center;
    
    &:hover {
      background: #e6f7ff;
    }
  }
  
  .preview {
    margin-top: 1rem;
    max-width: 100%;
  }
  
  .recording-controls {
    display: flex;
    gap: 1rem;
    margin-top: 1rem;
  }
`;

const MessageList = styled.div`
  margin-top: 2rem;
`;

const MessageCard = styled.div`
  background: #f8f9fa;
  border-radius: 10px;
  padding: 1.5rem;
  margin-bottom: 1rem;
  border-left: 4px solid #4a90e2;

  h3 {
    color: #2c5aa0;
    margin-bottom: 0.5rem;
  }

  p {
    color: #555;
    margin-bottom: 0.5rem;
  }

  small {
    color: #777;
  }
`;

const PricingPlans = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;
  margin-top: 1rem;
`;

const PlanCard = styled.div`
  border: 2px solid ${props => props.active ? '#4a90e2' : '#e1e8ed'};
  border-radius: 15px;
  padding: 1rem;
  background: ${props => props.active ? '#f0f8ff' : 'white'};
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(74, 144, 226, 0.2);
  }
  
  h3 {
    color: #2c5aa0;
    margin-bottom: 0.5rem;
  }
  
  .price {
    font-size: 1.5rem;
    font-weight: bold;
    color: #4a90e2;
    margin-bottom: 1rem;
  }
  
  ul {
    list-style: none;
    padding: 0;
    margin-bottom: 1rem;
    
    li {
      padding: 0.25rem 0;
      color: #555;
      
      &:before {
        content: "✓ ";
        color: #4a90e2;
        font-weight: bold;
      }
    }
  }
  
  button {
    width: 100%;
    padding: 0.75rem;
    background: ${props => props.active ? '#2c5aa0' : '#4a90e2'};
    color: white;
    border: none;
    border-radius: 30px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
    
    &:hover {
      background: #2c5aa0;
      transform: translateY(-2px);
    }
  }
`;

function Dashboard() {
  const [messages, setMessages] = useState([]);
  const [subscription, setSubscription] = useState({ plan: 'free' });
  const [formData, setFormData] = useState({
    content: '',
    messageType: 'text',
    deliveryMethod: 'date',
    deliveryDate: '',
    recipient: 'self',
    aiEnhance: false,
    mediaUrl: ''
  });
  const [mediaFile, setMediaFile] = useState(null);
  const [mediaPreview, setMediaPreview] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const [recordedBlob, setRecordedBlob] = useState(null);
  const videoRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await messageAPI.getMessages();
        setMessages(response.data);
      } catch (error) {
        console.error('Error fetching messages:', error);
      }
    };

    const fetchSubscription = async () => {
      try {
        const response = await paymentAPI.getSubscription();
        setSubscription(response.data);
      } catch (error) {
        console.error('Error fetching subscription:', error);
      }
    };

    fetchMessages();
    fetchSubscription();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleMediaChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setMediaFile(file);
      
      // Create preview
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = (e) => {
          setMediaPreview(e.target.result);
        };
        reader.readAsDataURL(file);
      } else if (file.type.startsWith('video/')) {
        const reader = new FileReader();
        reader.onload = (e) => {
          setMediaPreview(e.target.result);
        };
        reader.readAsDataURL(file);
      } else {
        setMediaPreview('');
      }
    }
  };

  const startRecording = async (type) => {
    try {
      const constraints = type === 'video' 
        ? { video: true, audio: true } 
        : { audio: true };
        
      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      
      if (type === 'video' && videoRef.current) {
        videoRef.current.srcObject = stream;
      }
      
      const recorder = new MediaRecorder(stream);
      setMediaRecorder(recorder);
      
      const chunks = [];
      recorder.ondataavailable = (e) => chunks.push(e.data);
      recorder.onstop = () => {
        const blob = new Blob(chunks, { 
          type: type === 'video' ? 'video/webm' : 'audio/webm' 
        });
        setRecordedBlob(blob);
        setMediaPreview(URL.createObjectURL(blob));
      };
      
      recorder.start();
      setIsRecording(true);
    } catch (err) {
      console.error('Error accessing media devices:', err);
      alert('Could not access media devices. Please check permissions.');
    }
  };

  const stopRecording = () => {
    if (mediaRecorder && isRecording) {
      mediaRecorder.stop();
      setIsRecording(false);
      
      // Stop all tracks
      const tracks = mediaRecorder.stream.getTracks();
      tracks.forEach(track => track.stop());
    }
  };

  const handleUpload = async () => {
    try {
      let fileToUpload;
      
      if (recordedBlob) {
        // Use recorded blob
        const fileType = formData.messageType === 'video' ? 'video.webm' : 'audio.webm';
        fileToUpload = new File([recordedBlob], `recording-${Date.now()}.${fileType}`, {
          type: recordedBlob.type
        });
      } else if (mediaFile) {
        // Use selected file
        fileToUpload = mediaFile;
      } else {
        alert('No media to upload');
        return;
      }
      
      const uploadFormData = new FormData();
      uploadFormData.append('media', fileToUpload);
      
      const response = await uploadAPI.uploadMedia(uploadFormData);
      setFormData({
        ...formData,
        mediaUrl: response.data.url
      });
      
      alert('Media uploaded successfully!');
      setMediaFile(null);
      setRecordedBlob(null);
      setMediaPreview('');
    } catch (error) {
      alert('Error uploading media');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const messageData = {
        ...formData,
        mediaUrl: formData.mediaUrl || undefined
      };
      
      const response = await messageAPI.createMessage(messageData);
      setMessages([response.data, ...messages]);
      setFormData({
        content: '',
        messageType: 'text',
        deliveryMethod: 'date',
        deliveryDate: '',
        recipient: 'self',
        aiEnhance: false,
        mediaUrl: ''
      });
      setMediaFile(null);
      setMediaPreview('');
      setRecordedBlob(null);
      alert('Message created successfully!');
    } catch (error) {
      alert('Error creating message');
    }
  };

  const handleUpgrade = async (plan) => {
    try {
      const response = await paymentAPI.createCheckoutSession(plan);
      // Redirect to Stripe checkout
      window.location.href = `https://checkout.stripe.com/pay/${response.data.sessionId}`;
    } catch (error) {
      alert('Error creating checkout session');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  // Add this function inside the Dashboard component, perhaps near the other handler functions
const handleDeleteMessage = async (messageId) => {
  // Optional: Add a confirmation dialog
  const confirmDelete = window.confirm("Are you sure you want to delete this message? This action cannot be undone.");
  if (!confirmDelete) return;

  try {
    await messageAPI.deleteMessage(messageId);
    // Update the local state to remove the deleted message
    setMessages(messages.filter(message => message._id !== messageId));
    alert('Message deleted successfully!');
  } catch (error) {
    console.error('Error deleting message:', error);
    alert('Error deleting message. Please try again.');
  }
};

  return (
    <DashboardContainer>
      <Header>
        <Logo>
          <i className="fas fa-water"></i>
          <span>Echoes</span>
        </Logo>
        <UserInfo>
          <Avatar>U</Avatar>
          <Button className="primary" onClick={handleLogout}>Logout</Button>
        </UserInfo>
      </Header>

      <Content>
        <MainContent>
          <SectionTitle>Create New Message</SectionTitle>
          <MessageForm onSubmit={handleSubmit}>
            <FormGroup>
              <Label htmlFor="messageType">Message Type</Label>
              <Select
                id="messageType"
                name="messageType"
                value={formData.messageType}
                onChange={handleChange}
                required
              >
                <option value="text">Text</option>
                <option value="voice">Voice</option>
                <option value="video">Video</option>
              </Select>
            </FormGroup>

            {formData.messageType !== 'text' && (
              <MediaUpload>
                <Label>Upload Media</Label>
                <input
                  type="file"
                  id="media"
                  accept={formData.messageType === 'voice' ? 'audio/*' : 'video/*'}
                  onChange={handleMediaChange}
                />
                <label htmlFor="media">
                  <i className="fas fa-cloud-upload-alt"></i> Choose File
                </label>
                
                <div className="recording-controls">
                  {!isRecording ? (
                    <Button 
                      type="button" 
                      className="secondary"
                      onClick={() => startRecording(formData.messageType)}
                    >
                      <i className="fas fa-microphone"></i> Record {formData.messageType === 'video' ? 'Video' : 'Audio'}
                    </Button>
                  ) : (
                    <Button 
                      type="button" 
                      className="primary"
                      onClick={stopRecording}
                    >
                      <i className="fas fa-stop"></i> Stop Recording
                    </Button>
                  )}
                  
                  {mediaPreview && (
                    <Button 
                      type="button" 
                      className="primary"
                      onClick={handleUpload}
                    >
                      <i className="fas fa-upload"></i> Upload
                    </Button>
                  )}
                </div>
                
                {mediaPreview && (
                  <div className="preview">
                    {formData.messageType === 'video' ? (
                      recordedBlob || mediaFile ? (
                        <video controls width="100%" src={mediaPreview} />
                      ) : (
                        <video ref={videoRef} autoPlay muted width="100%" />
                      )
                    ) : (
                      <audio controls src={mediaPreview} />
                    )}
                  </div>
                )}
              </MediaUpload>
            )}

            <FormGroup>
              <Label htmlFor="content">Your Message</Label>
              <TextArea
                id="content"
                name="content"
                value={formData.content}
                onChange={handleChange}
                placeholder="Write your heartfelt message..."
                required
              />
            </FormGroup>

            <FormGroup>
              <Label>
                <input
                  type="checkbox"
                  name="aiEnhance"
                  checked={formData.aiEnhance}
                  onChange={handleChange}
                />{' '}
                Enhance with AI
              </Label>
              <p style={{ fontSize: '0.9rem', color: '#666', marginTop: '0.5rem' }}>
                Our AI will make your message more poetic and meaningful
              </p>
            </FormGroup>

            <FormGroup>
              <Label htmlFor="deliveryMethod">Delivery Method</Label>
              <Select
                id="deliveryMethod"
                name="deliveryMethod"
                value={formData.deliveryMethod}
                onChange={handleChange}
                required
              >
                <option value="date">Specific Date</option>
                <option value="event">Life Event</option>
                <option value="emotion">Emotional State</option>
              </Select>
            </FormGroup>

            {formData.deliveryMethod === 'date' && (
              <FormGroup>
                <Label htmlFor="deliveryDate">Delivery Date</Label>
                <Input
                  type="date"
                  id="deliveryDate"
                  name="deliveryDate"
                  value={formData.deliveryDate}
                  onChange={handleChange}
                  required
                />
              </FormGroup>
            )}

            <FormGroup>
              <Label htmlFor="recipient">Recipient</Label>
              <Input
                type="email"
                id="recipient"
                name="recipient"
                value={formData.recipient}
                onChange={handleChange}
                placeholder="Enter email or 'self'"
                required
              />
            </FormGroup>

            <SubmitButton type="submit">
              <i className="fas fa-paper-plane"></i> Send Message
            </SubmitButton>
          </MessageForm>

          <MessageList>
            <SectionTitle>Your Messages</SectionTitle>
            {messages.map(message => (
              <MessageCard key={message._id}>
                <h3>{message.content.substring(0, 50)}...</h3>
                <p><strong>Type:</strong> {message.messageType}</p>
                <p><strong>Delivery:</strong> {message.deliveryMethod} - {message.deliveryDate}</p>
                <p><strong>Recipient:</strong> {message.recipient}</p>
                <p><strong>Status:</strong> {message.status}</p>
                <small>Created: {new Date(message.createdAt).toLocaleDateString()}</small>
                {message.aiEnhanced && <span style={{ color: '#4a90e2', marginLeft: '10px' }}>AI Enhanced</span>}
                {message.mediaUrl && (
                  <div style={{ marginTop: '10px' }}>
                    {message.messageType === 'video' ? (
                      <video controls width="200" src={message.mediaUrl} />
                    ) : message.messageType === 'voice' ? (
                      <audio controls src={message.mediaUrl} />
                    ) : null}
                  </div>
                )}
                {/* --- Add the Delete Button Here --- */}
<div style={{ marginTop: '10px' }}>
  <DeleteButton
    onClick={() => handleDeleteMessage(message._id)}
  >
    <i className="fas fa-trash"></i> Delete
  </DeleteButton>
</div>
{/* --- End of Delete Button --- */}
              </MessageCard>
            ))}
          </MessageList>
        </MainContent>

        <Sidebar>
          <SectionTitle>Subscription Plan</SectionTitle>
          <p>Current Plan: <strong>{subscription.plan}</strong></p>
          
          {subscription.plan === 'free' && (
            <>
              <p>Upgrade to unlock more features!</p>
              <PricingPlans>
                <PlanCard>
                  <h3>Premium</h3>
                  <div className="price">$9.99/month</div>
                  <ul>
                    <li>Unlimited messages</li>
                    <li>Voice messages</li>
                    <li>AI enhancement</li>
                    <li>Priority delivery</li>
                  </ul>
                  <button onClick={() => handleUpgrade('premium')}>Upgrade</button>
                </PlanCard>
                <PlanCard>
                  <h3>Pro</h3>
                  <div className="price">$19.99/month</div>
                  <ul>
                    <li>All Premium features</li>
                    <li>Video messages</li>
                    <li>Advanced AI</li>
                    <li>Custom triggers</li>
                  </ul>
                  <button onClick={() => handleUpgrade('pro')}>Upgrade</button>
                </PlanCard>
              </PricingPlans>
            </>
          )}

          <SectionTitle>Quick Stats</SectionTitle>
          <p>You have <strong>{messages.length}</strong> messages saved</p>
          <p>Next delivery: <strong>December 25, 2025</strong></p>
          
          <SectionTitle>Recent Activity</SectionTitle>
          <p>No recent activity</p>
        </Sidebar>
      </Content>
    </DashboardContainer>
  );
}

export default Dashboard;