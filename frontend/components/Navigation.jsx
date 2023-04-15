import {RiUser3Line} from 'react-icons/ri'
import {BiSearchAlt} from 'react-icons/bi'
import {HiOutlineMenuAlt3} from 'react-icons/hi'
import { MdClear } from "react-icons/md";
import SideBar from "./SideBar"
import {  AiOutlineShoppingCart} from "react-icons/ai";
import Link from 'next/link';
import { useState } from 'react';
import router from 'next/router'
import { useRecoilState } from 'recoil';
import { navState } from '../atoms/navHandler';
import { useDispatch, useSelector } from "react-redux"
import { selectedcartItems } from '../slices/cartSlice';
import { addSearchedWord } from '../slices/searchSlice';
import MobileNav from './MobileNav';
// import SearchSuggesstions from './SearchSuggesstions';


const items = []
function Navigation() {
  const dispatch = useDispatch();
  const [openSideBar, setOpenSideBar] = useRecoilState(navState);
  const [searchWord, setSearchWord] = useState("");
  const sideBarHandler = () => {
      setOpenSideBar(true);
    };
    const closeNavHandler = () => {
      setOpenSideBar(false);
    };
  const [showSearch, setShowSearch] = useState(false);

  const showSearchHandler = () => {
      setShowSearch(!showSearch)
  }

  dispatch(addSearchedWord(searchWord));

  const searchHandler = (e) => {
    const word = e.target.value;
    setSearchWord(word.toLowerCase());
  };

  const clearSearchHandler = (e) => {
    setSearchWord('');
  };

  const searchIconHandler = () => {
    router.push(`/search/${searchWord}`)
    clearSearchHandler()
  }

  const pressToSearchHandler = (suggesstion) => {
    if(suggesstion) {
      clearSearchHandler()
      return router.push(`/search/${suggesstion}`)
    }
  }
  const productInCart = useSelector(selectedcartItems)

  return (
<div>
{/* sidebar menu */}
<SideBar openSideBar={openSideBar} showSearch={showSearch} />
    {/* navigation */}
  <nav className={`flex items-center justify-between flex-wrap bg-gray-50 py-4  shadow-md lg:shadow-lg px-[10px] lg:px-[50px] `}>
  
    {/* Logo */}
    <div className="flex items-center space-x-2">
      <div className="">
      {openSideBar ? (
                  <MdClear
                    className='w-6 h-6 text-gray-500 lg:hidden transition-transform duration-500 ease-in-out cursor-pointer'
                    onClick={closeNavHandler}
                  />
                ) : (
                  <HiOutlineMenuAlt3 className='w-6 h-6 text-gray-500 lg:hidden cursor-pointer' onClick={sideBarHandler}/>
                )}
      
      </div>
      <div className="text-xl lg:text-2xl font-changa text-gray-900 cursor-pointer capitalize" onClick={() => router.push("/")}>
      Muhalid <span className=''>team</span>
      </div>
      
      </div>

     {/* search for Desktop */}
              <div className='hidden lg:flex items-center  h-10 rounded-full max-w-3xl flex-grow cursor-pointer bg-black  hover:bg-gray-500 transition-all duration-500 linear '>
                <input
                  type='text'
                  className='py-5 px-4 h-full w-6 flex-grow  flex-shrink rounded-l-full focus:outline-none bg-gray-300 font-play text-gray-700 text-xs'
                  placeholder='Enter your pin here'
                  onChange={searchHandler}
                />

                <p className='text-xs px-3 font-changa text-white'>
                Display Anwser
                </p>
                
              </div>

                 {/*  Right*/}
                 <div className='flex items-center text-gray-500 text-xs  space-x-5 lg:space-x-12  whitespace-nowrap  lg:px-'>
                <div className='flex space-x space-x-6 items-center'>
                  <Link href='/login'>
                     <div className='hover:text-[#f7b32b] transition-all duration-500 linear'>
                        <RiUser3Line className='w-6 h-6 lg:w-7 lg:h-5 ' />
                     <p className='hidden lg:inline font-semiold md:text-xs font-titilliumWeb link'>
                    Login
                  </p>
                  </div>
                  </Link>
                </div>

                <div
                  className=' flex items-center '
                >
                   <button className="capitalize w-[80px] md:w-[120px] h-[40px] rounded-md text-white bg-black hover:bg-gray-500 transition-all duration-500 linear " >Register</button>
            
                </div>
              </div>

  </nav>
                 {/* search for mobile */}
                  <MobileNav showSearch={showSearch} searchHandler={searchHandler} searchWord={searchWord} pressToSearchHandler={pressToSearchHandler}  />

                  {/* Suggesstions */}
                 {/* <SearchSuggesstions searchWord={searchWord} pressToSearchHandler={pressToSearchHandler} /> */}
</div>
  )
  };

export default Navigation;
