import { useState } from 'react';
import ReactAudioPlayer from 'react-audio-player';
import ReactPlayer from 'react-player';
import { pdfjs } from 'react-pdf';

import { decryptFile } from '@/utils/decrypt-file';
import { FileView } from '@/types/file-view';

import { Worker, Viewer, DocumentLoadEvent } from '@react-pdf-viewer/core';

pdfjs.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';

import { Spinner } from './spinner';

type FilePreviewProps = {
  data: FileView | undefined;
}


export const FilePreview = ({ data }: FilePreviewProps) => {
    const { mimetype, url, name } = decryptFile({
        mimetype: data?.file?.mimetype,
        name: data?.file?.name,
        url: data?.file?.url
    })

    const mimetypeFile = mimetype.split('/')[0];

    const [numPages, setNumPages] = useState<number>();
    const [pageNumber, setPageNumber] = useState<number>(1);
  
    function onDocumentLoadSuccess(document: DocumentLoadEvent): void {
        const { doc } = document
        setNumPages(doc.numPages);
    }    

    if (!data) {
        return (
        <div className="flex items-center justify-center h-full">
            <Spinner />
        </div>
        )
    }
  
    const mimetypeFileRender = {
        'image': () => <img src={url} alt="Image preview" className='w-full h-[80vh] object-contain' />,
        'audio': () => <ReactAudioPlayer src={url} controls />,
        'video': () => <ReactPlayer url={url} controls />,
        'application': () => (
            <div style={{ width: '100vw' }} className='flex items-center flex-col justify-center'>
                {numPages && (
                <p className='mb-4'>
                    Page {pageNumber} of {numPages}
                </p>
                )}
                <Worker workerUrl={`https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js`}>
                    <Viewer fileUrl={url} onDocumentLoad={onDocumentLoadSuccess} />
                </Worker>
            </div>
        ),
        'text': () => (
            <iframe
                src={url}
                style={{ width: '100%', height: '500px', border: 'none' }}
                title="Text preview"
            />
        )
    } as { [key: string]: () => JSX.Element }

    const renderPreview = () => {
        return mimetypeFileRender[mimetypeFile] 
            ? (
                <div>
                    <span className='block mb-2 text-lg font-bold text-center'>{name}</span>
                    {mimetypeFileRender[mimetypeFile]()}
                </div>
            )
            : (
                <div>
                    <span className='block mb-2 text-lg font-bold text-center'>
                        Erro ao exibir o arquivo o arquivo {name}
                    </span>
                </div>
            );
        };
    
    return <div>{renderPreview()}</div>;
};
