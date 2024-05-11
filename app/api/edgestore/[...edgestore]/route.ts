import { initEdgeStore } from '@edgestore/server';
import { createEdgeStoreNextHandler } from '@edgestore/server/adapters/next/app';

const edgeStore = initEdgeStore.create();
const edgeStoreRouter = edgeStore.router({
	eventPhotos: edgeStore.imageBucket().beforeDelete(() => {
		return true;
	})
});

const handler = createEdgeStoreNextHandler({
	router: edgeStoreRouter
});

export { handler as GET, handler as POST };

/**
 * This type is used to create the type-safe client for the frontend.
 */
export type EdgeStoreRouter = typeof edgeStoreRouter;
