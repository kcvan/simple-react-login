import { History } from 'history';

declare global {
  interface RouterProps {
    history: History;
    location: {
      hash: string;
      key: string;
      pathname: string;
      search: string;
      state: string | undefined;
    };
    match: {
      isExact: boolean;
      params: {
        id: string;
      };
      path: string;
      url: string;
    };
  }
}