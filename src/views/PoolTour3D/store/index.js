import create from 'zustand';

export const useCountStore = create((set, get) => ({
	showStatics: false,
	updateShowStatics: ( value ) => {
		set({ showStatics: value });
	},
	currentStatics: null,
	updateCurrentStatics: (value) => {
		set({ currentStatics: value });
	},
	currentHoverModel: null,
	updateCurrentHoverModel: (value) => {
		set({ currentHoverModel: value });
	},
	myGladiators: null,
	setMyGladiators: data => {
		set({myGladiators: data})
	},
	schoolGladiators: null,
	setSchoolGladiators: data => {
		set({schoolGladiators: data})
	},
	usersGladiators: null,
	setUsersGladiators: data => {
		set({usersGladiators: data})
	},
	userNftHashes: [],
	settingUserNFTHashes: data => {
		set({userNftHashes: data})
	},
	schoolNftHashes: [],
	settingSchoolNFTHashes: data => {
		set({schoolNftHashes: data})
	},
	nftHashes: [],
	settingNFTHashes: data => {
		set({nftHashes: data})
	},
	totalSupplies: 0,
	setTotalSupplies: data => {
		set({totalSupplies: data})
	}
}))

export default useCountStore;