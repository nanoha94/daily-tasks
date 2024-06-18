import styled from "styled-components";
import ProfileIcon from "./ProfileIcon";
import { useAuth } from "@/contexts/UserProvider";
import { User } from "@/types/user";
import ArrowButton from "./button/ArrowButton";
import { useDrawer } from "@/contexts/DrawerProvider";
import FullscreenDrawer from "./drawer/FullscreenDrawer";
import EditProfile from "./drawer/EditProfile";

interface Props {
  user: User;
}

const StyledProfileIcon = styled(ProfileIcon)`
  width: 60px;
`;

const Profile = ({ user }: Props) => {
  const { authUser, signOut } = useAuth();
  const { handleOpenDrawer } = useDrawer();

  const logout = async () => {
    try {
      await signOut();
    } catch (err) {
      console.error(err);
    }
  };

  const test = () => {
    handleOpenDrawer({ drawer: <EditProfile /> });
  };

  return (
    <div className=" bg-white shadow-sm md:min-w-[300px] md:w-2/5 md:rounded">
      <div className="max-w-[560px] w-full flex flex-col gap-y-5 p-3 mb-5 mx-auto md:py-5 md:px-4">
        <div className="flex items-center justify-between">
          <div className="flex flex-col items-center gap-y-1">
            <StyledProfileIcon imgSrc={user.profile?.profileScr} />
            <p className="text-xs text-black">{user.name}</p>
          </div>
          {user.id === authUser.id && (
            <div className="flex flex-col gap-y-2">
              <ArrowButton onClick={logout}>ログアウト</ArrowButton>
              <ArrowButton onClick={test}>プロフィール編集</ArrowButton>
            </div>
          )}
        </div>
        {!!user.profile?.bio && <p className="text-base">{user.profile.bio}</p>}
        {/* TODO: 削除予定 */}
        <p className="text-base">
          プロフィールプロフィールプロフィールプロフィールプロフィールプロフィールプロフィールプロフィールプロフィールプロフィールプロフィールプロフィールプロフィールプロフィール
        </p>
      </div>
    </div>
  );
};

export default Profile;
