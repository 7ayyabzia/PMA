App.filter('breakFilter', function () {
    return function (text) {
        if (text !== undefined && text !== null) return text.replace(/\n/g, '<br />');
    };
});
App.controller("UseCasesCtrl", function ($scope, $compile) {
    $scope.usecase = { useCaseId: 0, mainSuccessScenario: "" };
    $scope.getFormat = function () {
        JsonCall("UseCases", "GetFormat");
        if (list === null) {
            JsonCallParam("UseCases", "AddOrUpdateFormat", { format: "FullyDressed" });
            JsonCall("UseCases", "GetFormat");
        }
        $scope.useCaseFormat = list;

        $scope.getUsecases();
    }
    
    $scope.getUsecases = function () {
        JsonCall("UseCases", "GetUseCases");
        $scope.usecases = list;
    }

    $scope.getFactors = function() {
        JsonCall("UseCases", "GetFactors");
        $scope.factors = list;
    }
    function useCaseFactors() {
        let techFactors = angular.copy($scope.factors.technicalFactors);
        let envFactors = angular.copy($scope.factors.environmentalFactors);
        $scope.usecase.technicalFactors = techFactors.map(function (obj) {
            return {
                technicalFactorId: obj.technicalFactorId,
                technicalFactor: obj
            }
        });
        $scope.usecase.environmentalFactors = envFactors.map(function (obj) {
            return {
                environmentalFactorId: obj.environmentalFactorId,
                environmentalFactor: obj
            }
        });
    }

    $scope.addUsecase = function () {
        $scope.usecase = { useCaseId: 0, mainSuccessScenario: [{ number: 1, value: "" }], extensions: []};
        $scope.usecase.actorsObj = ["", ""];
        useCaseFactors();

        $('#useCaseAddForm').slideToggle();
    }
    $scope.editUsecase = function (i) {
        $scope.usecase = angular.copy($scope.usecases[i]);

        useCaseFactors();
        $scope.usecase.technicalFactors.map(function (obj) {
            let index = $scope.usecases[i].technicalFactors.findIndex(s => s.technicalFactorId === obj.technicalFactorId);
            if (index > -1)
                obj.isChecked = true;
            else
                obj.isChecked = false;
        })

        $scope.usecase.environmentalFactors.map(function (obj) {
            let index = $scope.usecases[i].environmentalFactors.findIndex(s => s.environmentalFactorId === obj.environmentalFactorId);
            if (index > -1)
                obj.isChecked = true;
            else
                obj.isChecked = false;
        })
        $scope.usecase.extensions.map(function (obj) {
            obj.extensionSolutionsObj = obj.extensionSolutions.split("|");
        })
        $scope.usecase.actorsObj = $scope.usecase.actor.split("|");

        $('#useCaseAddForm').slideToggle();
    }

    $scope.saveUsecase = function () {
        $scope.usecase.extensions.map(function (obj) {
            obj.extensionSolutions = obj.extensionSolutionsObj.join("|");
        })
        $scope.usecase.actor = $scope.usecase.actorsObj.join("|");

        $scope.usecase.technicalFactors = $scope.usecase.technicalFactors.filter(s => s.isChecked === true)
        $scope.usecase.technicalFactors.map(function (obj) {
            obj.technicalFactor = null;
        });
        $scope.usecase.environmentalFactors = $scope.usecase.environmentalFactors.filter(s => s.isChecked === true)
        $scope.usecase.environmentalFactors.map(function (obj) {
            obj.environmentalFactor = null;
        });

        if ($scope.usecase.useCaseId === 0)
            JsonCallParam("Usecases", "AddUsecase", { "usecase": JSON.stringify($scope.usecase) });
        else
            JsonCallParam("Usecases", "EditUseCase", { "usecase": JSON.stringify($scope.usecase) });

        $('#useCaseAddForm').slideToggle();
        $scope.getUsecases();
    }

    $scope.showUsecase = function (id) {
        $("#" + id).slideToggle()
    }

    $scope.updateFormat = function (val) {
        JsonCallParam("UseCases", "AddOrUpdateFormat", { format: val });
    }
    $scope.addMainSuccessScenario = function () {
        $scope.usecase.mainSuccessScenario.push({ number: $scope.usecase.mainSuccessScenario.length + 1, value: "" });
    }
    $scope.addExtension = function (i) {
        $scope.usecase.extensions.push({
            extensionOf: i,
            number: i + "" + digitToChar($scope.usecase.extensions.filter(s => s.extensionOf === i).length + 1),
            value: "",
            extensionSolutionsObj: [""]
        });
    }
    $scope.addExtensionSolution = function (i) {
        $scope.usecase.extensions[i].extensionSolutionsObj.push("");
    }
});