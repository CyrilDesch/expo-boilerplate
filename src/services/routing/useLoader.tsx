import React, { DependencyList, useEffect, useState } from "react";
import Loading from "./components/Loading";
import LoaderErrors from "./components/LoaderErrors";

interface Loader {
  loading: boolean;
  error: unknown;
  reload(): void;
}

export default function useLoader(
  loader: () => Promise<unknown>,
  deps?: DependencyList,
): Loader {
  const [loadingState, setLoadingState] = useState<{
    loading: boolean;
    error: unknown;
  }>({ loading: true, error: null });

  const reload = () => {
    let canceled = false;
    setLoadingState({ loading: true, error: null });
    loader().then(
      () => {
        if (!canceled) {
          setLoadingState({ loading: false, error: null });
        }
      },
      (errors) => {
        if (!canceled) setLoadingState({ loading: false, error: errors });
      },
    );

    return () => {
      canceled = true;
    };
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(reload, deps ? deps : [loader]);

  return {
    ...loadingState,
    reload,
  };
}

export type LoadFunction = () => Promise<unknown>;
export type LoadTuple = readonly [() => Promise<unknown>, unknown];
/**
 *
 * /!\ WARNING /!\ : name your function with `use` at the beginning to get the linter on it
 * @param WrappedComponent your component
 * @param useLoad a function which returns the loader (use useCallback when using parameters)
 */
export function withLoader<P extends Record<string, unknown>>(
  WrappedComponent: React.FC<P>,
  useLoad: (props: P) => LoadFunction | LoadTuple,
): React.FC<P> {
  const displayName =
    WrappedComponent.displayName || WrappedComponent.name || "Component";

  function WithLoader(props: P) {
    const load = useLoad(props);
    const { error, loading, reload } = useLoader(
      Array.isArray(load) ? load[0] : load,
    );

    if ((!Array.isArray(load) || load[1] === null) && loading)
      return <Loading />;
    if (error) return <LoaderErrors error={error} reload={reload} />;

    return <WrappedComponent {...props} />;
  }

  WithLoader.displayName = `withLoader(${displayName})`;

  return WithLoader;
}
