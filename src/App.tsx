import { useState } from 'react'
import './App.css'
import UserFormWithFakeData from './pages/UserFormWithFakeData'
import UserManagementPage from './pages/UserManagementPage'
import UserFormExample from './features/User/UserFormExample'

function App() {
  return (
    <div style={{ display: 'flex', flexDirection: 'row', height: '100vh' }}>
      {/* <div style={{ flex: 1, borderRight: '1px solid #ccc', padding: '10px' }}>
        <UserFormWithFakeData />
      </div> */}
      <div style={{ flex: 1, padding: '10px' }}>
        <UserManagementPage />
      </div>
      <div style={{ flex: 1, padding: '10px' }}>
        <UserFormExample />
      </div>
    </div>
  )
}

export default App
