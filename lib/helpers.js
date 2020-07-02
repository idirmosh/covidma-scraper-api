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

const parsDate = inputDate => {
  let parsedDate = inputDate.split('-');
  let year = inputDate.split('-')[2];
  let month = inputDate.split('-')[1];
  let day = inputDate.split('-')[0].split(' ')[2];
  let [hour, minut] = parsedDate[0].split(' ')[1].split('H');
  return Date(year, month, day, hour, minut, minut);
};

module.exports = { merge, parsDate };
