import React, { useState, useEffect } from "react";
import { useLocalization } from "hooks/useLocalization";
import enStrings from "./locale/SearchBar.locale.en.json";
import deStrings from "./locale/SearchBar.locale.de.json";
import arStrings from "./locale/SearchBar.locale.ar.json";
import "./SearchBar.scss";
import { useSearchParams } from "react-router-dom";
import useDebounce from "hooks/useDebounce";

function SearchBar() {
  const { t } = useLocalization({
    enStrings,
    deStrings,
    arStrings,
  });
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchInputValue, setSearchInputValue] = useState<string>(
    searchParams.get("search") || ""
  );

  useEffect(() => {
    return () => {
      setSearchInputValue("");
    };
  }, []);

  const debouncedSearch = useDebounce(searchInputValue, 500);

  useEffect(() => {
    if (!debouncedSearch) {
      setSearchParams({});
    } else {
      setSearchParams({ search: debouncedSearch });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSearch]);

  function handleChangeSearchInput(e: React.ChangeEvent<HTMLInputElement>) {
    e.preventDefault();
    setSearchInputValue(e.target.value);
  }

  useEffect(() => {
    const searchParamsValue = searchParams.get("search");

    if (searchInputValue !== searchParamsValue && searchParamsValue !== null) {
      setSearchInputValue(searchParamsValue);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  return (
    <section className="search-bar__wrapper">
      <label htmlFor="search-input" data-testid="search-input-label">
        <>{t("search")}</>
      </label>
      <input
        id="search-input"
        data-testid="search-input"
        value={searchInputValue}
        onChange={handleChangeSearchInput}
        placeholder={t("search")}
      />
    </section>
  );
}

export default SearchBar;
