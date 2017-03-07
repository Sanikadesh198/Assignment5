  var App = window.App || {};
  (function(window) {
      'use strict';


      function DataStore() {
          //console.log('running the Datastore function');
          this.data = {};
      }
      DataStore.prototype.add = function(key, val) {
          this.data[key] = val;
      };
      DataStore.prototype.get = function(key) {
          return this.data[key];
      };
      DataStore.prototype.getAll = function() {
          return this.data;
      };
      DataStore.prototype.remove = function(key) {
          delete this.data[key];
      };
      App.DataStore = DataStore;
      window.App = App;
  })(window);

  (function(window) {
      'use strict';
      //  var App = window.App || {};

      function Truck(truckId, db) {
          this.truckId = truckId;
          this.db = db;
          //console.log('running the Datastore function');
      }
      Truck.prototype.createOrder = function(order) {
          console.log('Adding order for ' + order.emailAddress);
          this.db.add(order.emailAddress, order);
      };
      Truck.prototype.deliverOrder = function(customerId) {
          console.log('Delivering order for ' + customerId);
          this.db.remove(customerId);
      };

      Truck.prototype.printOrders = function() {
          var customerIdArray = Object.keys(this.db.getAll());

          console.log('Truck #' + this.truckId + 'has pending orders: ');
          customerIdArray.forEach(function(id) {
              console.log(this.db.get(id));
          }.bind(this));
      };

      App.Truck = Truck;
      window.App = App;
  })(window);

  QUnit.test("Coffeerun testing", function(assert) {
      var ds = new App.DataStore();
      assert.equal(ds.add('m@bond.com', 'tea'));
      assert.equal(ds.add('james@bond.com', 'eshpressho'));
      assert.ok(ds.getAll());
      assert.equal(ds.remove('james@bond.com'));
      assert.ok(ds.getAll());
      assert.ok(ds.get('m@bond.com'));
      assert.ok(ds.get('james@bond.com'));

      var myTruck = new App.Truck('007', new App.DataStore());

      assert.equal(myTruck.createOrder({
          emailAddress: 'me@goldfinger.com',
          coffee: 'double mocha'
      }));
      assert.equal(myTruck.createOrder({
          emailAddress: 'dr@no.com',
          coffee: 'decaf'
      }));
      assert.equal(myTruck.createOrder({
          emailAddress: 'm@bond.com',
          coffee: 'earl grey'
      }));
      assert.ok(myTruck.printOrders());
      assert.equal(myTruck.deliverOrder('dr@no.com'));
      assert.equal(myTruck.deliverOrder('m@bond.com'));
      assert.ok(myTruck.printOrders());


  });
  QUnit.test("hello test", function(assert) {
      assert.ok(1 == "1", "Passed!");
      var ds = App.DataStore();
      assert.ok(ds.add('m@bond.com', 'earlgrey'));
      assert.ok(ds.get('james@bond'));
      assert.ok(ds.getall());
      var myTruck = new App.Truck('007', new App.DataStore());
      assert.ok(myTruck.createOrder('dr@no', 'decaf'));
      assert.ok(myTruck.deliverOrder('m@bond'));
      assert.ok(myTruck.printOrders());

  });
