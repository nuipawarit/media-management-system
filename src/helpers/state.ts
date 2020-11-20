// Generate failed action reducer object
const generateFailedStatus = (
  asyncMethodType: string | null,
  initialState: any,
  error: any
) => {
  if (asyncMethodType)
    return {
      [asyncMethodType]: {
        ...initialState.status[asyncMethodType],
        error,
      },
    };

  return { error };
};

// Generate pending action reducer object
const generatePendingStatus = (
  asyncMethodType: string | null,
  initialState: any
) => {
  if (asyncMethodType)
    return {
      [asyncMethodType]: {
        ...initialState.status[asyncMethodType],
        loading: true,
      },
    };

  return { loading: true };
};

// Generate succeeded action reducer object
const generateSucceededStatus = (
  asyncMethodType: string | null,
  initialState: any
) => {
  if (asyncMethodType)
    return {
      [asyncMethodType]: {
        ...initialState.status[asyncMethodType],
        loaded: true,
      },
    };

  return { loaded: true };
};

export type AsyncMethodType = string | null;

// Generate group of asynchronous action reducer object
export const generateCommonAsyncReducer = <
  S extends { [name: string]: any },
  DefaultActionPayload = undefined,
  FailActionPayload = any,
  SuccessActionPayload = S["data"]
>(
  initialState: S,
  asyncMethodType: AsyncMethodType = null
) => ({
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  default: (state: S, action: { payload: DefaultActionPayload }) => state,
  failed: (state: S, action: { payload: FailActionPayload }) => ({
    ...state,
    status: {
      ...initialState.status,
      ...generateFailedStatus(asyncMethodType, initialState, action.payload),
    },
  }),
  pending: (state: S) => ({
    ...state,
    status: {
      ...initialState.status,
      ...generatePendingStatus(asyncMethodType, initialState),
    },
  }),
  succeeded: (state: S, action: { payload: SuccessActionPayload }) => ({
    ...state,
    data: action.payload,
    status: {
      ...initialState.status,
      ...generateSucceededStatus(asyncMethodType, initialState),
    },
  }),
});
