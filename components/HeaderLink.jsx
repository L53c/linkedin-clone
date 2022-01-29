import { useSession, signOut } from "next-auth/react";
import { useTheme } from "next-themes";

const HeaderLink = ({ Icon, text, avatar, feed, active, hidden }) => {
  const { resolvedTheme } = useTheme();
  const { data: session } = useSession();
  return (
    <div
      onClick={() => avatar && signOut()}
      className={`${
        hidden && "hidden md:inline-flex"
      } flex flex-col justify-center items-center text-gray-600 cursor-pointer ${
        feed
          ? `${
              resolvedTheme === "dark"
                ? "text-white/75 hover:text-white"
                : "text-black/60 hover:text-black"
            } lg:-mb-1 5 space-y-1`
          : `${
              resolvedTheme === "dark" ? "hover:text-gray-700" : "text-gray-500"
            }`
      } ${
        active && (resolvedTheme === "dark" ? "!text-white" : "!text-black/80")
      }`}
    >
      {avatar ? (
        <Icon src={session?.user?.image} className="!h-7 !w-7 lg:!mb-1" />
      ) : (
        <Icon src={session?.user?.image} />
      )}
      <h4
        className={`text-sm ${
          feed && "hidden lg:flex justify-center w-full mx-auto"
        }`}
      >
        {text}
      </h4>
      {active && (
        <span
          className={`hiddenlg:inline-flex h-0.5 w-[calc(100%+20px)] ${
            resolvedTheme === "dark" ? "bg-white" : "bg-black"
          } rounded-t-full`}
        ></span>
      )}
    </div>
  );
};

export default HeaderLink;
