import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface BoardsState {
  shouldBoardsUpdate: boolean;
}

const initialState: BoardsState = {
  shouldBoardsUpdate: false,
};

export const boardsSlice = createSlice({
  name: 'boards',
  initialState,
  reducers: {
    updateBoardsAfterCreation: (state, action: PayloadAction<boolean>) => {
      state.shouldBoardsUpdate = action.payload;
    },
  },
});

export const { updateBoardsAfterCreation } = boardsSlice.actions;

export default boardsSlice.reducer;
