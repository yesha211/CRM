import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import {
    apiDelete,
    apiGet,
    apigetTemplateFile,
    apilistTemplates,
    apilistTemplatesALL,
    apiCreate,
    apisetTemplateInActive,
    apiUpdate,
    apiupdateStatus,
    apiupdatebInActive,
    apiupdateTemplateID,
} from '@/services/Master/apiMAction_Template'

import { Delete_Req } from '@/@types/interfaces/Master/MAction_Template/DeleteInterface'
import {
    Get_Req,
    Get_Res,
} from '@/@types/interfaces/Master/MAction_Template/GetInterface'
import {
    getTemplateFile_Req,
    getTemplateFile_Res,
} from '@/@types/interfaces/Master/MAction_Template/getTemplateFileInterface'
import { listTemplates_Res } from '@/@types/interfaces/Master/MAction_Template/listTemplatesInterface'
import { listTemplatesALL_Res } from '@/@types/interfaces/Master/MAction_Template/listTemplatesALLInterface'
import {
    Create_Req,
    Create_Res,
} from '@/@types/interfaces/Master/MAction_Template/CreateInterface'
import {
    setTemplateInActive_Req,
    setTemplateInActive_Res,
} from '@/@types/interfaces/Master/MAction_Template/setTemplateInActiveInterface'
import {
    Update_Req,
    Update_Res,
} from '@/@types/interfaces/Master/MAction_Template/UpdateInterface'
import {
    MAction_TemplateupdateStatus_Req,
    MAction_TemplateupdateStatus_Res,
} from '@/@types/interfaces/Master/MAction_Template/MAction_TemplateupdateStatusInterface'

import {
    MAction_TemplateupdatebInActive_Req,
    MAction_TemplateupdatebInActive_Res,
} from '@/@types/interfaces/Master/MAction_Template/MAction_TemplateupdatebInActiveInterface'

import {
    MAction_TemplateupdateTemplateID_Req,
    MAction_TemplateupdateTemplateID_Res,
} from '@/@types/interfaces/Master/MAction_Template/MAction_TemplateupdateTemplateIDInterface'

export const SLICE_NAME = 'MAction_Template'

type Delete_Req_Data = Delete_Req & Record<string, unknown>

export const Delete = createAsyncThunk(
    SLICE_NAME + 'Delete',
    async (data: Delete_Req_Data) => {
        await apiDelete(data)
    },
)

type Get_Req_Data = Get_Req & Record<string, unknown>

export const Get = createAsyncThunk(
    SLICE_NAME + 'Get',
    async (data: Get_Req_Data) => {
        const response = await apiGet(data)
        return response.data as Get_Res
    },
)

type getTemplateFile_Req_Data = getTemplateFile_Req & Record<string, unknown>

export const getTemplateFile = createAsyncThunk(
    SLICE_NAME + 'getTemplateFile',
    async (data: getTemplateFile_Req_Data) => {
        const response = await apigetTemplateFile(data)
        return response.data as getTemplateFile_Res
    },
)

export const listTemplates = createAsyncThunk(
    SLICE_NAME + 'listTemplates',
    async () => {
        const response = await apilistTemplates()
        return response.data as listTemplates_Res
    },
)

export const listTemplatesALL = createAsyncThunk(
    SLICE_NAME + 'listTemplatesALL',
    async () => {
        const response = await apilistTemplatesALL()
        return response.data as listTemplatesALL_Res
    },
)

type Create_Req_Data = Create_Req & Record<string, unknown>

export const Create = createAsyncThunk(
    SLICE_NAME + 'Create',
    async (data: Create_Req_Data) => {
        const response = await apiCreate(data)
        return response.data as Create_Res
    },
)

type setTemplateInActive_Req_Data = setTemplateInActive_Req &
    Record<string, unknown>

export const setTemplateInActive = createAsyncThunk(
    SLICE_NAME + 'setTemplateInActive',
    async (data: setTemplateInActive_Req_Data) => {
        const response = await apisetTemplateInActive(data)
        return response.data as setTemplateInActive_Res
    },
)

type Update_Req_Data = Update_Req & Record<string, unknown>

export const Update = createAsyncThunk(
    SLICE_NAME + 'Update',
    async (data: Update_Req_Data) => {
        const response = await apiUpdate(data)
        return response.data as Update_Res
    },
)

type MAction_TemplateupdateStatus_Req_Data = MAction_TemplateupdateStatus_Req &
    Record<string, unknown>

export const MAction_TemplateupdateStatus = createAsyncThunk(
    SLICE_NAME + 'MAction_TemplateupdateStatus',
    async (data: MAction_TemplateupdateStatus_Req_Data) => {
        const response = await apiupdateStatus(data)
        return response.data as MAction_TemplateupdateStatus_Res
    },
)

type MAction_TemplateupdatebInActive_Req_Data =
    MAction_TemplateupdatebInActive_Req & Record<string, unknown>

export const MAction_TemplateupdatebInActive = createAsyncThunk(
    SLICE_NAME + 'MAction_TemplateupdatebInActive',
    async (data: MAction_TemplateupdatebInActive_Req_Data) => {
        const response = await apiupdatebInActive(data)
        return response.data as MAction_TemplateupdatebInActive_Res
    },
)

type MAction_TemplateupdateTemplateID_Req_Data =
    MAction_TemplateupdateTemplateID_Req & Record<string, unknown>

