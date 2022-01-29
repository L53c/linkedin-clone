import Head from "next/head";
import Header from "../components/Header";
import SideBar from "../components/SideBar";
import Feed from "../components/Feed";
import { useRouter } from "next/router";
import { getSession, useSession } from "next-auth/react";
import { AnimatePresence } from "framer-motion";
import { useRecoilState } from "recoil";
import { modalState, modalTypeState } from "../atoms/modalAtom";
import Modal from "../components/Modal";
import { useTheme } from "next-themes";
import { connectToDatabase } from "../util/mongodb";
import Widgets from "../components/Widgets";

export default function Home({ posts, articles }) {
console.log('me ca',articles);
  const { resolvedTheme } = useTheme();
  const [modalOpen, setModalOpen] = useRecoilState(modalState);
  const [modalType, setModalType] = useRecoilState(modalTypeState);
  const router = useRouter();
  const { status } = useSession({
    required: true,
    onUnauthenticated() {
      // The user is not authenticated, handle it here
      router.push("/home");
    },
  });



  return (
    <div
      className={`${
        resolvedTheme === "dark" ? "bg-gray-800 text-gray-100" : "bg-[#F3F2EF]"
      } h-screen overflow-y-scroll scrollbar-hide`}
    >
      <Head>
        <title>Feed - LinkedIn</title>
        <meta
          name="description"
          content="This website is an exercise made with REACT, NEXT, TailwindCSS"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />

      <main className="flex justify-center gap-x-5 px-4 sm:px-12">
        <div className="flex flex-col md:flex-row gap-5">
          {/* sidebar */}
          <SideBar />
          {/* feed */}
          <Feed posts={posts} />
        </div>
        {/* widgets */}
        <Widgets articles={articles} />
        <AnimatePresence>
          {modalOpen && (
            <Modal handleClose={() => setModalOpen(false)} type={modalType} />
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}

export const getServerSideProps = async context => {
  // Check if the user is authenticated on the server...
  const session = await getSession(context);
  if (!session) {
    return {
      redirect: {
        permanent: false,
        destination: "/home",
      },
    };
  }

  // get posts on SSR
  const { db } = await connectToDatabase();
  const posts = await db
    .collection("posts")
    .find()
    .sort({ timestamp: -1 })
    .toArray();

  // Get Google News API
  const results = await fetch(`https://newsapi.org/v2/everything?q=Apple&from=2022-01-28&sortBy=popularity&apiKey=${process.env.NEWS_API_KEY}`).then(res=> res.json())


  return {
    props: {
      session,
      articles: results.articles,
      posts: posts.map(post => ({
        _id: post._id.toString(),
        input: post.input,
        photoUrl: post.photoUrl,
        username: post.username,
        email: post.email,
        userImg: post.userImg,
        createdAt: post.createdAt
      })),
    },
  };
};
