import React, { useEffect, useRef } from 'react'

const Incident = ({text, submitting, btnColor, children}: {text: string, submitting: boolean, btnColor: string, children: any}) => {
  const ref = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    if(!submitting) {
      ref.current?.close();
    }
  }, [submitting])
  return (
    <>
        <button className={`btn btn-lg md:btn-wide ${btnColor}`} onClick={()=>ref.current?.showModal()}>{text}</button>
        <dialog ref={ref} className="modal">
          <div className="modal-box flex flex-col items-center justify-center gap-5">
              {children}
          </div>
          <form method="dialog" className="modal-backdrop">
              <button>close</button>
          </form>
        </dialog>
    </>
  )
}

export default Incident