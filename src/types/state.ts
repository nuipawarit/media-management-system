export type CommonAsyncState = {
  error: any | null;
  loaded: boolean;
  loading: boolean;
};

export type CommonState = {
  data: any | null;
  status: {
    [name: string]: CommonAsyncState;
  };
};
