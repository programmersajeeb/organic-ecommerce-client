"use client";

import {
  type ChangeEvent,
  type FormEvent,
  useId,
  useRef,
  useState,
} from "react";

import { HeaderIcon } from "./header-icons";
import type {
  HeaderSearchPayload,
  HeaderSearchSource,
} from "./header.types";

type HeaderSearchProps = Readonly<{
  id: string;
  name: string;
  label: string;
  placeholder: string;
  source: HeaderSearchSource;
  value: string;
  onValueChange: (value: string) => void;
  onSearch: (payload: HeaderSearchPayload) => void;
  className?: string;
  emptyQueryMessage?: string;
}>;

const DEFAULT_EMPTY_QUERY_MESSAGE = "Please enter a product name.";

function getClassName(...classNames: Array<string | false | null | undefined>) {
  return classNames.filter(Boolean).join(" ");
}

function normalizeSearchQuery(value: string) {
  return value.trim().replace(/\s+/g, " ");
}

function getSearchSubmitLabel(source: HeaderSearchSource) {
  return source === "mobile" ? "Search products on mobile" : "Search products";
}

export function HeaderSearch({
  className,
  emptyQueryMessage = DEFAULT_EMPTY_QUERY_MESSAGE,
  id,
  label,
  name,
  onSearch,
  onValueChange,
  placeholder,
  source,
  value,
}: HeaderSearchProps) {
  const [statusMessage, setStatusMessage] = useState("");
  const inputRef = useRef<HTMLInputElement | null>(null);
  const statusId = useId();

  const hasError = statusMessage.length > 0;
  const describedBy = hasError ? statusId : undefined;

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (hasError) {
      setStatusMessage("");
    }

    onValueChange(event.target.value);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const query = normalizeSearchQuery(value);

    if (!query) {
      setStatusMessage(emptyQueryMessage);
      inputRef.current?.focus();
      return;
    }

    setStatusMessage("");

    onSearch({
      query,
      source,
    });
  };

  return (
    <form
      className={getClassName("gb-site-header__search", className)}
      role="search"
      aria-label={label}
      data-source={source}
      onSubmit={handleSubmit}
    >
      <label className="gb-sr-only" htmlFor={id}>
        {label}
      </label>

      <span className="gb-site-header__search-leading-icon" aria-hidden="true">
        <HeaderIcon name="search" />
      </span>

      <input
        ref={inputRef}
        id={id}
        className="gb-site-header__search-input"
        type="search"
        name={name}
        placeholder={placeholder}
        autoComplete="off"
        autoCapitalize="none"
        autoCorrect="off"
        enterKeyHint="search"
        spellCheck={false}
        value={value}
        aria-describedby={describedBy}
        aria-invalid={hasError ? "true" : undefined}
        onChange={handleChange}
      />

      <button
        type="submit"
        className="gb-site-header__search-button"
        aria-label={getSearchSubmitLabel(source)}
      >
        <HeaderIcon name="search" />
      </button>

      <span id={statusId} className="gb-sr-only" aria-live="polite">
        {statusMessage}
      </span>
    </form>
  );
}