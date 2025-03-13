import React from 'react';
import KanbanBoard from './components/KanbanBoard';

function App() {
  return (
    <div style={{ background: 'linear-gradient(45deg, #E0EAFC, #CFDEF3)', minHeight: '100vh' }}>
      <KanbanBoard />
    </div>
  );
}

export default App;