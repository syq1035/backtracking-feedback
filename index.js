const isEqualArray = (arr1, arr2) => {
  return arr2.every(item => arr1.includes(item));
}

const hasRepeatValue = (arr) => {
  return arr.length > new Set(arr).size;
}

const removeSubArr = (arr, subArr) => {
  subArr.forEach(subArrItem => {
    arr.forEach((arrItem, index) => {
      if (isEqualArray(subArrItem, arrItem)) {
        arr.splice(index, 1);
      }
    })
  })
}

const generateMapping = (list) => {
  const mapping = [];
  list.forEach((left, index) => {
    const laveList = list.slice(index + 1, list.length);
    laveList.forEach((right) => {
      mapping.push([left, right]);
    })
  })
  return mapping;
}

let shouldRestart = false;

const backtracking = (mapping, target, start, solution, results) => {
  if (hasRepeatValue(solution.flat())) {
    return;
  }

  if (isEqualArray(solution.flat(), target)) {
    results.push([...solution])
    removeSubArr(mapping, solution);
    shouldRestart = true;
    return;
  }

  for (let i = start; i < mapping.length; i++) {
    if (shouldRestart) {
      shouldRestart = false;
      backtracking(mapping, names, 0, [], results);
      return
    }

    solution.push(mapping[i])
    backtracking(mapping, names, start + 1, solution, results);
    solution.pop()
  }
}

const main = (names) => {
  const results = [];
  const mapping = generateMapping(names);
  backtracking(mapping, names, 0, [], results);

  return results;
}

const names = ['A', 'B', 'C', 'D', 'E', 'F']
const results = main(names)
console.log(results);
