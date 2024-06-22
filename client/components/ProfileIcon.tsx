import { useUser } from "@/contexts/UserProvider";
import { User } from "@/types/user";
import Image from "next/image";
import Link from "next/link";

interface Props {
  className?: string;
  link?: string;
  user: User;
}

interface ContainerProps {
  children?: React.ReactNode;
  className: string;
  link?: Props["link"];
}

const Container = ({ children, className, link }: ContainerProps) => {
  return !link ? (
    <div className={className}>{children}</div>
  ) : (
    <Link href={link} className={className}>
      {children}
    </Link>
  );
};

const ProfileIcon = ({ className, link, user }: Props) => {
  const { getProfileImg } = useUser();
  const profileImg = getProfileImg(user);

  return (
    <Container
      link={link}
      className={`${className} relative w-[40px] h-auto aspect-square ${
        !profileImg && "bg-gray-400"
      } rounded-full`}
    >
      {!!profileImg && (
        <>
          <Image
            src={profileImg}
            alt={`${user.name}のプロフィール画像`}
            fill={true}
            style={{ objectFit: "cover" }}
            sizes="100%"
            className="rounded-full"
          />
        </>
      )}
    </Container>
  );
};

export default ProfileIcon;
