import React from 'react'

export default function SidebarLink({text, Icon,active}) {
  return (
      <div className={`text-[#d9d9d9] flex items-center justify-center xl:justify-start text-l space-x-3 hoverAnimation ${active && "font-bold"}`}>
        <Icon className="h-7 text-white" />
        <span className="hidden xl:inline " style={{fontSize:"1rem"}}>{text}</span>
      </div>
      
    )   
}
