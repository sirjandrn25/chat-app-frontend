class SlidingPaneUtil {
	globalState: any = null;
	static register(ref: any) {
		(this as any).globalState = ref;
	}
	static open(args: any) {
		if (!(this as any).globalState) return;
		(this as any).globalState?.open({ ...args });
	}

	static close(args?: any) {
		if (!(this as any).globalState) return;
		(this as any).globalState?.close(args);
	}
	static closeAll(args: any) {
		if (!(this as any).globalState) return;
		(this as any).globalState?.closeAll(args);
	}
	static updateProps(args: any) {
		if (!(this as any).globalState) return;
		(this as any).globalState?.updateProps(args);
	}
}

export default SlidingPaneUtil;
