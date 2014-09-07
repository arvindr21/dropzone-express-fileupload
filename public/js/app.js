Dropzone.options.myDropzone = {
  init: function() {
    var self = this;
    // config
    self.options.addRemoveLinks = true;
    self.options.dictRemoveFile = "Delete";

    // load already saved files
    $.get('/upload', function(data) {
      var files = JSON.parse(data).files;
      for (var i = 0; i < files.length; i++) {

        var mockFile = {
          name: files[i].name,
          size: files[i].size,
          type: 'image/jpeg'
        };

        self.options.addedfile.call(self, mockFile);
        self.options.thumbnail.call(self, mockFile, files[i].url);

      };

    });

    // bind events

    //New file added
    self.on("addedfile", function(file) {
      console.log('new file added ', file);
    });

    // Send file starts
    self.on("sending", function(file) {
      console.log('upload started', file);
      $('.meter').show();
    });

    // File upload Progress
    self.on("totaluploadprogress", function(progress) {
      console.log("progress ", progress);
      $('.roller').width(progress + '%');
    });

    self.on("queuecomplete", function(progress) {
      $('.meter').delay(999).slideUp(999);
    });

    // On removing file
    self.on("removedfile", function(file) {
      console.log(file);
      $.ajax({
        url: '/uploaded/files/' + file.name,
        type: 'DELETE',
        success: function(result) {
          console.log(result);
        }
      });
    });

  }
};
