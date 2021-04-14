import { AcademicCapIcon, ExternalLinkIcon, RssIcon, MenuIcon } from '@heroicons/react/outline'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import { CSSTransition } from 'react-transition-group'

const Navbar = () => {
  const [showMenu, setShowMenu] = useState(false)

  // TO-DO: this should be refactored
  const menuRef = useRef<any>(null)
  const buttonRef = useRef<any>(null)

  const closeMenu = () => {
    setShowMenu(false)
  }
  const handleToggleMenu = (e: MouseEvent) => {
    if (buttonRef.current && buttonRef.current.contains(e.target)) {
      return
    }
    if (menuRef.current && !menuRef.current.contains(e.target)) {
      closeMenu()
    }
  }

  useEffect(() => {
    document.addEventListener('click', handleToggleMenu)
    return () => {
      document.removeEventListener('click', handleToggleMenu)
    }
  }, [])

  return (
    <nav className="mt-4 -mx-2 flex flex-row justify-between">
      <Link href="/">
        <a className="flex items-center p-2 rounded lg:hover:bg-gray-100 dark:text-white lg:hover:dark:bg-gray-800">
          <AcademicCapIcon className="mr-4 w-5 h-5" />
          <span>Home</span>
        </a>
      </Link>

      {/* Navigation on desktop devices */}
      <div className="hidden md:flex">
        <Link href="/friends">
          <a className="text-blue-700 p-2 mr-2 rounded hover:bg-blue-50 dark:text-yellow-400 hover:dark:bg-gray-800">
            Friends
          </a>
        </Link>
        <a
          className="flex items-center text-blue-700 p-2 mr-2 rounded hover:bg-blue-50 dark:text-yellow-400 hover:dark:bg-gray-800"
          href="https://spencerwoo.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          Portfolio
          <ExternalLinkIcon className="ml-2 w-5 h-5" />
        </a>
        <a
          className="flex items-center text-pink-700 p-2 mr-2 rounded bg-pink-100 bg-opacity-40 hover:bg-opacity-80 dark:bg-opacity-10 dark:hover:bg-opacity-20"
          href="/feed"
          target="_blank"
          rel="noopener noreferrer"
        >
          RSS
          <RssIcon className="ml-2 w-5 h-5" />
        </a>
      </div>

      {/* Navigation on mobile devices (dropdown menu) */}
      <button
        className="md:hidden p-2"
        ref={buttonRef}
        onClick={() => {
          setShowMenu(true)
        }}
      >
        <MenuIcon className="w-5 h-5 dark:text-white" />
      </button>
      <CSSTransition in={showMenu} timeout={300} classNames="menu" unmountOnExit nodeRef={menuRef}>
        <div className="absolute top-0 right-0" ref={menuRef}>
          <div className="flex flex-col space-y-4 m-3 p-4 rounded bg-white shadow-xl dark:bg-gray-800 dark:text-white">
            <Link href="/friends">
              <a>Friends</a>
            </Link>
            <a className="flex items-center" href="https://spencerwoo.com" target="_blank" rel="noopener noreferrer">
              Portfolio
              <ExternalLinkIcon className="ml-2 w-5 h-5" />
            </a>
            <a className="flex items-center text-pink-700" href="/feed" target="_blank" rel="noopener noreferrer">
              RSS
              <RssIcon className="ml-2 w-5 h-5" />
            </a>
          </div>
        </div>
      </CSSTransition>
    </nav>
  )
}

export default Navbar
