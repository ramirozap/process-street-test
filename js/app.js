(function(){
  var wistiaUploader = angular.module('wistiaUploader',[
    'blueimp.fileupload',
    'ngSanitize'
  ]);

  wistiaUploader.directive("videoUploader",function(){
    return {
      restrict: "E",
      templateUrl: "templates/uploader.html"
    };
  });
})();
