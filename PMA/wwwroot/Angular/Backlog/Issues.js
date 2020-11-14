App.requires = ['angularjs-datetime-picker', 'ngSanitize'];
App.filter('issueStatus', function ($sce) {
    return function (text) {
        if (text !== undefined && text !== null) {
            if(text === 'TODO')
                return $sce.trustAsHtml('<span class="badge bg-orange ml-0">To Do</span>');
            if (text === 'IN PROGRESS')
                return $sce.trustAsHtml('<span class="badge bg-cyan ml-0">In Progress</span>');
            if (text === 'DONE')
                return $sce.trustAsHtml('<span class="badge bg-teal ml-0">Done</span>');
        }
    };
});
App.filter('issuePriority', function ($sce) {
    return function (text) {
        if (text !== undefined && text !== null) {
            if (text === 'HIGH')
                return $sce.trustAsHtml('<i class="fas fa-arrow-up text-danger"></i>');
            if (text === 'MEDIUM')
                return $sce.trustAsHtml('<i class="fas fa-arrow-up text-warning"></i>');
            if (text === 'LOW')
                return $sce.trustAsHtml('<i class="fas fa-arrow-up text-success"></i>');
        }
    };
});
App.filter('issueType', function ($sce) {
    return function (text) {
        if (text !== undefined && text !== null) {
            if (text === 'BUG')
                return $sce.trustAsHtml('<i class="fas fa-bug text-danger"></i>');
            if (text === 'FEATURE')
                return $sce.trustAsHtml('<i class="fas fa-tasks text-success"></i>');
            if (text === 'CHANGE')
                return $sce.trustAsHtml('<i class="fas fa-exchange-alt text-warning"></i>');
        }
    };
});

