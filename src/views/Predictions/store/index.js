import create from 'zustand';

export const useImageStore = create((set, get) => ({
	image: "arles arena",
	setImage: ( value ) => {
        // console.log("valueeeeeeee", value)
		set({ image: value });
	}
}))

export default useImageStore;