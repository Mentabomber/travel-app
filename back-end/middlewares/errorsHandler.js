export default function (err, req, res, next) {
  console.log(err);

  sendRes(err, res);
}

/**
 * To be able to use the same response in the middleware for routes not found, export this function so that it can be reused.
 *
 * @param {*} err
 * @param {*} res
 * @returns
 */
function sendRes(err, res) {
  return res.status(err.status ?? 500).json({
    message: err.message,
    error: err.constructor.name,
    errors: err.errors ?? [],
  });
}

const _sendRes = sendRes;
export { _sendRes as sendRes };
