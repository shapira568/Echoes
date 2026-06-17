import React, { useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import { mentalHealthAPI } from '../services/api';

const Page = styled.div`
  min-height: 100vh;
  background: #fbfcfd;
  color: #1f3042;
  padding: 2rem;

  @media (max-width: 640px) {
    padding: 1rem;
  }
`;

const Header = styled.header`
  align-items: center;
  background: #ffffff;
  border: 1px solid #dde6ee;
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
  color: #248179;
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
  background: ${({ $secondary }) => ($secondary ? '#ffffff' : '#248179')};
  border: 1px solid #248179;
  border-radius: 8px;
  color: ${({ $secondary }) => ($secondary ? '#248179' : '#ffffff')};
  cursor: pointer;
  font-weight: 800;
  min-height: 40px;
  padding: 0.65rem 1rem;

  &:hover {
    background: ${({ $secondary }) => ($secondary ? '#e9f6f4' : '#1d6962')};
  }
`;

const Flow = styled.section`
  background: #ffffff;
  border: 1px solid #dde6ee;
  border-radius: 12px;
  margin-bottom: 1.25rem;
  overflow: hidden;
  padding: 1rem;
`;

const FlowRail = styled.div`
  align-items: center;
  display: grid;
  gap: 0.65rem;
  grid-template-columns: repeat(8, minmax(100px, 1fr));
  overflow-x: auto;
  padding-bottom: 0.25rem;

  @media (max-width: 640px) {
    grid-template-columns: repeat(8, minmax(88px, 1fr));
  }
`;

const FlowStep = styled.button`
  background: ${({ $active }) => ($active ? '#248179' : '#f8fbfd')};
  border: 1px solid ${({ $active }) => ($active ? '#248179' : '#dde6ee')};
  border-radius: 10px;
  color: ${({ $active }) => ($active ? '#ffffff' : '#1f3042')};
  cursor: pointer;
  font-weight: 800;
  min-height: 74px;
  padding: 0.7rem;
  text-align: left;

  span {
    display: block;
    font-size: 1.3rem;
    margin-bottom: 0.25rem;
  }
`;

const Layout = styled.main`
  display: grid;
  gap: 1.25rem;
  grid-template-columns: 1.15fr 0.85fr;

  @media (max-width: 980px) {
    grid-template-columns: 1fr;
  }
`;

const Panel = styled.section`
  background: #ffffff;
  border: 1px solid #dde6ee;
  border-radius: 12px;
  padding: 1.1rem;

  h1, h2 {
    color: #1f3042;
    margin-bottom: 0.75rem;
  }

  h1 {
    font-size: 1.45rem;
  }

  h2 {
    font-size: 1.1rem;
  }

  p {
    color: #667889;
    line-height: 1.5;
  }
`;

const Form = styled.form`
  display: grid;
  gap: 0.9rem;
  grid-template-columns: repeat(2, minmax(0, 1fr));

  @media (max-width: 720px) {
    grid-template-columns: 1fr;
  }
`;

const Field = styled.label`
  color: #248179;
  display: grid;
  font-weight: 800;
  gap: 0.4rem;

  &.wide {
    grid-column: 1 / -1;
  }
`;

const inputCss = `
  border: 2px solid #dde6ee;
  border-radius: 8px;
  color: #1f3042;
  font: inherit;
  min-height: 42px;
  padding: 0.75rem;
  width: 100%;

  &:focus {
    border-color: #248179;
    box-shadow: 0 0 0 3px rgba(36, 129, 121, 0.14);
    outline: none;
  }
`;

const Input = styled.input`${inputCss}`;
const Select = styled.select`${inputCss}`;
const TextArea = styled.textarea`
  ${inputCss}
  min-height: 100px;
  resize: vertical;
`;

const MoodGrid = styled.div`
  display: grid;
  gap: 0.65rem;
  grid-column: 1 / -1;
  grid-template-columns: repeat(4, minmax(0, 1fr));

  @media (max-width: 680px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
`;

const MoodButton = styled.button`
  background: ${({ $selected, $tone }) => {
    if ($selected) return $tone === 'risk' ? '#fff1ed' : '#e9f6f4';
    return '#f8fbfd';
  }};
  border: 2px solid ${({ $selected, $tone }) => ($selected ? ($tone === 'risk' ? '#d94a38' : '#248179') : '#dde6ee')};
  border-radius: 10px;
  color: #1f3042;
  cursor: pointer;
  font-weight: 800;
  min-height: 72px;
  padding: 0.65rem;

  span {
    display: block;
    font-size: 1.45rem;
  }
`;

const Cards = styled.div`
  display: grid;
  gap: 0.8rem;
`;

const Card = styled.article`
  background: #f8fbfd;
  border: 1px solid #dde6ee;
  border-radius: 10px;
  padding: 0.85rem;

  strong {
    color: #1f3042;
    display: block;
    margin-bottom: 0.25rem;
  }
`;

const Gauge = styled.div`
  align-items: center;
  background: conic-gradient(#d94a38 ${({ $value }) => $value}%, #e6eef4 0);
  border-radius: 50%;
  display: flex;
  font-size: 1.2rem;
  font-weight: 900;
  height: 112px;
  justify-content: center;
  margin: 0.5rem 0 1rem;
  position: relative;
  width: 112px;

  &::before {
    background: #ffffff;
    border-radius: 50%;
    content: '';
    height: 74px;
    position: absolute;
    width: 74px;
  }

  span {
    position: relative;
    z-index: 1;
  }
`;

const Tag = styled.span`
  background: #edf6fb;
  border-radius: 999px;
  color: #276b95;
  display: inline-block;
  font-size: 0.82rem;
  font-weight: 800;
  margin: 0.25rem 0.25rem 0 0;
  padding: 0.3rem 0.55rem;
`;

const Notice = styled.div`
  background: ${({ $error }) => ($error ? '#fff1ed' : '#edf8f3')};
  border: 1px solid ${({ $error }) => ($error ? '#f0b2a8' : '#b9e2cd')};
  border-radius: 8px;
  color: ${({ $error }) => ($error ? '#9d352a' : '#236544')};
  font-weight: 800;
  margin-bottom: 1rem;
  padding: 0.75rem;
`;

const moods = [
  { id: 'frustrated', label: 'Frustrated', icon: ':(', tone: 'risk', intensity: 8 },
  { id: 'sad', label: 'Sad', icon: ':|', tone: 'risk', intensity: 7 },
  { id: 'angry', label: 'Angry', icon: '>:(', tone: 'risk', intensity: 9 },
  { id: 'stressed', label: 'Stressed', icon: '!', tone: 'risk', intensity: 8 },
  { id: 'isolated', label: 'Isolated', icon: 'o', tone: 'risk', intensity: 7 },
  { id: 'bored', label: 'Bored', icon: '-_-', tone: 'steady', intensity: 4 },
  { id: 'happy', label: 'Happy', icon: ':)', tone: 'steady', intensity: 5 },
  { id: 'excited', label: 'Excited', icon: ':D', tone: 'steady', intensity: 7 },
  { id: 'engaged', label: 'Engaged', icon: ':]', tone: 'steady', intensity: 6 },
  { id: 'playful', label: 'Playful', icon: ';)', tone: 'steady', intensity: 5 },
  { id: 'valued', label: 'Valued', icon: '<3', tone: 'steady', intensity: 6 },
  { id: 'confident', label: 'Confident', icon: '^_^', tone: 'steady', intensity: 6 }
];

const flowSteps = [
  ['Register', 'person'],
  ['Upload photo', 'photo'],
  ['Select team', 'team'],
  ['Mood check-in', 'mood'],
  ['Reason', 'reason'],
  ['Tags', 'tags'],
  ['Timeline', 'timeline'],
  ['Analytics', 'analytics']
];

const sampleEntries = [
  { id: 'sample-1', mood: 'stressed', reason: 'Deadline pressure and low sleep', team: 'Care Team', tags: ['deadline', 'sleep'], intensity: 8, interventionLevel: 'algorithm', date: new Date().toISOString() },
  { id: 'sample-2', mood: 'engaged', reason: 'Good support session', team: 'Care Team', tags: ['session', 'support'], intensity: 6, interventionLevel: 'none', date: new Date(Date.now() - 86400000).toISOString() },
  { id: 'sample-3', mood: 'isolated', reason: 'Missed group check-in', team: 'Support Team', tags: ['social', 'check-in'], intensity: 7, interventionLevel: 'management', date: new Date(Date.now() - 172800000).toISOString() }
];

function EmotionFlow() {
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState('mood');
  const [entries, setEntries] = useState([]);
  const [form, setForm] = useState({
    mood: 'happy',
    intensity: 5,
    reason: '',
    notes: '',
    team: '',
    tags: '',
    profilePhoto: ''
  });
  const [notice, setNotice] = useState('');
  const [error, setError] = useState('');

  const loadEntries = async () => {
    try {
      const response = await mentalHealthAPI.getMoodHistory();
      setEntries(response.data || []);
      setError('');
    } catch (err) {
      setEntries([]);
      setError('Log in to save emotion check-ins. Sample workflow data is shown below.');
    }
  };

  useEffect(() => {
    loadEntries();
  }, []);

  const visibleEntries = entries.length ? entries : sampleEntries;
  const analytics = useMemo(() => buildAnalytics(visibleEntries), [visibleEntries]);
  const selectedMood = moods.find((mood) => mood.id === form.mood);
  const interventionLevel = Number(form.intensity) >= 9 ? 'management' : Number(form.intensity) >= 7 ? 'algorithm' : 'none';

  const submit = async (event) => {
    event.preventDefault();
    setNotice('');
    setError('');

    try {
      await mentalHealthAPI.logMood({
        mood: form.mood,
        intensity: Number(form.intensity),
        reason: form.reason,
        notes: form.notes,
        team: form.team,
        profilePhoto: form.profilePhoto,
        interventionLevel,
        tags: form.tags.split(',').map((tag) => tag.trim()).filter(Boolean)
      });
      setNotice(interventionLevel === 'management'
        ? 'Check-in saved and marked for management intervention.'
        : interventionLevel === 'algorithm'
          ? 'Check-in saved and marked for algorithm support.'
          : 'Check-in saved.');
      setForm({ mood: 'happy', intensity: 5, reason: '', notes: '', team: '', tags: '', profilePhoto: '' });
      await loadEntries();
    } catch (err) {
      setError(err.response?.data?.message || 'Could not save this check-in. Please log in and try again.');
    }
  };

  return (
    <Page>
      <Header>
        <Brand to="/dashboard">Echoes Emotion Flow</Brand>
        <Actions>
          <Button type="button" $secondary onClick={() => navigate('/mental-health')}>Wellness</Button>
          <Button type="button" $secondary onClick={() => navigate('/ai-dashboard')}>AI Dashboard</Button>
          <Button type="button" onClick={() => navigate('/dashboard')}>Dashboard</Button>
        </Actions>
      </Header>

      <Flow>
        <FlowRail>
          {flowSteps.map(([label, id]) => (
            <FlowStep key={id} type="button" $active={activeStep === id} onClick={() => setActiveStep(id)}>
              <span>{stepIcon(id)}</span>
              {label}
            </FlowStep>
          ))}
        </FlowRail>
      </Flow>

      {(notice || error) && <Notice $error={Boolean(error)}>{error || notice}</Notice>}

      <Layout>
        <Panel>
          <h1>How are you feeling right now?</h1>
          <p>Select a mood, explain why, add tags, and the system will decide whether algorithm or management intervention is needed.</p>

          <Form onSubmit={submit}>
            <MoodGrid>
              {moods.map((mood) => (
                <MoodButton
                  key={mood.id}
                  type="button"
                  $selected={form.mood === mood.id}
                  $tone={mood.tone}
                  onClick={() => {
                    setForm((current) => ({ ...current, mood: mood.id, intensity: mood.intensity }));
                    setActiveStep('mood');
                  }}
                >
                  <span>{mood.icon}</span>
                  {mood.label}
                </MoodButton>
              ))}
            </MoodGrid>

            <Field>
              Team
              <Select value={form.team} onChange={(event) => setForm({ ...form, team: event.target.value })}>
                <option value="">Select team if applicable</option>
                <option>Care Team</option>
                <option>Support Team</option>
                <option>Operations</option>
                <option>Management</option>
              </Select>
            </Field>
            <Field>
              Intensity: {form.intensity}
              <Input type="range" min="1" max="10" value={form.intensity} onChange={(event) => setForm({ ...form, intensity: event.target.value })} />
            </Field>
            <Field className="wide">
              Why are you feeling this way?
              <TextArea required value={form.reason} onChange={(event) => setForm({ ...form, reason: event.target.value })} />
            </Field>
            <Field>
              Upload photo URL
              <Input value={form.profilePhoto} onChange={(event) => setForm({ ...form, profilePhoto: event.target.value })} placeholder="Optional profile/photo link" />
            </Field>
            <Field>
              Add tags
              <Input value={form.tags} onChange={(event) => setForm({ ...form, tags: event.target.value })} placeholder="deadline, sleep, social" />
            </Field>
            <Field className="wide">
              Timeline note
              <TextArea value={form.notes} onChange={(event) => setForm({ ...form, notes: event.target.value })} />
            </Field>
            <Button type="submit">Save Emotion Check-In</Button>
          </Form>
        </Panel>

        <Panel>
          <h2>Intervention Status</h2>
          <Gauge $value={Number(form.intensity) * 10}><span>{form.intensity}/10</span></Gauge>
          <Card>
            <strong>{selectedMood?.label} check-in</strong>
            <p>{interventionText(interventionLevel)}</p>
          </Card>

          <h2 style={{ marginTop: '1rem' }}>Management CMS Tracking</h2>
          <Cards>
            <Card><strong>Algorithm intervention</strong><p>{analytics.algorithm} check-ins flagged for quote, tip, tag, or timeline support.</p></Card>
            <Card><strong>Management intervention</strong><p>{analytics.management} check-ins need human review.</p></Card>
            <Card><strong>Current aura</strong><p>{analytics.topMood || 'No mood yet'}</p></Card>
          </Cards>
        </Panel>

        <Panel>
          <h2>Timeline</h2>
          <Cards>
            {visibleEntries.slice(0, 6).map((entry) => (
              <Card key={entry.id}>
                <strong>{entry.mood} - {entry.team || 'No team'}</strong>
                <p>{entry.reason || entry.notes || 'No reason entered.'}</p>
                {(entry.tags || []).map((tag) => <Tag key={tag}>{tag}</Tag>)}
                <p>{new Date(entry.date || entry.createdAt).toLocaleString()}</p>
              </Card>
            ))}
          </Cards>
        </Panel>

        <Panel>
          <h2>Individual Analytics</h2>
          <Gauge $value={analytics.riskScore}><span>{analytics.riskScore}%</span></Gauge>
          <Cards>
            <Card><strong>Emotion trends</strong><p>{analytics.trend}</p></Card>
            <Card><strong>Trending tags</strong><p>{analytics.tags.length ? analytics.tags.join(', ') : 'No tags yet'}</p></Card>
            <Card><strong>Team / overall analytics</strong><p>{analytics.teamSummary}</p></Card>
          </Cards>
        </Panel>
      </Layout>
    </Page>
  );
}

function buildAnalytics(entries) {
  const moodCounts = {};
  const tagCounts = {};
  const teamCounts = {};
  let algorithm = 0;
  let management = 0;
  let riskTotal = 0;

  entries.forEach((entry) => {
    moodCounts[entry.mood] = (moodCounts[entry.mood] || 0) + 1;
    (entry.tags || []).forEach((tag) => {
      tagCounts[tag] = (tagCounts[tag] || 0) + 1;
    });
    if (entry.team) teamCounts[entry.team] = (teamCounts[entry.team] || 0) + 1;
    if (entry.interventionLevel === 'algorithm') algorithm += 1;
    if (entry.interventionLevel === 'management') management += 1;
    if (['frustrated', 'sad', 'angry', 'stressed', 'isolated'].includes(entry.mood)) riskTotal += Number(entry.intensity || 5);
  });

  const topMood = Object.entries(moodCounts).sort((a, b) => b[1] - a[1])[0]?.[0];
  const topTeams = Object.entries(teamCounts).sort((a, b) => b[1] - a[1]).map(([team]) => team);
  const tags = Object.entries(tagCounts).sort((a, b) => b[1] - a[1]).slice(0, 5).map(([tag]) => tag);
  const riskScore = Math.min(100, Math.round((riskTotal / Math.max(entries.length * 10, 1)) * 100));

  return {
    topMood,
    tags,
    riskScore,
    algorithm,
    management,
    trend: topMood ? `${topMood} is the current leading emotion across recent check-ins.` : 'No trend yet.',
    teamSummary: topTeams.length ? `${topTeams.join(', ')} have recent check-ins.` : 'No team data yet.'
  };
}

function interventionText(level) {
  if (level === 'management') return 'Management intervention is recommended for this check-in.';
  if (level === 'algorithm') return 'Algorithm intervention can offer tips, quotes, tags, or timeline prompts.';
  return 'No intervention needed. Save this as a regular timeline update.';
}

function stepIcon(id) {
  return {
    person: 'O',
    photo: '+',
    team: '[]',
    mood: ':)',
    reason: '!',
    tags: '#',
    timeline: '=',
    analytics: '%'
  }[id];
}

export default EmotionFlow;
