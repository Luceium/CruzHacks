'use client';
import Image from 'next/image';
import { usePathname } from 'next/navigation'
import { useState, useEffect, useRef } from "react";
import classNames from "classnames";

export default function QRCodeComponent({size} : {size: number}) {
  const pathname = 'https://www.safeandslug.us/' + usePathname();
  const [isToggled, toggle] = useState(false);
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        toggle(false);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [isToggled]);
  const ref = useRef(null);
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (e.target === ref.current) {
        toggle(false);
      }
    };
    window.addEventListener("click", handler);
    return () => window.removeEventListener("click", handler);
  }, [ref]);

  return(
    <button className="bg-white rounded-xl text-primary-content text-sm p-1 border:none max-w-32" 
    onClick={()=>toggle(true)}>
      <Image src={`https://api.qrserver.com/v1/create-qr-code/?data=${pathname}&amp;size=${size}x${size}`} alt="" width={size} height={size}/>
      {<dialog ref={ref} className={classNames("modal", {"modal-open": isToggled})}>
          <div className="modal-box h-fit bg-white text-center">
            <Image src={`https://api.qrserver.com/v1/create-qr-code/?data=${pathname}&amp;size=${size}x${size}`} alt="" width="500" height="500"/>
          </div>
      </dialog>}
    </button>
  )
}