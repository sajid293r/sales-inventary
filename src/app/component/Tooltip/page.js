'use client'
import React, { useState, useEffect, useRef } from 'react';

const TooltipAutoClose = ({ children, tooltip }) => {
  const [show, setShow] = useState(false);
  const tooltipRef = useRef(null);
  const triggerRef = useRef(null);

  useEffect(() => {
    let timer;

    if (show) {
      timer = setTimeout(() => setShow(false), 2000); // auto-close after 2s
    }

    const handleClickOutside = (e) => {
      if (
        tooltipRef.current &&
        !tooltipRef.current.contains(e.target) &&
        triggerRef.current &&
        !triggerRef.current.contains(e.target)
      ) {
        setShow(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => {
      clearTimeout(timer);
      document.removeEventListener('click', handleClickOutside);
    };
  }, [show]);

  return (
    <div className="relative inline-block border border-black">
      <div className='bg-blue-500'>      <div
        ref={triggerRef}
        onMouseEnter={() => setShow(true)}
        className="inline-block border"
      >
        {children}
      </div>
      </div>
<div className='bg-blue-500'>
      {show && (

        <div
          ref={tooltipRef}
          className="absolute left-full top-1/2 -translate-y-1/2 ml-2
                     bg-gray-800 text-white text-sm px-3 py-1 rounded 
                     whitespace-nowrap scale-z-100 shadow transition-opacity duration-200 w-20 h-96  border"
        >
          <div className='bg-blue-500'>
          {/* {tooltip} */}
        </div>
        </div>
      )}
    </div>
    </div>
  );
};

export default TooltipAutoClose;
