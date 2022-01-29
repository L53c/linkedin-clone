import InfoRoundedIcon from "@mui/icons-material/InfoRounded";
import FiberManualRecordRoundedIcon from "@mui/icons-material/FiberManualRecordRounded";
import FeedIcon from '@mui/icons-material/Feed';
import Image from "next/image";
import TimeAgo from "timeago-react";
import { useTheme } from "next-themes";

const Widgets = ({ articles }) => {
  const { resolvedTheme } = useTheme();

  return (
    <div className="hidden xl:inline space-y-2">
      {/* News */}
      <div
        className={`${
          resolvedTheme === "dark"
            ? "bg-[#1D2226]"
            : "bg-white border border-gray-300"
        } py-2.5 rounded space-y-2 w-11/12 overflow-hidden`}
      >
        <div className="flex items-center justify-between font-bold px-2.5">
          <h4>LinkedIn News</h4>
          <InfoRoundedIcon className="h-5 w-5" />
        </div>

        <div className="space-y-1">
          {articles.slice(0, 5).map(article => (
            <div
              key={article.url}
              className={`flex space-x-2 items-center cursor-pointer ${
                resolvedTheme === "dark"
                  ? "hover:bg-gray-700"
                  : "hover:bg-gray-100"
              } px-2.5 py-1`}
            >
              <FeedIcon className="text-gray-500 mr-2" />
              <div>
                <h5 className="max-w-xs font-medium text-sm truncate pr-10">
                  {article.title}
                </h5>
                <TimeAgo
                  datetime={article.publishedAt}
                  className="text-xs mt-0.5 text-gray-400 opacity-80"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Ads */}
      <div className={`${resolvedTheme === 'dark' ? 'bg-[#1D2226]':'bg-white border border-gray-300'} w-11/12 h-64 px-2.5 rounded sticky top-20`}>
      <div className="relative w-full h-full">
          <Image
            src="https://rb.gy/kbfeaa"
            layout="fill"
            objectFit="contain"
            priority
            alt=""
          />
        </div>
      </div>
    </div>
  );
};

export default Widgets;
