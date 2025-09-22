import { useState } from 'react'
import React from 'react'
import './App.css'
import PostJson from './components/ApiFetch.tsx'
import GenericForm from './components/Form.tsx'

function App() {

  return (
    <>
      <PostJson/>
      <GenericForm/>
    </>
  )
}

export default App
