# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Scope

This repo (`FRAUD-MAIN-GIT`, npm package name `wof`) is the frontend only, for HBL's Fraud Digitization / dispute-management portal. It talks to a separate multi-service .NET backend (not in this repo) over HTTP. Do not assume backend source is available — treat backend behavior as an external, opaque API surface described by `src/Common/Api/*`.

## Commands

```bash
npm install          # install dependencies (needs --legacy-peer-deps: react-html-table-to-excel declares a stale React ^15 peer dep)
npm start / npm run dev   # Vite dev server, http://localhost:3000 (see vite.config.js "server.port")
npm run build             # production build (vite build → dist/)
npm run preview           # serve the production build locally to sanity-check it
```

**Migrated off CRA/craco to Vite** (Phase 1+2 of the modernization plan at `C:\Users\Administrator\.claude\plans\sleepy-snacking-hopper.md`). **React 17→18 and react-router-dom v5→v7 are also done** (Phase 3, plan at `C:\Users\Administrator\.claude\plans\clever-prancing-octopus.md`) — `src/index.js` uses `createRoot`, not `ReactDOM.render`. antd and MUI are still on their original v4 majors (that's Phase 5/6, not started). There is no lint script and no ESLint/Prettier config beyond the leftover CRA `eslintConfig` block in `package.json` (harmless now that `react-scripts` is gone — nothing invokes it). There are currently no test files in `src/` — `npm test` was removed since `react-scripts test` no longer exists; add Vitest when tests are actually written.

Ant Design's LESS theme variables (`@primary-color`, `@body-background`, table paddings, etc.) are now set in `vite.config.js`'s `css.preprocessorOptions.less.modifyVars` (previously in `craco.config.js`, now deleted). `src/App.less` imports `antd/dist/antd.less` directly (no `~` prefix — that's a webpack-only convention, Vite's Less resolver wants a bare package path). Most `.js` files contain JSX despite the extension — `vite.config.js`'s `esbuild.loader`/`include` config forces JSX parsing for `.js` under `src/`; don't rename files to `.jsx` to "fix" this, the config handles it.

**Redux Toolkit**: `src/store/store.js` uses `configureStore` (from `@reduxjs/toolkit`, replacing plain `redux`+`redux-thunk`+`redux-devtools-extension`). All 8 files in `src/store/actions/*` and 9 in `src/store/reducers/*` are still plain thunks/switch-reducers — RTK runs them unmodified, they were **not** converted to `createSlice`/`createAsyncThunk`. `configureStore`'s default `serializableCheck`/`immutableCheck` middleware is disabled in `store.js` (the app stores `moment` objects and `File` objects in Redux state, which RTK's dev-only checks would otherwise flag on every action — this is silencing a warning, not hiding a real bug).

## Architecture

### Fixed app shell — no page-level scroll, ever
`Container/Dashboard/dashboard.js` (the shell every logged-in page renders inside, via `Main` → `CustomRoutes`) uses a fixed layout, not normal document flow: Header (68px, fixed top, full width), Sidebar (230px, fixed left, `top:68px`, own `overflow-y:auto`), Footer (40px, fixed bottom, full width), and `Main`'s `.mainContainer` (`position:fixed; top:68px; left:230px; right:0; bottom:40px; overflow-y:auto`) — the one place actual routed page content lives and the *only* thing that scrolls. `Dashboard`'s outer `<Layout>` is pinned to `height:100vh; overflow:hidden` as a backstop. These three numbers (68 / 230 / 40) are load-bearing and duplicated by hand across `sidebar.module.css`, `footer.module.css`, and `main.module.css`, plus `header.css`'s own `.header{height:68px}` — change one, change all four. Login/SignUp/404 render outside this shell entirely and are unaffected by it.

### Styling: utility classes, not inline styles
Inline `style={{...}}` props were converted to utility classes in `src/styles/utilities.css` (73 single-declaration classes, `u-<kebab-property>-<value>`, e.g. `u-margin-top-22px`, `u-cursor-pointer`, `u-font-size-0_7rem` — `%`→`pct`, `.`→`_`, `#` dropped in names only, values unchanged). Compose several on one element: `className="u-cursor-pointer u-color-blue"`. **Don't add new inline styles** — add/reuse a utility class instead.

The only inline styles left (16, intentionally) are genuinely dynamic — runtime values that can't be static CSS: the `width`/`padding`/`margin` props on the reusable `Components/Elements/*` wrappers (`` style={{ width: `${width}` }} ``) and the conditional `display: displayVerify*` toggles in `Container/Authentication/SignUp`.

