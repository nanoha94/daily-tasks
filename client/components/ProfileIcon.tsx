import Image from "next/image";
import Link from "next/link";
import styled from "styled-components";

interface Props {
  className?: string;
  link?: string;
  imgSrc?: string;
}

interface ContainerProps {
  children: React.ReactNode;
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

const ProfileIcon = ({ className, link, imgSrc }: Props) => {
  return (
    <Container
      link={link}
      className={`${className} w-[40px] h-auto aspect-square bg-gray-400 rounded-full`}
    >
      {!!imgSrc && (
        <Image
          src={imgSrc}
          alt="nanoha"
          width="2048"
          height="2048"
          className="rounded-full"
        />
      )}
    </Container>
  );
};

export default ProfileIcon;
