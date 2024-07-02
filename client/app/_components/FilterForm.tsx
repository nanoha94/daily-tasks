import SearchWindow from "@/components/filter/SearchWindow";
import SelectCategory from "@/components/filter/SelectCategory";
import { useRouter, useSearchParams } from "next/navigation";

// FIXED: こちらだけ _components というフォルダに分けられているので、
// components/form の配下などに配置してもいいかなと思いました。
// トップページだけでしか使わないので、ここに配置（阿部）
const FilterForm = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const searchTextParam = searchParams.get("search");
  const searchCategoryParam = searchParams.get("category");
  const queryParams = new URLSearchParams();

  const handleChangeSearchText = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length > 0) {
      queryParams.set("search", e.target.value);
    }

    if (searchCategoryParam !== null) {
      queryParams.set("category", searchCategoryParam);
    }

    router.push(`/?${queryParams.toString()}`);
  };

  const handleChangeSearchCategory = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (searchTextParam !== null) {
      queryParams.set("search", searchTextParam);
    }

    if (e.target.value !== "all") {
      queryParams.set("category", e.target.value);
    }

    router.push(`/?${queryParams.toString()}`);
  };

  return (
    <form className="flex flex-col gap-y-5 py-3 md:pt-0">
      <SearchWindow
        handleChange={handleChangeSearchText}
        value={searchTextParam ?? ""}
      />
      <SelectCategory
        selected={searchCategoryParam}
        handleChange={handleChangeSearchCategory}
      />
    </form>
  );
};

export default FilterForm;
