import { Route, Routes } from "react-router-dom";
import { HomeLayout } from "./components/HomeLayout/HomeLayout";
import CachingPage from "./pages/CachingPage";
import FetchingPage from "./pages/FetchingPage";
import PollingPage from "./pages/PollingPage";
import MutationPage from "./pages/MutationPage";
import PaginationPage from "./pages/PaginationPage";
import InfiniteScrollPage from "./pages/InfiniteScrollPage";
import { ROUTES } from "./utils/routes";
import HomePage from "./pages/HomePage";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import AppProvider from "./app.context";
import { isTrueSet } from "./utils/constant";
import { lazy, Suspense } from "react";
import ProductPage from "./pages/ProductPage";
import NotFoundPage from "./pages/404Page";

const SuspensePage = lazy(() => import("./pages/SuspensePage"));
// const queryClient = new QueryClient();
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      suspense: isTrueSet(process.env.REACT_APP_QUERY_SUSPENSE),
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AppProvider>
        <Routes>
          <Route path={"/"} element={<HomeLayout />}>
            <Route index element={<HomePage />} />
            {!isTrueSet(process.env.REACT_APP_QUERY_SUSPENSE) && (
              <Route path={ROUTES.FETCHING} element={<FetchingPage />} />
            )}
            {!isTrueSet(process.env.REACT_APP_QUERY_SUSPENSE) && (
              <Route path={ROUTES.PRODUCT} element={<ProductPage />} />
            )}
            {!isTrueSet(process.env.REACT_APP_QUERY_SUSPENSE) && (
              <Route path={ROUTES.CACHING} element={<CachingPage />} />
            )}
            {!isTrueSet(process.env.REACT_APP_QUERY_SUSPENSE) && (
              <Route path={ROUTES.POLLING} element={<PollingPage />} />
            )}
            {!isTrueSet(process.env.REACT_APP_QUERY_SUSPENSE) && (
              <Route path={ROUTES.MUTATION} element={<MutationPage />} />
            )}
            {!isTrueSet(process.env.REACT_APP_QUERY_SUSPENSE) && (
              <Route path={ROUTES.PAGINATION} element={<PaginationPage />} />
            )}
            {!isTrueSet(process.env.REACT_APP_QUERY_SUSPENSE) && (
              <Route path={ROUTES.INFINITE} element={<InfiniteScrollPage />} />
            )}
            {isTrueSet(process.env.REACT_APP_QUERY_SUSPENSE) && (
              <Route
                path={ROUTES.SUSPENSE}
                element={
                  <Suspense fallback={<h2>Page Loading...</h2>}>
                    <SuspensePage />
                  </Suspense>
                }
              />
            )}
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
        <ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
      </AppProvider>
    </QueryClientProvider>
  );
}

export default App;
