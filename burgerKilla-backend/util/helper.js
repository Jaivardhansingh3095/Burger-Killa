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

exports.dateValidation = dateValidation;
exports.camelCaseCoversion = camelCaseCoversion;
exports.CATEGORIES = CATEGORIES;
