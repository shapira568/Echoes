import React, { useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import { mentalHealthAPI } from '../services/api';

const Page = styled.div`
  min-height: 100vh;
  background: #f4f8fb;
  color: #18324a;
  padding: 2rem;

  @media (max-width: 640px) {
    padding: 1rem;
  }
`;

const Header = styled.header`
  align-items: center;
  background: #ffffff;
  border: 1px solid #d9e4ec;
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
  font-weight: 700;
  text-decoration: none;
`;

const HeaderActions = styled.div`
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
  align-items: center;
  background: ${({ $variant }) => ($variant === 'secondary' ? '#ffffff' : '#2c5aa0')};
  border: 1px solid #2c5aa0;
  border-radius: 8px;
  color: ${({ $variant }) => ($variant === 'secondary' ? '#2c5aa0' : '#ffffff')};
  cursor: pointer;
  display: inline-flex;
  font-weight: 700;
  justify-content: center;
  min-height: 42px;
  padding: 0.7rem 1rem;
  transition: background 0.2s ease, transform 0.2s ease;

  &:hover {
    background: ${({ $variant }) => ($variant === 'secondary' ? '#eaf2fb' : '#214a86')};
    transform: translateY(-1px);
  }
`;

const Shell = styled.div`
  display: grid;
  gap: 1.5rem;
  grid-template-columns: 260px 1fr;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`;

const Sidebar = styled.aside`
  background: #ffffff;
  border: 1px solid #d9e4ec;
  border-radius: 12px;
  height: fit-content;
  padding: 1rem;
`;

const ProfileBlock = styled.div`
  border-bottom: 1px solid #e3ecf2;
  margin-bottom: 1rem;
  padding-bottom: 1rem;

  h1 {
    color: #18324a;
    font-size: 1.25rem;
    margin-bottom: 0.35rem;
  }

  p {
    color: #5b7083;
    line-height: 1.45;
  }
`;

const TabButton = styled.button`
  background: ${({ $active }) => ($active ? '#2c5aa0' : 'transparent')};
  border: 0;
  border-radius: 8px;
  color: ${({ $active }) => ($active ? '#ffffff' : '#18324a')};
  cursor: pointer;
  display: block;
  font-size: 0.95rem;
  font-weight: 700;
  margin-bottom: 0.4rem;
  padding: 0.8rem;
  text-align: left;
  width: 100%;

  &:hover {
    background: ${({ $active }) => ($active ? '#2c5aa0' : '#eaf2fb')};
  }
`;

const Main = styled.main`
  display: grid;
  gap: 1.5rem;
`;

const SummaryGrid = styled.section`
  display: grid;
  gap: 1rem;
  grid-template-columns: repeat(4, minmax(0, 1fr));

  @media (max-width: 1050px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`;

const Stat = styled.div`
  background: #ffffff;
  border: 1px solid #d9e4ec;
  border-radius: 10px;
  padding: 1rem;

  span {
    color: #5b7083;
    display: block;
    font-size: 0.85rem;
    font-weight: 700;
    margin-bottom: 0.35rem;
    text-transform: uppercase;
  }

  strong {
    color: #18324a;
    font-size: 1.6rem;
    overflow-wrap: anywhere;

    @media (max-width: 640px) {
      font-size: 1.25rem;
    }
  }
`;

const Panel = styled.section`
  background: #ffffff;
  border: 1px solid #d9e4ec;
  border-radius: 12px;
  padding: 1.25rem;

  h2 {
    color: #2c5aa0;
    font-size: 1.35rem;
    margin-bottom: 0.35rem;
  }

  > p {
    color: #5b7083;
    line-height: 1.5;
    margin-bottom: 1rem;
  }
`;

const FormGrid = styled.form`
  display: grid;
  gap: 1rem;
  grid-template-columns: repeat(2, minmax(0, 1fr));

  @media (max-width: 720px) {
    grid-template-columns: 1fr;
  }
`;

const Field = styled.label`
  color: #2c5aa0;
  display: grid;
  font-weight: 700;
  gap: 0.4rem;

  &.wide {
    grid-column: 1 / -1;
  }
`;

const inputStyles = `
  border: 2px solid #d9e4ec;
  border-radius: 8px;
  color: #18324a;
  font: inherit;
  min-height: 42px;
  padding: 0.75rem;
  width: 100%;

  &:focus {
    border-color: #4a90e2;
    box-shadow: 0 0 0 3px rgba(74, 144, 226, 0.16);
    outline: none;
  }
`;

const Input = styled.input`${inputStyles}`;
const Select = styled.select`${inputStyles}`;
const TextArea = styled.textarea`
  ${inputStyles}
  min-height: 105px;
  resize: vertical;
`;

const ToggleField = styled.label`
  align-items: center;
  color: #18324a;
  display: flex;
  font-weight: 700;
  gap: 0.65rem;
  min-height: 42px;
`;

const HistoryGrid = styled.div`
  display: grid;
  gap: 0.8rem;
  margin-top: 1rem;
`;

const Item = styled.article`
  background: #f8fbfd;
  border: 1px solid #dfe9f0;
  border-radius: 8px;
  padding: 0.9rem;

  h3 {
    color: #18324a;
    font-size: 1rem;
    margin-bottom: 0.25rem;
  }

  p {
    color: #5b7083;
    line-height: 1.45;
    margin-top: 0.25rem;
  }

  small {
    color: #6b7f90;
    display: block;
    margin-top: 0.35rem;
  }
`;

const Chart = styled.div`
  align-items: end;
  border-bottom: 1px solid #d9e4ec;
  display: flex;
  gap: 0.55rem;
  min-height: 160px;
  padding-top: 1rem;
`;

const Bar = styled.div`
  align-items: center;
  display: flex;
  flex: 1;
  flex-direction: column;
  gap: 0.45rem;
  justify-content: end;
  min-width: 34px;

  div {
    background: #2c5aa0;
    border-radius: 6px 6px 0 0;
    min-height: 10px;
    width: 100%;
  }

  span {
    color: #5b7083;
    font-size: 0.8rem;
    text-align: center;
    text-transform: capitalize;
  }
`;

const Notice = styled.div`
  background: ${({ $error }) => ($error ? '#fff1f0' : '#eef8f1')};
  border: 1px solid ${({ $error }) => ($error ? '#f3bbb5' : '#bfe4c8')};
  border-radius: 8px;
  color: ${({ $error }) => ($error ? '#91392f' : '#245c35')};
  font-weight: 700;
  margin-bottom: 1rem;
  padding: 0.75rem;
`;

const tabs = [
  { id: 'mood', label: 'Mood Cataloging' },
  { id: 'symptoms', label: 'Symptom Tracking' },
  { id: 'journal', label: 'Journaling' },
  { id: 'triggers', label: 'Trigger Identification' },
  { id: 'medication', label: 'Medication' },
  { id: 'goals', label: 'Goals' },
  { id: 'contacts', label: 'Emergency Contacts' },
  { id: 'sessions', label: 'Therapy Sessions' },
  { id: 'reports', label: 'Reports' },
  { id: 'reminders', label: 'Reminders' },
  { id: 'visualization', label: 'Data Visualization' }
];

const initialForms = {
  mood: { mood: 'neutral', intensity: 5, notes: '' },
  journal: { title: '', content: '', mood: 'neutral', tags: '' },
  symptom: { name: '', severity: 5, duration: '', triggered: false },
  trigger: { name: '', type: 'stress', description: '', copingStrategy: '', frequency: '' },
  medication: { name: '', dosage: '', frequency: '', startTime: '', reminders: '', notes: '' },
  goal: { description: '', targetDate: '', status: 'active' },
  contact: { name: '', phone: '', relationship: '' },
  session: { therapistId: '', therapistName: '', therapistLicenseNo: '', therapistSpecialty: '', date: '', notes: '' },
  report: { summary: '', date: '' },
  reminder: { medicationId: '', time: '', message: '' }
};

function MentalHealth() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('mood');
  const [forms, setForms] = useState(initialForms);
  const [data, setData] = useState({
    moods: [],
    stats: { moodCounts: {}, avgIntensity: 0, totalEntries: 0 },
    journals: [],
    symptoms: [],
    triggers: [],
    medications: [],
    goals: [],
    reports: [],
    contacts: [],
    therapists: [],
    sessions: [],
    reminders: []
  });
  const [notice, setNotice] = useState('');
  const [error, setError] = useState('');

  const loadData = async () => {
    try {
      const [
        moods,
        stats,
        journals,
        symptoms,
        triggers,
        medications,
        goals,
        reports,
        contacts,
        therapists,
        sessions,
        reminders
      ] = await Promise.all([
        mentalHealthAPI.getMoodHistory(),
        mentalHealthAPI.getMoodStats(),
        mentalHealthAPI.getJournals(),
        mentalHealthAPI.getSymptoms(),
        mentalHealthAPI.getTriggers(),
        mentalHealthAPI.getMedications(),
        mentalHealthAPI.getGoals(),
        mentalHealthAPI.getReports(),
        mentalHealthAPI.getEmergencyContacts(),
        mentalHealthAPI.getTherapists(),
        mentalHealthAPI.getSessions(),
        mentalHealthAPI.getReminders()
      ]);

      setData({
        moods: moods.data || [],
        stats: stats.data || { moodCounts: {}, avgIntensity: 0, totalEntries: 0 },
        journals: journals.data || [],
        symptoms: symptoms.data || [],
        triggers: triggers.data || [],
        medications: medications.data || [],
        goals: goals.data || [],
        reports: reports.data || [],
        contacts: contacts.data || [],
        therapists: therapists.data || [],
        sessions: sessions.data || [],
        reminders: reminders.data || []
      });
      setError('');
    } catch (err) {
      setError('Please log in to use the mental health workspace.');
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const updateForm = (section, field, value) => {
    setForms((current) => ({
      ...current,
      [section]: { ...current[section], [field]: value }
    }));
  };

  const submit = async (event, action, successMessage, resetKey) => {
    event.preventDefault();
    setNotice('');
    setError('');

    try {
      await action();
      setNotice(successMessage);
      if (resetKey) {
        setForms((current) => ({ ...current, [resetKey]: initialForms[resetKey] }));
      }
      await loadData();
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong. Please try again.');
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const moodCounts = data.stats.moodCounts || {};
  const chartMax = Math.max(1, ...Object.values(moodCounts));
  const recentMood = data.moods[0]?.mood || 'No entry yet';
  const nextReminder = data.reminders[0]?.time || data.medications.find((med) => med.isActive)?.startTime || 'None scheduled';

  const riskNote = useMemo(() => {
    const severeSymptoms = data.symptoms.filter((symptom) => Number(symptom.severity) >= 7).length;
    if (severeSymptoms > 0) return `${severeSymptoms} high-severity symptom entries`;
    return 'No high-severity symptoms logged';
  }, [data.symptoms]);

  return (
    <Page>
      <Header>
        <Brand to="/dashboard">Echoes</Brand>
        <HeaderActions>
          <Button type="button" $variant="secondary" onClick={() => navigate('/dashboard')}>
            Dashboard
          </Button>
          <Button type="button" $variant="secondary" onClick={() => navigate('/emotion-flow')}>
            Emotion Flow
          </Button>
          <Button type="button" onClick={logout}>Logout</Button>
        </HeaderActions>
      </Header>

      <Shell>
        <Sidebar>
          <ProfileBlock>
            <h1>Member Wellness</h1>
            <p>Track mood, symptoms, journals, triggers, medication, reminders, and trends in one place.</p>
          </ProfileBlock>
          {tabs.map((tab) => (
            <TabButton
              key={tab.id}
              type="button"
              $active={activeTab === tab.id}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.label}
            </TabButton>
          ))}
        </Sidebar>

        <Main>
          <SummaryGrid>
            <Stat><span>Recent mood</span><strong>{recentMood}</strong></Stat>
            <Stat><span>Average intensity</span><strong>{data.stats.avgIntensity || 0}</strong></Stat>
            <Stat><span>Care signal</span><strong>{riskNote}</strong></Stat>
            <Stat><span>Next reminder</span><strong>{nextReminder}</strong></Stat>
          </SummaryGrid>

          {(notice || error) && <Notice $error={Boolean(error)}>{error || notice}</Notice>}

          {activeTab === 'mood' && (
            <Panel>
              <h2>Mood Cataloging</h2>
              <p>Record how you feel and how strong the feeling is, then review recent entries.</p>
              <FormGrid onSubmit={(event) => submit(event, () => mentalHealthAPI.logMood(forms.mood), 'Mood entry saved.', 'mood')}>
                <Field>
                  Mood
                  <Select value={forms.mood.mood} onChange={(event) => updateForm('mood', 'mood', event.target.value)}>
                    {['happy', 'sad', 'anxious', 'angry', 'calm', 'energetic', 'tired', 'neutral'].map((mood) => (
                      <option key={mood} value={mood}>{mood}</option>
                    ))}
                  </Select>
                </Field>
                <Field>
                  Intensity: {forms.mood.intensity}
                  <Input type="range" min="1" max="10" value={forms.mood.intensity} onChange={(event) => updateForm('mood', 'intensity', Number(event.target.value))} />
                </Field>
                <Field className="wide">
                  Notes
                  <TextArea value={forms.mood.notes} onChange={(event) => updateForm('mood', 'notes', event.target.value)} placeholder="What is influencing your mood today?" />
                </Field>
                <Button type="submit">Save Mood</Button>
              </FormGrid>
              <History title="Recent moods" items={data.moods} render={(item) => `${item.mood} - intensity ${item.intensity}/10`} />
            </Panel>
          )}

          {activeTab === 'symptoms' && (
            <Panel>
              <h2>Symptom Tracking</h2>
              <p>Log symptoms, severity, duration, and whether a known trigger was involved.</p>
              <FormGrid onSubmit={(event) => submit(event, () => mentalHealthAPI.createSymptom(forms.symptom), 'Symptom entry saved.', 'symptom')}>
                <Field>Symptom<Input required value={forms.symptom.name} onChange={(event) => updateForm('symptom', 'name', event.target.value)} /></Field>
                <Field>Severity: {forms.symptom.severity}<Input type="range" min="1" max="10" value={forms.symptom.severity} onChange={(event) => updateForm('symptom', 'severity', Number(event.target.value))} /></Field>
                <Field>Duration<Input value={forms.symptom.duration} onChange={(event) => updateForm('symptom', 'duration', event.target.value)} placeholder="20 minutes, all day, etc." /></Field>
                <ToggleField><input type="checkbox" checked={forms.symptom.triggered} onChange={(event) => updateForm('symptom', 'triggered', event.target.checked)} /> Linked to a trigger</ToggleField>
                <Button type="submit">Save Symptom</Button>
              </FormGrid>
              <History title="Recent symptoms" items={data.symptoms} render={(item) => `${item.name} - severity ${item.severity}/10${item.duration ? `, ${item.duration}` : ''}`} />
            </Panel>
          )}

          {activeTab === 'journal' && (
            <Panel>
              <h2>Journaling</h2>
              <p>Capture private reflections and connect them to a mood label for later review.</p>
              <FormGrid onSubmit={(event) => submit(event, () => mentalHealthAPI.createJournal({
                ...forms.journal,
                tags: forms.journal.tags.split(',').map((tag) => tag.trim()).filter(Boolean),
                isPrivate: true
              }), 'Journal entry saved.', 'journal')}>
                <Field>Title<Input value={forms.journal.title} onChange={(event) => updateForm('journal', 'title', event.target.value)} /></Field>
                <Field>Mood<Select value={forms.journal.mood} onChange={(event) => updateForm('journal', 'mood', event.target.value)}><option>neutral</option><option>happy</option><option>sad</option><option>anxious</option><option>calm</option></Select></Field>
                <Field className="wide">Entry<TextArea required value={forms.journal.content} onChange={(event) => updateForm('journal', 'content', event.target.value)} /></Field>
                <Field className="wide">Tags<Input value={forms.journal.tags} onChange={(event) => updateForm('journal', 'tags', event.target.value)} placeholder="sleep, work, family" /></Field>
                <Button type="submit">Save Journal</Button>
              </FormGrid>
              <History title="Recent journals" items={data.journals} render={(item) => `${item.title || 'Untitled'} - ${item.mood || 'no mood'}`} details={(item) => item.content} />
            </Panel>
          )}

          {activeTab === 'triggers' && (
            <Panel>
              <h2>Trigger Identification</h2>
              <p>Identify patterns and write a coping strategy beside each trigger.</p>
              <FormGrid onSubmit={(event) => submit(event, () => mentalHealthAPI.createTrigger(forms.trigger), 'Trigger saved.', 'trigger')}>
                <Field>Name<Input required value={forms.trigger.name} onChange={(event) => updateForm('trigger', 'name', event.target.value)} /></Field>
                <Field>Type<Select value={forms.trigger.type} onChange={(event) => updateForm('trigger', 'type', event.target.value)}><option>stress</option><option>anxiety</option><option>depression</option><option>panic</option><option>other</option></Select></Field>
                <Field>Frequency<Input value={forms.trigger.frequency} onChange={(event) => updateForm('trigger', 'frequency', event.target.value)} placeholder="daily, weekly, rarely" /></Field>
                <Field className="wide">Description<TextArea value={forms.trigger.description} onChange={(event) => updateForm('trigger', 'description', event.target.value)} /></Field>
                <Field className="wide">Coping strategy<TextArea value={forms.trigger.copingStrategy} onChange={(event) => updateForm('trigger', 'copingStrategy', event.target.value)} /></Field>
                <Button type="submit">Save Trigger</Button>
              </FormGrid>
              <History title="Known triggers" items={data.triggers} render={(item) => `${item.name} - ${item.type}${item.frequency ? `, ${item.frequency}` : ''}`} details={(item) => item.copingStrategy} />
            </Panel>
          )}

          {activeTab === 'medication' && (
            <Panel>
              <h2>Medication</h2>
              <p>Track dosage, frequency, reminders, and notes for active medications.</p>
              <FormGrid onSubmit={(event) => submit(event, () => mentalHealthAPI.createMedication({
                ...forms.medication,
                reminders: forms.medication.reminders.split(',').map((time) => time.trim()).filter(Boolean)
              }), 'Medication saved.', 'medication')}>
                <Field>Name<Input required value={forms.medication.name} onChange={(event) => updateForm('medication', 'name', event.target.value)} /></Field>
                <Field>Dosage<Input required value={forms.medication.dosage} onChange={(event) => updateForm('medication', 'dosage', event.target.value)} /></Field>
                <Field>Frequency<Input required value={forms.medication.frequency} onChange={(event) => updateForm('medication', 'frequency', event.target.value)} placeholder="once daily" /></Field>
                <Field>Start time<Input type="time" value={forms.medication.startTime} onChange={(event) => updateForm('medication', 'startTime', event.target.value)} /></Field>
                <Field className="wide">Reminder times<Input value={forms.medication.reminders} onChange={(event) => updateForm('medication', 'reminders', event.target.value)} placeholder="08:00, 20:00" /></Field>
                <Field className="wide">Notes<TextArea value={forms.medication.notes} onChange={(event) => updateForm('medication', 'notes', event.target.value)} /></Field>
                <Button type="submit">Save Medication</Button>
              </FormGrid>
              <History title="Medication list" items={data.medications} render={(item) => `${item.name} - ${item.dosage}, ${item.frequency}`} details={(item) => item.notes} />
            </Panel>
          )}

          {activeTab === 'goals' && (
            <Panel>
              <h2>Goals</h2>
              <p>Set member goals with target dates and track whether each goal is active, paused, or completed.</p>
              <FormGrid onSubmit={(event) => submit(event, () => mentalHealthAPI.createGoal(forms.goal), 'Goal saved.', 'goal')}>
                <Field className="wide">Description<TextArea required value={forms.goal.description} onChange={(event) => updateForm('goal', 'description', event.target.value)} placeholder="Describe the wellness goal." /></Field>
                <Field>Target date<Input type="date" value={forms.goal.targetDate} onChange={(event) => updateForm('goal', 'targetDate', event.target.value)} /></Field>
                <Field>Status<Select value={forms.goal.status} onChange={(event) => updateForm('goal', 'status', event.target.value)}><option>active</option><option>completed</option><option>paused</option></Select></Field>
                <Button type="submit">Save Goal</Button>
              </FormGrid>
              <History title="Goals" items={data.goals} render={(item) => `${item.description} - ${item.status}`} details={(item) => item.targetDate ? `Target: ${new Date(item.targetDate).toLocaleDateString()}` : ''} />
            </Panel>
          )}

          {activeTab === 'contacts' && (
            <Panel>
              <h2>Emergency Contacts</h2>
              <p>Store trusted contacts the member can rely on during urgent care moments.</p>
              <FormGrid onSubmit={(event) => submit(event, () => mentalHealthAPI.createEmergencyContact(forms.contact), 'Emergency contact saved.', 'contact')}>
                <Field>Name<Input required value={forms.contact.name} onChange={(event) => updateForm('contact', 'name', event.target.value)} /></Field>
                <Field>Phone<Input required type="tel" value={forms.contact.phone} onChange={(event) => updateForm('contact', 'phone', event.target.value)} /></Field>
                <Field className="wide">Relationship<Input value={forms.contact.relationship} onChange={(event) => updateForm('contact', 'relationship', event.target.value)} placeholder="Parent, friend, partner, clinician" /></Field>
                <Button type="submit">Save Contact</Button>
              </FormGrid>
              <History title="Emergency contacts" items={data.contacts} render={(item) => `${item.name} - ${item.phone}`} details={(item) => item.relationship} />
            </Panel>
          )}

          {activeTab === 'sessions' && (
            <Panel>
              <h2>Therapy Sessions</h2>
              <p>Schedule and document sessions, including therapist profile details from the ER diagram.</p>
              <FormGrid onSubmit={(event) => submit(event, () => mentalHealthAPI.createSession({
                ...forms.session,
                therapistId: forms.session.therapistId || null
              }), 'Therapy session saved.', 'session')}>
                <Field>
                  Existing therapist
                  <Select value={forms.session.therapistId} onChange={(event) => updateForm('session', 'therapistId', event.target.value)}>
                    <option value="">Add a new therapist below</option>
                    {data.therapists.map((therapist) => (
                      <option key={therapist.id} value={therapist.id}>{therapist.name}</option>
                    ))}
                  </Select>
                </Field>
                <Field>Date and time<Input required type="datetime-local" value={forms.session.date} onChange={(event) => updateForm('session', 'date', event.target.value)} /></Field>
                <Field>Therapist name<Input value={forms.session.therapistName} onChange={(event) => updateForm('session', 'therapistName', event.target.value)} /></Field>
                <Field>License no.<Input value={forms.session.therapistLicenseNo} onChange={(event) => updateForm('session', 'therapistLicenseNo', event.target.value)} /></Field>
                <Field className="wide">Specialty<Input value={forms.session.therapistSpecialty} onChange={(event) => updateForm('session', 'therapistSpecialty', event.target.value)} /></Field>
                <Field className="wide">Notes<TextArea value={forms.session.notes} onChange={(event) => updateForm('session', 'notes', event.target.value)} /></Field>
                <Button type="submit">Save Session</Button>
              </FormGrid>
              <History title="Sessions" items={data.sessions} render={(item) => `${item.therapist?.name || 'Therapist'} - ${new Date(item.date).toLocaleString()}`} details={(item) => item.notes} />
            </Panel>
          )}

          {activeTab === 'reports' && (
            <Panel>
              <h2>Reports</h2>
              <p>Generate summaries from member observations, therapy notes, symptoms, and mood patterns.</p>
              <FormGrid onSubmit={(event) => submit(event, () => mentalHealthAPI.createReport({
                ...forms.report,
                date: forms.report.date || new Date().toISOString()
              }), 'Report saved.', 'report')}>
                <Field>Date<Input type="date" value={forms.report.date} onChange={(event) => updateForm('report', 'date', event.target.value)} /></Field>
                <Field className="wide">Summary<TextArea required value={forms.report.summary} onChange={(event) => updateForm('report', 'summary', event.target.value)} placeholder="Summarize mood, symptoms, goals, sessions, medication, and safety contacts." /></Field>
                <Button type="submit">Save Report</Button>
              </FormGrid>
              <History title="Reports" items={data.reports} render={(item) => `Report - ${new Date(item.date).toLocaleDateString()}`} details={(item) => item.summary} />
            </Panel>
          )}

          {activeTab === 'reminders' && (
            <Panel>
              <h2>Reminders</h2>
              <p>Create medication-linked or general reminders with a time and message.</p>
              <FormGrid onSubmit={(event) => submit(event, () => mentalHealthAPI.createReminder({
                ...forms.reminder,
                medicationId: forms.reminder.medicationId || null
              }), 'Reminder saved.', 'reminder')}>
                <Field>
                  Medication
                  <Select value={forms.reminder.medicationId} onChange={(event) => updateForm('reminder', 'medicationId', event.target.value)}>
                    <option value="">General reminder</option>
                    {data.medications.map((medication) => (
                      <option key={medication.id} value={medication.id}>{medication.name}</option>
                    ))}
                  </Select>
                </Field>
                <Field>Time<Input required type="time" value={forms.reminder.time} onChange={(event) => updateForm('reminder', 'time', event.target.value)} /></Field>
                <Field className="wide">Message<Input required value={forms.reminder.message} onChange={(event) => updateForm('reminder', 'message', event.target.value)} placeholder="Take medication, check in, breathe, journal, etc." /></Field>
                <Button type="submit">Save Reminder</Button>
              </FormGrid>
              <History
                title="Reminder schedule"
                items={data.reminders}
                empty="No reminders saved yet."
                render={(item) => `${item.time} - ${item.message}`}
              />
            </Panel>
          )}

          {activeTab === 'visualization' && (
            <Panel>
              <h2>Data Visualization</h2>
              <p>Review mood frequency for the last 30 days and use the summary cards for quick member insight.</p>
              <Chart>
                {Object.keys(moodCounts).length === 0 && <p>No mood data yet.</p>}
                {Object.entries(moodCounts).map(([mood, count]) => (
                  <Bar key={mood}>
                    <div style={{ height: `${(count / chartMax) * 135}px` }} />
                    <span>{mood}</span>
                  </Bar>
                ))}
              </Chart>
            </Panel>
          )}
        </Main>
      </Shell>
    </Page>
  );
}

function History({ title, items, render, details, empty = 'Nothing saved yet.' }) {
  return (
    <HistoryGrid>
      <h3>{title}</h3>
      {items.length === 0 && <Item><p>{empty}</p></Item>}
      {items.slice(0, 5).map((item) => (
        <Item key={item.id}>
          <h3>{render(item)}</h3>
          {details && details(item) && <p>{details(item)}</p>}
          <small>{new Date(item.date || item.createdAt).toLocaleString()}</small>
        </Item>
      ))}
    </HistoryGrid>
  );
}

export default MentalHealth;
