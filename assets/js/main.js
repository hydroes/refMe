'use strict';

var app = angular.module('refMeApp', []);

/**
* In the real world I would write a test for this service!
*/
app.service('ShoppingCartService', [function() {
    /**
     * Private cart items
     */
    var _cartItems = [];

    var addItem = function(item) {
        _cartItems.push(item);
    };

    var removeItem = function(item, key) {
        _cartItems.splice(key, 1);
    };

    var removeAllItems = function() {
        _cartItems = [];
    };

    var getItems = function() {
        return _cartItems;
    };

    var getCartTotal = function() {
        var total = 0.0;

        angular.forEach(_cartItems, function(item) {
            total += item.cost * item.quantity;
        });

        return total;

    };

    /**
     * Expose the functions that are needed for this service
     */
    return {
       addItem:addItem,
       getItems:getItems,
       removeItem:removeItem,
       removeAllItems:removeAllItems,
       getCartTotal:getCartTotal
    };
}]);

/**
* Controller for this app
*/
app.controller('ShoppingCartController', ['$scope', 'ShoppingCartService', function($scope, ShoppingCartService) {
    
    /**
     * List of available items that can be added to the cart
     */
    $scope.availableItems = [
      {name:'Backend skills', cost:60.50, quantity: 1},
      {name:'JS knowledge', cost:80.50, quantity: 1},
      {name:'Front end skills', cost:60.00, quantity: 1}];

    /**
     * Get shopping cart items
     */
    $scope.shoppingCartItems = ShoppingCartService.getItems();

    /**
     * Add an item to the cart
     */
    $scope.addToCart = function(item, key) {
        $scope.availableItems.splice(key, 1);
        ShoppingCartService.addItem(item);
        $scope.calculateTotal();
    };

    /**
     * Remove an item from the cart
     */
    $scope.removeFromCart = function(item, key) {
        ShoppingCartService.removeItem(item, key);
        $scope.availableItems.push(item);
        $scope.calculateTotal();
    };

    /**
     * Calculate the cart total
     */
    $scope.calculateTotal = function() {
        $scope.cartTotal = ShoppingCartService.getCartTotal();
    };
    
  }]);