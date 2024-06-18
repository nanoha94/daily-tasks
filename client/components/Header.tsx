import { User } from "@/types/user";
import ProfileIcon from "./ProfileIcon";
import { useUser } from "@/contexts/UserProvider";

const Header = () => {
  const { authUser } = useUser();

  return (
    <div className="flex items-center bg-dark_blue py-2 px-3">
      <h1 className="flex-1 text-white text-xl font-bold">
        <a href="/">{process.env.NEXT_PUBLIC_APP_NAME}</a>
      </h1>
      <ProfileIcon
        link={`/profile/${authUser.id}`}
        imgSrc={authUser.profile?.profileSrc}
      />
    </div>
  );
};

export default Header;
