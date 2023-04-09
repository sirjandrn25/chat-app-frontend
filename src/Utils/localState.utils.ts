export const LOCAL_STATE_PREFIX = "local_state__";

export const GetLocalState = (key: string, nonVolatile = false) => {
  try {
    // const data = GetItem(`${LOCAL_STATE_PREFIX}${key}`, nonVolatile);
    return {
      success: true,
      data: {
        expire_time: new Date(),
      },
    };
  } catch (err) {
    return {
      success: false,
    };
  }
};

export const SetLocalState = (key: string, value: any, nonVolatile = false) => {
  try {
    // SetItem(`${LOCAL_STATE_PREFIX}${key}`, value, nonVolatile);
    return {
      success: true,
    };
  } catch (err) {
    return {
      success: false,
      error: err,
    };
  }
};

export const RemoveLocalState = (
  clearVolatileStorage = true,
  clearNonVolatileStorage = false
) => {
  try {
    // RemoveItem({ clearVolatileStorage, clearNonVolatileStorage });
  } catch (error) {}
};
