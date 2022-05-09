const axios = require('axios');
const Bottleneck = require('bottleneck');

const limiter = new Bottleneck({
  maxConcurrent: 1,
  minTime: 10000,
});

async function getMyData(id) {
  const axiosConfig = {
    url: `http://localhost:8000/products/${id}`,
    method: 'get',
  };
  const response = await axios(axiosConfig)
    .then((res) => res)
    .catch((err) => console.log(err));
  return response.data;
}

async function getAllResults() {
  const sourceIds = [1, 2, 3];
  const allThePromises = sourceIds.map((item) =>
    limiter.schedule(async () => {
      console.log(222222222, item);
      return getMyData(item);
    })
  );


  try {
    const results = await Promise.all(allThePromises);
    console.log(results);
  } catch (err) {
    console.log(err);
  }
}

getAllResults();