export const MAction_TemplateupdateTemplateID = createAsyncThunk(
    SLICE_NAME + 'MAction_TemplateupdateTemplateID',
    async (data: MAction_TemplateupdateTemplateID_Req_Data) => {
        const response = await apiupdateTemplateID(data)
        return response.data as MAction_TemplateupdateTemplateID_Res
    },
)

export type MAction_TemplateState = {
    loading: boolean
    Get_State: Get_Res
    getTemplateFile_State: getTemplateFile_Res
    listTemplates_State: listTemplates_Res
    listTemplatesALL_State: listTemplatesALL_Res
    Create_State: Create_Res
    setTemplateInActive_State: setTemplateInActive_Res
    Update_State: Update_Res
    MAction_Template_updateStatus_State: MAction_TemplateupdateStatus_Res
    MAction_Template_updatebInActive_State: MAction_TemplateupdatebInActive_Res
    MAction_Template_updateTemplateID_State: MAction_TemplateupdateTemplateID_Res
}

const initialState: MAction_TemplateState = {
    loading: true,
    Get_State: {},
    getTemplateFile_State: {},
    listTemplates_State: {},
    listTemplatesALL_State: {},
    Create_State: {},
    setTemplateInActive_State: {},
    Update_State: {},
    MAction_Template_updateStatus_State: {},
    MAction_Template_updatebInActive_State: {},
    MAction_Template_updateTemplateID_State: {},
}

const MAction_TemplateSlice = createSlice({
    name: SLICE_NAME,
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder // Delete
            .addCase(Delete.pending, (state) => {
                state.loading = true
            })
            .addCase(Delete.fulfilled, (state) => {
                state.loading = false
            })
            .addCase(Delete.rejected, (state) => {
                state.loading = false
            })
            // Get
            .addCase(Get.pending, (state) => {
                state.loading = true
            })
            .addCase(Get.fulfilled, (state, action) => {
                state.Get_State = action.payload
                state.loading = false
            })
            .addCase(Get.rejected, (state) => {
                state.loading = false
            })
            // getTemplateFile
            .addCase(getTemplateFile.pending, (state) => {
                state.loading = true
            })
            .addCase(getTemplateFile.fulfilled, (state, action) => {
                state.getTemplateFile_State = action.payload
                state.loading = false
            })
            .addCase(getTemplateFile.rejected, (state) => {
                state.loading = false
            })
            // listTemplates
            .addCase(listTemplates.pending, (state) => {
                state.loading = true
            })
            .addCase(listTemplates.fulfilled, (state, action) => {
                state.listTemplates_State = action.payload
                state.loading = false
            })
            .addCase(listTemplates.rejected, (state) => {
                state.loading = false
            })
            // listTemplatesALL
            .addCase(listTemplatesALL.pending, (state) => {
                state.loading = true
            })
            .addCase(listTemplatesALL.fulfilled, (state, action) => {
                state.listTemplatesALL_State = action.payload
                state.loading = false
            })
            .addCase(listTemplatesALL.rejected, (state) => {
                state.loading = false
            })
            // Create
            .addCase(Create.pending, (state) => {
                state.loading = true
            })
            .addCase(Create.fulfilled, (state, action) => {
                state.Create_State = action.payload
                state.loading = false
            })
            .addCase(Create.rejected, (state) => {
                state.loading = false
            })
            // setTemplateInActive
            .addCase(setTemplateInActive.pending, (state) => {
                state.loading = true
            })
            .addCase(setTemplateInActive.fulfilled, (state, action) => {
                state.setTemplateInActive_State = action.payload
                state.loading = false
            })
            .addCase(setTemplateInActive.rejected, (state) => {
                state.loading = false
            })
            // Update
            .addCase(Update.pending, (state) => {
                state.loading = true
            })
            .addCase(Update.fulfilled, (state, action) => {
                state.Update_State = action.payload
                state.loading = false
            })
            .addCase(Update.rejected, (state) => {
                state.loading = false
            })
            // MAction_TemplateupdateStatus
            .addCase(MAction_TemplateupdateStatus.pending, (state) => {
                state.loading = true
            })
            .addCase(
                MAction_TemplateupdateStatus.fulfilled,
                (state, action) => {
                    state.MAction_Template_updateStatus_State = action.payload
                    state.loading = false
                },
            )
            .addCase(MAction_TemplateupdateStatus.rejected, (state) => {
                state.loading = false
            })
            // MAction_TemplateupdatebInActive
            .addCase(MAction_TemplateupdatebInActive.pending, (state) => {
                state.loading = true
            })
            .addCase(
                MAction_TemplateupdatebInActive.fulfilled,
                (state, action) => {
                    state.MAction_Template_updatebInActive_State =
                        action.payload
                    state.loading = false
                },
            )
            .addCase(MAction_TemplateupdatebInActive.rejected, (state) => {
                state.loading = false
            })
            .addCase(MAction_TemplateupdateTemplateID.pending, (state) => {
                state.loading = true
            })
            .addCase(
                MAction_TemplateupdateTemplateID.fulfilled,
                (state, action) => {
                    state.MAction_Template_updateTemplateID_State =
                        action.payload
                    state.loading = false
                },
            )
            .addCase(MAction_TemplateupdateTemplateID.rejected, (state) => {
                state.loading = false
            })
    },
})
export default MAction_TemplateSlice.reducer
