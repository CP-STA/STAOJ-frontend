<script context="module">
	import { readable } from 'svelte/store';

	import { getAuth, signOut, onAuthStateChanged } from 'firebase/auth';
	import { app } from '$lib/firebase';

	const auth = getAuth(app);
	export const user = readable(
		{ loaded: false, user: null, githubHandle: null },
		function start(set) {
			onAuthStateChanged(auth, async (user) => {
				if (user) {
					// User is signed in, see docs for a list of available properties
					// https://firebase.google.com/docs/reference/js/firebase.User
					const response = await fetch(`https://api.github.com/user/${user.providerData[0].uid}`, {
						headers: { Accept: 'application/json' }
					});
					let j = await response.json();
					const githubHandle = j.login;
					// @ts-ignore
					set({ loaded: true, user, githubHandle });
				} else {
					// @ts-ignore
					set({ loaded: true, user: null, githubHandle: null });
				}
			});
		}
		// TODO: Free the resource after use
	);
</script>
