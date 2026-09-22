// Central place to catch errors thrown (or passed to next()) anywhere in the app.
// Keeping this in `shared` means every module reports errors the same way.
export function errorHandler(err, req, res, next) {
  console.error(err);

  const status = err.status || 500;
  const message = status === 500 ? 'Something went wrong on the server.' : err.message;

  res.status(status).json({ error: message });
}

export class HttpError extends Error {
  constructor(status, message) {
    super(message);
    this.status = status;
  }
}
