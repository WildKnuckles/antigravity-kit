"use client";
import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import {
  type Control,
  Controller,
  type FieldValues,
  type Path,
} from "react-hook-form";
import type { File as MyFile } from "@/types";
import { cn } from "@/lib/utils";
import { MAX_FILE_SIZE } from "@/constants";
import { Icon } from "../icon";

interface FileUploadProps<T extends FieldValues> {
  name: Path<T>;
  control?: Control<T>;
  accept?: string[];
  label: string;
  info?: string;
  maxSize?: number;
  onChange?: (file: MyFile) => void;
  value?: MyFile;
  disabled?: boolean;
}

const DropzoneContent = ({
  onChange,
  value,
  error,
  label,
  info,
  maxSize,
  disabled,
}: {
  onChange: (file: MyFile | null) => void;
  value: MyFile | null;
  error?: boolean;
  info?: string;
  label: string;
  maxSize: number;
  disabled?: boolean;
}) => {
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (acceptedFiles.length > 0) {
        const file = acceptedFiles[0];
        if (file.size > maxSize) {
          alert(
            `O arquivo excede o tamanho máximo de ${(
              maxSize /
              1024 /
              1024
            ).toFixed(1)}MB.`
          );
          return;
        }
        const customFile: MyFile = {
          filename: file.name,
          size: file.size,
          type: file.type,
          url: URL.createObjectURL(file),
        };
        onChange(customFile);
      }
    },
    [onChange, maxSize]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".jpg", ".jpeg", ".png", ".svg", ".webp"],
    },
    multiple: false,
    disabled,
  });

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + " bytes";
    else if (bytes < 1048576) return (bytes / 1024).toFixed(1) + " KB";
    else return (bytes / 1048576).toFixed(1) + " MB";
  };

  return (
    <div className="w-full">
      <label className="block text-gray-700 font-medium text-sm mb-2">
        {label}{" "}
        {info && <span className="text-xs text-gray-500 ml-1">({info})</span>}
      </label>

      {!value ? (
        <div
          {...getRootProps()}
          className={cn(
            "border-2 border-dashed rounded-lg transition-all",
            isDragActive
              ? "border-blue-400 bg-blue-50"
              : "border-gray-300 bg-gray-50 hover:bg-gray-100",
            error ? "border-primary-500 bg-primary-50" : "",
            "p-6 flex flex-col items-center justify-center cursor-pointer",
            disabled && "opacity-60 cursor-not-allowed pointer-events-none"
          )}
        >
          <input {...getInputProps()} />
          <div className="flex flex-col items-center gap-4 text-center">
            <div className="p-4 bg-gray-100 rounded-full">
              <Icon name="ImagePlus" className="h-8 w-8 text-gray-500" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-700">
                {isDragActive
                  ? "Solte a imagem aqui..."
                  : "Arraste e solte ou clique para selecionar"}
              </p>
              <p className="text-xs text-gray-500 mt-1">
                Apenas imagens JPG, PNG, SVG ou WebP (máx.{" "}
                {(maxSize / 1024 / 1024).toFixed(1)}MB)
              </p>
            </div>
          </div>
        </div>
      ) : (
        <div className="border rounded-lg overflow-hidden bg-white shadow-sm">
          <div className="relative w-full h-36 bg-gray-100">
            <img
              src={value.url}
              alt={value.filename}
              className="object-contain w-full h-full rounded-full"
            />
            <button
              onClick={(e) => {
                e.stopPropagation();
                onChange(null);
              }}
              className="absolute top-2 right-2 inline-flex items-center justify-center h-8 w-8 rounded-full bg-primary-50 hover:bg-primary-100 text-primary-600 shadow-sm"
            >
              <Icon name="X" className="h-4 w-4" />
            </button>
          </div>

          <div className="p-3 border-t bg-gray-50 flex items-center justify-between">
            <div className="truncate">
              <h4
                className="text-sm font-medium text-gray-800 truncate"
                title={value.filename}
              >
                {value.filename}
              </h4>
              <p className="text-xs text-gray-500">
                {formatFileSize(value.size)} • Imagem
              </p>
            </div>
          </div>
        </div>
      )}

      {error && (
        <div className="mt-2 flex items-center gap-1.5 text-primary-600">
          <Icon name="CircleAlert" className="h-4 w-4" />
          <p className="text-xs">Por favor, selecione uma imagem válida</p>
        </div>
      )}
    </div>
  );
};

export function FileImageUpload<T extends FieldValues>({
  label,
  name,
  info,
  control,
  maxSize = MAX_FILE_SIZE, 
  disabled,
}: FileUploadProps<T>) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <DropzoneContent
          onChange={onChange}
          value={value}
          error={!!error}
          label={label}
          maxSize={maxSize}
          info={info}
          disabled={disabled}
        />
      )}
    />
  );
}
