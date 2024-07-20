<script lang="ts">
    import {checkFields, checkEmail} from "../../../lib/index"
    import swal from "sweetalert2";
    import b from "crypto-js";
    import supabase from "../../../lib/supabase"

    let firstname:string = "";
    let lastname:string = "";
    let email:string = "";
    let phone:string = "";
    let password:string = "";
    let cPassword:string = "";

    const registerUser = async () => {
        if(checkFields({firstname, lastname, email, phone, password, cPassword}) == true) {
           let emailCheck: boolean = await checkEmail(email)
           if(emailCheck == true) {
                const saltRounds = 10;
                // b.AES.encrypt(this.password, 'efdafdsdfdsd').toString();
                let hash1 = b.AES.encrypt(password, 'efdafdsdfdsd').toString();
                // Store hash in your password DB.
                let hash2 = b.AES.encrypt(email, 'efdafdsdfdsd').toString();
                let data = await supabase.from("customers").insert({ email: email, firstname: firstname, lastname: lastname, phone: phone, password: hash1, token: hash2 })
                if (data.error == null) {
                    window.localStorage.setItem('token', hash2)
                    window.location.href = "/"
                } else {
                    swal.fire("Oops", "An error has occured", "error")
                }
           } else {
                swal.fire("Oops", "Email is already being used", "error")
           }
        } else {
                swal.fire("Oops", "Please enter data in all fields", "error")
        }
    }
</script>


<div class=' flex items-center justify-center'>
<div class="w-full max-w-md bg-white rounded-lg shadow-md p-8 ">
    <h1
    class="mb-4 text-3xl font-extrabold tracking-tight leading-none text-gray-900  header"
>
   Login
</h1>
    <form >
        <div class="mb-4">
            <label for="email" class="block text-gray-700 text-sm font-bold mb-2">Firstname</label>
            <input type="text" id="email" bind:value={firstname} name="firstname"  class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
        </div>
        <div class="mb-4">
            <label for="email" class="block text-gray-700 text-sm font-bold mb-2">Lastname</label>
            <input type="text" id="email" bind:value={lastname}  name="lastname"  class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
        </div>
        <div class="mb-4">
            <label for="email" class="block text-gray-700 text-sm font-bold mb-2">Email</label>
            <input type="email" id="email" bind:value={email}  name="email"  class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
        </div>
        <div class="mb-4">
            <label for="email" class="block text-gray-700 text-sm font-bold mb-2">Phone</label>
            <input type="text" id="email" bind:value={phone}  name="phone"  class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
        </div>
        <div class="mb-6">
            <label for="password" class="block text-gray-700 text-sm font-bold mb-2">Password</label>
            <input type="password" id="password" bind:value={password}  name="password"  class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
        </div>
        <div class="mb-6">
            <label for="password" class="block text-gray-700 text-sm font-bold mb-2">Confirm Password</label>
            <input type="password" id="password" bind:value={cPassword}  name="cPassword"  class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
        </div>
        <div class="flex items-center justify-between">
            <button  on:click={() => registerUser()}  class=" confirm-buttons text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Register</button>
            <a href="/login" class="links inline-block align-baseline font-bold text-sm ">Already have an account? Click here?</a>
        </div>
    </form>
</div>
</div>