`utilities.css` is imported in `src/index.js` **after** `import App from "./App"` — deliberately, so it lands after `App.less`/`antd.less` in the cascade and wins equal-specificity ties, approximating the precedence the inline styles had. If you move that import earlier, antd/MUI rules can start beating these utilities.

### Two competing UI kits, side by side
The app mixes **Ant Design (antd)** and **Material-UI v4** (`@material-ui/core`, `/lab`, `/pickers`). Most date pickers, some inputs, come from Material-UI; almost everything else (tables, forms, modals, buttons) is antd-based, wrapped by this app's own component layer in `src/Components/Elements/*`, all re-exported from `src/Components/Elements/index.js`. Always check that index first before reaching for a raw antd/MUI import — most call sites use the wrapped versions (`Button`, `TextField`, `SelectBox`, `Table`, `GridDataView`, `FancyBox`, `MultiStep`, etc.), not the library components directly.

### API layer mirrors a non-REST backend convention
The backend is **not** conventional REST — each backend microservice exposes exactly one POST endpoint and dispatches internally based on a `RequestMethod` string (e.g. `"ServiceManager.SaveCreditCardDisputes"`). This repo's API layer reflects that directly:

- `src/Common/Api/apis-end-points.js` — hardcoded base URLs, one per backend microservice, e.g. `InvestigationOfficerAPI` (Fraud_CCService, port 10003), `InvestigationOfficerAPIDC` (Fraud_DCService, 10004), `InvestigationOfficerAPIADC` (Fraud_ADCService, 10005), `InvestigationManagerAPI` (Fraud_Approval, 10006), `InvestigationOfficerAPIBBK` (Fraud_BBKonnect, 10007), `InvestigationOfficerAPINONAPI` (Fraud_NPIService, 10008), `InvestigationOfficerAPINDB` (Fraud_NegativeDatabase, 10009), `authenticationApi` (ERM_Auth, 10001), `SetupFormApi` (Fraud_Admin, 10002). All share one `baseURL` IP — there is no `.env`-driven API base URL, so pointing at a different environment means editing this file directly.
- `src/Common/Api/apis-config.js` — one exported const per operation, each just `{ _token, RequestMethod: "ServiceManager.<Method>" }`. This is effectively a registry of backend RPC method names, not routes. When adding a new API call, add an entry here first, then use it from a Redux action.
- Every actual HTTP call is built by hand in `src/store/actions/*.js`: construct a `FormData` with `RequestMethod` and `RequestData` (JSON-stringified), POST via `axios` to the relevant base URL from `apis-end-points.js`, dispatch `*_INIT` / `*_SUCCESS` / `*_FAIL` actions based on `response.data.responseResult.isExecuted`. There is no shared axios instance/interceptor — this pattern is copy-pasted per action file (see `auth-actions.js` for the canonical shape).

### Auth and session
- Login (`signIn` in `store/actions/auth-actions.js`) POSTs to `authenticationApi` and, on success, stores `token`, `refreshToken`, `roleID`, `UserID`/`CurrentLoggedInUser`, and `allowedTransactionTypes` (an array of transaction-type IDs, `ttid`) in `localStorage` — not Redux alone, and not cookies. Session state is reconstructed from `localStorage` on reload (see `PrivateRoute.js` reading `token` directly).
- `roleID` drives everything downstream: 2 = System/Security Admin, 3 = Investigation Officer, 4 = Investigation Manager, 5 = QA Manager, 6 = MIS Manager. Each role redirects to a different landing route after login (see the `if (response.data.responseResult.roleID === N)` blocks in `signIn`).
- `Helper` (`src/Common/Functions/history_logout.js`) is a bare static-`navigate` holder (`static navigate = null`, populated from `useNavigate()` in `Header.js`/`Dashboard.js`/`Login.js`) so action creators (outside the React component tree) can call `Helper.navigate("/some/path")` for things like session-expiry redirects. This used to be `Helper.history.push(...)` under react-router v5 — if you find old code or a stale comment referencing `Helper.history`, that's leftover from before the v7 migration.
- `refreshToken` action re-authenticates using stored `token`/`refreshToken`; on failure it force-signs-out with a session-expired message.

