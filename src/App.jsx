

import { useEffect } from 'react'
import WidgetScreenWidht from './components/Widget/WidgetScreenWidht'
import Routes from './Routes/Routes'
import { Toaster } from 'react-hot-toast'
import NavigationWrapper from './components/Navigation/NavigationWrapper'

function App() {

  return (
    <>
      <NavigationWrapper />
      <WidgetScreenWidht />
      <Toaster position="top-center" />
      <Routes/>
    </>
  )
}

export default App
