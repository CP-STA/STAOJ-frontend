<script context="module">
  import { writable } from "svelte/store";
  export let loggedIn = writable(false);
  
</script>

<script>
  // @ts-nocheck
  import { GithubAuthProvider } from "firebase/auth";
  
  const provider = new GithubAuthProvider();
  import { app as firebaseApp } from "$lib/Firebase.svelte";
  
  import { getAuth, signInWithPopup } from "firebase/auth";
  
  const auth = getAuth();
  function signInWithGithub() {signInWithPopup(auth, provider)
  .then((result) => {
    const user = result.user;
    console.log(user);
    // ...
  }).catch((error) => {
    console.log(error);
  });
}
  
  
  function onSubmit(e) {
    const formData = new FormData(e.target);
    const data = {};
    for (let field of formData) {
      const [key, value] = field;
      data[key] = value;
    }
    
    
    // TODO: actually login through firebase. 
    
    $loggedIn = true;
  }
  
  
  
</script>


<form on:submit|preventDefault={onSubmit} >
  <h1 class="h3 mb-3 fw-normal text-center">Sign in</h1>
  <div class="form-floating my-3">
    <input type="email" class="form-control" id="floatingInput" name="email" placeholder="name@example.com" required>
    <label for="floatingInput">Email address</label>
  </div>
  <div class="form-floating my-3">
    <input type="password" class="form-control" id="floatingPassword" name="password" placeholder="Password" required>
    <label for="floatingPassword">Password</label>
  </div>
  
  <button class="w-100 btn btn-lg btn-primary mb-3" type="submit">Sign in</button>
  <a class="w-100 btn btn-lg btn-secondary" type="submit" href="/sign-up">Sign Up</a> 
  <button on:click={signInWithGithub}><i class="bi bi-github"></i>Sign in with Github</button>
</form>