App.controller("BacklogIssuesCtrl", function ($scope, $backlog, $compile, $user) {

    $scope.getIssues = function () {
        let issues = $backlog.getIssues();
        $scope.sprintIssues = issues.filter(s => s.sprintId !== 0 && s.isCompleted === false);
        $scope.completedIssues = issues.filter(s => s.isCompleted === true);
        $scope.backlogIssues = issues.filter(s => s.sprintId === 0);
        applyChanges();
    }

    $scope.addUpdateIssue = function (issue) {
        if (issue != undefined)
            $scope.issue = angular.copy(issue)
        else
            $scope.issue = { issueType: 'CHANGE', priority: 'MEDIUM', assignedTo:''}
        $('#issueDialogue').remove();
        $scope.users = $user.getAllUsers();
        $backlog.renderIssueDialogue()
            .then(function (response) {
                angular.element(document.body).append($compile(response)($scope));
                $('#issueDialogue').modal();
            })
    }

    $scope.saveIssue = function () {
        $backlog.saveIssue($scope.issue);
        $('#issueDialogue').modal('hide');
        $scope.getIssues();
    }

    $scope.showIssueDetails = function (issue, select) {
        $('.all-issues').removeClass('col-lg-12 col-md-12').addClass('col-lg-7 col-md-7');
        $('.issue-details').show();
        $scope.selectedIssue = issue;
        if (select) $scope.selectIssue(issue.backlogIssueId);
    }

    $scope.selectIssue = function (id) {
        var i = $scope.backlogIssues.findIndex(s => s.backlogIssueId === id);
        if ($scope.backlogIssues[i].hasOwnProperty('selected'))
            $scope.backlogIssues[i].selected = !$scope.backlogIssues[i].selected;
        else
            $scope.backlogIssues[i].selected = true;

        if ($scope.backlogIssues.filter(s => s.selected === true).length > 0) $('#newSprintBtn').show(); else $('#newSprintBtn').hide();
    }

    $scope.hideIssueDetails = function () {
        $('.all-issues').addClass('col-lg-12 col-md-12').removeClass('col-lg-8 col-md-8');
        $('.issue-details').hide();
    }

    $scope.addSprint = function () {
        $scope.issuesToSolve = $scope.backlogIssues.filter(s => s.selected === true);
        if ($backlog.sprintId() !== 0) {
            $backlog.addIssuesInSprint($backlog.sprintId(), $scope.issuesToSolve.map(s => s.backlogIssueId))
            notify($scope.issuesToSolve.map(s => s.issueCode) + ' issues are added in current sprint');
            $scope.getIssues();
            return;
        }

        $('#sprintDialogue').remove();
        var issuesToSolve = $scope.issuesToSolve.map(function (obj) {
            return '<span class="label label-info">' + obj.issueCode + '</span>';
        }).join(" ");
        
        let content = ' <div class="modal fade" id="sprintDialogue" role="dialog"> ' +
            '<div class="modal-dialog modal-dialog-centered" role="document">' +
            '   <div class="modal-content">' +
            '       <div class="modal-header br-btm">' +
            '           <h5 class="modal-title">Sprint</h5>' +
            '           <button type="button" class="close" data-dismiss="modal" aria-label="Close">' +
            '               <span aria-hidden="true">&times;</span>' +
            '           </button>' +
            '       </div>' +
            '       <div class="modal-body br-btm">' +
            '           <form name="sprintForm"> ' +
            '               <label>Sprint Title</label>' +
            '               <div class="form-group">' +
            '                   <input type="text" class="form-control" placeholder="Octuber Sprint" name="sprintName" ng-model="sprint.sprintName" required/> ' +
            '                   <span ng-show="sprintForm.sprintName.$touched && sprintForm.sprintName.$error.required" class="text-danger pt-2">* Sprint Title is necessary </span >' +
            '               </div> ' +
            '               <label class="p-t-20">Sprint Goal</label>' +
            '               <div class="">' +
            '                   <textarea class="form-control" placeholder="In this sprint we will cover..." ng-model="sprint.sprintGoal"></textarea> ' +
            '               </div> ' +
            '               <label class="m-t-20">Starting Date</label>' +
            '               <div class="form-group">' +
            '                   <input type="text" class="form-control" name="startDate" placeholder="08/12/2019" datetime-picker date-format="MM/dd/yyyy" date-only ng-model="sprint.startDate" autocomplete="off" required/> ' +
            '                   <span ng-show="sprintForm.startDate.$touched && projectForm.startDate.$error.required" class="text-danger pt-2">* Start Date is necessary </span >' +
            '               </div> ' +
            '               <label class="m-t-20">Ending Date</label>' +
            '               <div class="form-group">' +
            '                   <input type="text" class="form-control" name="estimatedEndDate" placeholder="08/18/2019" datetime-picker date-format="MM/dd/yyyy" date-only ng-model="sprint.estimatedEndDate" autocomplete="off" required/> ' +
            '                   <span ng-show="sprintForm.estimatedEndDate.$touched && sprintForm.estimatedEndDate.$error.required" class="text-danger pt-2">* End Date is necessary </span >' +
            '                   <span ng-show="sprintForm.estimatedEndDate.$touched && sprint.startDate > sprint.estimatedEndDate" class="text-danger pt-2">* End Date should be greater than Start Date</span >' +
            '               </div> ' +
            '               <label class="m-t-20">Issues To Solve</label>' +
            '               <p>' + issuesToSolve +'</p>'+
            '               <div class="form-group text-right pt-5">' +
            '                   <button class="btn btn-primary" ng-disabled="sprintForm.$invalid || (sprint.startDate > sprint.estimatedEndDate)" ng-click="startSprint()">Start</button> ' +
            '                   <button class="btn btn-danger" data-dismiss="modal" aria-label="Close">Cancel</button> ' +
            '               </div> ' +
            '           </form> ' +
            '       </div>' +
            '   </div>' +
            '</div>' +
            '</div>';
        angular.element(document.body).append($compile(content)($scope));
        $('#sprintDialogue').modal();
    }

    $scope.startSprint = function () {
        var issues = $scope.issuesToSolve.map(s => s.backlogIssueId);
        $backlog.startSprint($scope.sprint, issues)
            .then(function () {
                $('#sprintDialogue').modal('hide');
                $scope.getIssues();
                notify("New Sprint Started!");
            })
    }

    function applyChanges() {
        if ($scope.$root.$$phase != '$apply' && $scope.$root.$$phase != '$digest') {
            $scope.$apply();
        }
    }

    $(function () {
        $('#search-issue').on("keyup", function () {
            var value = $(this).val().toLowerCase();
            $(".issues li").filter(function () {
                $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
            });
        });

    })
});
