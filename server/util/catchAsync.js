const catchAsync = function (fn) {
  return async function (req, res, next) {
    fn(req, res, next).catch((err) => next(err));
  };
};

module.exports = catchAsync;
