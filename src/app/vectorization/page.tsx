
'use client';

import React, { useState, useCallback, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Upload, Loader2, Download } from 'lucide-react';
import Image from 'next/image';
import { vectorizeImage } from '@/ai/flows/vectorize-image';
import { LogoSvg } from '@/components/icons';

const ImageBox = ({ children, className }: { children: React.ReactNode, className?: string }) => (
    <div className={`aspect-square w-full rounded-lg border-2 border-dashed border-border flex items-center justify-center text-muted-foreground bg-black/20 relative overflow-hidden ${className}`}>
        {children}
    </div>
);

const VectorizationPage: React.FC = () => {
    const { toast } = useToast();
    const [sourceImage, setSourceImage] = useState<string | null>(null);
    const [sourceFile, setSourceFile] = useState<File | null>(null);
    const [vectorImage, setVectorImage] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = (file: File | null) => {
        if (file && (file.type === 'image/png' || file.type === 'image/jpeg')) {
            const reader = new FileReader();
            reader.onload = (e) => {
                setSourceImage(e.target?.result as string);
                setSourceFile(file);
                setVectorImage(null);
            };
            reader.readAsDataURL(file);
        } else {
            toast({
                title: 'Invalid File Type',
                description: 'Please upload a PNG or JPG image.',
                variant: 'destructive',
            });
        }
    };

    const onDrop = useCallback((event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        event.stopPropagation();
        const file = event.dataTransfer.files?.[0];
        handleFileChange(file);
    }, [toast]);

    const onDragOver = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        event.stopPropagation();
    };
    
    const handleVectorize = async () => {
        if (!sourceImage || !sourceFile) {
            toast({
                title: 'No Image Selected',
                description: 'Please upload an image to vectorize.',
                variant: 'destructive',
            });
            return;
        }

        setIsLoading(true);
        try {
            const result = await vectorizeImage({ imageDataUri: sourceImage });
            setVectorImage(result.svg);
            toast({
                title: 'Vectorization Successful!',
                description: 'Your image has been converted to an SVG.',
            });
        } catch (error) {
            console.error('Vectorization error:', error);
            toast({
                title: 'Vectorization Failed',
                description: 'Could not process the image. Please try again.',
                variant: 'destructive',
            });
        } finally {
            setIsLoading(false);
        }
    };

    const handleDownload = () => {
        if (!vectorImage) return;
        const blob = new Blob([vectorImage], { type: 'image/svg+xml' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${sourceFile?.name.split('.')[0] || 'vectorized'}.svg`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };

    return (
        <div className="container mx-auto p-4 sm:p-6 md:p-8 flex-1 flex flex-col min-h-0">
            <header className="mb-8">
                <h1 className="text-3xl font-bold text-foreground">Vectorization Tool</h1>
                <p className="text-muted-foreground">Transform raster images (JPG, PNG) into scalable vector graphics (SVG).</p>
            </header>

            <div className="flex-1 grid md:grid-cols-2 gap-8 min-h-0">
                <Card
                    className="bg-card/50 flex flex-col p-6 min-h-0"
                    onDrop={onDrop}
                    onDragOver={onDragOver}
                >
                    <CardContent className="flex-1 flex flex-col items-center justify-center p-0">
                        <input
                            type="file"
                            ref={fileInputRef}
                            onChange={(e) => handleFileChange(e.target.files?.[0] || null)}
                            accept="image/png, image/jpeg"
                            className="hidden"
                        />
                        <ImageBox>
                            {sourceImage ? (
                                <Image src={sourceImage} alt="Source" layout="fill" objectFit="contain" />
                            ) : (
                                <div className="text-center">
                                    <Upload className="mx-auto h-12 w-12 text-muted-foreground" />
                                    <p className="mt-2">Drag & drop an image here</p>
                                    <p className="text-xs text-muted-foreground">or</p>
                                    <Button variant="link" onClick={() => fileInputRef.current?.click()}>
                                        Click to upload
                                    </Button>
                                </div>
                            )}
                        </ImageBox>
                    </CardContent>
                </Card>

                <Card className="bg-card/50 flex flex-col p-6 min-h-0">
                    <CardContent className="flex-1 flex flex-col items-center justify-center p-0">
                        <ImageBox>
                            {isLoading && (
                                <div className="text-center">
                                    <Loader2 className="mx-auto h-12 w-12 animate-spin text-primary" />
                                    <p className="mt-4">Vectorizing...</p>
                                </div>
                            )}
                            {!isLoading && vectorImage && (
                                <div className="p-4" dangerouslySetInnerHTML={{ __html: vectorImage }} />
                            )}
                             {!isLoading && !vectorImage && (
                                <div className="text-center">
                                    <LogoSvg className="mx-auto h-12 w-12 text-muted-foreground" />
                                    <p className="mt-2">Vector output will appear here</p>
                                </div>
                            )}
                        </ImageBox>
                    </CardContent>
                </Card>
            </div>

            <div className="mt-8 flex justify-center gap-4">
                <Button
                    size="lg"
                    onClick={handleVectorize}
                    disabled={!sourceImage || isLoading}
                >
                    {isLoading ? (
                        <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Processing
                        </>
                    ) : (
                        'Vectorize Image'
                    )}
                </Button>
                <Button
                    size="lg"
                    variant="secondary"
                    onClick={handleDownload}
                    disabled={!vectorImage || isLoading}
                >
                    <Download className="mr-2 h-4 w-4" />
                    Download SVG
                </Button>
            </div>
        </div>
    );
};

export default VectorizationPage;
