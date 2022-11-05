export function getLocalFlag(flagCode: string, alternateFlagUrl: string) {
  try {
    return require(`assets/flags/${flagCode.toLowerCase()}.png`);
  } catch (error) {
    // console.error(error);
    try {
      return alternateFlagUrl;
    } catch (error) {
      return require(`assets/flags/no-flag.png`);
    }
  }
}
