<script>
// @ts-nocheck

import Firebase, { app as firebaseApp } from "$lib/Firebase.svelte";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
const auth = getAuth(firebaseApp); 

let email;
let username;
let password;
let passwordRepeat;

let passwordNotSame = false

function onSubmit(e) {
  console.log(email);
}

function registerTestAccount() {
  createUserWithEmailAndPassword(auth, "chendeyao000@gmail.com", 'abcdefg')
    .then((userCredential) => {
      // Marked Logged in
    })
    .catch((error) => {
      console.log(error);
    })
}


</script>

<h1>
  Sign Up
</h1>

<form on:submit|preventDefault={onSubmit} >
  <div class="form-floating my-3">
    <input bind:value={email} type="email" class="form-control" id="floatingInput" placeholder="name@example.com" required>
    <label for="floatingInput">Email address</label>
  </div>
  <div class="form-floating my-3">
    <input bind:value={username} type="text" class="form-control" id="floatingUsername" placeholder="Bob" required>
    <label for="floatingUsername">Username</label>
  </div>
  <div class="form-floating my-3">
    <input bind:value={password} type="password" class="form-control" id="floatingPassword" placeholder="Password" required>
    <label for="floatingPassword">Password</label>
  </div>
  <div class="form-floating my-3">
    <input bind:value={passwordRepeat} type="password" class="form-control" id="floatingPasswordRepeat" placeholder="Password" required>
    <label for="floatingPasswordRepeat">Repeat Password</label>
  </div>
  
  {#if passwordNotSame}
    <p class="text-danger">The two passwords you entered are not the same.</p>
  {/if}
  <button class="w-100 btn btn-lg btn-primary mb-3" type="submit">Sign Up</button>
</form>

<button on:click={() => passwordNotSame = true}>Display</button>
<button on:click={registerTestAccount}>registerTestAccount</button>