import React, { useState, useEffect } from 'react';
import axios from 'axios';

const MoodTracker = () => {
  const [mood, setMood] = useState('neutral');
  const [intensity, setIntensity] = useState(5);
  const [notes, setNotes] = useState('');
  const [history, setHistory] = useState([]);

  const moods = ['happy', 'sad', 'anxious', 'angry', 'calm', 'energetic', 'tired', 'neutral'];

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await axios.post('http://localhost:5000/api/mood/log', {
        mood,
        intensity,
        notes
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert('Mood logged successfully! 🎉');
      fetchHistory();
    } catch (error) {
      console.error('Error logging mood:', error);
    }
  };

  const fetchHistory = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get('http://localhost:5000/api/mood/history', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setHistory(res.data);
    } catch (error) {
      console.error('Error fetching history:', error);
    }
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">🧠 Log Your Mood</h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-2">How are you feeling?</label>
          <select 
            value={mood} 
            onChange={(e) => setMood(e.target.value)}
            className="w-full p-2 border rounded"
          >
            {moods.map(m => (
              <option key={m} value={m}>{m.charAt(0).toUpperCase() + m.slice(1)}</option>
            ))}
          </select>
        </div>
        
        <div>
          <label className="block mb-2">Intensity (1-10): {intensity}</label>
          <input 
            type="range" 
            min="1" 
            max="10" 
            value={intensity}
            onChange={(e) => setIntensity(e.target.value)}
            className="w-full"
          />
        </div>
        
        <div>
          <label className="block mb-2">Notes (optional)</label>
          <textarea 
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="w-full p-2 border rounded"
            rows="3"
            placeholder="What's on your mind?"
          />
        </div>
        
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          Save Mood Entry
        </button>
      </form>

      <div className="mt-8">
        <h3 className="text-xl font-semibold mb-3">Recent Entries</h3>
        {history.map(entry => (
          <div key={entry.id} className="p-3 border rounded mb-2 bg-gray-50">
            <div className="font-medium">{entry.mood} • Intensity: {entry.intensity}/10</div>
            <div className="text-sm text-gray-600">{new Date(entry.date).toLocaleString()}</div>
            {entry.notes && <p className="mt-1">{entry.notes}</p>}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MoodTracker;