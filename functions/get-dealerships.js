function main(params) {
  // console.log(params);
  return new Promise(function (resolve, reject) {
      const { CloudantV1 } = require('@ibm-cloud/cloudant');
      const { IamAuthenticator } = require('ibm-cloud-sdk-core');
      const authenticator = new IamAuthenticator({ apikey: 'q3N4k9Bgw7Fu-dSy0W3V_kipT29oO-aMAadVneP9bOjM' })
      const cloudant = CloudantV1.newInstance({
          authenticator: authenticator
      });
      cloudant.setServiceUrl('https://4396d04f-b496-494a-bbee-ea13b758110c-bluemix.cloudantnosqldb.appdomain.cloud');
      if (params.st) {
          // return dealership with this state 
          cloudant.postFind({db:'dealerships',selector:{st:params.st}})
          .then((result)=>{
            // console.log(result.result.docs);
            let code = 200;
            if (result.result.docs.length == 0) {
                code = 404;
            }
            resolve({
                statusCode: code,
                headers: { 'Content-Type': 'application/json' },
                body: result.result.docs
            });
          }).catch((err)=>{
            reject(err);
          })
      } else if (params.id) {
          id = parseInt(params.dealerId)
          // return dealership with this state 
          cloudant.postFind({
            db: 'dealerships',
            selector: {
              id: parseInt(params.id)
            }
          })
          .then((result)=>{
            // console.log(result.result.docs);
            let code = 200;
            if (result.result.docs.length == 0) {
                code = 404;
            }
            resolve({
                statusCode: code,
                headers: { 'Content-Type': 'application/json' },
                body: result.result.docs
            });
          }).catch((err)=>{
            reject(err);
          })
      } else {
          // return all documents 
          cloudant.postAllDocs({ db: 'dealerships', includeDocs: true, limit: 10 })            
          .then((result)=>{
            // console.log(result.result.rows);
            let code = 200;
            if (result.result.rows.length == 0) {
                code = 404;
            }
            resolve({
                statusCode: code,
                headers: { 'Content-Type': 'application/json' },
                body: result.result.rows
            });
          }).catch((err)=>{
            reject(err);
          })
    }
  }
  )}