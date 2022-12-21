import Head from 'next/head'
import Feed from '../components/Feed'
import Sidebar from '../components/Sidebar'
import Widgets from '../components/Widgets'
import { getProviders, getSession, useSession } from 'next-auth/react'
import Login from '../components/Login'
import Modal from '../components/Modal'
import { modalState } from '../atoms/modalAtom'
import { useRecoilState } from 'recoil'

export default function Home({ trendingResults, followResults, providers }) {
  const { data: session } = useSession()
  const [isOpen, setIsOpen] = useRecoilState(modalState)

  if (!session) return <Login providers={providers} />

  return (
    <div className="">
      <Head>
        <title>Home / RedWing</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="bg-black min-h-screen flex max-w-[1500px] mx-auto">
        <Sidebar />
        <Feed />
        <Widgets
          trendingResults={trendingResults}
          followResults={followResults}
        />

        {isOpen && <Modal />}
      </main>
    </div>
  )
}

export async function getServerSideProps(context) {
  const trendingResults = [
    {
      heading: 'T20 World Cup 2021 · LIVE',
      description:
        'NZvAUS: New Zealand and Australia clash in the T20 World Cup final',
      img: 'https://rb.gy/d9yjtu',
      tags: ['#T20WorldCupFinal, ', 'Kane Williamson'],
    },
    {
      heading: 'Trending in United Arab Emirates',
      description: '#earthquake',
      img: 'https://rb.gy/jvuy4v',
      tags: ['#DubaiAirshow, ', '#gessdubai'],
    },
    {
      heading: 'Trending in Digital Creators',
      description: 'tubbo and quackity',
      img: '',
      tags: ['QUACKITY AND TUBBO,'],
    },
  ]
  const followResults = [
    {
      userImg: 'https://rb.gy/urakiy',
      username: 'SpaceX',
      tag: '@SpaceX',
    },
    {
      userImg: 'https://rb.gy/aluxgh',
      username: 'Elon Musk',
      tag: '@elonmusk',
    },
    {
      userImg: 'https://rb.gy/zyvazm',
      username: 'Tesla',
      tag: '@Tesla',
    },
  ]
  const providers = await getProviders()
  const session = await getSession(context)

  return {
    props: {
      trendingResults,
      followResults,
      providers,
      session,
    },
  }
}
