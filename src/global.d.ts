declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}

declare module "@env" {
  export const REACT_APP_API_HOST: string;
}
