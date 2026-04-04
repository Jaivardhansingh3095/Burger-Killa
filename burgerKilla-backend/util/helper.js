const dateValidation = (value) => {
  const date1 = new Date('1900-01-01');
  const date2 = new Date('2015-01-01');
  const date = new Date(value);

  return date.getTime() > date1.getTime() && date.getTime() < date2.getTime();
};

const camelCaseCoversion = (name) => {
  return name
    .split(' ')
    .map((word) => word.at(0).toUpperCase() + word.slice(1))
    .join(' ');
};

const CATEGORIES = [
  'burger',
  'wrap',
  'meal',
  'munchie',
  'refreshment',
  'dessert',
  'milkshake',
];

const minusDays = (date, days) => {
  const result = new Date(date);

  result.setDate(result.getDate() - days);
  result.setHours(0, 0, 0, 0);

  return result;
};

exports.dateValidation = dateValidation;
exports.camelCaseCoversion = camelCaseCoversion;
exports.CATEGORIES = CATEGORIES;
exports.minusDays = minusDays;

//Updating all documents with new fields
// await User.updateMany(
//   {},
//   { $set: { resetToken: '', resetTokenExpire: null } },
// );
