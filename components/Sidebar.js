import Image from 'next/image'
import SidebarLink from './SidebarLink.js'
import { HomeIcon } from '@heroicons/react/solid'
import { useRouter } from 'next/router'
import {
  HashtagIcon,
  BellIcon,
  InboxIcon,
  BookmarkIcon,
  ClipboardListIcon,
  UserIcon,
  DotsCircleHorizontalIcon,
  DotsHorizontalIcon,
} from '@heroicons/react/outline'
import { signOut, useSession } from 'next-auth/react'
export default function Sidebar() {
  const { data: session } = useSession()
  const router= useRouter()
  return (
    <div
      className="hidden sm:flex flex-col items-center 
		xl:items-start xl:w-[340px] p-2 fixed h-full
		"
    >
      <div className="flex items-center justify-center w-14 h-14 hoverAnimation p-0 xl:ml-24 ">
        <Image
          src="/images/logo.png"
          width="80px"
          height="60px"
          onClick={() => router.push('/')}
        />
      </div>
      <div className="space-y-1 mt-4 mb-4.5 xl:ml-24">
        <SidebarLink
          text="Home"
          Icon={HomeIcon}
          active
          onClick={() => router.push('/')}
        />
        <SidebarLink text="Explore" Icon={HashtagIcon} />
        <SidebarLink text="Notifications" Icon={BellIcon} />
        <SidebarLink text="Messages" Icon={InboxIcon} />
        <SidebarLink text="Bookmarks" Icon={BookmarkIcon} />
        <SidebarLink text="Lists" Icon={ClipboardListIcon} />
        <SidebarLink text="Profile" Icon={UserIcon} />
        <SidebarLink text="More" Icon={DotsCircleHorizontalIcon} />
      </div>
      <button className="hidden xl:inline ml-auto bg-[#E40223] text-white rounded-full w-56 h-[52px] text-lg font-bold shadow-md hover:bg-[#E40223]">
        WING 🦅
      </button>
      <div
        className="text-[#d9d9d9] flex items-center justify-center hoverAnimation xl:ml-auto mb-3 mt-auto w-[95%]"
        onClick={signOut}
      >
        <img
          src={session.user.image}
          alt=""
          className="h-10 w-10 rounded-full xl:mr-2.5"
        />
        <div className="hidden xl:inline leading-5">
          <h4 className="font-bold">
            {session.user.name.substring(0, 15) + '...'}
          </h4>
          <p className="text-[#6e767d]">
            @{session.user.tag.substring(0, 15) + '...'}
          </p>
        </div>
        <DotsHorizontalIcon className="h-5 hidden xl:inline ml-10" />
      </div>
    </div>
  )
}
