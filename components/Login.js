import Image from 'next/image'
import { signIn } from 'next-auth/react'
import {FcGoogle} from 'react-icons/fc'
export default function Login({ providers }) {
  return (
    <div className="flex flex-col items-center space-y-5 pt-40">
      <Image
        src="/images/logo.png"
        width={300}
        height={300}
        objectFit="contain"
      />
      {/* #1d9bf0     */}

      <div className="h-full ">
        {Object.values(providers).map((provider) => (
          <div key={provider.name} className="w-full">
            <a
              onClick={() => signIn(provider.id, { callbackUrl: '/' })}
              className=" cursor-pointer relative inline-flex items-center justify-center px-10 py-4 overflow-hidden font-mono font-medium tracking-tighter text-white bg-gray-800 rounded-lg group mb-20 hover:text-black hover:font-bold"
            >
              <span class="absolute w-0 h-0 transition-all duration-500 ease-out bg-[#E40223] rounded-full group-hover:w-full group-hover:h-56 "></span>
              <span class="absolute inset-0 w-full h-full -mt-1 rounded-lg opacity-30 bg-gradient-to-b from-transparent via-transparent to-gray-700"></span>
              <span
                style={{ letterSpacing: '4%' }}
                class="relative flex justify-center items-center "
              >
                SIGN IN WITH&nbsp; <FcGoogle style={{ fontSize: '1.3rem' }} />
              </span>
            </a>
          </div>
        ))}
      </div>
    </div>
  )
}
// E40223
