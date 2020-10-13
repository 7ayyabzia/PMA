App.controller("PDMCtrl", function ($scope, $compile) {

    $scope.pdm = { pdmId:0, useCaseId: 0, conceptualClasses: [] };
    $scope.getUsecases = function () {
        JsonCall("UseCases", "GetUseCases");
        $scope.usecases = list;
    }
    $scope.getPDMs = function () {
        JsonCall("DomainModel", "GetPDMs");
        $scope.pdms = list;
    }

    $scope.savePDM = function () {
        JsonCallParam("DomainModel", "AddOrUpdatePDM", { "pdm": JSON.stringify($scope.pdm) });
        $('#conceptsdialogue').modal('hide');
        $scope.getPDMs();
    }

    $scope.chooseUsecase = function() {
        $('#selectUsecase').remove();
        let content = ' <div class="modal fade" id="selectUsecase" role="dialog"> ' +
            '<div class="modal-dialog modal-dialog-centered" role="document">' +
            '   <div class="modal-content">' +
            '       <div class="modal-header br-btm">' +
            '           <h5 class="modal-title">Select UseCase</h5>' +
            '           <button type="button" class="close" data-dismiss="modal" aria-label="Close">' +
            '               <span aria-hidden="true">&times;</span>' +
            '           </button>' +
            '       </div>' +
            '       <div class="modal-body br-btm">' +
            '           <form name="chooseUsecaseform"> ' +
            '               <select class="form-control" ng-model="pdm.useCaseId" convert-to-number>' +
            '                   <option value="0" hidden>Select Usecase</option>' +
            '                   <option ng-repeat="usecase in usecases" value="{{usecase.useCaseId}}">{{ usecase.title }}</option>' +
            '               </select>' +
            '               <div class="form-group text-right pt-5">' +
            '                   <button class="btn btn-primary" ng-disabled="pdm.useCaseId === 0" ng-click="createConceptsDialogue(pdm)">Generate Concepts</button> ' +
            '                   <button class="btn btn-danger" data-dismiss="modal" aria-label="Close">Cancel</button> ' +
            '               </div> ' +
            '           </form> ' +
            '       </div>' +
            '   </div>' +
            '</div>' +
            '</div>';
        angular.element(document.body).append($compile(content)($scope));
        $('#selectUsecase').modal();
    }

    $scope.createConceptsDialogue = function (pdm) {
        $('#selectUsecase').modal('hide');

        var findIfExists = $scope.pdms.findIndex(s => s.useCaseId === pdm.useCaseId);
        if (findIfExists > -1) pdm = $scope.pdms[findIfExists];

        $scope.pdm.pdmId = angular.copy(pdm.pdmId);
        $scope.pdm.useCaseId = angular.copy(pdm.useCaseId);

        //Adding Natural Language Processing Later
        let index = $scope.usecases.findIndex(s => s.useCaseId === $scope.pdm.useCaseId);
        
        $scope.pdm.conceptualClasses = [];
        //Adding Natural Language Processing Later

        $('#conceptsdialogue').remove();
        let content = ' <div class="modal fade" id="conceptsdialogue" role="dialog"> ' +
            '<div class="modal-dialog modal-dialog-centered" role="document">' +
            '   <div class="modal-content">' +
            '       <div class="modal-header br-btm">' +
            '           <h5 class="modal-title">Conceptual Classes</h5>' +
            '           <button type="button" class="close" data-dismiss="modal" aria-label="Close">' +
            '               <span aria-hidden="true">&times;</span>' +
            '           </button>' +
            '       </div>' +
            '       <div class="modal-body br-btm">' +
            '           <form name="conceptsform"> ' +
            '               <label>Concepts</label>' +
            '               <div class="row">' +
            '                   <div class="col-10">' +
            '                       <div class="input-group">' +
            '                           <input placeholder="Write Class Name" type="text" class="form-control" ng-model="addConcept"/>' +
            '                       </div>' +
            '                   </div>' +
            '                   <div class="col-2">' +
            '                       <button class="btn tblActnBtn float-right" ng-disabled="addConcept=== \'\' " ng-click="pushConcept()"><i class="material-icons">add</i></button>' +
            '                   </div>' +
            '               </div>' +
            '               <div class="row dialogue-concept-list" ng-repeat="concept in pdm.conceptualClasses">' +
            '                   <div class="col-10">' +
            '                       {{concept.className}}' +
            '                   </div>' +
            '                   <div class="col-2">' +
            '                       <button class="btn tblActnBtn" ng-click="removeConcept($index)"><i class="material-icons">delete</i></button>' +
            '                   </div>' +
            '               </div>' +
            '               <div class="form-group text-right pt-5">' +
            '                   <button class="btn btn-primary" ng-disabled="conceptsform.$invalid" ng-click="savePDM()">Save</button> ' +
            '                   <button class="btn btn-danger" data-dismiss="modal" aria-label="Close">Cancel</button> ' +
            '               </div> ' +
            '           </form> ' +
            '       </div>' +
            '   </div>' +
            '</div>' +
            '</div>';
        angular.element(document.body).append($compile(content)($scope));
        $('#conceptsdialogue').modal();
    }

    $scope.pushConcept = function () {
        if ($scope.addConcept === '') return;

        $scope.pdm.conceptualClasses.push({ className: $scope.addConcept });
        $scope.addConcept = '';
    }
    $scope.removeConcept = function (i) {
        $scope.pdm.conceptualClasses.splice(i, 1);
    }

    $scope.showPDM = function (id) {
        $("#" + id).slideToggle()
    }
});

App.controller("DomainModelCtrl", function ($scope, $compile) {

    $scope.domainModel = { DomainModelConcepts: [] };
    $scope.getDomainModel = function () {
        JsonCall("DomainModel", "GetDomainModel");
        $scope.domainModel = list;
    }

    $scope.updateDomainModel = function () {
        JsonCall("DomainModel", "UpdateDomainModel");
        $scope.getDomainModel();
    }

});