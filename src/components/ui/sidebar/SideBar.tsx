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

interface ItemsProps {
  name: string;
  icon: keyof typeof ICONS; 
  href: string;
}


export const SideBar = () => {

  const [sidebarItems, setSidebarItems] = useState<ItemsProps[] | []>([]);
  const pathName = usePathname();

  useEffect(() => {
    fetch("/data/data.json").then( res => res.json() )
    .then( data => setSidebarItems(data.sidebarItems) )
  }, [])

  console.log(sidebarItems);

  if(sidebarItems.length === 0){
    return <p>Cargando...</p>
  }
  
  

  return (
    <div className="relative z-10 transition-all duration-300 ease-in-out flex-shrink-0 w-64">
        <div className="h-full bg-[#1e1e1e] backdrop-blur-md p-4 flex flex-col border-r border-[#2f2f2f]">
          <nav className="mt-8 flex-grow">
            {
              sidebarItems.map( item => {
                const IconComponent = ICONS[item.icon]
                return (
                  <Link key={item.name} href={ item.href }>
                      <div className={`flex items-center p-4 text-sm font-medium rounded-lg hover:bg-[#2f2f2f] transition-colors mb-2 ${ pathName === item.href ? "bg-[#2f2f2f]" : "" }`}>
                          <IconComponent size={20} style={{minWidth: "20px"}} />
                          <span className="ml-4 whitespace-nowrap" >{ item.name }</span>
                      </div>
                  </Link>
                )
              })
            }
          </nav>
        </div>
    </div>
  )
}
