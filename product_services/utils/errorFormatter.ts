export const errorFormatter = (error: unknown) => {
  let errorMessage = "An unknown error occurred";

  if (error instanceof Error) {
    errorMessage = error.message;
  } else if (error && typeof error === "object") {
    errorMessage = JSON.stringify(error); // Capture all error details if it's an object
  }
  return errorMessage;
};
