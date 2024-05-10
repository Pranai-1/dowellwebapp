
import { BrowserRouter as Router,Routes,Route } from "react-router-dom"
import NpsLiteScale from "./NpsLiteScale"
import './index.css';

function App() {
  return (
    <Router>
     <Routes>
      <Route path="/100035-DowellScale-Function/nps-lite-scale" element={<NpsLiteScale/>}/>
     </Routes>
    </Router>
  )
}

export default App
