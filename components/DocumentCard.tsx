'use client';

import React, { useState } from 'react';
import { FileText, Download, File, FileImage } from 'lucide-react';

interface DocumentCardProps {
    document: {
        id: string;
        title: string;
        description: string | null;
        fileName: string;
        filePath: string;
        category: string;
        fileSize: number;
        fileType: string;
    };
}

const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
};

const getFileIcon = (fileType: string) => {
    if (fileType.includes('pdf')) return FileText;
    if (fileType.includes('image')) return FileImage;
    return File;
};

const DocumentCard: React.FC<DocumentCardProps> = ({ document }) => {
    const [showPreview, setShowPreview] = useState(false);
    const Icon = getFileIcon(document.fileType);
    const fileExtension = document.fileName.split('.').pop()?.toUpperCase() || 'FILE';
    const isImage = document.fileType.includes('image');

    return (
        <>
            <div
                className="group bg-[#080808] border border-white/5 rounded-[32px] p-8 hover:border-orange-600/30 transition-all duration-300 hover:shadow-[0_0_40px_rgba(251,146,60,0.1)] cursor-pointer relative"
                onMouseEnter={() => setShowPreview(true)}
                onMouseLeave={() => setShowPreview(false)}
            >
                {/* Icon and Badge */}
                <div className="flex items-start justify-between mb-6">
                    <div className="p-4 rounded-2xl bg-orange-600/10 text-orange-500">
                        <Icon size={32} />
                    </div>
                    <div className="px-3 py-1.5 rounded-full bg-white/5 border border-white/10">
                        <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
                            {fileExtension}
                        </span>
                    </div>
                </div>

                {/* Content */}
                <div className="space-y-3 mb-6">
                    <h3 className="text-white text-xl font-black uppercase tracking-tight leading-tight group-hover:text-orange-500 transition-colors">
                        {document.title}
                    </h3>
                    {document.description && (
                        <p className="text-gray-500 text-sm leading-relaxed line-clamp-2">
                            {document.description}
                        </p>
                    )}
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between pt-4 border-t border-white/5">
                    <span className="text-[10px] text-gray-600 font-bold uppercase tracking-wider">
                        {formatFileSize(document.fileSize)}
                    </span>
                    <a
                        href={document.filePath.startsWith('http') ? document.filePath : `/${document.filePath}`}
                        download={document.fileName}
                        className="flex items-center gap-2 bg-orange-600 hover:bg-orange-700 active:bg-orange-800 text-white px-6 py-3 rounded-xl font-black text-xs uppercase tracking-widest transition-all duration-300 active:scale-95"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <Download size={14} />
                        Download
                    </a>
                </div>
            </div>

            {/* Hover Preview */}
            {showPreview && (
                <div
                    className="fixed inset-0 z-[9999] flex items-center justify-center p-8 pointer-events-none"
                >
                    <div
                        className="bg-black/98 backdrop-blur-3xl border border-orange-600/30 rounded-3xl p-6 md:p-8 max-w-5xl w-full max-h-[90vh] shadow-[0_0_80px_rgba(251,146,60,0.25)] animate-in fade-in zoom-in-95 duration-200 pointer-events-auto overflow-hidden flex flex-col"
                        onMouseEnter={() => setShowPreview(true)}
                        onMouseLeave={() => setShowPreview(false)}
                    >
                        {/* Header Info */}
                        <div className="flex items-center justify-between mb-6 shrink-0">
                            <div className="flex items-center gap-4">
                                <div className="p-3 rounded-xl bg-orange-600/10 text-orange-500">
                                    <Icon size={24} />
                                </div>
                                <div>
                                    <h3 className="text-white text-xl font-black uppercase tracking-tight">
                                        {document.title}
                                    </h3>
                                    <p className="text-gray-500 text-xs uppercase tracking-wider">
                                        {fileExtension} • {formatFileSize(document.fileSize)}
                                    </p>
                                </div>
                            </div>
                            <div className="text-[10px] text-gray-500 uppercase tracking-widest hidden md:block">
                                Hover away to close
                            </div>
                        </div>

                        {/* Preview Area */}
                        <div className="relative flex-grow rounded-2xl overflow-hidden border border-white/10 bg-white/5 min-h-[500px]">
                            {isImage ? (
                                <img
                                    src={document.filePath.startsWith('http') ? document.filePath : `/${document.filePath}`}
                                    alt={document.title}
                                    className="w-full h-full object-contain"
                                />
                            ) : document.fileType === 'application/pdf' ? (
                                <object
                                    data={`${document.filePath.startsWith('http') ? document.filePath : `/${document.filePath}`}#view=FitH&toolbar=0&navpanes=0&scrollbar=0`}
                                    type="application/pdf"
                                    className="absolute inset-0 w-full h-full border-none bg-white"
                                >
                                    <iframe
                                        src={`${document.filePath.startsWith('http') ? document.filePath : `/${document.filePath}`}#view=FitH&toolbar=0&navpanes=0&scrollbar=0`}
                                        className="w-full h-full border-none bg-white"
                                        title={document.title}
                                    />
                                </object>
                            ) : (
                                <div className="w-full h-full flex flex-col items-center justify-center p-12 text-center">
                                    <Icon size={64} className="text-gray-700 mb-6" />
                                    <p className="text-gray-400 font-medium">Preview not available for this file type</p>
                                    <p className="text-gray-600 text-sm mt-2">Download to view the full document</p>
                                </div>
                            )}
                        </div>

                        {/* Description */}
                        {document.description && (
                            <div className="mt-6 pt-6 border-t border-white/5 shrink-0">
                                <p className="text-gray-400 text-sm leading-relaxed truncate md:line-clamp-2">
                                    {document.description}
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </>
    );
};

export default DocumentCard;

