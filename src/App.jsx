

import WidgetScreenWidht from './components/Widget/WidgetScreenWidht'
import Routes from './Routes/Routes'
import { Toaster } from 'react-hot-toast'

function App() {

  return (
    <>
      <WidgetScreenWidht />
      <Toaster position="top-right" />
      <Routes/>
    </>
  )
}

export default App
