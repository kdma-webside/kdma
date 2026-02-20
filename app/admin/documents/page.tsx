'use client';

import React, { useState, useEffect } from 'react';
import AdminLayout from '@/components/AdminLayout';
import DocumentUploadForm from '../../../components/DocumentUploadForm';
import { getAllDocuments, deleteDocument, getDocumentStats } from '../../actions/document';
import { FileText, Trash2, Download, Plus, X } from 'lucide-react';

interface Document {
    id: string;
    title: string;
    description: string | null;
    fileName: string;
    filePath: string;
    category: string;
    fileSize: number;
    fileType: string;
    isPublic: boolean;
    createdAt: Date;
    updatedAt: Date;
}

const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i];
};

const formatDate = (date: Date): string => {
    return new Date(date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
    });
};

const DocumentsAdminPage = () => {
    const [documents, setDocuments] = useState<Document[]>([]);
    const [stats, setStats] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [showUploadForm, setShowUploadForm] = useState(false);
    const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

    const loadDocuments = async () => {
        setIsLoading(true);
        try {
            const [docs, statistics] = await Promise.all([
                getAllDocuments(),
                getDocumentStats(),
            ]);
            setDocuments(docs);
            setStats(statistics);
        } catch (error) {
            console.error('Error loading documents:', error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        loadDocuments();
    }, []);

    const handleDelete = async (id: string) => {
        try {
            await deleteDocument(id);
            setDeleteConfirm(null);
            loadDocuments();
        } catch (error) {
            console.error('Error deleting document:', error);
            alert('Failed to delete document');
        }
    };

    return (
        <AdminLayout>
            <div className="max-w-7xl mx-auto space-y-8 pb-12">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div>
                        <h2 className="text-white text-4xl font-black uppercase tracking-tighter leading-none">
                            Document <span className="text-orange-600">Management</span>
                        </h2>
                        <p className="text-gray-500 text-sm mt-2">
                            Upload and manage publicly accessible documents
                        </p>
                    </div>
                    <button
                        onClick={() => setShowUploadForm(!showUploadForm)}
                        className="flex items-center gap-2 bg-orange-600 hover:bg-orange-700 active:bg-orange-800 text-white px-6 py-3 rounded-xl font-black text-xs uppercase tracking-widest transition-all duration-300 active:scale-95"
                    >
                        {showUploadForm ? (
                            <>
                                <X size={16} />
                                Cancel
                            </>
                        ) : (
                            <>
                                <Plus size={16} />
                                Upload Document
                            </>
                        )}
                    </button>
                </div>

                {/* Stats Cards */}
                {stats && (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="bg-[#080808] border border-white/5 rounded-2xl p-6">
                            <div className="flex items-center gap-4">
                                <div className="p-3 rounded-xl bg-orange-600/10 text-orange-500">
                                    <FileText size={24} />
                                </div>
                                <div>
                                    <p className="text-gray-500 text-xs font-bold uppercase tracking-wider">
                                        Total Documents
                                    </p>
                                    <p className="text-white text-2xl font-black">
                                        {stats.totalDocuments}
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="bg-[#080808] border border-white/5 rounded-2xl p-6">
                            <div className="flex items-center gap-4">
                                <div className="p-3 rounded-xl bg-green-600/10 text-green-500">
                                    <FileText size={24} />
                                </div>
                                <div>
                                    <p className="text-gray-500 text-xs font-bold uppercase tracking-wider">
                                        Public Documents
                                    </p>
                                    <p className="text-white text-2xl font-black">
                                        {stats.publicDocuments}
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="bg-[#080808] border border-white/5 rounded-2xl p-6">
                            <div className="flex items-center gap-4">
                                <div className="p-3 rounded-xl bg-blue-600/10 text-blue-500">
                                    <FileText size={24} />
                                </div>
                                <div>
                                    <p className="text-gray-500 text-xs font-bold uppercase tracking-wider">
                                        Total Storage
                                    </p>
                                    <p className="text-white text-2xl font-black">
                                        {formatFileSize(stats.totalSize)}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Upload Form */}
                {showUploadForm && (
                    <div className="bg-[#080808] border border-white/5 rounded-3xl p-8">
                        <h3 className="text-white text-xl font-black uppercase tracking-tight mb-6">
                            Upload New Document
                        </h3>
                        <DocumentUploadForm
                            onSuccess={() => {
                                setShowUploadForm(false);
                                loadDocuments();
                            }}
                        />
                    </div>
                )}

                {/* Documents Table */}
                <div className="bg-[#080808] border border-white/5 rounded-3xl overflow-hidden">
                    <div className="p-8">
                        <h3 className="text-white text-xl font-black uppercase tracking-tight mb-6">
                            All Documents ({documents.length})
                        </h3>
                    </div>

                    {isLoading ? (
                        <div className="p-8 text-center text-gray-500">Loading...</div>
                    ) : documents.length === 0 ? (
                        <div className="p-8 text-center text-gray-500">
                            No documents uploaded yet
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead className="bg-white/5">
                                    <tr>
                                        <th className="px-8 py-4 text-left text-xs font-black text-gray-400 uppercase tracking-wider">
                                            Title
                                        </th>
                                        <th className="px-8 py-4 text-left text-xs font-black text-gray-400 uppercase tracking-wider">
                                            Category
                                        </th>
                                        <th className="px-8 py-4 text-left text-xs font-black text-gray-400 uppercase tracking-wider">
                                            File Size
                                        </th>
                                        <th className="px-8 py-4 text-left text-xs font-black text-gray-400 uppercase tracking-wider">
                                            Uploaded
                                        </th>
                                        <th className="px-8 py-4 text-left text-xs font-black text-gray-400 uppercase tracking-wider">
                                            Actions
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-white/5">
                                    {documents.map((doc) => (
                                        <tr
                                            key={doc.id}
                                            className="hover:bg-white/5 transition-colors"
                                        >
                                            <td className="px-8 py-6">
                                                <div className="flex items-center gap-4">
                                                    <FileText size={20} className="text-orange-500" />
                                                    <div>
                                                        <p className="text-white font-bold text-sm">
                                                            {doc.title}
                                                        </p>
                                                        {doc.description && (
                                                            <p className="text-gray-500 text-xs mt-1 line-clamp-1">
                                                                {doc.description}
                                                            </p>
                                                        )}
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-8 py-6">
                                                <span className="inline-flex px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-bold text-gray-400 uppercase tracking-wider">
                                                    {doc.category}
                                                </span>
                                            </td>
                                            <td className="px-8 py-6">
                                                <span className="text-gray-400 text-sm">
                                                    {formatFileSize(doc.fileSize)}
                                                </span>
                                            </td>
                                            <td className="px-8 py-6">
                                                <span className="text-gray-400 text-sm">
                                                    {formatDate(doc.createdAt)}
                                                </span>
                                            </td>
                                            <td className="px-8 py-6">
                                                <div className="flex items-center gap-2">
                                                    <a
                                                        href={doc.filePath.startsWith('http') ? doc.filePath : `/${doc.filePath}`}
                                                        download={doc.fileName}
                                                        className="p-2 hover:bg-white/10 rounded-lg transition-colors group"
                                                        title="Download"
                                                    >
                                                        <Download
                                                            size={16}
                                                            className="text-gray-400 group-hover:text-blue-500"
                                                        />
                                                    </a>
                                                    <button
                                                        onClick={() => setDeleteConfirm(doc.id)}
                                                        className="p-2 hover:bg-white/10 rounded-lg transition-colors group"
                                                        title="Delete"
                                                    >
                                                        <Trash2
                                                            size={16}
                                                            className="text-gray-400 group-hover:text-red-500"
                                                        />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>

                {/* Delete Confirmation Modal */}
                {deleteConfirm && (
                    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
                        <div className="bg-[#080808] border border-white/10 rounded-3xl p-8 max-w-md w-full">
                            <h3 className="text-white text-xl font-black uppercase tracking-tight mb-4">
                                Confirm Delete
                            </h3>
                            <p className="text-gray-400 mb-6">
                                Are you sure you want to delete this document? This action cannot
                                be undone.
                            </p>
                            <div className="flex gap-4">
                                <button
                                    onClick={() => setDeleteConfirm(null)}
                                    className="flex-1 bg-white/5 hover:bg-white/10 text-white px-6 py-3 rounded-xl font-bold text-sm uppercase tracking-wider transition-all"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={() => handleDelete(deleteConfirm)}
                                    className="flex-1 bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-xl font-bold text-sm uppercase tracking-wider transition-all"
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </AdminLayout>
    );
};

export default DocumentsAdminPage;
