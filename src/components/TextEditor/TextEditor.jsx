import { Editor } from "@tinymce/tinymce-react";

export const TextEditor = ({ content }) => {
   return (
      <Editor
         onInit={(e, editor) => content.current = editor}
         initialValue={content.current ? content.current.getContent() : ''}
         init={{
            height: 450,
            menubar: true,
            plugins: 'link image code media',
            content_style: 'body { font-family: Helvetica,Arial,sans-serif; font-size: 14px }',
            paste_data_images: true,
            file_browser_callback_types: 'image',
            file_picker_callback: function (cb, value, meta) {
               var input = document.createElement("input");
               input.setAttribute("type", "file");
               input.setAttribute("accept", "image/*");
               input.onchange = function () {
                  var file = this.files[0];
   
                  var reader = new FileReader();
                  reader.onload = function () {
                     var id = "blobid" + new Date().getTime();
                     var blobCache = content.current.editorUpload.blobCache;
                     var base64 = reader.result.split(",")[1];
                     var blobInfo = blobCache.create(id, file, base64);
                     blobCache.add(blobInfo);
                     cb(blobInfo.blobUri(), { title: file.name });
                  };
                  reader.readAsDataURL(file);
               };
               input.click();
               },
         }}
         id="content"
      />
   )
}
