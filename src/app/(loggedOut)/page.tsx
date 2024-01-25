"use client"
import React, { useState } from 'react'

const Page = () => {
  type BeforeInstallPromptEvent = any;
  const [installPrompt, setInstallPrompt] = useState<null | BeforeInstallPromptEvent>(null)

  if (typeof window !== "undefined") {
    window.addEventListener("beforeinstallprompt", (event) => {
      event.preventDefault()
      setInstallPrompt(event)
    })
  }

  return (
    <div className='h-screen flex flex-col items-center justify-center gap-10'>
        <a href="/api/auth/login"><button className="btn btn-wide">Log In</button></a>
        {/* TODO: only render in non-standalone and if browser supports download */}
        {installPrompt && <button className="btn btn-wide" onClick={async () => {
          const userSelection = await installPrompt.prompt()
          console.log(userSelection)
          if (userSelection.outcome == "accepted") {setInstallPrompt(null)}
        }} >Download App</button>}
    </div>
  )
}

export default Page