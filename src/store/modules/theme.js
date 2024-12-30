import { defineStore } from "pinia";
import { ref } from "vue";

export const useThemeStore = defineStore(
  "theme",
  () => {
    const themeType = ref("theme-light");
    const ChangeThemeType = (newTheme) => {
      themeType.value = newTheme.icon;
    };
    return {
      themeType,
      ChangeThemeType,
    };
  },
  { persist: true }
);
