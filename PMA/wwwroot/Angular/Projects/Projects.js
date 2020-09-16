App.requires = ['angularjs-datetime-picker'];
App.controller("ProjectsCtrl", function ($scope, $rootScope, $compile) {

    $scope.addProject = function () {
        showProjectDialogue();
        //$scope.project = angular.copy(project);
    }

    $scope.saveProject = function () {
        JsonCallParam("Projects", "AddProject", { "Project": JSON.stringify($scope.project)})
    }

    function showProjectDialogue() {
        $('#projectDialogue').remove();
        let content = ' <div class="modal fade" id="projectDialogue" role="dialog"> ' +
            '<div class="modal-dialog modal-dialog-centered" role="document">' +
            '   <div class="modal-content">' +
            '       <div class="modal-header br-btm">' +
            '           <h5 class="modal-title">Project</h5>' +
            '           <button type="button" class="close" data-dismiss="modal" aria-label="Close">' +
            '               <span aria-hidden="true">&times;</span>' +
            '           </button>' +
            '       </div>' +
            '       <div class="modal-body br-btm">' +
            '           <form name="projectForm"> ' +
            '               <label>Project Name</label>' +
            '               <div class="form-group">' +
            '                   <input type="text" class="form-control" placeholder="Systems Project" name="projectName" ng-model="project.projectName" required/> ' +
            '                   <span ng-show="projectForm.projectName.$touched && projectForm.projectName.$error.required" class="text-danger pt-2">* Project Name is necessary </span >'+
            '               </div> ' +
            '               <label>Project Name</label>' +
            '               <div class="">' +
            '                   <textarea class="form-control" placeholder="This is a SMS Project" ng-model="project.projectDescription"></textarea> ' +
            '               </div> ' +
            '               <label class="m-t-20">Starting Date</label>' +
            '               <div class="form-group">' +
            '                   <input type="text" class="form-control" name="startingDate" placeholder="08/12/2019" datetime-picker date-format="MM/dd/yyyy" date-only ng-model="project.startingDate" required/> ' +
            '                   <span ng-show="projectForm.startingDate.$touched && projectForm.startingDate.$error.required" class="text-danger pt-2">* Starting Date is necessary </span >' +
            '               </div> ' +
            '               <div class="form-group text-right pt-5">' +
            '                   <button class="btn btn-primary" ng-disabled="projectForm.$invalid" ng-click="saveProject()">Save</button> ' +
            '                   <button class="btn btn-danger" data-dismiss="modal" aria-label="Close">Cancel</button> ' +
            '               </div> ' +
            '           </form> ' +
            '       </div>' +
            '   </div>' +
            '</div>' +
            '</div>';
        angular.element(document.body).append($compile(content)($scope));
        $('#projectDialogue').modal();
    }
});
