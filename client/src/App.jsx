import React from 'react'
import LoginJobSeeker from './pages/AuthJobSeeker.jsx'
import LoginEmployer from './pages/AuthEmployer.jsx'
import Home from './pages/Home.jsx'
import JobSection from './pages/JobSection.jsx'
import CreateJob from './pages/CreateJob.jsx'
import JobDetails from './pages/JobDetails.jsx'
import ProfilePage from './pages/ProfilePage.jsx'
import CreatedJobs from './pages/CreatedJobs.jsx'
import EditJob from './pages/EditJob.jsx'
import ViewJob from './pages/ViewJob.jsx'

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
          <Route path='/created-jobs' element={<CreatedJobs />} />
          <Route path='/edit-job/:id' element={<EditJob />} />
          <Route path='/view-job/:id' element={<ViewJob />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
