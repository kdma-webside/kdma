'use client';

import React, { useState } from 'react';
import { Upload, FileText, X } from 'lucide-react';
import { createDocument } from '../app/actions/document';

interface DocumentUploadFormProps {
    onSuccess: () => void;
}

const CATEGORIES = [
    { value: 'REGISTRATION', label: 'Registration & Forms' },
    { value: 'LETTERPAD', label: 'Official Letterpad' },
    { value: 'RULES', label: 'Rules & Regulations' },
    { value: 'CERTIFICATES', label: 'Certificates & Achievements' },
    { value: 'GENERAL', label: 'General Documents' },
];

const DocumentUploadForm: React.FC<DocumentUploadFormProps> = ({ onSuccess }) => {
    const [isUploading, setIsUploading] = useState(false);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('REGISTRATION');
    const [file, setFile] = useState<File | null>(null);
    const [error, setError] = useState('');
    const [dragActive, setDragActive] = useState(false);

    const handleDrag = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === 'dragenter' || e.type === 'dragover') {
            setDragActive(true);
        } else if (e.type === 'dragleave') {
            setDragActive(false);
        }
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);

        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            setFile(e.dataTransfer.files[0]);
            setError('');
        }
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setFile(e.target.files[0]);
            setError('');
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        if (!title || !file) {
            setError('Title and file are required');
            return;
        }

        setIsUploading(true);

        try {
            // Upload file
            const formData = new FormData();
            formData.append('file', file);
            formData.append('category', category);

            const uploadResponse = await fetch('/api/documents/upload', {
                method: 'POST',
                body: formData,
            });

            if (!uploadResponse.ok) {
                const errorData = await uploadResponse.json();
                throw new Error(errorData.error || 'Upload failed');
            }

            const uploadData = await uploadResponse.json();

            // Create document record
            await createDocument({
                title,
                description: description || undefined,
                fileName: uploadData.fileName,
                filePath: uploadData.filePath,
                category,
                fileSize: uploadData.fileSize,
                fileType: uploadData.fileType,
            });

            // Reset form
            setTitle('');
            setDescription('');
            setCategory('REGISTRATION');
            setFile(null);
            onSuccess();
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Upload failed');
        } finally {
            setIsUploading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            {/* Title Input */}
            <div>
                <label className="block text-sm font-bold text-gray-400 uppercase tracking-wider mb-2">
                    Document Title *
                </label>
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 text-white px-4 py-3 rounded-xl focus:outline-none focus:border-orange-600 transition-colors"
                    placeholder="e.g., Registration Form 2024"
                    disabled={isUploading}
                />
            </div>

            {/* Description Input */}
            <div>
                <label className="block text-sm font-bold text-gray-400 uppercase tracking-wider mb-2">
                    Description
                </label>
                <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 text-white px-4 py-3 rounded-xl focus:outline-none focus:border-orange-600 transition-colors resize-none"
                    placeholder="Brief description of the document..."
                    rows={3}
                    disabled={isUploading}
                />
            </div>

            {/* Category Select */}
            <div>
                <label className="block text-sm font-bold text-gray-400 uppercase tracking-wider mb-2">
                    Category *
                </label>
                <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 text-white px-4 py-3 rounded-xl focus:outline-none focus:border-orange-600 transition-colors"
                    disabled={isUploading}
                >
                    {CATEGORIES.map((cat) => (
                        <option key={cat.value} value={cat.value} className="bg-black">
                            {cat.label}
                        </option>
                    ))}
                </select>
            </div>

            {/* File Upload */}
            <div>
                <label className="block text-sm font-bold text-gray-400 uppercase tracking-wider mb-2">
                    File *
                </label>
                <div
                    className={`relative border-2 border-dashed rounded-2xl p-8 text-center transition-all ${dragActive
                        ? 'border-orange-600 bg-orange-600/10'
                        : 'border-white/10 hover:border-white/20'
                        }`}
                    onDragEnter={handleDrag}
                    onDragLeave={handleDrag}
                    onDragOver={handleDrag}
                    onDrop={handleDrop}
                >
                    <input
                        type="file"
                        onChange={handleFileChange}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                        accept=".pdf,.doc,.docx,.png,.jpg,.jpeg"
                        disabled={isUploading}
                    />
                    {file ? (
                        <div className="flex items-center justify-center gap-4">
                            <FileText className="text-orange-500" size={32} />
                            <div className="text-left">
                                <p className="text-white font-bold">{file.name}</p>
                                <p className="text-gray-500 text-sm">
                                    {(file.size / 1024 / 1024).toFixed(2)} MB
                                </p>
                            </div>
                            <button
                                type="button"
                                onClick={() => setFile(null)}
                                className="ml-auto p-2 hover:bg-white/10 rounded-lg transition-colors"
                            >
                                <X size={20} className="text-gray-400" />
                            </button>
                        </div>
                    ) : (
                        <div className="space-y-3">
                            <Upload className="mx-auto text-gray-600" size={40} />
                            <div>
                                <p className="text-white font-bold">Drop file here or click to browse</p>
                                <p className="text-gray-500 text-sm mt-1">
                                    PDF, DOC, DOCX, PNG, JPG (max 10MB)
                                </p>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Error Message */}
            {error && (
                <div className="bg-red-500/10 border border-red-500/20 text-red-500 px-4 py-3 rounded-xl text-sm">
                    {error}
                </div>
            )}

            {/* Submit Button */}
            <button
                type="submit"
                disabled={isUploading || !title || !file}
                className="w-full bg-orange-600 hover:bg-orange-700 active:bg-orange-800 disabled:bg-gray-800 disabled:text-gray-600 text-white px-8 py-4 rounded-xl font-black text-sm uppercase tracking-widest transition-all duration-300 active:scale-95 disabled:scale-100"
            >
                {isUploading ? 'Uploading...' : 'Upload Document'}
            </button>
        </form>
    );
};

export default DocumentUploadForm;
