export class DataService {
  returnData() {
    const promise = new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve('Data')
      }, 1500000);

    });
    return promise;
  }
}
