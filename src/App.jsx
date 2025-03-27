import {Routes, Route} from 'react-router-dom'
import Login from'./login'
// import './index.css'
import './App.css'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
    </Routes>
  );
}