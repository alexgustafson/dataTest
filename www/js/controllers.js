angular.module('starter.controllers', [])

    .controller('AppCtrl', function ($scope) {
        // Main app controller, empty for the example
    })

// A simple controller that fetches a list of data
    .controller('PetsTabCtrl', function ($scope, Pets, $data) {
        // "Pets" is a service returning mock data (services.js)
        $scope.pets = Pets.all();

        $data.Entity.extend("Todo", {
            Id: { type: "int", key: true, computed: true },
            Task: { type: String, required: true, maxLength: 200 },
            DueDate: { type: Date },
            Completed: { type: Boolean }
        });

        $data.EntityContext.extend("TodoDatabase", {
            Todos: { type: $data.EntitySet, elementType: Todo }
        });

        var todoDB = new TodoDatabase({
            provider: 'sqLite', databaseName: 'MyTodoDatabase'
        });

        todoDB.onReady(function () {

            $scope.tasks = [];
            todoDB.Todos.toArray().then(function (data) {
                $scope.tasks = data;
            })


        });


        $scope.$on('tab.shown', function () {
            // Might do a load here
        });
        $scope.$on('tab.hidden', function () {
            // Might recycle content here
        });
    })

// A simple controller that shows a tapped item's data
    .controller('PetCtrl', function ($scope, $routeParams, Pets) {
        // "Pets" is a service returning mock data (services.js)
        $scope.pet = Pets.get($routeParams.petId);


    });

