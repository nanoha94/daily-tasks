import Link from "next/link";

const useHashtag = () => {
  const contentWithHashtag = (content: string) => {
    const hashtagRegex = /#(\S+)/g;
    const parts = content.split(hashtagRegex);

    const result = [];
    for (let i = 0; i < parts.length; i++) {
      if (i % 2 === 0) {
        result.push(parts[i]);
      } else {
        result.push(
          <Link
            key={i}
            href={`/?search=${parts[i]}`}
            className="text-green  hover:underline"
          >
            #{parts[i]}
          </Link>
        );
      }
    }
    return result;
  };

  return contentWithHashtag;
};

export default useHashtag;
