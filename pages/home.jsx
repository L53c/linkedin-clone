import Head from "next/head";
import HeaderLink from "../components/HeaderLink";
import Image from "next/image";
import ExploreIcon from "@mui/icons-material/Explore";
import GroupIcon from "@mui/icons-material/Group";
import OnDemandVideoIcon from "@mui/icons-material/OndemandVideo";
import BussinessCenterIcon from "@mui/icons-material/BusinessCenter";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { getProviders, signIn } from "next-auth/react";

const home = ({ providers }) => {
  
  return (
    <div className="space-y-10 relative">
      <Head>
        <title>LinkedIn - Home</title>
        <meta
          name="description"
          content="This website is an exercise made with REACT, NEXT, TailwindCSS"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header className="flex justify-around items-center py-4">
        <div className="relative w-36 h-10">
          <Image
            src="https://rb.gy/vtbzlp"
            layout="fill"
            objectFit="contain"
            alt=""
          />
        </div>

        <div className="flex items-center sm:divide-x divide-gray-300">
          <div className="hidden sm:flex space-x-8 pr-4">
            <HeaderLink Icon={ExploreIcon} text="Discover" />
            <HeaderLink Icon={GroupIcon} text="People" />
            <HeaderLink Icon={OnDemandVideoIcon} text="Learning" />
            <HeaderLink Icon={BussinessCenterIcon} text="Jobs" />
          </div>
          {Object.values(providers).map(provider => (
            <div key={provider.name}>
              <div className="pl-4">
                <button
                  className="text-blue-700 font-semibold rounded-full border border-blue-700 px-5 py-1.5 transition-all hover:border-2 duration-200 active:scale-90"
                  onClick={() => signIn(provider.id, { callbackUrl: "/" })}
                >
                  Sign in
                </button>
              </div>
            </div>
          ))}
        </div>
      </header>

      <main className="flex flex-col xl:flex-row items-center max-w-screen-lg mx-auto">
        <div className="space-y-6 xl:space-y-10">
          <div className="space-y-4">
            <h1 className="text-3xl md:text-5xl text-amber-800/80 max-w-xl !leading-snug pl-4 xl:pl-0">
              Welcome to your professional community
            </h1>

            <div className="intent">
              <h2 className="text-xl">Search for a job</h2>
              <ArrowForwardIosIcon className="text-gray-700" />
            </div>

            <div className="intent">
              <h2 className="text-xl">Find a person you know</h2>
              <ArrowForwardIosIcon className="text-gray-700" />
            </div>

            <div className="intent">
              <h2 className="text-xl">Learn a new skill</h2>
              <ArrowForwardIosIcon className="text-gray-700" />
            </div>
          </div>
        </div>
        <div className="relative xl:absolute w-80 h-80 xl:w-[650px] xl:h-[650px] top-14 right-5">
          <Image
            src="https://rb.gy/vkzpzt"
            layout="fill"
            objectFit="contain"
            alt=""
            priority
          />
        </div>
      </main>
    </div>
  );
};

export default home;

export const getServerSideProps = async context => {
  const providers = await getProviders();

  return {
    props: {
      providers,
    },
  };
};
