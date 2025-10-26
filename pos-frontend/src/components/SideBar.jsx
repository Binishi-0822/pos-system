import React, {useState} from 'react'
import { NavLink } from 'react-router-dom'
import { sideBarOptions } from '../utils/SideBarOptions';
import { useAuth } from '../context/AuthContext';
import { LuLogIn } from "react-icons/lu";
import { IoSettings } from "react-icons/io5";


const SideBar = () => {
    const {user} = useAuth();
    const sideBarMenuList  = sideBarOptions[user.role]
    const [active, setActive] = useState(0)

    return (
        <div className='bg-primary-color-2 w-1/5 h-screen flex flex-col justify-between'>
            <div>
                <p className='text-secondary-color-1 text-2xl text-center pt-10 pb-5 '>POS System</p>
                <div>
                    {sideBarMenuList.map((option,index) => (
                        <div>
                            <NavLink 
                                to={option.path}  
                                className="bg-primary-color-2 hover:bg-primary-color-1 rounded-lg flex items-center gap-3 pl-5 pt-3 pb-3 ml-3 mr-3"
                                onClick={() => {setActive(index)}}>
                                    <option.icon  className={`${active === index ? "text-secondary-color-3" : "text-secondary-color-1"}`} />
                                    <span className={`${active === index ? "text-secondary-color-3" : "text-secondary-color-1"}`}>{option.title}</span>
                            </NavLink>
                        </div>
                    ))}   
                </div>
            </div>
            <div>
                <NavLink 
                    to="/login"  
                    className="bg-primary-color-2 hover:bg-primary-color-1 rounded-lg flex items-center gap-3 pl-5 pb-3 pt-3 ml-3 mr-3"
                >
                    <IoSettings className="text-secondary-color-1"/>
                    <span className="text-secondary-color-1">Setting</span>
                </NavLink>
                <NavLink 
                    to="/login"  
                    className="bg-primary-color-2 hover:bg-primary-color-1 rounded-lg flex items-center gap-3 pl-5 mb-4 pb-3 pt-3 ml-3 mr-3"
                >
                    <LuLogIn className="text-secondary-color-1"/>
                    <span className="text-secondary-color-1">Log Out</span>
                </NavLink>
            </div>
        </div>

    )
}

export default SideBar