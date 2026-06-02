import { Search } from "lucide-react";

type SearchBoxProps = Readonly<{
  id?: string;
  action?: string;
  label?: string;
  placeholder?: string;
}>;

export function SearchBox({
  id = "site-search",
  action = "/search",
  label = "Search products",
  placeholder = "Search for honey, dates, mangoes, spices...",
}: SearchBoxProps) {
  return (
    <form
      action={action}
      method="get"
      role="search"
      aria-label={label}
      className="gb-shop-search"
    >
      <label htmlFor={id} className="sr-only">
        {label}
      </label>

      <input
        id={id}
        name="q"
        type="search"
        inputMode="search"
        autoComplete="off"
        autoCapitalize="none"
        spellCheck={false}
        enterKeyHint="search"
        maxLength={80}
        placeholder={placeholder}
        className="gb-shop-search__input"
      />

      <button
        type="submit"
        aria-label={label}
        className="gb-shop-search__button"
      >
        <Search aria-hidden="true" focusable="false" />
      </button>
    </form>
  );
}