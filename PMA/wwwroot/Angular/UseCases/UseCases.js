App.filter('breakFilter', function () {
    return function (text) {
        if (text !== undefined && text !== null) return text.replace(/\n/g, '<br />');
    };
});
App.controller("UseCasesCtrl", function ($scope, $compile) {

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

    $scope.addUsecase = function () {
        showUseCaseDialogue();
    }
    $scope.editUsecase = function (i) {
        $scope.usecase = angular.copy($scope.usecases[i]);
        showUseCaseDialogue();
    }

    $scope.saveUsecase = function () {
        if ($scope.usecase.useCaseId === 0)
            JsonCallParam("Usecases", "AddUsecase", { "usecase": JSON.stringify($scope.usecase) });
        else
            JsonCallParam("Usecases", "EditUseCase", { "usecase": JSON.stringify($scope.usecase) });

        $('#useCaseDialogue').modal('hide');
        $scope.getUsecases();
    }

    $scope.showUsecase = function (id) {
        $("#" + id).slideToggle()
    }

    $scope.updateFormat = function (val) {
        JsonCallParam("UseCases", "AddOrUpdateFormat", { format: val });
    }

    function showUseCaseDialogue() {
        $('#useCaseDialogue').remove();
        let content = ' <div class="modal fade" id="useCaseDialogue" role="dialog"> ' +
            '<div class="modal-dialog modal-lg modal-dialog-centered" role="document">' +
            '   <div class="modal-content">' +
            '       <div class="modal-header br-btm">' +
            '           <h5 class="modal-title">Use Case</h5>' +
            '           <button type="button" class="close" data-dismiss="modal" aria-label="Close">' +
            '               <span aria-hidden="true">&times;</span>' +
            '           </button>' +
            '       </div>' +
            '       <div class="modal-body br-btm">' +
            '           <form name="usecaseform"> ' +
            '               <label>UseCaseNumber</label>' +
            '               <div class="form-group">' +
            '                   <input type="text" class="form-control" placeholder="#1" name="useCaseNumber" ng-model="usecase.useCaseNumber"/> ' +
            '               </div> ' +
            '               <label>Title</label>' +
            '               <div class="form-group">' +
            '                   <input type="text" class="form-control" placeholder="Create User" name="title" ng-model="usecase.title"/> ' +
            '               </div> ' +
            '               <label>Description</label>' +
            '               <div class="form-group">' +
            '                   <input type="text" class="form-control" placeholder="This is used for x purpose" name="description" ng-model="usecase.description"/> ' +
            '               </div> ' +
            '               <label>Scope</label>' +
            '               <div class="form-group">' +
            '                   <input type="text" class="form-control" placeholder="Point of Sale System" name="scope" ng-model="usecase.scope"/> ' +
            '               </div> ' +
            '               <label>Level</label>' +
            '               <div class="form-group">' +
            '                   <input type="text" class="form-control" placeholder="User Goal" name="level" ng-model="usecase.level"/> ' +
            '               </div> ' +
            '               <label>Actor</label>' +
            '               <div class="form-group">' +
            '                   <textarea class="form-control" placeholder="Primary Actor & Secondary Actors" name="actor" ng-model="usecase.actor"/></textarea> ' +
            '               </div> ' +
            '               <label>Stakeholders Interest</label>' +
            '               <div class="form-group">' +
            '                   <textarea class="form-control" placeholder="Salesmen, Manager, CEO e.t.c." name="stakeholdersInterest" ng-model="usecase.stakeholdersInterest"/></textarea> ' +
            '               </div> ' +
            '               <label>Pre Conditions</label>' +
            '               <div class="form-group">' +
            '                   <input type="text" class="form-control" placeholder="PreConditions" name="preConditions" ng-model="usecase.preConditions"/> ' +
            '               </div> ' +
            '               <label>Post Conditions</label>' +
            '               <div class="form-group">' +
            '                   <input type="text" class="form-control" placeholder="PostConditions" name="postConditions" ng-model="usecase.postConditions"/> ' +
            '               </div> ' +
            '               <label>Main Success Scenario</label>' +
            '               <div class="form-group">' +
            '                   <textarea type="text" class="form-control" placeholder="Main Success Scenario" name="mainSuccessScenario" ng-model="usecase.mainSuccessScenario" required/></textarea> ' +
            '                   <span ng-show="projectForm.projectName.$touched && projectForm.projectName.$error.required" class="text-danger pt-2">* Main Success Scenario is necessary </span >' +
            '               </div> ' +
            '               <label>Extensions</label>' +
            '               <div class="form-group">' +
            '                   <textarea class="form-control" placeholder="Extensions" name="extensions" ng-model="usecase.extensions"/></textarea> ' +
            '               </div> ' +
            '               <label>Special Requirements</label>' +
            '               <div class="form-group">' +
            '                   <textarea class="form-control" placeholder="Machineries" name="specialRequirements" ng-model="usecase.specialRequirements" /></textarea> ' +
            '               </div> ' +
            '               <label>Technology</label>' +
            '               <div class="form-group">' +
            '                   <input type="text" class="form-control" placeholder="Technology" name="technology" ng-model="usecase.technology"/> ' +
            '               </div> ' +
            '               <label>Open Issues</label>' +
            '               <div class="form-group">' +
            '                   <textarea class="form-control" placeholder="Open Issues" name="openIssues" ng-model="usecase.openIssues" /></textarea> ' +
            '               </div> ' +
            '               <div class="form-group text-right pt-5">' +
            '                   <button class="btn btn-primary" ng-disabled="usecaseform.$invalid" ng-click="saveUsecase()">Save</button> ' +
            '                   <button class="btn btn-danger" data-dismiss="modal" aria-label="Close">Cancel</button> ' +
            '               </div> ' +
            '           </form> ' +
            '       </div>' +
            '   </div>' +
            '</div>' +
            '</div>';
        angular.element(document.body).append($compile(content)($scope));
        $('#useCaseDialogue').modal();
    }
});