import { serialize } from "object-to-formdata";

import API_CONFIG from "config/api";
import request from "helpers/request";

import { MediaCriteria, MediaFile } from "../../../types/media";

export const get = (params: MediaCriteria) =>
  request<Response>({
    baseURL: API_CONFIG.services.mediaManagement.host,
    method: "GET",
    params,
    url: API_CONFIG.services.mediaManagement.endpoints.media,
  });

export const add = (data: MediaFile[]) => {
  const formData = serialize({ data }, { indices: true });

  return request<MediaFile[]>({
    baseURL: API_CONFIG.services.mediaManagement.host,
    data: formData,
    headers: { "Content-Type": "multipart/form-data" },
    method: "POST",
    url: API_CONFIG.services.mediaManagement.endpoints.media,
  });
};

export const update = (id: string, data: MediaFile) =>
  request<MediaFile[]>({
    baseURL: API_CONFIG.services.mediaManagement.host,
    data,
    method: "PUT",
    url: `${API_CONFIG.services.mediaManagement.endpoints.media}/${id}`,
  });

export const remove = (id: string) =>
  request<MediaFile[]>({
    baseURL: API_CONFIG.services.mediaManagement.host,
    method: "DELETE",
    url: `${API_CONFIG.services.mediaManagement.endpoints.media}/${id}`,
  });
