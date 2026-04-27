"use client";

import { useState, useRef } from "react";
import { useUploadStore } from "@/store/use-upload-store";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Camera, Link as LinkIcon, Upload, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function UploadSection() {
  const { file, previewUrl, urlInput, setFile, setUrlInput, reset } = useUploadStore();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [activeTab, setActiveTab] = useState("upload");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) setFile(selectedFile);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const droppedFile = e.dataTransfer.files?.[0];
    if (droppedFile) setFile(droppedFile);
  };

  return (
    <Card className="w-full max-w-2xl mx-auto overflow-hidden border-2 border-dashed border-muted-foreground/20 bg-card/50 backdrop-blur-sm">
      <CardContent className="p-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="upload" className="flex items-center gap-2">
              <Upload className="w-4 h-4" /> Upload Label
            </TabsTrigger>
            <TabsTrigger value="url" className="flex items-center gap-2">
              <LinkIcon className="w-4 h-4" /> Product URL
            </TabsTrigger>
          </TabsList>

          <AnimatePresence mode="wait">
            <TabsContent key="upload" value="upload">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-4"
              >
                {!previewUrl ? (
                  <div
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={handleDrop}
                    onClick={() => fileInputRef.current?.click()}
                    className="flex flex-col items-center justify-center p-12 transition-all border-2 border-dashed rounded-xl border-muted-foreground/20 hover:border-primary/50 hover:bg-primary/5 cursor-pointer group"
                  >
                    <div className="p-4 mb-4 rounded-full bg-primary/10 group-hover:bg-primary/20 transition-colors">
                      <Camera className="w-8 h-8 text-primary" />
                    </div>
                    <p className="text-lg font-medium text-foreground">Click or drag photo here</p>
                    <p className="text-sm text-muted-foreground mt-1">Nutrition label from your pantry</p>
                    <input
                      type="file"
                      ref={fileInputRef}
                      onChange={handleFileChange}
                      accept="image/*"
                      className="hidden"
                    />
                  </div>
                ) : (
                  <div className="relative rounded-xl overflow-hidden aspect-video bg-muted">
                    <img
                      src={previewUrl}
                      alt="Label preview"
                      className="w-full h-full object-contain"
                    />
                    <Button
                      size="icon"
                      variant="destructive"
                      className="absolute top-2 right-2 rounded-full"
                      onClick={(e) => {
                        e.stopPropagation();
                        reset();
                      }}
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                )}
              </motion.div>
            </TabsContent>

            <TabsContent key="url" value="url">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-4"
              >
                <div className="space-y-2">
                  <p className="text-sm font-medium text-muted-foreground">Paste link to grocery item</p>
                  <Input
                    placeholder="https://www.example.com/product/..."
                    value={urlInput}
                    onChange={(e) => setUrlInput(e.target.value)}
                    className="h-12 text-base"
                  />
                </div>
                <div className="p-6 rounded-xl bg-blue-500/5 border border-blue-500/10">
                  <p className="text-xs text-info flex items-center gap-2">
                    <LinkIcon className="w-3 h-3" /> We'll fetch and analyze the ingredients for you.
                  </p>
                </div>
              </motion.div>
            </TabsContent>
          </AnimatePresence>
        </Tabs>
      </CardContent>
    </Card>
  );
}
