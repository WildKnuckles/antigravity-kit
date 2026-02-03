import type { AxiosResponse } from "axios";

export function triggerBrowserDownload(
  response: AxiosResponse<Blob>,
  filename: string
) {
  const blob = new Blob([response.data], {
    type: response.headers["content-type"],
  });

  const url = window.URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;
  link.download = filename;

  document.body.appendChild(link);
  link.click();

  link.remove();
  window.URL.revokeObjectURL(url);
}


/* import { AxiosResponse } from "axios";

export function triggerBrowserDownload(
  response: AxiosResponse<Blob>,
  fallbackFileName = "download"
) {
  const contentDisposition = response.headers["content-disposition"];

  const fileName =
    contentDisposition
      ?.split("filename=")[1]
      ?.replace(/"/g, "") || fallbackFileName;

  const blob = new Blob([response.data], {
    type: response.headers["content-type"],
  });

  const url = window.URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;
  link.download = fileName;

  document.body.appendChild(link);
  link.click();

  link.remove();
  window.URL.revokeObjectURL(url);
} */



/* import axios, { AxiosRequestConfig } from "axios";

type DownloadFileParams = {
  url: string;
  fileName?: string;
  config?: AxiosRequestConfig;
};

export async function downloadFile({
  url,
  fileName = "download",
  config = {},
}: DownloadFileParams): Promise<void> {
  const response = await axios.get(url, {
    responseType: "blob",
    headers: {
      ...config.headers,
    },
    ...config,
  });

  const contentDisposition = response.headers["content-disposition"];
  const fileNameFromHeader = contentDisposition
    ?.split("filename=")[1]
    ?.replace(/"/g, "");

  const finalFileName = fileNameFromHeader || fileName;

  const blob = new Blob([response.data], {
    type: response.headers["content-type"],
  });

  const blobUrl = window.URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = blobUrl;
  link.download = finalFileName;

  document.body.appendChild(link);
  link.click();

  link.remove();
  window.URL.revokeObjectURL(blobUrl);
}
 */