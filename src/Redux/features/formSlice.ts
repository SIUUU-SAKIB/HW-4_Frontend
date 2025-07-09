import { createSlice } from "@reduxjs/toolkit"

const initialState = {
 submissions: []
}
const formSlice = createSlice({
    name: "form",
    initialState,
    reducers: {
submittedData:(state, action) => {
    state.submissions.push(action.payload)
}
    }
})
export const {submittedData} = formSlice.actions
export default formSlice.reducer