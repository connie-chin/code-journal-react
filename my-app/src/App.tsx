import { Header } from './Header';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import { EntryForm } from './EntryForm';
import { Entries } from './Entries';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Header />}>
          <Route index element={<Entries />} />
          <Route path="details/" element={<EntryForm />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
