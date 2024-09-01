import React from 'react'
import VMeditor from './VMeditor'
import'./style.css'
const Container = () => {
  return (
    <div className='container'>
        <h1 className='title'>VM Editor</h1>
        <div className='editor-container'>
        <VMeditor/>
    </div>
    </div>
  )
}

export default Container