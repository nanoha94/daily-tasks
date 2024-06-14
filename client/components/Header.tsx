import { User } from "@/types/user";
import ProfileIcon from "./ProfileIcon";

interface Props {
  user: User;
}

// TODO: userをDBから取得するようにする
const Header = ({ user }: Props) => {
  return (
    <div className="flex items-center bg-dark_blue py-2 px-3">
      <h1 className="flex-1 text-white text-xl font-bold">
        {process.env.NEXT_PUBLIC_APP_NAME}
      </h1>
      {/* TODO: パラメータ調整 */}
      <ProfileIcon
        link={`/profile/${user.id}`}
        imgSrc={user.profile?.profileScr}
      />
    </div>
  );
};

export default Header;
