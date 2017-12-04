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
<<<<<<< HEAD
        .success(function(){refreshButtons()})
=======
        .success(function(){getTransaction()})
>>>>>>> c877d044e613e7767d73a8186161cd3058d3d10d
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
<<<<<<< HEAD
    getUser: function(){
      var url = apiUrl + '/currentUser';
      return $http.get(url);
    },
    changeUser: function(id){ //need to add id to credentials.json to log in as different user
      var url = apiUrl + '/changeUser?id='+id;
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
=======
    deleteItem: function(id){
      var url = apiUrl + '/deleteItem?id=' +id;
      return $http.get(url);
    },
    getTransaction: function(){
      var url = apiUrl + '/transactions';
>>>>>>> c877d044e613e7767d73a8186161cd3058d3d10d
      return $http.get(url);
    }
 };
}
