import React, { useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import { adminAPI, legacyContactAPI, messageAPI } from '../services/api';

const Page = styled.div`
  min-height: 100vh;
  background: #f6f8fc;
  color: #1f2e44;
  padding: 2rem;

  @media (max-width: 640px) {
    padding: 1rem;
  }
`;

const Header = styled.header`
  align-items: center;
  background: #ffffff;
  border: 1px solid #d9e2ef;
  border-radius: 12px;
  display: flex;
  justify-content: space-between;
  margin-bottom: 1.25rem;
  padding: 1rem 1.25rem;

  @media (max-width: 640px) {
    align-items: flex-start;
    flex-direction: column;
    gap: 1rem;
  }
`;

const Brand = styled(Link)`
  color: #173b76;
  font-size: 1.35rem;
  font-weight: 800;
  text-decoration: none;
`;

const Actions = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.65rem;

  @media (max-width: 640px) {
    width: 100%;

    button {
      flex: 1 1 140px;
    }
  }
`;

const Button = styled.button`
  background: ${({ $secondary }) => ($secondary ? '#ffffff' : '#5734d3')};
  border: 1px solid #5734d3;
  border-radius: 8px;
  color: ${({ $secondary }) => ($secondary ? '#5734d3' : '#ffffff')};
  cursor: pointer;
  font-weight: 800;
  min-height: 40px;
  padding: 0.65rem 1rem;
`;

const Grid = styled.main`
  display: grid;
  gap: 1rem;
  grid-template-columns: repeat(3, minmax(0, 1fr));

  @media (max-width: 1120px) {
    grid-template-columns: 1fr;
  }
`;

const Panel = styled.section`
  background: #ffffff;
  border: 1px solid #d9e2ef;
  border-radius: 12px;
  padding: 1rem;

  h1, h2 {
    color: #173b76;
    margin-bottom: 0.8rem;
  }

  h1 {
    font-size: 1.35rem;
  }

  h2 {
    font-size: 1.05rem;
  }

  p {
    color: #607286;
    line-height: 1.45;
  }
`;

const Wide = styled(Panel)`
  grid-column: 1 / -1;
`;

const EntityGrid = styled.div`
  display: grid;
  gap: 0.75rem;
  grid-template-columns: repeat(2, minmax(0, 1fr));

  @media (max-width: 720px) {
    grid-template-columns: 1fr;
  }
`;

const Entity = styled.article`
  border: 1px solid #d9e2ef;
  border-radius: 8px;
  overflow: hidden;

  strong {
    background: ${({ $tone }) => $tone || '#eaf4e4'};
    color: #1f2e44;
    display: block;
    padding: 0.55rem 0.7rem;
  }

  ul {
    list-style: none;
    padding: 0.65rem 0.7rem;
  }

  li {
    color: #53677d;
    font-size: 0.9rem;
    margin-bottom: 0.3rem;
  }
`;

const UseCaseList = styled.div`
  display: grid;
  gap: 0.55rem;
`;

const Pill = styled.div`
  background: ${({ $admin }) => ($admin ? '#fff3d8' : '#eaf7e6')};
  border: 1px solid ${({ $admin }) => ($admin ? '#e8c16f' : '#abd79f')};
  border-radius: 999px;
  color: #28445f;
  font-weight: 800;
  padding: 0.55rem 0.75rem;
`;

const Flow = styled.div`
  display: grid;
  gap: 0.55rem;
`;

const FlowStep = styled.div`
  background: ${({ $decision, $danger }) => ($danger ? '#ffe3e5' : $decision ? '#fff4d9' : '#eaf3ff')};
  border: 1px solid ${({ $decision, $danger }) => ($danger ? '#ec9ca4' : $decision ? '#e2bc65' : '#afcae8')};
  border-radius: ${({ $decision }) => ($decision ? '0' : '8px')};
  color: #28445f;
  font-weight: 800;
  padding: 0.65rem;
  text-align: center;
  transform: ${({ $decision }) => ($decision ? 'skew(-8deg)' : 'none')};
`;

const Metrics = styled.div`
  display: grid;
  gap: 0.75rem;
  grid-template-columns: repeat(4, minmax(0, 1fr));

  @media (max-width: 820px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @media (max-width: 520px) {
    grid-template-columns: 1fr;
  }
`;

const Metric = styled.div`
  background: #fbfcff;
  border: 1px solid #d9e2ef;
  border-radius: 10px;
  padding: 0.85rem;

  span {
    color: #607286;
    display: block;
    font-size: 0.78rem;
    font-weight: 800;
    text-transform: uppercase;
  }

  strong {
    color: #5734d3;
    font-size: 1.55rem;
  }
`;

const Form = styled.form`
  display: grid;
  gap: 0.75rem;
  grid-template-columns: repeat(2, minmax(0, 1fr));

  @media (max-width: 720px) {
    grid-template-columns: 1fr;
  }
`;

const Input = styled.input`
  border: 2px solid #d9e2ef;
  border-radius: 8px;
  font: inherit;
  min-height: 42px;
  padding: 0.7rem;
`;

const CardList = styled.div`
  display: grid;
  gap: 0.65rem;
`;

const Card = styled.article`
  background: #fbfcff;
  border: 1px solid #d9e2ef;
  border-radius: 10px;
  padding: 0.75rem;

  strong {
    color: #1f2e44;
    display: block;
  }
`;

const BarChart = styled.div`
  align-items: end;
  display: flex;
  gap: 0.65rem;
  height: 170px;
  padding-top: 1rem;
`;

const Bar = styled.div`
  align-items: center;
  display: flex;
  flex: 1;
  flex-direction: column;
  gap: 0.35rem;
  justify-content: end;

  div {
    background: #6f4be8;
    border-radius: 6px 6px 0 0;
    height: ${({ $value }) => `${$value}px`};
    min-height: 16px;
    width: 100%;
  }

  span {
    color: #607286;
    font-size: 0.78rem;
  }
`;

const sampleMessages = [
  { id: 'm1', content: 'Graduation message', recipient: 'john@example.com', deliveryDate: '2026-06-20', status: 'pending', deliveryMethod: 'date' },
  { id: 'm2', content: 'Birthday wishes', recipient: 'mom@example.com', deliveryDate: '2026-07-02', status: 'delivered', deliveryMethod: 'event' },
  { id: 'm3', content: 'Encouragement note', recipient: 'self', deliveryDate: '2026-07-12', status: 'pending', deliveryMethod: 'emotion' }
];

const sampleLogs = [
  { id: 'l1', action: 'user_registered', createdAt: new Date().toISOString() },
  { id: 'l2', action: 'message_created', createdAt: new Date().toISOString() },
  { id: 'l3', action: 'payment_received', createdAt: new Date().toISOString() }
];

function SystemOverview() {
  const navigate = useNavigate();
  const [overview, setOverview] = useState(null);
  const [messages, setMessages] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [contactForm, setContactForm] = useState({ contactName: '', contactEmail: '' });
  const [notice, setNotice] = useState('');

  const load = async () => {
    try {
      const [overviewRes, messagesRes, contactsRes] = await Promise.all([
        adminAPI.getOverview(),
        messageAPI.getMessages(),
        legacyContactAPI.getContacts()
      ]);
      setOverview(overviewRes.data);
      setMessages(messagesRes.data || []);
      setContacts(contactsRes.data || []);
    } catch (error) {
      setOverview({
        totalUsers: 128,
        totalMessages: 532,
        pendingMessages: 43,
        deliveredMessages: 489,
        legacyContacts: 5,
        subscriptions: 24,
        logs: sampleLogs
      });
      setMessages(sampleMessages);
      setContacts([]);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const visibleMessages = messages.length ? messages : sampleMessages;
  const logs = overview?.logs?.length ? overview.logs : sampleLogs;
  const stats = useMemo(() => ({
    totalUsers: overview?.totalUsers || 0,
    totalMessages: overview?.totalMessages || visibleMessages.length,
    pendingMessages: overview?.pendingMessages || visibleMessages.filter((message) => message.status === 'pending').length,
    deliveredMessages: overview?.deliveredMessages || visibleMessages.filter((message) => message.status === 'delivered').length
  }), [overview, visibleMessages]);

  const saveContact = async (event) => {
    event.preventDefault();
    setNotice('');
    try {
      await legacyContactAPI.createContact({ ...contactForm, isVerified: false });
      setNotice('Legacy contact saved.');
      setContactForm({ contactName: '', contactEmail: '' });
      await load();
    } catch (error) {
      setNotice('Log in to save legacy contacts.');
    }
  };

  return (
    <Page>
      <Header>
        <Brand to="/dashboard">Echoes System Overview</Brand>
        <Actions>
          <Button type="button" $secondary onClick={() => navigate('/dashboard')}>User Dashboard</Button>
          <Button type="button" $secondary onClick={() => navigate('/ai-dashboard')}>AI Dashboard</Button>
          <Button type="button" onClick={() => navigate('/emotion-flow')}>Emotion Flow</Button>
        </Actions>
      </Header>

      <Grid>
        <Panel>
          <h1>ER Diagram Coverage</h1>
          <EntityGrid>
            <Entity><strong>USERS</strong><ul><li>id PK</li><li>name, email</li><li>password</li><li>role</li></ul></Entity>
            <Entity $tone="#ffe1e7"><strong>MESSAGES</strong><ul><li>user_id FK</li><li>content_type</li><li>ai_refined</li><li>trigger_type</li><li>delivery_date</li><li>status</li></ul></Entity>
            <Entity $tone="#f0e8ff"><strong>SUBSCRIPTIONS</strong><ul><li>user_id FK</li><li>plan_type</li><li>status</li><li>start / end dates</li></ul></Entity>
            <Entity $tone="#fff2c8"><strong>LEGACY_CONTACTS</strong><ul><li>user_id FK</li><li>contact_name</li><li>contact_email</li><li>is_verified</li></ul></Entity>
            <Entity $tone="#e9f3ff"><strong>AUDIT_LOGS</strong><ul><li>user_id FK</li><li>action</li><li>ip_address</li><li>user_agent</li></ul></Entity>
          </EntityGrid>
        </Panel>

        <Panel>
          <h1>Use Case Coverage</h1>
          <UseCaseList>
            {['Register', 'Login', 'Create Message', 'Upload Audio/Video', 'Schedule Delivery', 'Manage Legacy Contacts', 'Receive Messages', 'View Message History', 'Update Profile', 'Make Payment'].map((item) => <Pill key={item}>{item}</Pill>)}
            {['Manage Users', 'View Logs', 'Monitor System Performance', 'Manage Subscriptions', 'System Settings'].map((item) => <Pill key={item} $admin>{item}</Pill>)}
          </UseCaseList>
        </Panel>

        <Panel>
          <h1>System Flowchart</h1>
          <Flow>
            <FlowStep>START</FlowStep>
            <FlowStep>User Login</FlowStep>
            <FlowStep $decision>Validate Credentials?</FlowStep>
            <FlowStep $danger>Access Denied / Log Attempt</FlowStep>
            <FlowStep>Dashboard</FlowStep>
            <FlowStep>Create Message</FlowStep>
            <FlowStep $decision>AI Enhancement Required?</FlowStep>
            <FlowStep>Set Trigger: Date / Event / Emotion</FlowStep>
            <FlowStep>Save Pending Message</FlowStep>
            <FlowStep>Delivery Cron Checks Due Messages</FlowStep>
            <FlowStep>Send via Email / WhatsApp / SMS</FlowStep>
            <FlowStep>Update Delivered + Audit Log</FlowStep>
          </Flow>
        </Panel>

        <Wide>
          <h1>Admin Dashboard</h1>
          <Metrics>
            <Metric><span>Total users</span><strong>{stats.totalUsers}</strong></Metric>
            <Metric><span>Total messages</span><strong>{stats.totalMessages}</strong></Metric>
            <Metric><span>Pending</span><strong>{stats.pendingMessages}</strong></Metric>
            <Metric><span>Delivered</span><strong>{stats.deliveredMessages}</strong></Metric>
          </Metrics>
          <BarChart>
            {[40, 90, 54, 118, 78, 140, 104].map((value, index) => (
              <Bar key={index} $value={value}><div /><span>May {10 + index}</span></Bar>
            ))}
          </BarChart>
        </Wide>

        <Panel>
          <h1>User Dashboard Mockup</h1>
          <CardList>
            {visibleMessages.slice(0, 4).map((message) => (
              <Card key={message.id || message._id}>
                <strong>{message.content}</strong>
                <p>To: {message.recipient}</p>
                <p>{message.deliveryMethod} delivery - {message.status}</p>
              </Card>
            ))}
          </CardList>
        </Panel>

        <Panel>
          <h1>Legacy Contacts</h1>
          {notice && <p>{notice}</p>}
          <Form onSubmit={saveContact}>
            <Input required placeholder="Contact name" value={contactForm.contactName} onChange={(event) => setContactForm({ ...contactForm, contactName: event.target.value })} />
            <Input required type="email" placeholder="Contact email" value={contactForm.contactEmail} onChange={(event) => setContactForm({ ...contactForm, contactEmail: event.target.value })} />
            <Button type="submit">Save Contact</Button>
          </Form>
          <CardList style={{ marginTop: '0.8rem' }}>
            {contacts.length === 0 && <Card><p>No saved legacy contacts yet.</p></Card>}
            {contacts.map((contact) => (
              <Card key={contact.id}><strong>{contact.contactName}</strong><p>{contact.contactEmail}</p><p>{contact.isVerified ? 'Verified' : 'Not verified'}</p></Card>
            ))}
          </CardList>
        </Panel>

        <Panel>
          <h1>Recent Audit Logs</h1>
          <CardList>
            {logs.map((log) => (
              <Card key={log.id}>
                <strong>{log.action}</strong>
                <p>{new Date(log.createdAt).toLocaleString()}</p>
                {log.ipAddress && <p>{log.ipAddress}</p>}
              </Card>
            ))}
          </CardList>
        </Panel>
      </Grid>
    </Page>
  );
}

export default SystemOverview;
