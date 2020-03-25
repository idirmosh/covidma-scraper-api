const merge = (arr1, arr2) => {
  const temp = [];

  arr1.map(x => {
    arr2.map(y => {
      if (x.region.trim() == y.region.trim()) {
        temp.push({ ...x, ...y });
      }
    });
  });

  return temp;
};

module.exports = { merge };
