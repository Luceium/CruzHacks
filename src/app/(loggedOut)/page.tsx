"use client"
import React, { useState } from 'react'

const page = () => {
  type BeforeInstallPromptEvent = any;

  const [installPrompt,updateInstallPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  if (typeof window !== "undefined") {
    window.addEventListener("beforeinstallprompt", (event) => {
      event.preventDefault()
      updateInstallPrompt(event)
    })
  }

  return (
    <div className='h-screen flex flex-col items-center justify-center gap-10'>
        <button className="btn btn-wide"><a href="/api/auth/login">Log In</a></button>
        {/* TODO: only render in non-standalone and if browser supports download */}
        {installPrompt && <button className="btn btn-wide" onClick={() => {
          installPrompt.prompt()
        }} >Download App</button>}
    </div>
  )
}

export default page