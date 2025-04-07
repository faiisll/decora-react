import { useState } from 'react';

export default function ProjectDetail() {
  const [tab, setTab] = useState('details');
  const [message, setMessage] = useState('');

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Living Room Renovation</h1>
        <div className="flex space-x-4 items-center">
          <input type="text" placeholder="Search..." className="input input-bordered w-64" />
          <div className="w-8 h-8 bg-gray-200 rounded-full" />
          <div className="w-8 h-8 bg-gray-300 rounded-full" />
        </div>
      </div>

      <div className="tabs tabs-boxed">
        <a
          className={`tab ${tab === 'details' ? 'tab-active' : ''}`}
          onClick={() => setTab('details')}
        >Details</a>
        <a
          className={`tab ${tab === 'team' ? 'tab-active' : ''}`}
          onClick={() => setTab('team')}
        >Team</a>
        <a
          className={`tab ${tab === 'phases' ? 'tab-active' : ''}`}
          onClick={() => setTab('phases')}
        >Phases & Tasks</a>
        <a
          className={`tab ${tab === 'chat' ? 'tab-active' : ''}`}
          onClick={() => setTab('chat')}
        >Chat</a>
      </div>

      {tab === 'details' && (
        <div className="card bg-base-100 shadow-md">
          <div className="card-body">
            <p><strong>Description:</strong> A cozy and modern renovation of the client's living room. Focus on wood accents and natural lighting.</p>
            <p><strong>Tags:</strong> #Modern #LivingRoom #Wood</p>
            <p><strong>Budget:</strong> $15,000</p>
            <p><strong>Timeline:</strong> 6 weeks</p>
          </div>
        </div>
      )}

      {tab === 'team' && (
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
          {["Alice Johnson", "David Lee", "Mia Chen"].map((name, idx) => (
            <div className="card bg-base-100 shadow-md" key={idx}>
              <div className="card-body flex flex-row items-center space-x-4">
                <div className="avatar">
                  <div className="w-12 rounded-full">
                    <img src={`https://api.dicebear.com/7.x/initials/svg?seed=${name}`} alt={name} />
                  </div>
                </div>
                <div>
                  <p className="font-medium">{name}</p>
                  <p className="text-sm opacity-60">{['Designer', 'Project Manager', 'Contractor'][idx]}</p>
                  <p className={`text-sm ${['text-green-500', 'text-red-500', 'text-green-500'][idx]}`}>{['Online', 'Offline', 'Online'][idx]}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {tab === 'phases' && (
        <div className="space-y-4">
          {["Planning", "Design", "Execution"].map((phase, index) => (
            <div className="collapse collapse-arrow bg-base-100 shadow-md" key={index}>
              <input type="checkbox" defaultChecked />
              <div className="collapse-title text-lg font-semibold">
                Phase {index + 1}: {phase}
              </div>
              <div className="collapse-content">
                <ul className="list-disc list-inside space-y-1">
                  <li>✅ Client Briefing</li>
                  <li>🕒 Moodboard</li>
                  <li>➕ Add Task</li>
                </ul>
              </div>
            </div>
          ))}
        </div>
      )}

      {tab === 'chat' && (
        <div className="card bg-base-100 shadow-md">
          <div className="card-body space-y-4">
            <div className="space-y-2">
              <div>
                <p className="font-semibold">Sarah (Client):</p>
                <p>Can we add a bookshelf near the window?</p>
              </div>
              <div>
                <p className="font-semibold">You:</p>
                <p>Sure! I’ll mock one up and send you options.</p>
              </div>
            </div>
            <div className="flex space-x-2">
              <textarea
                className="textarea textarea-bordered w-full"
                placeholder="Type your message here..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              ></textarea>
              <button className="btn btn-primary">Send ➤</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
