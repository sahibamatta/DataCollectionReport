var axios = require('axios');

function getRepos(){
  return axios.get('http://localhost:8080/property/test');
}


var helpers = {
  getGithubInfo: function(response){
    return axios.all([getRepos()])
      .then(function(arr){
        return {
          repos: arr[0].data,
        }
      })
  }
}

module.exports = helpers;
