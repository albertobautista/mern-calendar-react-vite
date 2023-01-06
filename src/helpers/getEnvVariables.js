export const getEnvVariables = () => {
  // import.meta.env;
  if (typeof process !== "undefined") {
    return {
      ...process.env,
    };
  } else {
    return {
      ...import.meta.env,
    };
  }
};
