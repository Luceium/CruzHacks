import React from 'react'

const page = () => {
  return (
    <div className='h-screen flex flex-col items-center justify-center gap-10'>
        <button className="btn btn-wide"><a href="/api/auth/login">Log In</a></button>
        <button className="btn btn-wide">Download App</button>
    </div>
  )
}

export default page