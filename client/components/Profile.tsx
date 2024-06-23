import styled from "styled-components";
import ProfileIcon from "./ProfileIcon";
import { useUser } from "@/contexts/UserProvider";
import { User } from "@/types/user";
import ArrowButton from "./button/ArrowButton";
import { useDrawer } from "@/contexts/DrawerProvider";
import EditProfile from "./drawer/EditProfile";
import useHashtag from "@/hooks/useHashtag";

interface Props {
  user: User;
}

const StyledProfileIcon = styled(ProfileIcon)`
  width: 60px;
`;

const Profile = ({ user }: Props) => {
  const { authUser, signOut } = useUser();
  const { handleOpenDrawer } = useDrawer();

  const contentWithHashtag = useHashtag();

  const logout = async () => {
    try {
      await signOut();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className=" bg-white shadow-sm md:min-w-[300px] md:w-2/5 md:rounded">
      <div className="max-w-[560px] w-full flex flex-col gap-y-5 p-3 mb-5 mx-auto md:py-5 md:px-4">
        <div className="flex items-center justify-between">
          <div className="flex flex-col items-center gap-y-1">
            <StyledProfileIcon user={user} />
            <p className="text-xs text-black">{user.name}</p>
          </div>
          {user.id === authUser.id && (
            <div className="flex flex-col gap-y-2">
              <ArrowButton onClick={logout}>ログアウト</ArrowButton>
              <ArrowButton
                onClick={() => handleOpenDrawer({ drawer: <EditProfile /> })}
              >
                プロフィール編集
              </ArrowButton>
            </div>
          )}
        </div>
        {!!user.profile?.bio && (
          <p className="text-base whitespace-pre-wrap">
            {contentWithHashtag(user.profile.bio)}
          </p>
        )}
      </div>
    </div>
  );
};

export default Profile;
