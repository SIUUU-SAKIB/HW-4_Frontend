import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface Submission {
    name: string;
    email: string;
    message: string;

}

interface FormState {
    submissions: Submission[];
}


const initialState: FormState = {
    submissions: [],
};

const formSlice = createSlice({
    name: "form",
    initialState,
    reducers: {
        submittedData: (state, action: PayloadAction<Submission>) => {
            state.submissions.push(action.payload);
        },
    },
});

export const { submittedData } = formSlice.actions;
export default formSlice.reducer;
