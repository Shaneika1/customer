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

    const loginUser = async () => {
        if(checkFields({ email, password}) == true) {
            let user = await supabase.from('customers').select().eq("email", email);

            if(user.data!.length > 0 ) {
                let singleUser = user.data![0]
                let convertedHash = b.AES.decrypt(singleUser.password, 'efdafdsdfdsd');
                var originalText = convertedHash.toString(b.enc.Utf8);
                let hash2 = b.AES.encrypt(email, 'efdafdsdfdsd').toString();
                if(originalText == password) {

                    window.localStorage.setItem('token', hash2)
                    await supabase.from("customers").update({token: hash2}).eq("email", email).then(res => {
                        window.location.href = "/"
                    })
                 
                } else {
                    swal.fire("Oops", "Incorrect Credentials", "error")
                }
            } else {
                swal.fire("Oops", "Incorrect Credentials", "error")
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
    Register
</h1>
    <form >
        
        <div class="mb-4">
            <label for="email" class="block text-gray-700 text-sm font-bold mb-2">Email</label>
            <input type="email" id="email" bind:value={email}  name="email"  class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
        </div>

        <div class="mb-6">
            <label for="password" class="block text-gray-700 text-sm font-bold mb-2">Password</label>
            <input type="password" id="password" bind:value={password}  name="password"  class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
        </div>
        
        <div class="flex items-center justify-between">
            <button  on:click={() => loginUser()}  class=" confirm-buttons text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Login</button>
            <a href="/register" class="links inline-block align-baseline font-bold text-sm ">Don't have an account? Click here?</a>
        </div>
    </form>
</div>
</div>