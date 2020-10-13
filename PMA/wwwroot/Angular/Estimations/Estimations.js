App.controller("EstimationsCtrl", function ($scope, $compile) {

    function getUseCases() {
        JsonCall("UseCases", "GetUseCases");
        $scope.usecases = list;
    }

    $scope.getEstimations = function () {
        getUseCases();
        UUCW();
        UAW();
        techAndEnvFactors();

        let UCP = ($scope.UUCW.total + $scope.UAW.total) * $scope.TechFactors.TCF * $scope.EnvFactors.EF;

        $scope.estimated = {
            minWeek: Math.floor((UCP * 20) / 300) ,
            maxWeek: Math.floor((UCP * 28) / 300) 
        }
    }

    function UUCW() {
        $scope.UUCW = {
            simple: { weight: 5, noOfUC: 0, product: 0 },
            average: { weight: 10, noOfUC: 0, product: 0 },
            complex: { weight: 15, noOfUC: 0, product: 0 },
            total: 0
        }

        let useCaseTransactions = $scope.usecases.map(function (obj) {
            let mss = obj.mainSuccessScenario.length;
            let extensionCount = 0;
            obj.extensions.filter(function (ext) {
                extensionCount += ext.extensionSolutions.split("|").length
            });
            return {
                useCaseNumber: obj.useCaseNumber,
                transactions: mss + extensionCount
            }
        })

        $scope.UUCW.simple.noOfUC = useCaseTransactions.filter(s => s.transactions <= 3).length;
        $scope.UUCW.simple.product = $scope.UUCW.simple.noOfUC * $scope.UUCW.simple.weight;

        $scope.UUCW.average.noOfUC = useCaseTransactions.filter(s => s.transactions >= 4 && s.transactions <= 7).length;
        $scope.UUCW.average.product = $scope.UUCW.average.noOfUC * $scope.UUCW.average.weight;

        $scope.UUCW.complex.noOfUC = useCaseTransactions.filter(s => s.transactions > 7).length;
        $scope.UUCW.complex.product = $scope.UUCW.complex.noOfUC * $scope.UUCW.complex.weight;

        $scope.UUCW.total = $scope.UUCW.simple.product + $scope.UUCW.average.product + $scope.UUCW.complex.product;
    }
    function UAW() {
        $scope.UAW = {
            simple: { weight: 5, noOfActors: 0, product: 0 },
            average: { weight: 10, noOfActors: 0, product: 0 },
            complex: { weight: 15, noOfActors: 0, product: 0 },
            total: 0
        }

        let useCaseActors = $scope.usecases.map(function (obj) {
            let simple = obj.actor.split("|")[1].split(",").length;
            let complex = obj.actor.split("|")[0].split(",").length;
            return {
                simple: simple,
                complex: complex
            }
        })

        $scope.UAW.simple.noOfActors = useCaseActors.map(item => item.simple).reduce((prev, next) => prev + next);
        $scope.UAW.simple.product = $scope.UAW.simple.noOfActors * $scope.UAW.simple.weight;

        $scope.UAW.complex.noOfActors = useCaseActors.map(item => item.complex).reduce((prev, next) => prev + next);
        $scope.UAW.complex.product = $scope.UAW.complex.noOfActors * $scope.UAW.complex.weight;

        $scope.UAW.total = $scope.UAW.simple.product + $scope.UAW.average.product + $scope.UAW.complex.product;
    }
    function techAndEnvFactors() {
        JsonCall("UseCases", "GetFactors");
        $scope.TechFactors = list.technicalFactors;
        $scope.EnvFactors = list.environmentalFactors;

        //Technical Factor
        $scope.TechFactors.forEach(function (obj) {
            obj.assessment = 0;
            $scope.usecases.map(function (UC) {
                if (UC.technicalFactors.findIndex(s => s.technicalFactorId === obj.technicalFactorId) > -1)
                    obj.assessment++;
            })
            obj.impact = obj.assessment * obj.weight;
        });
        $scope.TechFactors.TotalFactor = $scope.TechFactors.map(item => item.impact).reduce((prev, next) => prev + next);
        $scope.TechFactors.TCF = 0.6 + (0.01 * $scope.TechFactors.TotalFactor);

        //Environmental Factor
        $scope.EnvFactors.forEach(function (obj) {
            obj.assessment = 0;
            $scope.usecases.map(function (UC) {
                if (UC.environmentalFactors.findIndex(s => s.environmentalFactorId === obj.environmentalFactorId) > -1)
                    obj.assessment++;
            })
            obj.impact = obj.assessment * obj.weight;
        });
        $scope.EnvFactors.TotalFactor = $scope.EnvFactors.map(item => item.impact).reduce((prev, next) => prev + next);
        $scope.EnvFactors.EF = 1.4 + (-0.03 * $scope.EnvFactors.TotalFactor);
    }


});