import i18n from 'i18next';

import actions from 'actions';
import { workerTypes } from 'constants/types';
import core from 'core';

export default (dispatch, isEmbedPrintSupported) => {
  if (!core.getDocument()) {
    return;
  }

  const documentType = core.getDocument().getType();
  const bbURLPromise = core.getPrintablePDF();

  if (bbURLPromise) {
    const printPage = window.open('', '_blank');
    printPage.document.write(i18n.t('message.preparingToPrint'));
    bbURLPromise.then(result => {
      printPage.location.href = result.url;
    });
  } else if (isEmbedPrintSupported && documentType === workerTypes.PDF) {
    dispatch(actions.openElement('loadingModal'));
    printPdf().then(() => {
      dispatch(actions.closeElement('loadingModal'));
    });
  } else {
    dispatch(actions.openElement('printModal'));
  }
};

const printPdf = () =>
  core.exportAnnotations().then(xfdfString => {
    const printDocument = true;
    return core
      .getDocument()
      .getFileData({ xfdfString, printDocument })
      .then(data => {
        const arr = new Uint8Array(data);
        const blob = new Blob([arr], { type: 'application/pdf' });

        const printHandler = document.getElementById('print-handler');
        printHandler.src = URL.createObjectURL(blob);

        return new Promise(resolve => {
          const loadListener = function() {
            printHandler.contentWindow.print();
            printHandler.removeEventListener('load', loadListener);

            resolve();
          };

          printHandler.addEventListener('load', loadListener);
        });
      });
  });
