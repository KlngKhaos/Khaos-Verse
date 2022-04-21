import create from 'zustand';

export const useCountStore = create((set, get) => ({
	buyFlag: false,
	updateBuyFlag: (value) =>  {
		set({ buyFlag: value });
	},
	isRecording: 0,
	updateIsRecording: (value) => {
		set({ isRecording: value });
	},
	buyStatus: {
		model: true,
		json: false,
		image: false,
		gif: true,
	},
	updateBuyStatus: ( value ) => {
		const old = get().buyStatus;
		set({ buyStatus: { ...old, ...value } });
	},
	jsonHash: "",
	setJsonHash: (value) => {
		set({jsonHash: value})
	},
	picHash: "",
	setPicHash: (value) => {
		set({picHash: value})
	},
	clearHashes: () => {
		set({jsonHash: ""})
		set({picHash: ""})
	},
	nft: null,
	setNft: (data) => {
		set({nft: data})
	},
	joinBattleNftJSON: null,
	updateJoinBattleNFTJSON: data => {
		// console.log("function is Callingggggggg", data)
		set({joinBattleNftJSON: data})
	}
}))

export default useCountStore;