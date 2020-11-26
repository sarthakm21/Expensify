const promise = new Promise((resolve, reject) => {
  resolve("This is resolved");
});

promise
  .then((data) => data.toUpperCase())
  .then((data) => {
    console.log(data);
  });
