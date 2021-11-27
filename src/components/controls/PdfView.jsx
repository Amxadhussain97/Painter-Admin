import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Typography, makeStyles, IconButton } from '@material-ui/core'
import ConfirmDialog from './ConfirmDialog';
import { Document, Page } from 'react-pdf';
import { pdfjs } from 'react-pdf';
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;
const useStyles = makeStyles(theme => ({
    dialog: {
        padding: theme.spacing(2),
        position: 'absolute',
        top: theme.spacing(5)
    },

}))

export default function PdfView(props) {
    const { confirmPdfdialog, setConfirmPdfdialog } = props;
    const [numPages, setNumPages] = useState(null);
    const [pageNumber, setPageNumber] = useState(1);
    const path = '/.pdf'
    console.log(confirmPdfdialog.pdf)
    const classes = useStyles()

    function onDocumentLoadSuccess({ numPages }) {
        setNumPages(numPages);
    }

    return (
        <div>
            <Dialog open={confirmPdfdialog.isOpen} classes={{ paper: classes.dialog }}>
                <Document
                    file={confirmPdfdialog.pdf}
                    options={{ workerSrc: pdfjs }}
                    onLoadSuccess={onDocumentLoadSuccess}
                >
                    {Array.from(new Array(numPages), (el, index) => (
                        <Page key={`page_${index + 1}`} pageNumber={index + 1} />
                    ))}
                </Document>
            </Dialog>


        </div>
    )
}
