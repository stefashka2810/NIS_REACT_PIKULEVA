import './App.scss'
import Dashboard from "./page/Dashboard.tsx";
import EventProvider from "./context/EventProvider.tsx";

function App() {

  return (
    <EventProvider>
      <Dashboard></Dashboard>
    </EventProvider>
  )
}

export default App
