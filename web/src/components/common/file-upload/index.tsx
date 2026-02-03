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
import Link from "next/link";
import { cn } from "@/lib/utils";
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
            `O arquivo excede o tamanho Máximo de ${(
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
      "application/pdf": [".pdf"],
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
              <Icon name="CloudUpload" className="h-8 w-8 text-gray-500" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-700">
                {isDragActive
                  ? "Solte o arquivo aqui..."
                  : "Arraste e solte ou clique para selecionar"}
              </p>
              <p className="text-xs text-gray-500 mt-1">
                Apenas arquivos PDF (máx. {(maxSize / 1024 / 1024).toFixed(1)}
                MB)
              </p>
            </div>
          </div>
        </div>
      ) : (
        <div className="border rounded-lg overflow-hidden bg-white shadow-sm">
          <div className="p-4 flex items-center gap-4 border-b bg-gray-50">
            <div className="p-3 bg-primary-100 rounded-lg">
              <Icon name="FileText" className="h-6 w-6 text-primary-600" />
            </div>
            <div className="flex-1 min-w-0">
              <h4
                className="text-sm font-medium text-gray-800 truncate"
                title={value.filename}
              >
                {value.filename}
              </h4>
              <p className="text-xs text-gray-500 mt-1">
                {formatFileSize(value.size)} • PDF
              </p>
            </div>
          </div>

          <div className="p-4 flex flex-wrap gap-2 justify-end bg-white">
            <Link
              href={value.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm font-medium rounded-md transition-colors"
            >
              <Icon name="Eye" className="h-4 w-4" />
              <span>Visualizar</span>
            </Link>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onChange(null);
              }}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-primary-50 hover:bg-primary-100 text-primary-600 text-sm font-medium rounded-md transition-colors"
            >
              <Icon name="X" className="h-4 w-4" />
              <span>Remover</span>
            </button>
          </div>
        </div>
      )}

      {error && (
        <div className="mt-2 flex items-center gap-1.5 text-primary-600">
          <Icon name="CircleAlert" className="h-4 w-4" />
          <p className="text-xs">Por favor, selecione um arquivo PDF válido</p>
        </div>
      )}
    </div>
  );
};

export function FileUpload<T extends FieldValues>({
  label,
  name,
  info,
  control,
  maxSize = 1024 * 1024 * 2,
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
