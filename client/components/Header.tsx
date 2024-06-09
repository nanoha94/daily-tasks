import Image from "next/image";
import Link from "next/link";

const Header = () => {
  return (
    <div className="flex items-center bg-dark_blue py-2 px-3">
      <h1 className="flex-1 text-white text-xl font-bold">
        {process.env.NEXT_PUBLIC_APP_NAME}
      </h1>
      {/* TODO: プロフィールページへのリンクにする */}
      <Link
        href="#"
        className="w-[40px] h-auto aspect-square bg-gray-400 rounded-full"
      >
        {/* TODO: プロフィール画像がある場合はimgタグを挿入 */}
        {false && (
          <Image
            src="/IMG_9370.jpeg"
            alt="nanoha"
            width="2048"
            height="2048"
            className="rounded-full"
          />
        )}
      </Link>
    </div>
  );
};

export default Header;
