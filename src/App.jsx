import { Router } from "./routes/Router";
import { ToastContainer } from 'react-toastify'

function App() {
  return (
    <div className="container-scroller">
      <Router/>
      <ToastContainer
        position="bottom-right"
        closeOnClick
        newestOnTop={true}
        pauseOnFocusLoss
        autoClose={5000}
        enableMultiContainer
      />
    </div>
  )
}

export default App
