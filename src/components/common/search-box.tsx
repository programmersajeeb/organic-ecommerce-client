import { Search } from "lucide-react";

type SearchBoxProps = {
  placeholder?: string;
};

export function SearchBox({
  placeholder = "Search for honey, dates, mangoes, spices...",
}: SearchBoxProps) {
  return (
    <form action="/search" role="search" className="gb-shop-search">
      <label htmlFor="site-search" className="gb-sr-only">
        Search products
      </label>

      <input
        id="site-search"
        name="q"
        type="search"
        autoComplete="off"
        autoCapitalize="none"
        spellCheck={false}
        enterKeyHint="search"
        placeholder={placeholder}
        className="gb-shop-search__input"
      />

      <button
        type="submit"
        aria-label="Search products"
        className="gb-shop-search__button"
      >
        <Search aria-hidden="true" />
      </button>
    </form>
  );
}