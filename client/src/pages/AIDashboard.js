import React, { useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import { mentalHealthAPI, messageAPI } from '../services/api';

const Page = styled.div`
  min-height: 100vh;
  background: #f5f9fd;
  color: #1e3347;
  padding: 2rem;

  @media (max-width: 640px) {
    padding: 1rem;
  }
`;

const Header = styled.header`
  align-items: center;
  background: #ffffff;
  border: 1px solid #dce7ef;
  border-radius: 12px;
  display: flex;
  justify-content: space-between;
  margin-bottom: 1.5rem;
  padding: 1rem 1.25rem;

  @media (max-width: 640px) {
    align-items: flex-start;
    flex-direction: column;
    gap: 1rem;
  }
`;

const Brand = styled(Link)`
  color: #2c5aa0;
  font-size: 1.4rem;
  font-weight: 800;
  text-decoration: none;
`;

const Actions = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;

  @media (max-width: 640px) {
    width: 100%;

    button {
      flex: 1 1 140px;
    }
  }
`;

const Button = styled.button`
  background: ${({ $secondary }) => ($secondary ? '#ffffff' : '#2c5aa0')};
  border: 1px solid #2c5aa0;
  border-radius: 8px;
  color: ${({ $secondary }) => ($secondary ? '#2c5aa0' : '#ffffff')};
  cursor: pointer;
  font-weight: 800;
  min-height: 40px;
  padding: 0.65rem 1rem;

  &:hover {
    background: ${({ $secondary }) => ($secondary ? '#eaf2fb' : '#224b84')};
  }
`;

const Layout = styled.main`
  display: grid;
  gap: 1.25rem;
  grid-template-columns: 1.4fr 0.8fr;

  @media (max-width: 980px) {
    grid-template-columns: 1fr;
  }
`;

const Hero = styled.section`
  align-items: stretch;
  background: linear-gradient(135deg, #ffffff 0%, #eef7ff 100%);
  border: 1px solid #dce7ef;
  border-radius: 12px;
  display: grid;
  gap: 1rem;
  grid-template-columns: 1fr 320px;
  margin-bottom: 1.25rem;
  overflow: hidden;
  padding: 1.1rem;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`;

const HeroCopy = styled.div`
  h1 {
    color: #203b57;
    font-size: 1.8rem;
    margin-bottom: 0.45rem;
  }

  p {
    color: #63788a;
    line-height: 1.55;
    max-width: 720px;
  }
`;

const FloatingStack = styled.div`
  display: grid;
  gap: 0.65rem;
`;

const FloatingCard = styled.div`
  background: rgba(255, 255, 255, 0.9);
  border: 1px solid #d6e7f4;
  border-radius: 10px;
  box-shadow: 0 12px 30px rgba(43, 91, 133, 0.12);
  padding: 0.75rem;

  strong {
    color: #203b57;
    display: block;
    margin-bottom: 0.25rem;
  }

  span {
    color: #63788a;
    font-size: 0.9rem;
  }
`;

const Panel = styled.section`
  background: #ffffff;
  border: 1px solid #dce7ef;
  border-radius: 12px;
  padding: 1.1rem;

  h1, h2 {
    color: #203b57;
    margin-bottom: 0.8rem;
  }

  h1 {
    font-size: 1.5rem;
  }

  h2 {
    font-size: 1.05rem;
  }
`;

const AssistantGrid = styled.div`
  display: grid;
  gap: 0.6rem;
  grid-template-columns: 70px repeat(5, minmax(72px, 1fr));
  overflow-x: auto;
  padding-bottom: 0.25rem;

  @media (max-width: 760px) {
    grid-template-columns: 56px repeat(5, minmax(72px, 1fr));
  }
`;

const Slot = styled.div`
  background: ${({ $active }) => ($active ? '#d8ecfb' : '#f7fbfe')};
  border: 1px solid ${({ $active }) => ($active ? '#8fc3e8' : '#dce7ef')};
  border-radius: 8px;
  color: ${({ $active }) => ($active ? '#1f5f92' : '#718496')};
  font-size: 0.82rem;
  font-weight: 800;
  min-height: 52px;
  padding: 0.55rem;
`;

const Grid = styled.div`
  display: grid;
  gap: 1.25rem;
`;

const Metrics = styled.div`
  display: grid;
  gap: 0.85rem;
  grid-template-columns: repeat(4, minmax(0, 1fr));

  @media (max-width: 900px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @media (max-width: 560px) {
    grid-template-columns: 1fr;
  }
`;

const Metric = styled.div`
  background: #f7fbfe;
  border: 1px solid #dce7ef;
  border-radius: 10px;
  padding: 0.9rem;

  span {
    color: #65798b;
    display: block;
    font-size: 0.78rem;
    font-weight: 800;
    margin-bottom: 0.3rem;
    text-transform: uppercase;
  }

  strong {
    color: #203b57;
    font-size: 1.45rem;
  }
`;

const Task = styled.article`
  align-items: center;
  border-bottom: 1px solid #edf2f6;
  display: grid;
  gap: 0.8rem;
  grid-template-columns: 28px 1fr 90px 110px 90px;
  padding: 0.75rem 0;

  &:last-child {
    border-bottom: 0;
  }

  @media (max-width: 760px) {
    align-items: start;
    grid-template-columns: 28px 1fr;

    > span,
    > div:last-child {
      grid-column: 2;
    }
  }
`;

const Check = styled.div`
  align-items: center;
  border: 2px solid #9bbad4;
  border-radius: 6px;
  color: #2c5aa0;
  display: flex;
  font-size: 0.75rem;
  font-weight: 900;
  height: 20px;
  justify-content: center;
  width: 20px;
`;

const Badge = styled.span`
  background: ${({ $tone }) => {
    if ($tone === 'high') return '#ffe8e4';
    if ($tone === 'medium') return '#fff5d9';
    return '#e8f7ef';
  }};
  border-radius: 999px;
  color: ${({ $tone }) => {
    if ($tone === 'high') return '#b33b2e';
    if ($tone === 'medium') return '#936410';
    return '#237046';
  }};
  display: inline-block;
  font-size: 0.78rem;
  font-weight: 800;
  padding: 0.3rem 0.6rem;
  text-transform: capitalize;
`;

const Progress = styled.div`
  background: #e8f0f6;
  border-radius: 999px;
  height: 8px;
  overflow: hidden;

  div {
    background: #2c8fd6;
    height: 100%;
    width: ${({ $value }) => `${$value}%`};
  }
`;

const Suggestion = styled.article`
  background: #f7fbfe;
  border: 1px solid #dce7ef;
  border-radius: 10px;
  padding: 0.9rem;

  strong {
    color: #203b57;
    display: block;
    margin-bottom: 0.35rem;
  }

  p {
    color: #63788a;
    line-height: 1.45;
  }
`;

const WorkloadRow = styled.div`
  align-items: center;
  display: grid;
  gap: 0.75rem;
  grid-template-columns: 120px 1fr 44px;
  margin-bottom: 0.8rem;

  @media (max-width: 520px) {
    grid-template-columns: 1fr;
  }
`;

const Calendar = styled.div`
  display: grid;
  gap: 0.45rem;
  grid-template-columns: repeat(7, minmax(0, 1fr));
`;

const Day = styled.div`
  align-items: center;
  background: ${({ $active }) => ($active ? '#2c5aa0' : '#f7fbfe')};
  border: 1px solid #dce7ef;
  border-radius: 8px;
  color: ${({ $active }) => ($active ? '#ffffff' : '#63788a')};
  display: flex;
  font-weight: 800;
  height: 38px;
  justify-content: center;
`;

const Empty = styled.p`
  color: #63788a;
  line-height: 1.5;
`;

function AIDashboard() {
  const navigate = useNavigate();
  const [state, setState] = useState({
    messages: [],
    moods: [],
    symptoms: [],
    goals: [],
    sessions: [],
    reminders: [],
    reports: []
  });
  const [error, setError] = useState('');

  useEffect(() => {
    const load = async () => {
      try {
        const [messages, moods, symptoms, goals, sessions, reminders, reports] = await Promise.all([
          messageAPI.getMessages(),
          mentalHealthAPI.getMoodHistory(),
          mentalHealthAPI.getSymptoms(),
          mentalHealthAPI.getGoals(),
          mentalHealthAPI.getSessions(),
          mentalHealthAPI.getReminders(),
          mentalHealthAPI.getReports()
        ]);

        setState({
          messages: messages.data || [],
          moods: moods.data || [],
          symptoms: symptoms.data || [],
          goals: goals.data || [],
          sessions: sessions.data || [],
          reminders: reminders.data || [],
          reports: reports.data || []
        });
        setError('');
      } catch (err) {
        setError('Log in to see AI scheduling suggestions from your Echoes and wellness data.');
      }
    };

    load();
  }, []);

  const tasks = useMemo(() => {
    const builtTasks = buildTasks(state);
    return builtTasks.length ? builtTasks : sampleTasks;
  }, [state]);
  const suggestions = useMemo(() => buildSuggestions(state, tasks), [state, tasks]);
  const calendarDays = useMemo(() => buildCalendarDays(tasks), [tasks]);
  const workload = useMemo(() => buildWorkload(tasks), [tasks]);
  const highPriority = tasks.filter((task) => task.priority === 'high').length;
  const averageProgress = tasks.length
    ? Math.round(tasks.reduce((sum, task) => sum + task.progress, 0) / tasks.length)
    : 0;

  return (
    <Page>
      <Header>
        <Brand to="/dashboard">Echoes AI Dashboard</Brand>
        <Actions>
          <Button type="button" $secondary onClick={() => navigate('/mental-health')}>Wellness</Button>
          <Button type="button" $secondary onClick={() => navigate('/dashboard')}>Messages</Button>
          <Button type="button" onClick={() => {
            localStorage.removeItem('token');
            navigate('/login');
          }}>Logout</Button>
        </Actions>
      </Header>

      <Metrics>
        <Metric><span>Smart tasks</span><strong>{tasks.length}</strong></Metric>
        <Metric><span>High priority</span><strong>{highPriority}</strong></Metric>
        <Metric><span>Progress</span><strong>{averageProgress}%</strong></Metric>
        <Metric><span>Suggestions</span><strong>{suggestions.length}</strong></Metric>
      </Metrics>

      {error && <Panel><Empty>{error}</Empty></Panel>}

      <Hero>
        <HeroCopy>
          <h1>Intelligent Scheduling Assistant</h1>
          <p>
            Echoes turns messages, wellness goals, reminders, symptoms, and sessions into a focused planning board
            with AI suggestions, smart prioritization, workload awareness, and deadline tracking.
          </p>
        </HeroCopy>
        <FloatingStack>
          <FloatingCard><strong>Smart task prioritization</strong><span>{highPriority} high-priority items need attention.</span></FloatingCard>
          <FloatingCard><strong>Time blocking</strong><span>Reserve care windows before routine message work.</span></FloatingCard>
          <FloatingCard><strong>AI suggestions</strong><span>Recommendations update as your data grows.</span></FloatingCard>
        </FloatingStack>
      </Hero>

      <Layout>
        <Grid>
          <Panel>
            <h1>My Tasks</h1>
            {tasks.length === 0 && <Empty>No tasks yet. Add goals, sessions, reminders, messages, or symptoms to activate the AI planner.</Empty>}
            {tasks.slice(0, 8).map((task) => (
              <Task key={task.id}>
                <Check>{task.done ? '✓' : ''}</Check>
                <div>
                  <strong>{task.name}</strong>
                  <Empty>{task.source}</Empty>
                </div>
                <Badge $tone={task.priority}>{task.priority}</Badge>
                <span>{formatDate(task.date)}</span>
                <Progress $value={task.progress}><div /></Progress>
              </Task>
            ))}
          </Panel>

          <Panel>
            <h2>Team Workload</h2>
            {workload.map((item) => (
              <WorkloadRow key={item.name}>
                <strong>{item.name}</strong>
                <Progress $value={item.value}><div /></Progress>
                <span>{item.value}%</span>
              </WorkloadRow>
            ))}
          </Panel>

          <Panel>
            <h2>Intelligent Scheduling Assistant</h2>
            <AssistantGrid>
              {['Time', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri'].map((label) => (
                <Slot key={label}>{label}</Slot>
              ))}
              {buildScheduleSlots(tasks).map((slot) => (
                <Slot key={slot.key} $active={slot.active}>{slot.label}</Slot>
              ))}
            </AssistantGrid>
          </Panel>
        </Grid>

        <Grid>
          <Panel>
            <h2>AI Suggestions</h2>
            {suggestions.map((suggestion) => (
              <Suggestion key={suggestion.title}>
                <strong>{suggestion.title}</strong>
                <p>{suggestion.body}</p>
              </Suggestion>
            ))}
          </Panel>

          <Panel>
            <h2>Deadlines</h2>
            <Calendar>
              {calendarDays.map((day) => (
                <Day key={day.day} $active={day.active}>{day.day}</Day>
              ))}
            </Calendar>
          </Panel>
        </Grid>
      </Layout>
    </Page>
  );
}

function buildTasks(state) {
  const messageTasks = state.messages.map((message) => ({
    id: `message-${message.id || message._id}`,
    name: `Deliver ${message.messageType || 'message'} message`,
    source: message.recipient ? `Recipient: ${message.recipient}` : 'Echoes message',
    priority: isSoon(message.deliveryDate) ? 'high' : 'medium',
    date: message.deliveryDate || message.createdAt,
    progress: message.status === 'delivered' ? 100 : 60,
    done: message.status === 'delivered'
  }));

  const goalTasks = state.goals.map((goal) => ({
    id: `goal-${goal.id}`,
    name: goal.description,
    source: 'Wellness goal',
    priority: goal.status === 'paused' ? 'medium' : isSoon(goal.targetDate) ? 'high' : 'low',
    date: goal.targetDate || goal.createdAt,
    progress: goal.status === 'completed' ? 100 : goal.status === 'paused' ? 35 : 55,
    done: goal.status === 'completed'
  }));

  const sessionTasks = state.sessions.map((session) => ({
    id: `session-${session.id}`,
    name: 'Therapy session',
    source: session.therapist?.name || 'Scheduled care',
    priority: isSoon(session.date) ? 'high' : 'medium',
    date: session.date,
    progress: new Date(session.date) < new Date() ? 100 : 45,
    done: new Date(session.date) < new Date()
  }));

  const reminderTasks = state.reminders.map((reminder) => ({
    id: `reminder-${reminder.id}`,
    name: reminder.message,
    source: 'Reminder',
    priority: 'medium',
    date: reminder.createdAt,
    progress: 50,
    done: false
  }));

  const symptomTasks = state.symptoms
    .filter((symptom) => Number(symptom.severity) >= 7)
    .map((symptom) => ({
      id: `symptom-${symptom.id}`,
      name: `Review severe symptom: ${symptom.name}`,
      source: `Severity ${symptom.severity}/10`,
      priority: 'high',
      date: symptom.date || symptom.createdAt,
      progress: 20,
      done: false
    }));

  return [...symptomTasks, ...sessionTasks, ...goalTasks, ...reminderTasks, ...messageTasks]
    .sort((a, b) => priorityRank(a.priority) - priorityRank(b.priority));
}

const sampleTasks = [
  {
    id: 'sample-symptom',
    name: 'Review anxiety symptom pattern',
    source: 'Severity 8/10',
    priority: 'high',
    date: new Date().toISOString(),
    progress: 28,
    done: false
  },
  {
    id: 'sample-session',
    name: 'Prepare therapy session notes',
    source: 'Scheduled care',
    priority: 'high',
    date: addDays(2).toISOString(),
    progress: 45,
    done: false
  },
  {
    id: 'sample-reminder',
    name: 'Medication reminder check',
    source: 'Reminder',
    priority: 'medium',
    date: addDays(1).toISOString(),
    progress: 62,
    done: false
  },
  {
    id: 'sample-goal',
    name: 'Complete weekly mood reflection',
    source: 'Wellness goal',
    priority: 'medium',
    date: addDays(4).toISOString(),
    progress: 70,
    done: false
  },
  {
    id: 'sample-message',
    name: 'Schedule supportive Echoes message',
    source: 'Recipient: self',
    priority: 'low',
    date: addDays(6).toISOString(),
    progress: 50,
    done: false
  }
];

function buildSuggestions(state, tasks) {
  const suggestions = [];
  const highSymptoms = state.symptoms.filter((symptom) => Number(symptom.severity) >= 7);
  const lastMood = state.moods[0];

  if (highSymptoms.length > 0) {
    suggestions.push({
      title: 'Prioritize symptom follow-up',
      body: 'High-severity symptoms are present. Schedule a check-in, add notes, or prepare a therapist session summary.'
    });
  }

  if (lastMood && Number(lastMood.intensity) >= 8) {
    suggestions.push({
      title: 'Create a decompression block',
      body: `The latest mood intensity is ${lastMood.intensity}/10. Add a reminder for grounding, journaling, or a support contact.`
    });
  }

  if (state.goals.some((goal) => goal.status === 'paused')) {
    suggestions.push({
      title: 'Unblock paused goals',
      body: 'At least one goal is paused. Break it into a smaller step or move its target date.'
    });
  }

  if (tasks.filter((task) => task.priority === 'high').length >= 3) {
    suggestions.push({
      title: 'Reduce deadline pressure',
      body: 'Several high-priority tasks are active. Handle symptom/session items before lower-risk message or report work.'
    });
  }

  if (suggestions.length === 0) {
    suggestions.push({
      title: 'Keep the plan balanced',
      body: 'No urgent blockers found. Continue logging moods, goals, reminders, and upcoming sessions for better recommendations.'
    });
  }

  return suggestions;
}

function buildWorkload(tasks) {
  const high = tasks.filter((task) => task.priority === 'high').length;
  const medium = tasks.filter((task) => task.priority === 'medium').length;
  const low = tasks.filter((task) => task.priority === 'low').length;
  const total = Math.max(tasks.length, 1);

  return [
    { name: 'Urgent care', value: Math.round((high / total) * 100) },
    { name: 'Scheduled work', value: Math.round((medium / total) * 100) },
    { name: 'Routine follow-up', value: Math.round((low / total) * 100) }
  ];
}

function buildCalendarDays(tasks) {
  const activeDays = new Set(tasks.map((task) => {
    const date = new Date(task.date);
    return Number.isNaN(date.getTime()) ? null : date.getDate();
  }).filter(Boolean));

  return Array.from({ length: 28 }, (_, index) => ({
    day: index + 1,
    active: activeDays.has(index + 1)
  }));
}

function buildScheduleSlots(tasks) {
  const times = ['9 AM', '11 AM', '1 PM', '3 PM'];
  const activeLabels = tasks.slice(0, 5).map((task) => task.name.split(' ').slice(0, 2).join(' '));
  const slots = [];

  times.forEach((time, rowIndex) => {
    slots.push({ key: `${time}-label`, label: time, active: false });
    for (let column = 0; column < 5; column += 1) {
      const label = activeLabels[(rowIndex + column) % activeLabels.length];
      const active = (rowIndex + column) % 3 === 0;
      slots.push({
        key: `${time}-${column}`,
        label: active ? label : '',
        active
      });
    }
  });

  return slots;
}

function isSoon(dateValue) {
  if (!dateValue) return false;
  const date = new Date(dateValue);
  if (Number.isNaN(date.getTime())) return false;
  const diff = date.getTime() - Date.now();
  return diff >= 0 && diff <= 1000 * 60 * 60 * 24 * 7;
}

function addDays(days) {
  const date = new Date();
  date.setDate(date.getDate() + days);
  return date;
}

function priorityRank(priority) {
  return { high: 0, medium: 1, low: 2 }[priority] || 3;
}

function formatDate(dateValue) {
  if (!dateValue) return 'No date';
  const date = new Date(dateValue);
  if (Number.isNaN(date.getTime())) return 'No date';
  return date.toLocaleDateString();
}

export default AIDashboard;