### Role-based, data-driven routing (the core navigation mechanism)
`react-router-dom` v7, **declarative mode only** (`Routes`/`Route element=`/`Navigate`/`useNavigate`/`useLocation`) — not the data-router/loader APIs v7 also offers, this app doesn't use those at all. `BrowserRouter` (not `HashRouter` — clean URLs). Routing is **not** a static route table — it's assembled per logged-in role from two pieces:

1. `src/Routes/routingData.js` exports `UserSelection(token, role)`, which returns `{ SidebarData, MainMenu, Title, Notification }` for the given `roleID`. `MainMenu` (e.g. `InvestigationOfficerRouteData`) is an array of `{ component, path, ttid }`, `path` a bare relative segment with no leading slash (e.g. `"SystemAdmin/EditUser"`). `ttid` (transaction-type id: 1=Credit Card, 2=Debit Card, 3=ADC, 4=Non-API/E-Com, 5=BBKonnect, 6=Negative Database, 12=common/shared) gates visibility per the user's `allowedTransactionTypes` from login.
2. `src/Routes/CustomRoutes.js` reads `allowedTransactionTypes` from `localStorage`, filters `RoutingData` down to permitted `ttid`s (always keeping `ttid === 12`), dispatches the filtered list into Redux (`setRoutingData`), and renders a `<Routes>` built from it: an `index` route for `RoutingData[0].component` (the role's default landing page) plus one `<Route path={item.path} element={<item.component/>}/>` per remaining entry, using `item.path` directly as a *relative* path — no manual `${path}/${item.path}` prefixing (v5 needed that via `useRouteMatch()`; v7's nested `<Routes>` resolve relative child paths against whatever matched the parent automatically).
3. `src/Routes/PrivateRoute.js` is a `{children}` wrapper (not a v5-style `render=` prop component) guarding everything under `/Fraud/*`: reads `useLocation().pathname`, checks it against the Redux-stored allowed routing data, and returns `<Navigate to="/404" replace/>` instead of `children` if the token is missing or the path isn't allowed.

App-level routing (`src/App.js`) only knows `/`, `/SignUp`, `/Fraud/*` (**the `/*` is required** — v7 only lets a route descend into a component's own nested `<Routes>` when the parent path ends in `/*`; `<Route path="/Fraud/*" element={<PrivateRoute><Dashboard/></PrivateRoute>}/>`), and `/404`, plus a catch-all `<Route path="*" element={<Navigate to="/404" replace/>}/>`.

**Practical implication:** to add a new page for a role, you generally touch four places together: the container component itself, its export in `src/Container/index.js`, an entry in the relevant `*RouteData` array in `src/Routes/routingData.js` (bare relative `path`, no leading slash), and a link entry in `src/Routes/Links.js` (sidebar menu) — missing any one of these makes the page unreachable or invisible in the sidebar even though the component compiles fine.

### State management
Standard Redux + redux-thunk, composed in `src/store/store.js`. One reducer per feature domain (`auth`, `requestReducer`, `reports`, `ui`, `setupForms`, `investigationOfficer`, `qaManager`, `investigationManager`), combined and re-exported from `src/store/reducers/index.js`. A global `SIGN_OUT` action type resets the entire store to `undefined` before re-combining (see the `rootReducer` wrapper in `store.js`) — this is the mechanism that fully clears state on logout, on top of the `localStorage.clear()` done in the `signOut` action.

### Container structure mirrors the roles, and channels repeat the same shape
`src/Container/` is organized first by role (`Admin/SystemAdmin`, `InvestigationOfficer`, `InvestigationManager`, `QAManager`, `MISManager`, `Authentication`), then for `InvestigationOfficer` by dispute channel: `CreditCardDispute`, `DebitCardDisputes`, `AlternateDeliveryChannelDisputes` (ADC), `BBKonnectDisputes(BBK)`, `NonAPI(E-Com)Disputes`, `NegativeDatabase`. Each channel independently re-implements the same lifecycle (AddEdit → CustomerDetails/AddNewCustomerDetails → Search → Edit → ViewCustomerDetails), so when changing behavior for one channel, check whether the same fix is needed in the sibling channel folders — they are not sharing components, they're parallel near-duplicates.

### Reports and Excel export
Report/export actions (`reports_actions.js`) hit dedicated `*ReportExcel` `RequestMethod`s (e.g. `CreditCardReportExcel`, `AgeingReportExcel`, `UserAuditActivityReportExcel`) rather than the generic `ServiceManager.*` pattern used elsewhere — these return files for download (see `file-saver` dependency and `Components/Elements/ExportToExcel`).
