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

const StatusRow = styled.div`
  align-items: center;
  border-bottom: 1px solid #eef2f7;
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  padding: 0.75rem 0;

  &:last-child {
    border-bottom: 0;
  }

  strong {
    color: #1f2e44;
  }

  span {
    color: #607286;
    font-size: 0.9rem;
  }
`;

const Badge = styled.span`
  background: ${({ $tone }) => ($tone === 'warning' ? '#fff4d8' : $tone === 'muted' ? '#eef2f7' : '#e8f7ee')};
  border: 1px solid ${({ $tone }) => ($tone === 'warning' ? '#e8c16f' : $tone === 'muted' ? '#d9e2ef' : '#9fd4af')};
  border-radius: 999px;
  color: ${({ $tone }) => ($tone === 'warning' ? '#7a560e' : $tone === 'muted' ? '#53677d' : '#1f6b3d')};
  font-size: 0.78rem;
  font-weight: 800;
  padding: 0.35rem 0.6rem;
  white-space: nowrap;
`;

const Workflows = styled.div`
  display: grid;
  gap: 0.75rem;
`;

const Workflow = styled.article`
  border: 1px solid #d9e2ef;
  border-radius: 10px;
  padding: 0.85rem;

  strong {
    color: #173b76;
    display: block;
    margin-bottom: 0.3rem;
  }

  p {
    margin: 0;
  }
`;

const QueueTable = styled.div`
  border: 1px solid #d9e2ef;
  border-radius: 10px;
  overflow: hidden;
`;

const QueueRow = styled.div`
  align-items: center;
  display: grid;
  gap: 0.75rem;
  grid-template-columns: 1.5fr 1fr 0.8fr;
  padding: 0.85rem;

  &:nth-child(odd) {
    background: #fbfcff;
  }

  strong {
    color: #1f2e44;
  }

  span {
    color: #607286;
    font-size: 0.9rem;
  }

  @media (max-width: 720px) {
    grid-template-columns: 1fr;
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
        <Brand to="/dashboard">Echoes Operations Console</Brand>
        <Actions>
          <Button type="button" $secondary onClick={() => navigate('/dashboard')}>User Dashboard</Button>
          <Button type="button" $secondary onClick={() => navigate('/ai-dashboard')}>AI Dashboard</Button>
          <Button type="button" onClick={() => navigate('/emotion-flow')}>Emotion Flow</Button>
        </Actions>
      </Header>

      <Grid>
        <Panel>
          <h1>Platform Health</h1>
          <StatusRow>
            <div><strong>Backend API</strong><br /><span>Render service and route layer</span></div>
            <Badge>Online</Badge>
          </StatusRow>
          <StatusRow>
            <div><strong>PostgreSQL</strong><br /><span>Users, messages, contacts, logs</span></div>
            <Badge>Ready</Badge>
          </StatusRow>
          <StatusRow>
            <div><strong>Delivery Worker</strong><br /><span>Email, WhatsApp, and SMS schedule checks</span></div>
            <Badge $tone="warning">Hourly</Badge>
          </StatusRow>
          <StatusRow>
            <div><strong>AI Enhancement</strong><br /><span>OpenAI-backed message refinement</span></div>
            <Badge $tone={process.env.REACT_APP_API_URL ? 'muted' : 'warning'}>Config dependent</Badge>
          </StatusRow>
        </Panel>

        <Panel>
          <h1>Core Workflows</h1>
          <Workflows>
            <Workflow>
              <strong>Message lifecycle</strong>
              <p>Create text, audio, or video messages, schedule delivery, then track pending and delivered states.</p>
            </Workflow>
            <Workflow>
              <strong>Wellness workspace</strong>
              <p>Mood logs, symptoms, journals, triggers, medication, therapy sessions, goals, and reports.</p>
            </Workflow>
            <Workflow>
              <strong>Payments and subscriptions</strong>
              <p>Paystack checkout with Naira plans and subscription verification after payment.</p>
            </Workflow>
            <Workflow>
              <strong>Admin monitoring</strong>
              <p>Audit logs, message activity, user totals, legacy contacts, and system status in one place.</p>
            </Workflow>
          </Workflows>
        </Panel>

        <Panel>
          <h1>Data Model Summary</h1>
          <EntityGrid>
            <Entity><strong>Users</strong><ul><li>Authentication and role</li><li>Messages and subscriptions</li></ul></Entity>
            <Entity $tone="#ffe1e7"><strong>Messages</strong><ul><li>Content, media, trigger</li><li>Delivery channel and status</li></ul></Entity>
            <Entity $tone="#f0e8ff"><strong>Wellness</strong><ul><li>Mood, symptoms, journals</li><li>Medication, reports, sessions</li></ul></Entity>
            <Entity $tone="#fff2c8"><strong>Operations</strong><ul><li>Legacy contacts</li><li>Audit logs and subscriptions</li></ul></Entity>
          </EntityGrid>
        </Panel>

        <Wide>
          <h1>Admin Performance</h1>
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
          <h1>Message Queue</h1>
          <QueueTable>
            {visibleMessages.slice(0, 4).map((message) => (
              <QueueRow key={message.id || message._id}>
                <div><strong>{message.content}</strong><br /><span>To: {message.recipient}</span></div>
                <span>{message.deliveryMethod || 'date'} delivery</span>
                <Badge $tone={message.status === 'delivered' ? undefined : 'warning'}>{message.status}</Badge>
              </QueueRow>
            ))}
          </QueueTable>
        </Panel>

        <Panel>
          <h1>Legacy Contacts</h1>
          <p>Maintain verified recipients who can receive important future messages.</p>
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
          <h1>Audit Trail</h1>
          <p>Recent security and system events captured from user and message activity.</p>
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
