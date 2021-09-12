import { useEffect } from 'react'
import Calculator from './components/Calculator'
import './App.css'
import './styles/theme.css'

function App() {
  useEffect(() => {
    const body = document.getElementsByTagName('body')
    if (body) {
      body[0].className = 'theme-1'
    }
  }, [])

  return (
    <main className="App">
      <Calculator />
    </main>
  );
}

export default App;
