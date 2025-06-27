import { createContext, useCallback, useContext, useMemo, useState } from 'react';

type ComponentName = 'menu' | 'moviesList' | 'favorites' | 'banner';

type FocusComponent = {
	name: ComponentName;
	isFocused: boolean;
	focusedIndex: number;
};

type FocusContextValue = {
	focusedComponent: FocusComponent;
	changeFocus: (component: ComponentName, index?: number) => void;
};

const FocusContext = createContext<FocusContextValue | undefined>(undefined);

const useFocusContext = () => {
	const context = useContext(FocusContext);
	if (!context) {
		throw new Error('useFocusContext must be used within a FocusProvider');
	}
	return context;
};

interface FocusProviderProps {
	children: React.ReactNode;
}

function FocusProvider({ children }: FocusProviderProps) {
	const [components, setComponents] = useState<FocusComponent[]>([
		{ name: 'menu', isFocused: false, focusedIndex: 0 },
		{ name: 'moviesList', isFocused: true, focusedIndex: 0 },
		{ name: 'favorites', isFocused: false, focusedIndex: 0 },
		{ name: 'banner', isFocused: false, focusedIndex: 0 },
	]);

	const changeFocus = useCallback((component: ComponentName, index?: number) => {
		setComponents((prevState) => {
			const updatedComponents = prevState.map((comp) => {
				if (comp.name === component) {
					let newState = { ...comp, isFocused: true };
					if (index !== undefined) {
						newState.focusedIndex = index;
					}
					return newState;
				}
				return { ...comp, isFocused: false };
			});
			return updatedComponents;
		});
	}, []);

	const value = useMemo(
		() => ({
			focusedComponent: components.find((comp) => comp.isFocused) || components[0],
			changeFocus,
		}),
		[components]
	);

	return <FocusContext.Provider value={value}>{children}</FocusContext.Provider>;
}

export { useFocusContext };
export default FocusProvider;
