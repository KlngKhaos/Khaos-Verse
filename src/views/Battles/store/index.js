import create from 'zustand';

export const useCountStore = create((set, get) => ({
	showStatics: false,
	updateShowStatics: ( value ) => {
		set({ showStatics: value });
	},
	currentStatics: {},
	updateCurrentStatics: (value) => {
		set({ currentStatics: value });
	},
	currentHoverModel: null,
	updateCurrentHoverModel: (value) => {
		set({ currentHoverModel: value });
	},
}))

export default useCountStore;