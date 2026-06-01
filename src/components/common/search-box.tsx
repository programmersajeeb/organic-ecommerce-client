import { Search } from "lucide-react";

type SearchBoxProps = {
  placeholder?: string;
};

export function SearchBox({
  placeholder = "Search for honey, dates, mangoes, spices...",
}: SearchBoxProps) {
  return (
    <form action="/search" className="gb-shop-search">
      <label htmlFor="site-search" className="sr-only">
        Search products
      </label>

      <input
        id="site-search"
        name="q"
        type="search"
        autoComplete="off"
        placeholder={placeholder}
        className="gb-shop-search__input"
      />

      <button type="submit" aria-label="Search" className="gb-shop-search__button">
        <Search />
      </button>
    </form>
  );
}