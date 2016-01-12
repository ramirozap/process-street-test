(function(){

  'use strict';

  var uploadUrl = 'https://upload.wistia.com/',
      api_password = null;//<-----paste here wistia api password


  var wistiaUploader = angular.module('wistiaUploader',[
    'blueimp.fileupload',
    'ngSanitize'
  ]);

  wistiaUploader.config([
            '$httpProvider', 'fileUploadProvider', '$sceProvider',
            function ($httpProvider, fileUploadProvider, $sceProvider) {
                $sceProvider.enabled(false);
                delete $httpProvider.defaults.headers.common['X-Requested-With'];
                fileUploadProvider.defaults.redirect = window.location.href.replace(
                     /\/[^\/]*$/,
                     '/cors/result.html?%s'
                 );
            }
        ]);

  wistiaUploader.directive("videoUploader",function(){
    return {
      restrict: "E",
      templateUrl: "templates/uploader.html",
      controller: VideoUploaderOptions,
      link: VideoUploaderController
    };
  });

  function VideoUploaderOptions($scope){
    $scope.options = {
      url: uploadUrl,
      formData: {api_password: api_password},
      autoUpload: true,
      maxNumberOfFiles: 0
    }
  }

  function VideoUploaderController($scope){
      $scope.buildUrl = function(id){
                    var url = "http://fast.wistia.net/embed/iframe/" + id;
                    var trustedHtml = "<iframe src=\"" + url + "\" allowtransparency=\"true\" frameborder=\"0\" scrolling=\"no\" class=\"wistia_embed\" name=\"wistia_embed\" width=\"640\" height=\"360\"></iframe>";
                    return trustedHtml;
                  };
  }
})();
