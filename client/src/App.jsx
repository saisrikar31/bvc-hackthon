import React from 'react'
import LoginJobSeeker from './pages/AuthJobSeeker.jsx'
import LoginEmployer from './pages/AuthEmployer.jsx'
import Home from './pages/Home.jsx'
import JobSection from './pages/JobSection.jsx'
import CreateJob from './pages/CreateJob.jsx'
import JobDetails from './pages/JobDetails.jsx'
import ProfilePage from './pages/ProfilePage.jsx'

import { BrowserRouter, Route, Router, Routes } from 'react-router-dom'
const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/auth-job-seeker' element={<LoginJobSeeker />} />
          <Route path='/auth-employer' element={<LoginEmployer />} />
          <Route path='/job-section' element={<JobSection />} ></Route>
          <Route path='/create-job' element={<CreateJob />} />
          <Route path='/job-details/:id' element={<JobDetails />} />
          <Route path='/create-job' element={<CreateJob />} />
          <Route path='/profile' element={<ProfilePage />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App