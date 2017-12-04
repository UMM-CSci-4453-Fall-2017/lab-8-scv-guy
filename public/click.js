angular.module('buttons',[])
  .controller('buttonCtrl',ButtonCtrl)
  .factory('buttonApi',buttonApi)
  .constant('apiUrl','http://localhost:1337'); // CHANGED for the lab 2017!

function ButtonCtrl($scope,buttonApi){
   $scope.buttons=[]; //Initially all was still
   $scope.errorMessage='';
   $scope.isLoading=isLoading;
   $scope.refreshButtons=refreshButtons;
   $scope.buttonClick=buttonClick;

   var loading = false;

   function isLoading(){
    return loading;
   }
  function refreshButtons(){
    loading=true;
    $scope.errorMessage='';
    buttonApi.getButtons()
      .success(function(data){
         $scope.buttons=data;
         loading=false;
      })
      .error(function () {
          $scope.errorMessage="Unable to load Buttons:  Database request failed";
          loading=false;
      });
 }
  function buttonClick($event){
     $scope.errorMessage='';
     buttonApi.clickButton($event.target.id)
        .success(function(){refreshButtons()})
        .error(function(){$scope.errorMessage="Unable click";});
  }
  refreshButtons();  //make sure the buttons are loaded

}

function buttonApi($http,apiUrl){
  return{
    getButtons: function(){
      var url = apiUrl + '/buttons';
      return $http.get(url);
    },
    clickButton: function(id){
      var url = apiUrl+'/click?id='+id;
//      console.log("Attempting with "+url);
      return $http.get(url); // Easy enough to do this way
    },
    getUser: function(){
      var url = apiUrl + '/currentUser';
      return $http.get(url);
    },
    changeUser: function(){ //need to add json credentials to log in as different user
      var url = apiUrl + '/changeUser';
      return $http.get(url);
    },
    makeTrans: function(){
      var url = apiUrl + '/sale';
      return $http.get(url);
    },
    voidTrans: function(){
      var url = apiUrl + '/void';
      return $http.get(url);
    },
    listTrans: function(){
      var url = apiUrl + '/list';
      return $http.get(url);
    },
    deleteItem: function(id){
      var url = apiUrl + '/delete'; // might need to change -> make like clickButton
      return $http.get(url);
    }
 };
}

