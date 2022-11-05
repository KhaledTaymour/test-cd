import React from "react";
import "./LanguageChanger.scss";
import { useLocalization } from "hooks/useLocalization";
import enStrings from "./locale/LanguageChanger.locale.en.json";
import deStrings from "./locale/LanguageChanger.locale.de.json";
import arStrings from "./locale/LanguageChanger.locale.ar.json";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";

function LanguageChanger() {
  const { t, changeLanguage } = useLocalization({
    enStrings,
    deStrings,
    arStrings,
  });

  type languageOptionsType = {
    text: string;
    value: string;
  };
  const languageOptions: languageOptionsType[] = [
    { text: t("en"), value: "en" },
    { text: t("de"), value: "de" },
    { text: t("ar"), value: "ar" },
  ];

  const [selectedLanguage, setSelectedLanguage] = React.useState("");
  async function handleLanguageChange(e: SelectChangeEvent) {
    setSelectedLanguage(e.target.value as string);
    await changeLanguage(e.target.value as string);
  }

  return (
    <div className="language-drop-down__wrapper">
      <FormControl fullWidth>
        <InputLabel id="language-changer-select-label">
          <>{t("selectLanguage")}</>
        </InputLabel>
        <Select
          labelId="language-changer-select-label"
          id="language-changer-select"
          value={selectedLanguage}
          label="Select Language"
          onChange={handleLanguageChange}
          data-testid="language-changer-ddl"
        >
          {languageOptions.map((option: languageOptionsType) => (
            <MenuItem key={option.value} value={option.value}>
              {option.text}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}

export default LanguageChanger;
