'use client';

import { Bell, DollarSign, House, Info, Mail, Settings, ShoppingBag, ShoppingCart, Users } from "lucide-react"
import Link from "next/link";
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"

const ICONS = {

  House,
  DollarSign,
  Settings,
  ShoppingCart,
  ShoppingBag,
  Mail,
  Users,
  Bell,
  Info
}


export const SideBar = () => {

  const [sidebarItems, setSidebarItems] = useState([]);
  const pathName = usePathname();

  useEffect(() => {
    fetch("data.data.json").then( res => res.json() )
    .then( data => setSidebarItems(data) )
  }, [])

  console.log(sidebarItems);
  
  

  return (
    <div className="relative z-10 transition-all duration-300 ease-in-out flex-shrink-0 w-64">
        <div className="h-full bg-[#1e1e1e] backdrop-blur-md p-4 flex flex-col border-r border-[#2f2f2f]">
          <nav className="mt-8 flex-grow">
            {
              sidebarItems.map( item => (
                <a >
                  {item}
                </a>
              ))
            }
          </nav>
        </div>
    </div>
  )
}
