"use client"
import React, { useState } from 'react'

const page = () => {
  type BeforeInstallPromptEvent = any;

  let installPrompt : BeforeInstallPromptEvent;
  if (typeof window !== "undefined") {
    window.addEventListener("beforeinstallprompt", (event) => {
      event.preventDefault()
      installPrompt = event;
    })
  }

  return (
    <div className='h-screen flex flex-col items-center justify-center gap-10'>
        <button className="btn btn-wide"><a href="/api/auth/login">Log In</a></button>
        {/* TODO: only render in non-standalone and if browser supports download */}
        <button className="btn btn-wide" onClick={() => {
          console.log(`${installPrompt == true}\n${installPrompt}`)
          installPrompt.prompt()
        }} >Download App</button>
    </div>
  )
}

export default page