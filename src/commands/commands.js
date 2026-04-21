function openArchiveDialog(event) {

  Office.context.ui.displayDialogAsync(
    "https://dellasiegaexternal2.github.io/MesArchivesAddin/archive/archive.html",
    {
      height: 70,
      width: 40,
      displayInIframe: true
    }
  );

  event.completed();
}

Office.actions.associate("openArchiveDialog", openArchiveDialog);
