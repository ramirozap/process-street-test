(function(){

  'use strict';

  var uploadUrl = 'https://upload.wistia.com/',
      api_password = null;//<-----paste here wistia api password


  var wistiaUploader = angular.module('wistiaUploader',[
    'blueimp.fileupload',
    'ngSanitize'
  ]);

  wistiaUploader.config([
            '$httpProvider', 'fileUploadProvider',
            function ($httpProvider, fileUploadProvider, $sceProvider) {
                delete $httpProvider.defaults.headers.common['X-Requested-With'];
                fileUploadProvider.defaults.redirect = window.location.href.replace(
                     /\/[^\/]*$/,
                     '/cors/result.html?%s'
                 );
            }
        ]);

  wistiaUploader.directive("videoUploader",["$http", "$interval", "$sce", function($http, $interval, $sce){
    return {
      restrict: "E",
      templateUrl: "templates/uploader.html",
      controller: VideoUploaderOptions,
      link: function($scope){
          $scope.buildUrl = function(id){
            $scope.interval = $interval(function(){
              $http({
              method: 'GET',
              url: 'https://api.wistia.com/v1/medias/' + id + '.json',
              params:{
                api_password: api_password
              }
            })
            .then(function successCallback(response) {

              if (response.data.status === "ready") {
                $scope.message = "";
                $interval.cancel($scope.interval);
                $scope.embedCode = $sce.trustAsHtml(response.data.embedCode);
              }
            }, function errorCallback(response) {
              $interval.cancel($scope.interval);
            })},3000);
          };
      }
    };
  }]);

  function VideoUploaderOptions($scope){
    $scope.message = "The video is being processed on Wistia's servers, please do not reload the page";
    $scope.options = {
      url: uploadUrl,
      formData: {api_password: api_password},
      autoUpload: true,
      maxNumberOfFiles: 0
    }
  }
})();
