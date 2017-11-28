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
   $scope.listofPrices=[];
   $scope.deleteItem=deleteItem;
   $scope.priceTotalScope=0;

   var price = 0;
   var totalPrice = 0;
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
        .success(function(){getTransaction()})
        .error(function(){$scope.errorMessage="Unable click";});
  }
  function deleteItem($event){
    console.log("id: " + $event.target.id);
    $scope.errorMessage='';
    buttonApi.deleteItem($event.target.id).success(function(){
      getTransaction()
    }).error(function(){$scope.errorMessage="Not Advaible";});
  }
  function getTransaction(){
    $scope.errorMessage='';
    buttonApi.getTransaction().success(function(data){
      .console.log("Caculating the total price");
      for(var i = 0; i < data.length; i++){
        totalPrice += data[i].priceTotalScopes
      }
      $scope.priceTotalScope = totalPrice;
      $scope.priceList = data;
      totalPrice = 0;
      loading = false;
    }).error(function(){$scope.errorMessage="Failed to load transactions";});
  }
  getTransaction();
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
    deleteItem: function(id){
      var url = apiUrl + '/deleteItem?id=' +id;
      return $http.get(url);
    },
    getTransaction: function(){
      var url = apiUrl + '/transactions';
      return $http.get(url);
    }
 };
}
