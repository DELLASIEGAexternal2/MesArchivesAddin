function openArchiveDialog(event) {

  Office.context.ui.displayDialogAsync(
    "https://dellasiegaexternal2.github.io/MesArchives_Web_Addin/ui/archive.html",
    { height: 70, width: 40 }
  );

  event.completed();
}

Office.actions.associate("openArchiveDialog", openArchiveDialog);
