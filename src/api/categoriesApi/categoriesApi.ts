import {axiosInstance} from "src/api";import {	TAddCategoryRequest,	TCategoriesResponse,	TCategoryResponse, TEditCategoryRequest} from "src/features/categories/Categories.types";export const categoriesApi = {	fetchCategories: (withQuestions?: boolean) => axiosInstance.get<TCategoriesResponse>(`/categories?withQuestions=${withQuestions}`),	fetchOneCategory: (id: number) => axiosInstance.get<TCategoryResponse>(`/categories/${id}`),	createCategory: (data: TAddCategoryRequest) => axiosInstance.post<TCategoryResponse>(`/categories`, data),	editCategory: ({id, name}: TEditCategoryRequest) => axiosInstance.put<TCategoryResponse>(`/categories/${id}`, {name}),	deleteCategory: (id: number) => axiosInstance.delete<TCategoryResponse>(`/categories/${id}`),}