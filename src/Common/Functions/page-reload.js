// Whether the page being shown is the one the browser actually reloaded (F5).
//
// performance.navigation.type says "reload" for the whole life of the tab's
// document, so checking it directly treated every page opened after a single
// refresh as reloaded: screens re-fetched with stale localStorage values, and
// a System Admin got redirected to /404. React Router stores an idx on each
// history entry, and it survives a reload, so only the entry that was loaded
// counts (going Back to it counts again, which only re-fetches the same case).
const navEntry = window.performance?.getEntriesByType?.("navigation")?.[0];
const documentWasReloaded = navEntry
  ? navEntry.type === "reload"
  : window.performance?.navigation?.type === 1;
const loadedIdx = window.history.state?.idx;
const loadedPath = window.location.pathname;

export const isPageReload = () => {
  if (!documentWasReloaded) return false;
  const idx = window.history.state?.idx;
  if (loadedIdx !== undefined && idx !== undefined) return idx === loadedIdx;
  return window.location.pathname === loadedPath;
};
