import { useAppStore } from "@/store/appStore.js";

export const buildApiUrl = (endpoint) => {
  const appStore = useAppStore();
  const hasQueryParams = endpoint.includes("?");
  const separator = hasQueryParams ? "&" : "?";
  return `${appStore.cors}/${appStore.api}/${endpoint}${separator}apikey=${appStore.apiKey}`;
};
